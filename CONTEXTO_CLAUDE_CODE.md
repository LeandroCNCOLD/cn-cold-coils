# CN COLD Engenharia — Contexto Completo para Claude Code

> **Package manager:** Bun (não npm/yarn/pnpm)
> **Dev server:** porta 8080 · `bun run dev`
> **Auth local:** bypass automático em dev — sem login necessário
> **MCP Supabase:** configurado em `.mcp.json` → `sggfxewvxeagsfsqefjy`

> Este documento resume tudo que foi analisado e decidido em uma sessão longa de
> planejamento. Leia do início ao fim antes de tocar em qualquer arquivo.

---

## 1. O que é o sistema

O **CN COLD Engenharia** é uma plataforma web de engenharia de produto para
refrigeração industrial. Não é uma calculadora genérica — é a ferramenta interna
da CN COLD para três fins concretos:

1. **Validar o catálogo existente** — 480 modelos em planilha Excel, verificando
   se os valores declarados (COP, capacidade, potência) batem com o calculado
   pelos motores termodinâmicos.
2. **Desenvolver novos produtos** — criar aletados (evaporadores/condensadores)
   e máquinas completas (compressor + evap + cond + fan) do zero, gerando o
   ciclo termodinâmico acoplado.
3. **Gerar documentação oficial** — Data Sheet PDF por componente individual
   e por conjunto, DXF para fabricação, ficha de start-up para campo.

Linhas de produto: **LT** (congelados, Te ≈ −20°C), **LT MAX**, **MT**
(resfriados), **HT** (climatizados), **AGRO** (câmara agrícola com reaquecimento
de gás quente para controle de umidade), **BF** (blast freezer), **COMPACTice**.

---

## 2. Stack tecnológica

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React 19 + TypeScript + TanStack Router |
| Estilo | Tailwind CSS 4 + shadcn/ui |
| Estado | Zustand (stores por domínio) |
| Gráficos | Recharts |
| Build | Vite + Bun |
| Testes | Vitest (645+ testes passando — não quebrar!) |
| Backend/BD | Supabase (PostgreSQL) — **projeto próprio: sggfxewvxeagsfsqefjy** |
| Deploy | Cloudflare Workers |

---

## 3. Estrutura de módulos

```
src/modules/
├── cn_coils/          ← Dimensionamento de serpentinas, catálogo 753 geometrias
├── coldpro/           ← Orquestrador: páginas, Hub de Testes 20 abas, stores
├── coldpro_v2/        ← Motores de cálculo termodinâmico (NÃO TOCAR SEM TESTES)
│   └── engines/       ← heatTransfer, cycleEngine, agroCycle, reheatCoilSizing…
└── coldpro_catalog/   ← Catálogos BITZER, Ziehl-Abegg, válvulas de expansão
```

---

## 4. O que NUNCA tocar sem rodar os testes antes

Os arquivos abaixo foram construídos via engenharia reversa do VapCyc 3.7 e
CoilDesigner 4.8. São o ativo mais valioso do projeto. Qualquer mudança requer
`bun run vitest run` passando antes e depois:

- `coldpro_v2/engines/heatTransfer.ts`
- `coldpro_v2/engines/cycleEngine.ts`
- `coldpro_v2/engines/coilCalculationEngine.ts`
- `coldpro_v2/engines/iterativeCoilSolver.ts`
- `coldpro_v2/engines/agro/agroCycle.ts`
- `coldpro_v2/engines/agro/reheatCoilSizing.ts`
- `coldpro_v2/domain/types.ts`
- Todos os arquivos em `coldpro_catalog/data/`

---

## 5. Bugs críticos documentados — corrigir PRIMEIRO

Estes bugs foram identificados e documentados. Corrija nessa ordem antes de
qualquer nova feature:

### Bug C1 — COP do sistema incorreto (CRÍTICO)
**Arquivo:** qualquer engine que calcula COP  
**Problema:** `COP = Q / W_comp` — ignora a potência dos ventiladores  
**Correção:** `COP_sistema = Q / (W_comp + W_fans)`  
**Impacto:** afeta a validação de todos os 480 modelos do catálogo

### Bug C2 — `pwr_coeffs` vs `pow_coeffs`
**Arquivo:** `coldpro_catalog/data/compressorCatalog.types.ts` e consumidores  
**Problema:** campo correto é `pwr_coeffs`, não `pow_coeffs`  
**Impacto:** causa NaN silencioso na potência do compressor

### Bug C3 — Mistura metros/milímetros em `CoilAdvancedInput`
**Arquivo:** `coldpro_v2/domain/types.ts` e adapters  
**Problema:** campos como `tube_outer_diameter_m` estão em metros mas
`length_mm` e `tube_diameter_mm` em milímetros — mistura silenciosa  
**Regra:** converter tudo para metros ANTES de passar ao engine

