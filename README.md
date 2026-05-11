# CN COLD Engenharia — Plataforma de Simulação Termodinâmica

> **Repositório:** `cncoldengenharia-ab93b0e6`  
> **Versão do documento:** 2.0 — Maio 2026  
> **Mantido por:** Equipe CN COLD Engenharia  
> **Stack:** React 19 + TanStack Router + Vite + Supabase + TypeScript 5.8

---

## Sumário

1. [Visão Geral do Sistema](#1-visão-geral-do-sistema)
2. [Arquitetura Geral](#2-arquitetura-geral)
3. [Módulos do Sistema](#3-módulos-do-sistema)
4. [Motores de Cálculo](#4-motores-de-cálculo)
5. [Correlações e Metodologias Matemáticas](#5-correlações-e-metodologias-matemáticas)
6. [Catálogos de Dados](#6-catálogos-de-dados)
7. [Banco de Dados (Supabase)](#7-banco-de-dados-supabase)
8. [Rotas e Navegação](#8-rotas-e-navegação)
9. [Testes Automatizados](#9-testes-automatizados)
10. [Guia de Atualização e Contribuição](#10-guia-de-atualização-e-contribuição)
11. [Histórico de Correções Críticas](#11-histórico-de-correções-críticas)
12. [Referências Bibliográficas](#12-referências-bibliográficas)

---

## 1. Visão Geral do Sistema

A plataforma **CN COLD Engenharia** é um sistema web de engenharia de refrigeração industrial desenvolvido para a linha de produtos **CN COLD** (câmaras frias, resfriadores de líquido, condensadores remotos e sistemas de expansão direta). O sistema realiza desde o dimensionamento de serpentinas aletadas até a simulação completa do ciclo de refrigeração por compressão de vapor, integrando catálogos de compressores BITZER, ventiladores Ziehl-Abegg, válvulas Danfoss e 753 geometrias proprietárias CN COLD.

O sistema é utilizado por engenheiros de aplicação para:

- **Engenharia de Aplicação guiada** — stepper de 4 etapas: compressor → evaporador → condensador → simulação completa.
- Selecionar compressores BITZER pelo ponto de operação (Te, Tc) com avaliação de polinômios EN 12900 / ARI 540 e curva Q/W/COP interativa.
- Dimensionar serpentinas evaporadoras e condensadoras com 753 geometrias reais e seleção de ventiladores Ziehl-Abegg.
- Simular o ciclo termodinâmico completo (diagrama P-h, COP, balanço de massa e energia) com 20 abas analíticas no Hub de Testes.
- Analisar formação de gelo (frost), operação em mapa de carga, desempenho em regime parcial e psicrometria Hyland-Wexler.
- Exportar laudos técnicos em PDF e DXF para fabricação.

**Métricas do repositório:**

| Indicador | Valor |
|-----------|-------|
| Arquivos TypeScript/TSX | 630+ |
| Linhas de código | ~170.000 |
| Suítes de teste (Vitest) | 68 arquivos |
| Testes unitários | 645+ |
| Rotas de navegação | 44 |
| Catálogos JSON | 30+ arquivos |
| Geometrias de serpentinas | 753 |
| Ventiladores Ziehl-Abegg | catálogo completo por família |

---

## 2. Arquitetura Geral

O sistema segue uma arquitetura **modular por domínio** (Domain-Driven Design simplificado), onde cada módulo encapsula seus próprios motores, tipos, serviços, hooks e componentes de UI. Não há dependências circulares entre módulos — módulos de nível superior (`coldpro`) podem importar de módulos de nível inferior (`coldpro_v2`, `cn_coils`), mas nunca o contrário.

```
┌─────────────────────────────────────────────────────────────────┐
│                     CAMADA DE APRESENTAÇÃO                       │
│   React 19 + TanStack Router + Radix UI + Tailwind CSS 4        │
├──────────────┬──────────────┬──────────────┬────────────────────┤
│   coldpro    │  cn_coils    │coldpro_catalog│   coldpro_v2       │
│  (Hub/UI)    │ (Workspace)  │  (Catálogo)  │  (Motor Principal) │
├──────────────┴──────────────┴──────────────┴────────────────────┤
│                     CAMADA DE MOTORES                            │
│  coldpro_v2/engines/  ←  cn_coils/engine/  ←  cn_coils/engines/ │
├─────────────────────────────────────────────────────────────────┤
│              CONSTANTES FÍSICAS CANÔNICAS                        │
│                  src/lib/physicalConstants.ts                    │
├─────────────────────────────────────────────────────────────────┤
│                     CAMADA DE DADOS                              │
│   Supabase (PostgreSQL) + Catálogos JSON (public/data/catalogs) │
└─────────────────────────────────────────────────────────────────┘
```

### Stack Tecnológico

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Framework UI | React | 19.2 |
| Roteamento | TanStack Router | 1.168 |
| Estado global | Zustand | 5.0 |
| Consultas assíncronas | TanStack Query | 5.83 |
| Banco de dados | Supabase (PostgreSQL) | 2.105 |
| Formulários | React Hook Form + Zod | 7.71 / 3.24 |
| Gráficos | Recharts | 2.15 |
| Visualização 3D | Three.js + React Three Fiber | 0.184 / 9.6 |
| Exportação PDF | jsPDF + jsPDF-AutoTable | 4.2 |
| Exportação DXF | dxf-writer | 1.18 |
| Build | Vite | 7.3 |
| Testes | Vitest | 4.1 |
| Tipagem | TypeScript | 5.8 |
| Estilo | Tailwind CSS | 4.2 |

---

## 3. Módulos do Sistema

### 3.1 Módulo `coldpro` — Hub de Controle e Interface Principal

**Localização:** `src/modules/coldpro/`

O módulo `coldpro` é a camada de orquestração e interface do usuário. Ele não contém lógica de cálculo própria — delega ao `coldpro_v2` e ao `cn_coils`. Suas responsabilidades são:

- Renderizar o layout principal com sidebar de navegação.
- Gerenciar o estado de sessão do usuário (modo operador, modo engenheiro) com **persistência em localStorage** via middleware `persist` do Zustand.
- Orquestrar o **Hub de Testes** — painel central com 20 abas de simulação e validação.
- Hospedar o módulo de **Engenharia de Aplicação** com stepper guiado de 4 etapas.

**Páginas principais:**

| Página | Rota | Descrição |
|--------|------|-----------|
| `DashboardPage` | `/coldpro` | Painel inicial com resumo de projetos |
| `TestHubPage` | `/coldpro/hub-de-testes` | Hub de testes com **20 abas** analíticas |
| `SimulationPage` | `/coldpro/simulation` | Simulação de ciclo completo |
| `OperatingMapPage` | `/coldpro/operating-map` | Mapa de operação do compressor |
| `AssemblyPage` | `/coldpro/assembly` | Montagem e BOM de equipamento |
| `ApplicationEngineeringPage` | `/coldpro/application-engineering` | Engenharia de aplicação — stepper 4 etapas |
| `AgroWorkspacePage` | `/coldpro/agro` | Workspace para câmaras agrícolas |
| `PerformanceCurvePage` | `/coldpro/curve` | Curvas de desempenho de produto |
| `ExportPage` | `/coldpro/export` | Exportação de laudos e desenhos |

**Stores Zustand:**

| Store | Arquivo | Responsabilidade |
|-------|---------|-----------------|
| `useTestHubStore` | `stores/useTestHubStore.ts` | Estado completo do Hub de Testes (20 abas, resultados, configurações) |
| `useSessionStore` | `stores/useSessionStore.ts` | Sessão do usuário — **persiste em localStorage** (middleware `persist`) |
| `useComponentStore` | `stores/useComponentStore.ts` | Componentes selecionados (compressor, evaporador, condensador) |
| `useAppEngineeringStore` | `pages/application-engineering/store/` | Estado do stepper de Engenharia de Aplicação (4 etapas) |

---

#### 3.1.1 Módulo de Engenharia de Aplicação

**Localização:** `src/modules/coldpro/pages/application-engineering/`

O módulo implementa um fluxo guiado de 4 etapas sequenciais para dimensionamento completo de sistemas de refrigeração, substituindo a estrutura anterior de abas flat.

```
application-engineering/
├── ApplicationEngineeringPage.tsx   ← orquestrador com stepper visual
├── store/
│   └── useAppEngineeringStore.ts    ← estado das 4 etapas (Zustand)
├── types/
│   └── app-engineering.types.ts     ← CapacityCurvePoint, Step1/2/3 types
├── services/
│   ├── capacityCurveService.ts      ← evalEN12900 → generateCapacityCurve
│   ├── evaporatorDimensioningService.ts  ← wraps calculateCoilAdvanced
│   ├── condenserDimensioningService.ts   ← wraps calculateCoilAdvanced
│   └── __tests__/
│       └── capacityCurveService.test.ts  ← 4 testes com coef. reais 4BES-9Y
└── components/
    ├── CapacityCurvePanel.tsx       ← Recharts Q(Te) e W(Te) + slider ponto
    ├── Step1CompressorPanel.tsx     ← refrigerante + BITZER picker + curva EN12900
    ├── Step2EvaporatorPanel.tsx     ← 753 geometrias + Ziehl-Abegg + dimensionamento
    ├── Step3CondenserPanel.tsx      ← idem para condensador
    └── Step4HubPanel.tsx            ← alimenta Hub + 5 abas + botão PDF
```

**Fluxo das 4 etapas:**

| Etapa | Função | Habilita a próxima quando |
|-------|--------|--------------------------|
| 1 — Compressor | Seleciona refrigerante + compressor BITZER, exibe curva EN12900, confirma ponto Te/Tc | Ponto de projeto confirmado |
| 2 — Evaporador | Seleciona geometria (753) + ventilador Ziehl-Abegg + calcula Q_evap vs Q_req | Q_evap ≥ Q_req (status OK) |
| 3 — Condensador | Seleciona geometria + ventilador + calcula Q_cond vs Q_rej | Q_cond ≥ Q_rej (status OK) |
| 4 — Simulação | Sincroniza `useTestHubStore` + executa 4 análises + 5 abas de resultado | — |

**Regras de campo (armadilhas confirmadas):**

```typescript
// CoilAdvancedInput — pitches em METROS, não mm
tube_outer_diameter_m: geometry.tubeOuterDiameterMm / 1000,
tube_pitch_transverse_m: geometry.tubePitchTransverseMm / 1000,

// FanPickerItem — campo em snake_case
const totalAirflow = fan.airflow_m3h * fanCount;  // ← NÃO airflowM3h

// CompressorCalibrationPoint — pwr_coeffs, NÃO pow_coeffs
const cap = row.calibration_points[0].cap_coeffs;
const pwr = row.calibration_points[0].pwr_coeffs;

// CoilAdvancedResult
result.capacity_w   // ← NÃO q_total_w
result.u_w_m2k      // ← NÃO u_overall_wm2k
```

---

### 3.2 Módulo `coldpro_v2` — Motor Principal de Cálculo Térmico

**Localização:** `src/modules/coldpro_v2/`

O `coldpro_v2` é o **coração matemático** do sistema. Contém todos os motores de transferência de calor, queda de pressão, eficiência de aleta, psicrometria e solvers iterativos.

**Estrutura de engines:**

```
coldpro_v2/engines/
├── core/               ← Primitivas matemáticas (LMTD, NTU, U_global, Re, Pr...)
├── airSide/            ← Propriedades e transferência de calor lado ar
│   ├── airProperties.ts      ← suporta ar úmido via RH opcional (Hyland-Wexler)
│   └── airHeatTransfer.ts
├── fluidSide/          ← Propriedades e transferência de calor lado fluido
├── psychrometrics/     ← Shim sobre cn_coils/engine_v2/psychrometrics (Hyland-Wexler)
├── solver/             ← Solvers iterativos (acoplado e por circuito)
├── equilibrium/        ← Equilíbrio sistema-compressor
├── polynomial/         ← Avaliação de polinômios EN 12900 / ARI 540
├── performance/        ← Curvas de desempenho de produto
├── defrost/            ← Análise de degelo
├── electrical/         ← Cálculo elétrico (corrente, potência)
├── circuit/            ← Análise de circuitagem de refrigerante
├── operation/          ← Análise de operação em regime parcial
├── map/                ← Mapa de carga e envelope de operação
├── analysis/           ← Análise comparativa de configurações
├── validation/         ← Validação de parâmetros de entrada
├── startup/            ← Análise de partida do compressor
├── subcooling/         ← Sub-resfriamento e injeção de líquido
├── control/            ← Lógica de controle (termostato, pressostato)
├── agro/               ← Aplicações agrícolas (pré-resfriamento)
├── progressive/        ← Solver progressivo (regime transitório simplificado)
├── wizard/             ← Assistente de dimensionamento guiado
└── architecture/       ← Padrões arquiteturais do motor
```

---

### 3.3 Módulo `cn_coils` — Workspace de Dimensionamento de Serpentinas

**Localização:** `src/modules/cn_coils/`

O módulo `cn_coils` implementa o workspace de dimensionamento detalhado de serpentinas aletadas, incluindo o motor de correlação de Wang-Chi-Chang (2000) para coeficiente convectivo do ar, o motor de ciclo termodinâmico e o solver fileira-por-fileira.

**Componentes reutilizáveis críticos:**

| Componente | Props relevantes | Comportamento |
|-----------|-----------------|---------------|
| `CompressorPickerModal` | `open, onClose, onSelect?` | Busca no catálogo BITZER |
| `GeometryPickerModal` | `open, onClose, componentType?` | **Sem `onSelect`** — salva em `useCnCoilsSimulationStore.selectedGeometry` |
| `FanPickerModal` | `open, onClose, fans, onConfirm?` | Requer `fans` via `useEnrichedFanPickerItems` |
| `GeometryEditorModal` | `open, onClose` | Cadastro de nova geometria |

**Hooks:**

| Hook | Retorno | Uso |
|------|---------|-----|
| `useEnrichedFanPickerItems` | `{ items: FanPickerItem[], loading, error }` | Alimenta `FanPickerModal` |
| `useZiehlAbeggFanPickerItems` | `{ items, loading }` | Catálogo Ziehl-Abegg direto |

**Engines do cn_coils:**

| Engine | Arquivo | Função |
|--------|---------|--------|
| Motor principal V1 | `engine/simulatorCore.ts` | Motor original (legado — **não importar diretamente**) |
| Motor principal V2 | `engine_v2/simulatorCoreV2.ts` | Motor unificado com correções |
| Adaptador | `engine/simulatorCoreAdapter.ts` | **Usar sempre este** — delega ao motor correto |
| Wang-Chi-Chang | `engine/wangChiChang.ts` | Correlação h_ar para aletas planas/onduladas/louver |
| Psicrometria Hyland-Wexler | `engine_v2/psychrometrics/` | Implementação canônica ASHRAE 2017 |
| Ciclo termodinâmico | `engines/cycle/cycleEngine.ts` | Ciclo completo com 4 pontos P-h |
| Solver fileira-por-fileira | `engines/rowByRow/rowByRowEngine.ts` | Análise por fileira com variação de título |

---

### 3.4 Módulo `coldpro_catalog` — Seleção de Componentes

**Localização:** `src/modules/coldpro_catalog/`

Módulo responsável pela seleção de compressores, válvulas de expansão e propriedades de fluidos a partir dos catálogos BITZER e Danfoss.

**Funções principais:**

```typescript
import {
  getCompressorById,    // async → CompressorCatalogRow (com calibration_points)
  loadCompressorSpec,   // async → CompressorSpec (com ari540_capacity_coefficients)
  filterCompressors,    // async, filtros por refrigerante, série, modelo
} from "@/modules/coldpro_catalog/data/compressorCatalog.service";

// Como extrair coeficientes EN12900
const row = await getCompressorById("4BES-9Y");
const cap_coeffs = row.calibration_points[0].cap_coeffs;  // number[10]
const pwr_coeffs = row.calibration_points[0].pwr_coeffs;  // number[10] ← NÃO pow_coeffs
```

---

## 4. Motores de Cálculo

### 4.1 Constantes Físicas Canônicas

**Arquivo:** `src/lib/physicalConstants.ts`

Todas as constantes físicas do sistema são importadas deste arquivo único. **Nunca use valores hardcoded.**

```typescript
export const W_PER_TR = 3516.8528;       // ASHRAE: 1 TR = 12 000 BTU/h ÷ 3,41214
export const KCALH_PER_KW = 859.845;     // 1 kW = 859,845 kcal/h
export const KCALH_PER_TR = 3024.0;      // 1 TR = 3 024 kcal/h
export const KCALH_PER_BTUH = 0.251996;  // 1 BTU/h = 0,252 kcal/h
export const P_ATM_SEA_LEVEL_PA = 101_325;
export const R_AIR_J_KGK = 287.058;
```

> **Nota:** O valor correto de 1 TR é **3516,8528 W** (ASHRAE). Valores incorretos como 3517 ou 3517,2 foram corrigidos em todos os arquivos em maio/2026.

### 4.2 Fluxo de Cálculo Principal — Serpentina

```
Entrada (geometria + condições)
        ↓
1. Propriedades do ar (T, RH, altitude) → Hyland-Wexler se RH fornecido
        ↓
2. Geometria da face frontal (área de face, velocidade de face)
        ↓
3. Correlação Wang-Chi-Chang → h_ar [W/(m²·K)]
        ↓
4. Eficiência de aleta Schmidt (1949) → η_fin [-]
        ↓
5. Área externa total (tubo nu + aletas) → A_total [m²]
        ↓
6. Coeficiente do fluido (Chen/Nusselt/Gnielinski) → h_ref [W/(m²·K)]
        ↓
7. Resistência de parede → R_wall [m²·K/W]
        ↓
8. Coeficiente global → U = 1/(1/h_ar·η + R_wall + 1/h_ref) [W/(m²·K)]
        ↓
9. LMTD ou NTU-ε → Q_calculado [W]
        ↓
10. Solver iterativo (convergência ΔT < 0,01°C)
        ↓
Saída (capacity_w, u_w_m2k, air_pressure_drop_pa, fin_efficiency, ...)
```

### 4.3 Solver Iterativo (`iterativeCoilSolver.ts`)

O solver iterativo resolve o sistema de equações acopladas entre o lado do ar e o lado do fluido refrigerante. O critério de convergência é `|ΔT_saída_ar| < 0,01 °C` com máximo de 50 iterações.

### 4.4 Solver Acoplado (`coupledCoilSolver.ts`)

O solver acoplado resolve simultaneamente o balanço de energia do lado do ar e do fluido refrigerante, considerando psicrometria completa (serpentina seca/úmida/transição), eficiência de aleta corrigida para ar úmido e variação de propriedades ao longo dos circuitos.

### 4.5 Motor de Ciclo Termodinâmico (`cycleEngine.ts`)

Calcula o ciclo de refrigeração por compressão de vapor com 4 pontos no diagrama P-h:

| Ponto | Estado | Descrição |
|-------|--------|-----------|
| 1 | Vapor superaquecido | Saída do evaporador / entrada do compressor |
| 2 | Vapor superaquecido | Saída do compressor / entrada do condensador |
| 3 | Líquido sub-resfriado | Saída do condensador / entrada da válvula |
| 4 | Mistura bifásica | Saída da válvula / entrada do evaporador |

### 4.6 Motor de Análise de Gelo (`frost`)

Modela a formação de gelo na superfície da serpentina evaporadora com base na temperatura da superfície, umidade do ar e tempo de operação. Calcula a redução progressiva de U e o aumento de ΔP ao longo do ciclo.

### 4.7 Avaliação de Polinômios EN 12900 (`capacityCurveService.ts`)

```typescript
// Fórmula EN 12900 / ARI 540 — 10 coeficientes
Y = C₁ + C₂·Te + C₃·Tc + C₄·Te² + C₅·Te·Tc + C₆·Tc²
  + C₇·Te³ + C₈·Tc·Te² + C₉·Te·Tc² + C₁₀·Tc³

// Onde Y = capacidade (W) ou potência (W), Te e Tc em °C
```

O serviço `generateCapacityCurve` gera séries de pontos (Q, W, COP) × Te para múltiplos valores de Tc, excluindo automaticamente pontos fisicamente inválidos (Q ≤ 0 ou W ≤ 0).

---

## 5. Correlações e Metodologias Matemáticas

### 5.1 Coeficiente Convectivo do Ar — Wang-Chi-Chang (2000)

**Arquivo:** `src/modules/cn_coils/engine/wangChiChang.ts`

A correlação de Wang, Chi e Chang (2000) para aletas planas é a correlação primária para cálculo do coeficiente de transferência de calor do lado do ar em serpentinas aletadas de tubos circulares. É válida para:

- Diâmetro externo do tubo: 6,35 mm ≤ D_o ≤ 12,7 mm
- Passo de aleta: 1,0 mm ≤ F_p ≤ 8,7 mm
- Número de fileiras: 1 ≤ N ≤ 6
- Reynolds de aleta: 1.000 ≤ Re_Dc ≤ 10.000

Para condensadores com passo de aleta ≤ 2,5 mm, o sistema usa a correlação de **Rich (1975)**.

### 5.2 Eficiência de Aleta — Schmidt (1949)

**Arquivo:** `src/modules/coldpro_v2/engines/core/finEfficiency.ts`

A eficiência de aleta circular equivalente é calculada pelo método de Schmidt (1949), que converte a geometria real da aleta em um raio equivalente `r_eq`:

```
r_eq/r_o = 1,27 · (M/r_o) · (L/M - 0,3)^0,5
η_fin = tanh(m · L_c) / (m · L_c),  onde m = √(2·h_ar / (k_fin·t_fin))
```

### 5.3 Queda de Pressão Bifásica — Müller-Steinhagen & Heck (1986)

**Arquivo:** `src/modules/coldpro_v2/engines/core/pressureDrop.ts`

```
(dP/dz)_TP = G·(1-x)^(1/3) + B·x³
onde G = (dP/dz)_L + 2·[(dP/dz)_G - (dP/dz)_L]·x
     B = (dP/dz)_G
```

### 5.4 Coeficiente de Evaporação — Chen (1966)

**Arquivo:** `src/modules/coldpro_v2/engines/fluidSide/twoPhaseHeatTransfer.ts`

```
h_TP = S·h_nb + F·h_cb
```

Combina contribuições de ebulição nucleada (Forster-Zuber) e convecção forçada (Dittus-Boelter).

### 5.5 Coeficiente de Condensação — Nusselt (1916)

```
h_cond = 0,725·[ρ_L·(ρ_L-ρ_G)·g·k_L³·h_fg / (μ_L·D_i·ΔT)]^(1/4)
```

### 5.6 Vazão Mássica de Refrigerante — Balanço com Δx

```
ṁ_ref = Q_evap / (h_fg · Δx)
Δx = 0,70 (evaporadores)  |  Δx = 0,90 (condensadores)
```

### 5.7 Psicrometria — Hyland-Wexler (ASHRAE 2017)

**Arquivo canônico:** `src/modules/cn_coils/engine_v2/psychrometrics/`
**Shim de compatibilidade:** `src/modules/coldpro_v2/engines/psychrometrics/psychrometricCore.ts`

Todas as propriedades do ar úmido são calculadas pelas equações de Hyland-Wexler (ASHRAE Handbook of Fundamentals, 2017). O módulo `coldpro_v2` usa um shim de compatibilidade que delega para a implementação canônica do `cn_coils/engine_v2/psychrometrics`, garantindo precisão melhor que 0,1% na faixa de -40°C a +60°C.

A função `calculateAirProperties` aceita `relative_humidity` e `altitude_m` opcionais para cálculo com ar úmido:

```typescript
// Modo seco (retrocompatível)
calculateAirProperties(25)

// Modo úmido (Hyland-Wexler)
calculateAirProperties(25, 0.65, 800)  // T=25°C, RH=65%, altitude=800m
```

### 5.8 Área Externa Total — Tubo Nu + Aletas

```
A_total = A_bare + A_fin
A_bare = π·D_o·(F_p - t_fin)·N_fins·N_tubes_total
A_fin  = 2·(A_fin_face - A_holes)·N_fins
```

---

## 6. Catálogos de Dados

Todos os catálogos estão em `public/data/catalogs/` e são carregados em tempo de execução pelo browser. Nenhum catálogo é compilado no bundle.

| Arquivo | Conteúdo | Registros |
|---------|----------|-----------|
| `compressors.json` | Dados cadastrais de compressores BITZER | ~200 |
| `compressorCapacityPolynomials.json` | Polinômios EN 12900 — capacidade frigorífica | ~200 |
| `compressorPowerPolynomials.json` | Polinômios EN 12900 — potência absorvida | ~200 |
| `compressorCurrentPolynomials.json` | Polinômios EN 12900 — corrente elétrica | ~200 |
| `geometries.json` | Geometrias de serpentinas aletadas | **753** |
| `coilGeometries.json` | Geometrias CN COLD proprietárias | — |
| `coilCorrectionCoefficients_principal.json` | Coeficientes de correção por série CN COLD | 115 |
| `fans.json` | Dados de ventiladores axiais e centrífugos Ziehl-Abegg | — |
| `expansionValves.json` | Catálogo de válvulas TEV Danfoss | — |
| `distributorComplete.json` | Distribuidores de refrigerante | — |

### 6.1 Geometrias CN Lantery

| Código | Sigla | Tipo | D_o (mm) | P_t (mm) | P_l (mm) |
|--------|-------|------|----------|----------|----------|
| 169 | Lantery EVP | Evaporador DX | 13,3 | 31,75 | 27,5 |
| 176 | Lantery COND | Condensador | 10,3 | 25,4 | 22,0 |
| 230 | Lantery RESF | Resfriador | 16,4 | 60,0 | 30,0 |

### 6.2 Ventiladores Ziehl-Abegg

| Família | Diâmetros (mm) | Aplicação típica |
|---------|---------------|-----------------|
| FE | 300–800 | Evaporadores industriais |
| FK | 400–1000 | Condensadores |
| FC | 250–630 | Câmaras frias |
| RH | 200–500 | Resfriadores de ar |

Acesso via `useEnrichedFanPickerItems()` → `{ items: FanPickerItem[], loading, error }`.

---

## 7. Banco de Dados (Supabase)

O sistema usa **Supabase** (PostgreSQL gerenciado) para persistência de projetos, configurações e dados de usuário.

### Tabelas Principais

| Tabela | Descrição |
|--------|-----------|
| `profiles` | Perfil do usuário (nome, empresa, cargo) |
| `user_roles` | Papéis do usuário (admin, engineer, operator) |
| `user_preferences` | Preferências de UI e unidades |
| `module_permissions` | Permissões de acesso por módulo |
| `projects` | Projetos de dimensionamento salvos |
| `cycle_simulations` | Simulações de ciclo salvas |
| `evaporators` | Configurações de evaporadores salvos |
| `condensers` | Configurações de condensadores salvos |
| `compressors` | Compressores customizados do usuário |
| `fans` | Ventiladores customizados do usuário |
| `fans_catalog` | Catálogo de ventiladores do sistema |
| `refrigerants` | Fluidos refrigerantes customizados |
| `equipment_test_bench_configs` | Configurações da bancada de testes por equipamento |

### Autenticação

O sistema usa **Lovable Cloud Auth** integrado ao Supabase Auth. O controle de acesso por módulo é feito via a tabela `module_permissions`, consultada na inicialização da sessão.

---

## 8. Rotas e Navegação

O sistema usa **TanStack Router** com rotas baseadas em arquivos (`src/routes/_app/`). O arquivo `src/routeTree.gen.ts` é **gerado automaticamente** — nunca edite manualmente exceto para adicionar novas rotas ao `addChildren`.

### Mapa de Rotas

| Rota | Componente | Módulo |
|------|-----------|--------|
| `/coldpro` | `DashboardPage` | coldpro |
| `/coldpro/hub-de-testes` | `TestHubPage` | coldpro |
| `/coldpro/simulation` | `SimulationPage` | coldpro |
| `/coldpro/application-engineering` | `ApplicationEngineeringPage` | coldpro |
| `/coldpro/operating-map` | `OperatingMapPage` | coldpro |
| `/coldpro/assembly` | `AssemblyPage` | coldpro |
| `/coldpro/curve` | `PerformanceCurvePage` | coldpro |
| `/coldpro/export` | `ExportPage` | coldpro |
| `/coldpro/frost` | `FrostAnalysisPage` | cn_coils |
| `/coldpro/cycle` | `CycleWorkspacePage` | cn_coils |
| `/coldpro/optimization` | `OptimizationPage` | cn_coils |
| `/coldpro/cn-coils/workspace` | `CnCoilsWorkspacePage` | cn_coils |
| `/coldpro/cncoils/workspace` | `EvaporatorUnifiedWorkspacePage` | cn_coils |
| `/coldpro/catalog` | `ComponentSelectorPage` | coldpro_catalog |
| `/coldpro/test-bench/:equipmentId` | `TestBenchPage` | coldpro_catalog |
| `/coldpro/agro` | `AgroWorkspacePage` | coldpro |
| `/coldpro/unilab` | Workspace UNILAB | coldpro_v2 |
| `/coldpro/audit` | Auditoria de cálculos | coldpro |
| `/coldpro/settings` | Configurações | coldpro |

---

## 9. Testes Automatizados

O sistema usa **Vitest** com configuração em `vitest.coldpro.config.ts`. Os testes cobrem os motores de cálculo críticos com valores de referência validados contra literatura técnica.

### Configuração do Vitest

```typescript
// vitest.coldpro.config.ts
export default defineConfig({
  test: { environment: 'jsdom', globals: true },
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  // ↑ alias @/ OBRIGATÓRIO — sem ele todos os imports @/modules/... falham
});
```

### Suítes de Teste por Módulo

| Módulo | Arquivo de teste | O que testa |
|--------|-----------------|-------------|
| `coldpro_v2` | `exchange-area-validation.test.ts` | Área de troca com aletas |
| `coldpro_v2` | `coupled-solver-validation.test.ts` | Solver acoplado (convergência) |
| `coldpro_v2` | `testHub.test.ts` | Motor do Hub de Testes |
| `cn_coils` | `wangChiChang.test.ts` | Correlação Wang-Chi-Chang e Rich-1975 |
| `cn_coils` | `refrigerantProperties.test.ts` | Propriedades de refrigerantes |
| `cn_coils` | `cycleEngine.test.ts` | Motor de ciclo termodinâmico |
| `cn_coils` | `rowByRowEngine.test.ts` | Solver fileira-por-fileira |
| `cn_coils` | `fluidVelocity.test.ts` | Velocidade do fluido refrigerante |
| `coldpro_catalog` | `compressorSelector.test.ts` | Seleção de compressor por Te/Tc |
| `app-engineering` | `capacityCurveService.test.ts` | Avaliação polinômios EN12900 (4BES-9Y) |

### Executar os Testes

```bash
pnpm exec vitest run                           # todos
pnpm exec vitest run src/modules/coldpro_v2   # por módulo
pnpm exec vitest run --coverage                # com cobertura
```

---

## 10. Guia de Atualização e Contribuição

### 10.1 Pré-requisitos

```bash
node --version  # >= 22.0.0
pnpm --version  # >= 9.0.0

pnpm install    # instalar dependências
pnpm dev        # servidor de desenvolvimento
pnpm build      # build de produção
```

### 10.2 Regras Fundamentais

**Nunca edite diretamente:**
- `src/routeTree.gen.ts` — gerado automaticamente pelo TanStack Router
- `src/integrations/supabase/types.ts` — gerado pelo Supabase CLI
- `src/modules/cn_coils/engine/simulatorCore.ts` — usar `simulatorCoreAdapter` sempre

**Sempre faça:**
- Escreva testes antes de modificar qualquer motor de cálculo
- Valide resultados contra referências bibliográficas (Seção 12)
- Importe constantes físicas de `src/lib/physicalConstants.ts` — nunca hardcode `3516`, `3517`, `859`, etc.
- Execute `npx tsc --noEmit` antes de commit para verificar tipos
- Execute `pnpm exec vitest run` antes de commit

### 10.3 Como Adicionar um Novo Motor de Cálculo

1. **Crie o arquivo** em `src/modules/coldpro_v2/engines/<categoria>/<nome>.ts`
2. **Documente a correlação** no cabeçalho com referência bibliográfica completa
3. **Exporte interfaces** de entrada e saída com tipos TypeScript estritos (sem `any`)
4. **Escreva o teste** com valor de referência de literatura publicada
5. **Importe no motor principal** via `coilCalculationEngine.ts`

**Cabeçalho obrigatório:**

```typescript
/**
 * nomeDaCorrelacao.ts — [Autor] ([Ano])
 *
 * Referência: [Autor, A.B.] ([Ano]). [Título]. [Periódico], [vol], [pp]. DOI: [doi]
 *
 * Faixa de validade:
 *   [param]: [min] ≤ X ≤ [max]
 *
 * Unidades: SI (m, kg, s, K, Pa, W)
 */
```

### 10.4 Como Adicionar uma Nova Rota

1. **Crie o arquivo** em `src/routes/_app/coldpro.<nome-da-rota>.tsx`
2. **Crie a página** em `src/modules/<modulo>/pages/<NomeDaPagina>.tsx`
3. **Adicione ao `routeTree.gen.ts`** nos três blocos: import, interface, addChildren
4. **Adicione ao Sidebar** em `src/modules/coldpro/components/layout/Sidebar.tsx`

### 10.5 Fluxo de Git

```bash
git checkout -b feat/nome-da-feature
# ... desenvolver ...
npx tsc --noEmit && pnpm exec vitest run
git commit -m "feat(modulo): descrição da mudança"
git push origin feat/nome-da-feature
```

**Convenção de commits:**

| Prefixo | Uso |
|---------|-----|
| `feat(modulo):` | Nova funcionalidade |
| `fix(modulo):` | Correção de bug |
| `fix(engine):` | Correção de motor de cálculo |
| `refactor(modulo):` | Refatoração sem mudança de comportamento |
| `test(modulo):` | Adição ou correção de testes |
| `docs:` | Atualização de documentação |
| `chore:` | Manutenção (deps, config) |

---

## 11. Histórico de Correções Críticas

Esta seção documenta todas as correções matemáticas e de engenharia aplicadas nos motores de cálculo.

### Correções de Maio/2026 — Sprint 1–8 (Motores Físicos)

| ID | Arquivo | Bug | Correção | Impacto |
|----|---------|-----|----------|---------|
| C1 | `coilDerivedMetrics.ts` | `ṁ = Q/h_fg` assumia `x=1` | `ṁ = Q/(h_fg·Δx)` com `Δx=0,70` (evap) | Subestimava vazão em ~30% |
| C2 | `coilDerivedMetrics.ts` | Void fraction de Zivi com `rho*0.06` | Correlação de Zivi (1964) correta | Erro de ~15% no void fraction |
| C3 | `pressureDrop.ts` | Darcy monofásico para todo o circuito | Müller-Steinhagen & Heck (1986) bifásico | Subestimava ΔP em ~40% |
| C4 | `finEfficiency.ts` | `L_c = 0,01 m` fixo | Schmidt (1949) com geometria real | Erro de ±20% na eficiência |
| C5 | `wetCoil.ts` | `T_surf = T_evap + 2°C` fixo | Iteração NTU acoplada | Não convergia fora do projeto |
| C6 | `coilCalculationEngine.ts` | `v = ṁ/1000` (constante arbitrária) | `v = ṁ/(ρ·A)` com densidade real | Velocidade fisicamente impossível |
| C7 | `simulatorCoreV2.ts` | `fluidVelocityMs` ausente no resultado | Campo incluído no objeto de saída | Resultado incompleto |
| C8 | `finnedExternalArea.ts` | Arquivo inexistente | Criado com A_bare + A_fin | Motor usava área estimada |
| C9 | `vitest.coldpro.config.ts` | Alias `@/` ausente | `resolve.alias` adicionado | 3 suítes de teste falhavam |

### Correções de Maio/2026 — Auditoria Técnica (Sessão atual)

| ID | Arquivo(s) | Bug | Correção |
|----|-----------|-----|----------|
| C10 | `CapacityDisplay.tsx` + 7 arquivos | TR hardcoded como 3517 ou 3517.2 | `W_PER_TR = 3516.8528` via `physicalConstants.ts` (ASHRAE) |
| C11 | `cn_coils/index.ts`, `CnCoilsWorkspacePage.tsx` | Imports diretos do `simulatorCore` deprecated | Substituídos por `simulatorCoreAdapter` |
| C12 | `useSessionStore.ts` | Sessões perdidas ao recarregar a página | Middleware `persist` do Zustand adicionado com `partialize` |
| C13 | `psychrometricCore.ts` (coldpro_v2) | Magnus approximation local com ~0,8% de erro a -30°C | Reescrito como shim sobre Hyland-Wexler canônico (`cn_coils/engine_v2/psychrometrics`) |
| C14 | `airProperties.ts` (coldpro_v2) | Calculava propriedades apenas para ar seco | Adicionado suporte a ar úmido via `relative_humidity?: number` e `altitude_m?: number` |
| C15 | `Step2EvaporatorPanel.tsx`, `Step3CondenserPanel.tsx` | `fan.airflowM3h` (camelCase) — campo não existe | Corrigido para `fan.airflow_m3h` (snake_case conforme `FanPickerItem`) |

### Centralização de Constantes Físicas (C10)

**Arquivo criado:** `src/lib/physicalConstants.ts`

Eliminou 4 definições duplicadas de `KCALH_PER_KW` e 6 usos hardcoded de `3517`. Todos os módulos importam de um único ponto de verdade.

---

## 12. Referências Bibliográficas

| # | Referência | Correlação |
|---|-----------|-----------|
| 1 | Wang, C.-C., Chi, K.-Y., & Chang, C.-J. (2000). Heat transfer and friction characteristics of plain fin-and-tube heat exchangers. *Int. J. Heat Mass Transfer*, 43(15), 2693–2700. | h_ar aletas planas |
| 2 | Rich, D.G. (1975). The effect of fin spacing on the heat transfer and friction performance of multi-row, smooth plate fin-and-tube heat exchangers. *ASHRAE Transactions*, 81(1), 137–145. | h_ar condensadores (F_p ≤ 2,5 mm) |
| 3 | Schmidt, T.E. (1949). Heat transfer calculations for extended surfaces. *Refrigerating Engineering*, 57(4), 351–357. | Eficiência de aleta circular |
| 4 | Müller-Steinhagen, H., & Heck, K. (1986). A simple friction pressure drop correlation for two-phase flow in pipes. *Chemical Engineering and Processing*, 20(6), 297–308. | ΔP bifásico |
| 5 | Chen, J.C. (1966). Correlation for boiling heat transfer to saturated fluids in convective flow. *Ind. Eng. Chem. Process Des. Dev.*, 5(3), 322–329. | h_evap bifásico |
| 6 | Nusselt, W. (1916). Die Oberflächenkondensation des Wasserdampfes. *Z. Ver. Dtsch. Ing.*, 60, 541–575. | h_cond em filme |
| 7 | Zivi, S.M. (1964). Estimation of steady-state steam void-fraction by means of the principle of minimum entropy production. *J. Heat Transfer*, 86(2), 247–252. | Void fraction bifásico |
| 8 | Incropera, F.P. et al. (2011). *Fundamentals of Heat and Mass Transfer* (7th ed.). Wiley. | NTU-ε, LMTD, Nusselt |
| 9 | ASHRAE. (2017). *Handbook — Fundamentals*, Chapter 1: Psychrometrics. | Psicrometria Hyland-Wexler |
| 10 | ASHRAE. (2022). *Handbook — Refrigeration*, Chapter 1: Halocarbons. | Propriedades de refrigerantes |
| 11 | EN 12900:2013. *Refrigerant compressors — Rating conditions, tolerances and presentation of manufacturer's performance data*. CEN. | Polinômios EN 12900 |
| 12 | AHRI Standard 540 (2020). *Performance Rating of Positive Displacement Refrigerant Compressors*. AHRI. | Polinômios ARI 540 |
| 13 | Gnielinski, V. (1976). New equations for heat and mass transfer in turbulent pipe and channel flow. *Int. Chem. Eng.*, 16(2), 359–368. | h_fluido monofásico |
| 14 | Dittus, F.W., & Boelter, L.M.K. (1930). Heat transfer in automobile radiators. *UC Pub. Engineering*, 2(13), 443–461. | h_fluido turbulento |
| 15 | Hyland, R.W., & Wexler, A. (1983). Formulations for the thermodynamic properties of the saturated phases of H₂O from 173.15 K to 473.15 K. *ASHRAE Trans.*, 89(2A), 500–519. | Pressão de saturação (psicrometria) |

---

*Documento atualizado em maio/2026 — versão 2.0. Para atualizações, edite este arquivo e faça commit com `docs: atualiza README técnico`.*
