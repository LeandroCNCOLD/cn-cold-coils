## Objetivo

Garantir que **todo workspace de cálculo** (CN Coils — Evaporador, Condensador, Compressor — e Hub de Testes / catálogo coldpro) seja **limpo automaticamente após salvar e sair** da tela, eliminando o risco de o próximo cálculo herdar dados do anterior.

Hoje cada `handleSave` apenas exibe `toast.success("Projeto salvo (em memória).")` e abre o `PostSaveNextStepDialog`, mas **não limpa nenhum store**. Além disso, alguns stores são persistidos em `localStorage` (`coldpro-catalog-session`, `cncoils_last_inputs`), reinjetando dados antigos ao trocar de equipamento.

## Causa-raiz

Stores que mantêm estado entre telas:

| Store | Local | Persistido? | API de limpeza |
|---|---|---|---|
| `useCnCoilsSimulationStore` | cn_coils | não | `reset()` (já existe) |
| `useProjectStore` | cn_coils | sim (zustand persist) | `setActiveProject(null)` |
| `useCatalogSessionStore` | coldpro_catalog | sim (`coldpro-catalog-session`) | `clearSelection()` |
| `useTestHubStore` | coldpro | parcial | `clearAllAnalyses()` + limpar `selectedMachine` |
| `useComponentStore` / `useSessionStore` | coldpro | sim | precisa adicionar `reset()` |
| `lastInputsPersistence` | localStorage `cncoils_last_inputs` | sim | precisa `clearLastInputs()` |

## Plano

### 1. Criar utilitário central `src/modules/cn_coils/utils/workspaceReset.ts`

```ts
export function resetCnCoilsWorkspace(opts?: { keepProject?: boolean }) {
  useCnCoilsSimulationStore.getState().reset();
  if (!opts?.keepProject) useProjectStore.getState().setActiveProject(null);
  clearLastInputs(); // novo helper em lastInputsPersistence.ts
}
```

E `src/modules/coldpro/utils/workspaceReset.ts`:
```ts
export function resetColdproWorkspace() {
  useCatalogSessionStore.getState().clearSelection();
  useTestHubStore.getState().clearAllAnalyses();
  useTestHubStore.setState({ selectedMachine: null });
  useComponentStore.getState().reset?.();
  useSessionStore.getState().reset?.();
}
```

### 2. Adicionar `clearLastInputs()` em `lastInputsPersistence.ts`

Remove a chave `cncoils_last_inputs` do `localStorage`.

### 3. Adicionar `reset()` aos stores que ainda não têm

- `useComponentStore`, `useSessionStore` (coldpro): adicionar `reset: () => set(initialState)`.

### 4. Conectar nos pontos de "salvar e sair"

Em cada `handleSave` dos workspaces CN Coils:
```ts
const handleSave = () => {
  toast.success("Projeto salvo (em memória).");
  setNextStepOpen(true);
};
```
Mudar para limpar **após** o usuário fechar o `PostSaveNextStepDialog` (sair = `onOpenChange(false)`):
```tsx
<PostSaveNextStepDialog
  open={nextStepOpen}
  onOpenChange={(open) => {
    setNextStepOpen(open);
    if (!open) resetCnCoilsWorkspace();
  }}
  ...
/>
```
Aplicar em:
- `EvaporatorUnifiedWorkspacePage.tsx`
- `CondenserWorkspacePage.tsx`
- `CompressorWorkspacePage.tsx`

Para o Hub de Testes / catálogo coldpro: chamar `resetColdproWorkspace()` ao desmontar a página (`useEffect(() => () => resetColdproWorkspace(), [])`) em `TestHubPage.tsx` e `TestBenchPage.tsx`.

### 5. Reset defensivo na **entrada** dos workspaces

Mesmo que o save/sair anterior tenha falhado, garantir tela limpa quando o usuário entra "novo": se a URL não tem `projectId`/`equipmentId`, executar reset no `useEffect` de mount. Isso elimina qualquer herança residual de localStorage.

```tsx
useEffect(() => {
  const hasContext = searchParams.get("projectId") || searchParams.get("loadFromProject");
  if (!hasContext) resetCnCoilsWorkspace();
}, []);
```

### 6. Validação

- `bunx tsc --noEmit` → 0 erros
- `bunx vitest run` → 645 testes passando
- Teste manual: abrir Evaporador → preencher → salvar → fechar diálogo → abrir Condensador → confirmar campos zerados; idem Hub de Testes.

## Garantia

Combinação de **reset no save/sair** + **reset defensivo no mount** + **limpeza dos `localStorage` persistidos** assegura que nenhum dado do cálculo anterior seja herdado, eliminando a categoria de erros causados por estado residual.