### Bug C4 — `GeometryPickerModal` sem prop `onSelect`
**Arquivo:** qualquer componente que usa `GeometryPickerModal`  
**Problema:** o modal salva direto no store, não expõe callback  
**Correção obrigatória:**
```typescript
// ✅ CORRETO — capturar via useEffect
const selectedGeometry = useCnCoilsSimulationStore(s => s.selectedGeometry);
useEffect(() => {
  if (selectedGeometry) setLocalGeometry(selectedGeometry);
}, [selectedGeometry]);
```

### Bug C5 — `setCompressor` não é setter funcional
**Arquivo:** qualquer componente que chama `useTestHubStore`  
**Problema:** não aceita `(prev) => ({...prev, ...})`  
**Correção:**
```typescript
// ✅ CORRETO
const { compressor } = useTestHubStore.getState();
setCompressor({ ...compressor, model: '4BES-9Y' });
```

### Bug C6 — `CoilGeometryCatalogItem` campos bilíngues
**Arquivo:** qualquer consumer de geometrias  
**Problema:** campos existem em pt-BR E camelCase simultaneamente  
**Correção:** sempre usar `??` para os dois:
```typescript
const od = item.diametro_externo_tubo_mm ?? item.tubeOuterDiameterMm ?? 9.52;
const pt = item.passo_transversal_mm ?? item.tubePitchTransverseMm ?? 25.4;
```

---

## 6. Banco de dados — Supabase próprio

**Projeto:** `sggfxewvxeagsfsqefjy.supabase.co`  
**Variáveis a atualizar no `.env`:**
```env
VITE_SUPABASE_URL=https://sggfxewvxeagsfsqefjy.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<anon-key do novo projeto>
```

### Tabelas existentes (originais do Lovable)
`profiles`, `user_roles`, `user_preferences`, `module_permissions`, `projects`,
`compressors`, `evaporators`, `condensers`, `cycle_simulations`, `fans`,
`fans_catalog` (572 Ziehl-Abegg), `refrigerants`, `coil_geometry_overrides`,
`equipment_test_bench_configs`

### Tabelas novas (já criadas via migration)
`catalog_models` — os 480 modelos do catálogo com `validation_status`  
`product_technical_records` — Data Sheet completo em JSONB  
`product_revisions` — histórico Rev A → Rev B → Rev C  
`validation_results` — PASS/FAIL por critério de validação  
`agro_configurations` — configuração do reaquecimento AGRO  
`product_attachments` — PDFs, DXFs, imagens por produto  

### Roles de usuário
`admin` · `engenheiro` · `gerente` · `visualizador`  
RLS ativo em todas as 20 tabelas. Função `has_role()` disponível.

---

## 7. Backlog oficial — 42 tarefas em 8 sprints

### Sprint 1 — Motor elétrico e COP (fazer AGORA)
- **C1** Corrigir COP: `Q / (W_comp + W_fans)`
- **C2** Adicionar corrente, tensão, fases, fator de potência no `CompressorSpec`
- **C3** Criar `electricalAnalysisEngine.ts` — calcula `W_total`, `I_total`, `COP_sistema`, `EER`
- **C4** Adicionar polinômios `cop_system(Te,Tc)` e `total_power_w(Te,Tc)` como targets

### Sprint 2 — Hub de Testes: 5 abas faltantes
- **H1** Aba "Elétrico" — corrente, tensão, potência total, COP do sistema
- **H2** Aba "Validação de Máquina" — checklist PASS/FAIL por critério
- **H3** Aba "Catálogo & Data Sheet" — visualiza e exporta `ProductTechnicalRecord`
- **H4** Aba "Start-up" — referências de campo + medições reais + PASS/FAIL
- **H5** Aba "Revisões" — histórico com diff entre versões

### Sprint 3 — Motor de start-up
- **S1** Tipo `StartupReferenceSheet` com parâmetros + tolerâncias
- **S2** `startupReferenceEngine.ts` — calcula a partir do `ProductTechnicalRecord`
- **S3** Estimativa de carga de fluido: volume interno × densidade
- **S4** Campo `startup_reference` no `ProductTechnicalRecord`

### Sprint 4 — Workspace AGRO completo
- **A1** Aba câmara: carga térmica (dimensões, produto, T, UR alvo)
- **A2** Aba aletado integrado: evap + bateria gás quente + ventilador
- **A3** Aba ciclo com gás quente: P-h com by-pass, fração de by-pass
- **A4** Aba psicrometria: diagrama h-x completo, curva de saturação, 3 estados
- **A5** Aba condensador: carga total, validação, sugestão automática
- **A6** Diagrama psicrométrico completo

> **Nota AGRO:** Os engines `agroCycle.ts`, `reheatCoilSizing.ts` e
> `hotGasBypassEngine.ts` já existem em `coldpro_v2/engines/agro/`. Só falta a UI.

