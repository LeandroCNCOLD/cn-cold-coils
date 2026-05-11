## Objetivo

No painel **Evaporador** da engenharia de aplicação avançada, permitir que o engenheiro:

1. Defina **restrições dimensionais livremente** (altura, comprimento, nº filas, passo aleta, área frontal máx — qualquer combinação fica fixa, o resto varia).
2. Defina **um ou mais critérios de seleção combinados** (ΔT alvo, nº pontos atendidos, COP médio, menor área).
3. Receba o **melhor evaporador encontrado** já preenchido no formulário superior + uma **tabela de varredura** mostrando, para cada (Te, Tc) do sweep do compressor, quanto o evaporador entrega.

Mesma lógica, na sequência, para o **Condensador** (só depois do evaporador estar fechado).

## Arquitetura

```text
ApplicationEngineeringPage (advanced)
├── CompressorPanel    ← já existente (sweep Te×Tc + unidades)
├── EvaporatorPanel    ← REFAZER
│   ├── ConstraintsForm        (engenheiro marca o que fixa)
│   ├── CriteriaForm           (multi-critério com pesos)
│   ├── runEvaporatorSearch()  → service novo
│   ├── BestResultCard         (preenche o form principal)
│   └── CoveragePointsTable    (Te, Tc, Q_comp, Q_evap, ΔT, atende?)
└── CondenserPanel     ← MESMA estrutura, habilitado quando evap fechado
```

## Novos arquivos

```text
src/modules/coldpro/pages/application-engineering/
├── services/
│   ├── evaporatorSearchService.ts     ← gera candidatos, simula, ranqueia
│   └── coilCandidateGenerator.ts      ← grade dinâmica de geometrias
├── components/
│   ├── EvaporatorPanel.tsx            ← reescrito
│   ├── EvaporatorConstraintsForm.tsx
│   ├── EvaporatorCriteriaForm.tsx
│   └── CoveragePointsTable.tsx
└── types/app-engineering.types.ts     ← adicionar tipos abaixo
```

## Tipos novos

- `EvaporatorConstraints` — cada campo opcional: `height_mm?`, `length_mm?`, `rows?`, `tubes_per_row?`, `fin_pitch_mm?`, `max_frontal_area_m2?`, `circuits?`.
- `EvaporatorCriteria` — array de `{ kind: 'delta_t_target' | 'max_points_covered' | 'best_cop' | 'min_area', target?: number, weight: number }`.
- `EvaporatorCandidate` — geometria + capacidade simulada por ponto.
- `EvaporatorSearchResult` — `bestCandidate`, `rankedCandidates[]`, `coveragePoints[]`.

## Algoritmo (`evaporatorSearchService`)

1. Receber: pontos do sweep do compressor (já calculados em `CompressorPanel`), `constraints`, `criteria`, condições do ar (T entrada, UR), refrigerante.
2. **Gerar candidatos** via `coilCandidateGenerator`:
   - Para cada dimensão NÃO fixada, varrer faixa razoável (ex.: filas 2–8, tubos/fila 8–24, passo 1.8/2.1/2.5/3.0/3.5 mm, comprimento 600–2400 mm em passos de 200 mm).
   - Para cada combinação, calcular área frontal e descartar se exceder `max_frontal_area_m2`.
3. **Para cada candidato**, simular usando o serviço de coil já existente (`coilSelectionService` / `cn_coils` engine) em cada (Te, Tc) do sweep:
   - Capacidade entregue `Q_evap_w`
   - ΔT real (T_ar_in − Te)
   - Marcar "atende" se `Q_evap_w ≥ Q_comp_w` no ponto.
4. **Ranquear** com score normalizado por critério × peso. Critérios:
   - `delta_t_target`: `1 − |ΔT_médio − target| / target`
   - `max_points_covered`: `pontos_atendidos / total_pontos`
   - `best_cop`: COP do sistema médio normalizado
   - `min_area`: `1 − area / area_max`
5. Retornar `bestCandidate` (maior score) + top-N.

## UI do `EvaporatorPanel`

- **Card "Restrições"**: cada campo tem checkbox "fixar" + input numérico. Se desmarcado, o motor varia.
- **Card "Critérios"**: lista com `+ Adicionar critério`, cada linha tem select do tipo, input de target (quando aplicável) e slider de peso (0–1).
- Botão **"Buscar melhor evaporador"** (desabilitado se não há sweep do compressor).
- **Card "Melhor resultado"**: geometria escolhida (filas, tubos/fila, passo, comprimento, área frontal, peso estimado), botão "Aplicar ao formulário principal" que preenche `LADO VENTILAÇÃO + GEOMETRIA` no hub.
- **Tabela de cobertura** (sticky header, mesma estética do CompressorPanel):

```text
| Te | Tc | Q_comp | Q_evap | ΔT | Atende |
|----|----|--------|--------|-----|--------|
```

## Condensador

Mesma estrutura em `CondenserPanel`, só habilitado quando há `bestEvaporator`. Critério padrão = `delta_t_target` com alvo `Tc − Tamb = 12 °C`. Reutiliza `coilCandidateGenerator` (modo "condensador" com tubos maiores e mais filas) e o engine de condensador a ar existente.

## Detalhes técnicos

- Toda a busca roda **client-side síncrona**; para grades grandes (>500 candidatos), envolver em `setTimeout(0)` por bloco para não travar a UI, com barra de progresso.
- Usar `useMemo` para não recalcular quando muda apenas a unidade de exibição.
- Reaproveitar o seletor de unidade (`PowerUnit`) já criado para o compressor.
- Não tocar em código de backend nem em `coldpro_v2/engines/*` — só novos serviços de orquestração.

## Entregáveis nesta iteração

1. Tipos + service de busca + gerador de candidatos.
2. `EvaporatorPanel` reescrito (substitui o atual).
3. `CoveragePointsTable` reutilizável.
4. Aplicação automática ao formulário principal.

Condensador entra em iteração seguinte (mesmo padrão).