### Sprint 5 — Catálogo e exportação profissional
- **E1** Data Sheet PDF com logo CN COLD + blueprint + tabela de seleção
- **E2** Data Sheet individual por componente (evap, cond, reaquecimento, fan)
- **E3** `total_power_w` e `cop_system` no payload de exportação
- **E4** `startup_reference` no payload de exportação
- **E5** Catálogo comercial multi-modelo: tabela comparativa, filtros, Excel
- **E6** Logo customizável no PDF

### Sprints 6-8 — Sistemas completos, UX, calibração, nice-to-have
Ver `BACKLOG.md` no repositório.

---

## 8. Catálogos embutidos no código

| Catálogo | Localização | Conteúdo |
|---------|-------------|---------|
| BITZER EN12900 | `src/modules/coldpro_catalog/data/` | Coeficientes polinomiais cap/pow/cur |
| Ziehl-Abegg fans | `public/data/catalogs/` | 572 ventiladores com curva SPH×Q |
| Geometrias aletados | carregado por `coilGeometryCatalogService.ts` | 753 geometrias |
| Válvulas expansão | `coldpro_catalog` | TXV/EEV por refrigerante |

---

## 9. Fórmula do compressor EN12900 / ARI 540

```
Q = C₁ + C₂·Te + C₃·Tc + C₄·Te² + C₅·Te·Tc + C₆·Tc²
  + C₇·Te³ + C₈·Tc·Te² + C₉·Te·Tc² + C₁₀·Tc³
```
Mesma estrutura para potência (W) e corrente (A).  
Campos no catálogo: `calibration_points[0].cap_coeffs[10]` e `pwr_coeffs[10]`.

---

## 10. Linha AGRO — o 5º componente

Equipamentos AGRO têm 5 componentes no ciclo (outros têm 4):
1. Compressor
2. Condensador
3. Evaporador
4. Ventilador
5. **Reaquecimento** — serpentina de gás quente que reaquece o ar após o
   evaporador para controlar a umidade da câmara sem elevar sua temperatura.

Os campos do reheat estão em `CatalogEquipmentRow` (prefixo `reheat*`) e a
engine de dimensionamento está em `reheatCoilSizing.ts`. O tipo
`agro_configurations` no banco tem todos os campos necessários.

---

## 11. Armadilhas confirmadas no código

Estas já causaram bugs reais. Verificar antes de qualquer PR:

1. `GeometryPickerModal` não tem prop `onSelect` — usa store compartilhado
2. `setCompressor()` no Hub não aceita setter funcional `(prev) => ...`
3. `CoilAdvancedInput` mistura metros e milímetros — sempre converter antes
4. Campo de potência: `pwr_coeffs` (correto), não `pow_coeffs`
5. `CoilGeometryCatalogItem` tem campos em pt-BR e camelCase — usar `??`
6. COP do sistema: incluir W_fans no denominador, não só W_comp
7. Páginas geradas pelo Lovable podem ter 87KB+ — não adicionar mais lógica nelas,
   extrair para hooks/services

---

## 12. Regras de arquitetura para novas features

- **Página**: máximo 200 linhas, apenas JSX. Zero lógica de cálculo.
- **Hook** (`useXxxWorkspace.ts`): estado local, efeitos, chamadas de serviço.
- **Service** (`xxxService.ts`): lógica de negócio pura, sem hooks React.
- **Engine** (`xxxEngine.ts`): matemática/termodinâmica pura, funções puras.
- **Test**: todo engine novo precisa de teste Vitest antes do PR.
- **Não usar Zustand** para estado local de formulário — usar `useState`.
- **Não criar arquivos > 300 linhas** — dividir em sub-componentes ou serviços.

---

## 13. Como rodar o projeto

```bash
bun install
bun run dev          # servidor de desenvolvimento
bun run vitest run         # rodar os 645+ testes
bun run build        # build de produção
```

---

## 14. Ordem de ataque recomendada

1. Atualizar `.env` com as credenciais do novo Supabase
2. Corrigir os 6 bugs documentados (seção 5)
3. Criar `electricalAnalysisEngine.ts` (Sprint 1)
4. Implementar as 5 abas faltantes do Hub (Sprint 2)
5. Workspace AGRO completo usando engines existentes (Sprint 4)
6. Data Sheet PDF por componente e conjunto (Sprint 5)
7. Importar os 480 modelos do catálogo Excel para `catalog_models`
8. Script de validação em lote — rodar engine em cada modelo e salvar resultado

---

## 15. Contexto de negócio

- **Empresa:** CN COLD Engenharia
- **Usuário principal:** Leandro (Super Admin) + P. Araujo
- **Refrigerantes principais:** R404A (maioria), R410A, R134a
- **Fabricantes de compressores:** Copeland, BITZER, Danfoss/Bock, Dorin
- **Ventiladores:** exclusivamente Ziehl-Abegg (69+ modelos)
- **Frequência:** 60Hz (Brasil)
- **Capacidades:** 1.575 a 56.466 kcal/h (4 kW a 65 kW)

---

*Gerado em 15/05/2026 — baseado em análise de 685 arquivos de histórico,
código-fonte completo, banco de dados e catálogo de 480 modelos.*
