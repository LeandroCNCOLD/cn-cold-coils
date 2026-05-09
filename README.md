# CN COLD Engenharia — Plataforma de Simulação Termodinâmica

> **Repositório:** `cncoldengenharia-ab93b0e6`  
> **Versão do documento:** 1.0 — Maio 2026  
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

A plataforma **CN COLD Engenharia** é um sistema web de engenharia de refrigeração industrial desenvolvido para a linha de produtos **CN COLD** (câmaras frias, resfriadores de líquido, condensadores remotos e sistemas de expansão direta). O sistema realiza desde o dimensionamento de serpentinas aletadas até a simulação completa do ciclo de refrigeração por compressão de vapor, integrando catálogos de compressores BITZER, válvulas Danfoss e geometrias proprietárias CN COLD.

O sistema é utilizado por engenheiros de aplicação para:

- Dimensionar e validar serpentinas evaporadoras e condensadoras com geometrias reais da linha CN Lantery e CN Coils.
- Selecionar compressores BITZER pelo ponto de operação (Te, Tc) com avaliação de polinômios EN 12900 / ARI 540.
- Simular o ciclo termodinâmico completo (diagrama P-h, COP, balanço de massa e energia).
- Analisar formação de gelo (frost), operação em mapa de carga, desempenho em regime parcial e psicrometria do ar úmido.
- Exportar laudos técnicos em PDF e DXF para fabricação.

**Métricas do repositório:**

| Indicador | Valor |
|-----------|-------|
| Arquivos TypeScript/TSX | 617 |
| Linhas de código | ~168.500 |
| Suítes de teste (Vitest) | 67 arquivos |
| Testes unitários | 645+ |
| Rotas de navegação | 44 |
| Catálogos JSON | 30+ arquivos |

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
- Gerenciar o estado de sessão do usuário (modo operador, modo engenheiro).
- Orquestrar o **Hub de Testes** — painel central de simulação e validação.
- Hospedar o módulo de **Engenharia de Aplicação** (dimensionamento completo de sistema).

**Páginas principais:**

| Página | Rota | Descrição |
|--------|------|-----------|
| `DashboardPage` | `/coldpro` | Painel inicial com resumo de projetos |
| `TestHubPage` | `/coldpro/hub-de-testes` | Hub de testes com 19 abas analíticas |
| `SimulationPage` | `/coldpro/simulation` | Simulação de ciclo completo |
| `OperatingMapPage` | `/coldpro/operating-map` | Mapa de operação do compressor |
| `AssemblyPage` | `/coldpro/assembly` | Montagem e BOM de equipamento |
| `ApplicationEngineeringPage` | `/coldpro/application-engineering` | Engenharia de aplicação completa |
| `AgroWorkspacePage` | `/coldpro/agro` | Workspace para câmaras agrícolas |
| `PerformanceCurvePage` | `/coldpro/curve` | Curvas de desempenho de produto |
| `ExportPage` | `/coldpro/export` | Exportação de laudos e desenhos |

**Stores Zustand:**

| Store | Responsabilidade |
|-------|-----------------|
| `useTestHubStore` | Estado completo do Hub de Testes (19 abas, resultados, configurações) |
| `useSessionStore` | Sessão do usuário, projeto ativo, modo de operação |
| `useComponentStore` | Componentes selecionados (compressor, evaporador, condensador) |
| `useUserModeStore` | Modo de visualização (operador / engenheiro) |

**Serviços:**

| Serviço | Responsabilidade |
|---------|-----------------|
| `coldproEngineService` | Fachada para chamadas ao motor `coldpro_v2` |
| `catalogService` | Acesso ao catálogo de compressores, ventiladores e geometrias |
| `aiAssistantService` | Diagnóstico termodinâmico com regras embarcadas |
| `libraryService` | Gerenciamento da biblioteca de projetos salvos |

---

### 3.2 Módulo `coldpro_v2` — Motor Principal de Cálculo Térmico

**Localização:** `src/modules/coldpro_v2/`

O `coldpro_v2` é o **coração matemático** do sistema. Contém todos os motores de transferência de calor, queda de pressão, eficiência de aleta, psicrometria e solvers iterativos. É o único módulo que implementa as correlações físicas validadas.

**Estrutura de engines:**

```
coldpro_v2/engines/
├── core/               ← Primitivas matemáticas (LMTD, NTU, U_global, Re, Pr...)
├── airSide/            ← Propriedades e transferência de calor lado ar
├── fluidSide/          ← Propriedades e transferência de calor lado fluido
├── psychrometrics/     ← Psicrometria, serpentina úmida, reaquecimento
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

**Workspaces disponíveis:**

| Workspace | Rota | Tipo de equipamento |
|-----------|------|---------------------|
| `EvaporatorUnifiedWorkspacePage` | `/coldpro/cn-coils/workspace` | Evaporador DX |
| `CondenserWorkspacePage` | — | Condensador remoto |
| `WaterCondenserWorkspacePage` | — | Condensador a água |
| `EvaporativeCondenserWorkspacePage` | — | Condensador evaporativo |
| `HeatingCoilWorkspacePage` | — | Serpentina de aquecimento |
| `CycleWorkspacePage` | `/coldpro/cycle` | Ciclo termodinâmico completo |
| `FrostAnalysisPage` | `/coldpro/frost` | Análise de formação de gelo |
| `OptimizationPage` | `/coldpro/optimization` | Otimização de geometria |
| `CompressorWorkspacePage` | — | Análise de compressor |

**Engines do cn_coils:**

| Engine | Arquivo | Função |
|--------|---------|--------|
| Motor principal V1 | `engine/simulatorCore.ts` | Motor original (legado, mantido para compatibilidade) |
| Motor principal V2 | `engine_v2/simulatorCoreV2.ts` | Motor unificado com correções |
| Adaptador | `engine/simulatorCoreAdapter.ts` | Delega ao motor correto conforme versão |
| Wang-Chi-Chang | `engine/wangChiChang.ts` | Correlação h_ar para aletas planas/onduladas/louver |
| Ciclo termodinâmico | `engines/cycle/cycleEngine.ts` | Ciclo completo com 4 pontos P-h |
| Solver fileira-por-fileira | `engines/rowByRow/rowByRowEngine.ts` | Análise por fileira com variação de título |
| Ciclo adaptador | `engines/coil/coilCycleAdapter.ts` | Integração serpentina-ciclo |
| Otimizador de circuitos | `engine/circuitOptimizer.ts` | Seleção ótima de circuitagem |
| Gerador de relatório | `engine/reportGenerator.ts` | PDF técnico da serpentina |

---

### 3.4 Módulo `coldpro_catalog` — Seleção de Componentes

**Localização:** `src/modules/coldpro_catalog/`

Módulo responsável pela seleção de compressores, válvulas de expansão e propriedades de fluidos a partir dos catálogos UNILAB/VapCyc.

**Engines:**

| Engine | Arquivo | Função |
|--------|---------|--------|
| Seletor de compressor | `engines/compressorSelector.ts` | Avalia polinômios EN 12900 e seleciona por Te/Tc |
| Seletor de válvula TEV | `engines/expansionValveSelector.ts` | Seleciona TEV Danfoss por capacidade e fluido |
| Propriedades de fluidos | `engines/fluidPropertiesEngine.ts` | Propriedades termodinâmicas por polinômios UNILAB |

**Páginas:**

| Página | Rota | Descrição |
|--------|------|-----------|
| `ComponentSelectorPage` | `/coldpro/components` | Seleção de compressor + válvula + ventilador |
| `TestBenchPage` | `/coldpro/test-bench/:equipmentId` | Bancada de testes por equipamento |

---

## 4. Motores de Cálculo

### 4.1 Fluxo de Cálculo Principal

O cálculo de uma serpentina aletada segue o seguinte fluxo:

```
Entrada (geometria + condições)
        ↓
1. Propriedades do ar (temperatura, umidade, densidade, viscosidade)
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
Saída (Q, U, ΔP_ar, ΔP_ref, η_fin, T_saída_ar, título de saída)
```

### 4.2 Solver Iterativo (`iterativeCoilSolver.ts`)

O solver iterativo resolve o sistema de equações acopladas entre o lado do ar e o lado do fluido refrigerante, convergindo para o ponto de equilíbrio térmico. O critério de convergência é `|ΔT_saída_ar| < 0,01 °C` com máximo de 50 iterações.

**Algoritmo:**
1. Estima temperatura de saída do ar (chute inicial: `T_ar_in - 5°C`).
2. Calcula LMTD com as temperaturas estimadas.
3. Calcula `Q = U × A × LMTD`.
4. Recalcula temperatura de saída do ar via balanço de energia: `T_ar_out = T_ar_in - Q / (ṁ_ar × cp_ar)`.
5. Verifica convergência. Se não convergiu, atualiza estimativa e repete.

### 4.3 Solver Acoplado (`coupledCoilSolver.ts`)

O solver acoplado resolve simultaneamente o balanço de energia do lado do ar e do lado do fluido refrigerante, considerando a variação do título ao longo dos circuitos. É mais preciso que o iterativo simples, pois modela a variação de propriedades do refrigerante ao longo da serpentina.

### 4.4 Motor de Ciclo Termodinâmico (`cycleEngine.ts`)

Calcula o ciclo de refrigeração por compressão de vapor com 4 pontos no diagrama P-h:

| Ponto | Estado | Descrição |
|-------|--------|-----------|
| 1 | Vapor superaquecido | Saída do evaporador / entrada do compressor |
| 2 | Vapor superaquecido | Saída do compressor / entrada do condensador |
| 3 | Líquido sub-resfriado | Saída do condensador / entrada da válvula |
| 4 | Mistura bifásica | Saída da válvula / entrada do evaporador |

**Parâmetros calculados:** COP, capacidade frigorífica, potência do compressor, vazão mássica, título na entrada do evaporador, temperatura de descarga.

### 4.5 Motor de Análise de Gelo (`frost`)

Modela a formação de gelo na superfície da serpentina evaporadora com base na temperatura da superfície do tubo, umidade do ar e tempo de operação. Calcula a redução progressiva do coeficiente de transferência de calor e o aumento da queda de pressão do ar ao longo do ciclo de operação.

---

## 5. Correlações e Metodologias Matemáticas

### 5.1 Coeficiente Convectivo do Ar — Wang-Chi-Chang (2000)

**Arquivo:** `src/modules/cn_coils/engine/wangChiChang.ts`

A correlação de Wang, Chi e Chang (2000) para aletas planas é a correlação primária para cálculo do coeficiente de transferência de calor do lado do ar em serpentinas aletadas de tubos circulares. É válida para:

- Diâmetro externo do tubo: 6,35 mm ≤ D_o ≤ 12,7 mm
- Passo de aleta: 1,0 mm ≤ F_p ≤ 8,7 mm
- Número de fileiras: 1 ≤ N ≤ 6
- Reynolds de aleta: 1.000 ≤ Re_Dc ≤ 10.000

**Equação do fator de Colburn:**

```
j = 0,394 · Re_Dc^(-0,392) · (F_p/D_c)^(-0,0449) · (P_t/P_l)^(1,99) · N^(-0,0897) · F_p^(-0,673) · (F_p/D_c)^(0,0588)
```

O coeficiente h_ar é obtido por: `h_ar = j · ρ_ar · V_max · cp_ar · Pr^(-2/3)`

Para condensadores com passo de aleta ≤ 2,5 mm, o sistema usa a correlação de **Rich (1975)** como alternativa, que apresenta melhor aderência experimental nessa faixa.

### 5.2 Eficiência de Aleta — Schmidt (1949)

**Arquivo:** `src/modules/coldpro_v2/engines/core/finEfficiency.ts`

A eficiência de aleta circular equivalente é calculada pelo método de Schmidt (1949), que converte a geometria real da aleta (passo transversal P_t e longitudinal P_l) em um raio equivalente `r_eq`:

```
r_eq/r_o = 1,27 · (M/r_o) · (L/M - 0,3)^0,5

onde:
  M = (P_t/2)
  L = √(P_t² + P_l²) / 2
  r_o = D_o / 2
```

O comprimento característico da aleta é então: `L_c = r_eq - r_o`

A eficiência é calculada pela equação da aleta anular:

```
η_fin = tanh(m · L_c) / (m · L_c)
onde m = √(2 · h_ar / (k_fin · t_fin))
```

> **Correção crítica aplicada em maio/2026:** A versão anterior usava `L_c = 0,01 m` fixo para todas as geometrias, subestimando a eficiência de aleta em serpentinas com passo transversal menor que 31,75 mm e superestimando em serpentinas com passo maior. A correção implementa o método de Schmidt (1949) com a geometria real de cada serpentina.

### 5.3 Área Externa Total — Tubo Nu + Aletas

**Arquivo:** `src/modules/coldpro_v2/engines/core/finnedExternalArea.ts`

A área externa total é composta por duas parcelas:

```
A_total = A_bare + A_fin

A_bare = π · D_o · (F_p - t_fin) · N_fins · N_tubes_total
A_fin  = 2 · (A_fin_face - A_holes) · N_fins
```

onde `A_fin_face` é a área frontal de uma aleta (P_t × L_tube) e `A_holes` é a área dos furos dos tubos na aleta.

### 5.4 Queda de Pressão Bifásica — Müller-Steinhagen & Heck (1986)

**Arquivo:** `src/modules/coldpro_v2/engines/core/pressureDrop.ts`

Para escoamento bifásico no interior dos tubos, o sistema usa a correlação de Müller-Steinhagen e Heck (1986), que interpola entre os gradientes de pressão monofásicos do líquido e do vapor:

```
(dP/dz)_TP = G · (1 - x)^(1/3) + B · x³

onde:
  G = (dP/dz)_L + 2 · [(dP/dz)_G - (dP/dz)_L] · x
  B = (dP/dz)_G
  x = título de vapor
```

> **Correção crítica aplicada em maio/2026:** A versão anterior usava o fator de Darcy monofásico para toda a extensão da serpentina, independentemente do título. A correção implementa a correlação bifásica de Müller-Steinhagen & Heck (1986) com variação contínua do título ao longo dos circuitos.

### 5.5 Coeficiente de Evaporação — Chen (1966)

**Arquivo:** `src/modules/coldpro_v2/engines/fluidSide/twoPhaseHeatTransfer.ts`

Para o coeficiente de transferência de calor na evaporação bifásica no interior dos tubos, o sistema usa a correlação de Chen (1966), que combina as contribuições de convecção forçada (Dittus-Boelter modificado) e ebulição nucleada (Forster-Zuber):

```
h_TP = S · h_nb + F · h_cb

onde:
  h_nb = coeficiente de ebulição nucleada (Forster-Zuber)
  h_cb = coeficiente de convecção forçada (Dittus-Boelter com fator F)
  S    = fator de supressão da ebulição nucleada
  F    = fator de intensificação da convecção forçada
```

### 5.6 Coeficiente de Condensação — Nusselt (1916)

**Arquivo:** `src/modules/coldpro_v2/engines/fluidSide/twoPhaseHeatTransfer.ts`

Para condensação em filme no interior de tubos horizontais, o sistema usa a correlação de Nusselt (1916) modificada para escoamento interno:

```
h_cond = 0,725 · [ρ_L · (ρ_L - ρ_G) · g · k_L³ · h_fg / (μ_L · D_i · ΔT)]^(1/4)
```

### 5.7 Vazão Mássica de Refrigerante — Balanço com Δx

**Arquivo:** `src/modules/coldpro_v2/engines/core/coilDerivedMetrics.ts`

A vazão mássica de refrigerante é calculada pelo balanço de energia no evaporador considerando a variação real de título:

```
ṁ_ref = Q_evap / (h_fg · Δx)

onde:
  Δx = x_saída - x_entrada
  Δx = 0,70 para evaporadores (x_in ≈ 0,25, x_out ≈ 0,95)
  Δx = 0,90 para condensadores (x_in ≈ 0,95, x_out ≈ 0,05)
```

> **Correção crítica aplicada em maio/2026:** A versão anterior calculava `ṁ = Q / h_fg` assumindo `x = 1` na saída, o que subestimava a vazão mássica em ~30% para evaporadores típicos com título de entrada entre 0,20 e 0,30.

### 5.8 Velocidade do Fluido Refrigerante

**Arquivo:** `src/modules/coldpro_v2/engines/coilCalculationEngine.ts`

A velocidade do fluido no interior dos tubos é calculada pela equação de continuidade com a densidade real do refrigerante na condição bifásica:

```
v = ṁ / (ρ · A_cross)

onde:
  ρ = densidade da mistura bifásica = 1 / (x/ρ_G + (1-x)/ρ_L)
  A_cross = π · D_i² / 4 · N_circuits
```

> **Correção crítica aplicada em maio/2026:** A versão anterior usava `v = ṁ / 1000` (divisão por constante arbitrária), produzindo velocidades fisicamente impossíveis.

### 5.9 Polinômios de Compressor — EN 12900 / ARI 540

**Arquivo:** `src/modules/coldpro_catalog/engines/compressorSelector.ts`

O desempenho do compressor é avaliado por polinômios de 10 coeficientes conforme a norma EN 12900:2013 / ARI 540:

```
Y = C₁ + C₂·Te + C₃·Tc + C₄·Te² + C₅·Te·Tc + C₆·Tc² + C₇·Te³ + C₈·Tc·Te² + C₉·Te·Tc² + C₁₀·Tc³

onde Y pode ser: Q_evap [W], W_shaft [W] ou I [A]
Te e Tc em °C (temperatura de evaporação e condensação)
```

### 5.10 Serpentina Úmida — Iteração NTU

**Arquivo:** `src/modules/coldpro_v2/engines/psychrometrics/wetCoil.ts`

Para serpentinas evaporadoras operando abaixo do ponto de orvalho do ar, o sistema resolve a transferência de calor e massa simultaneamente usando o método NTU com iteração na temperatura de superfície:

```
Iteração:
  1. Estima T_surf
  2. Calcula h_s (entalpia de saturação na T_surf)
  3. Calcula NTU = U·A / (ṁ_ar · cp_ar_úmido)
  4. Calcula ε = 1 - exp(-NTU)
  5. Calcula Q_total = ε · Q_max
  6. Verifica balanço: Q_calculado ≈ Q_entrada
  7. Atualiza T_surf e repete até convergência
```

> **Correção crítica aplicada em maio/2026:** A versão anterior usava `T_surf = T_evap + 2°C` fixo, o que não convergia para condições fora do ponto de projeto. A correção implementa a iteração NTU completa.

### 5.11 Psicrometria — ASHRAE (2017)

**Arquivo:** `src/modules/cn_coils/engine/psychrometrics.ts`

Todas as propriedades do ar úmido são calculadas pelas equações do ASHRAE Handbook of Fundamentals (2017), Capítulo 1:

- Pressão de saturação: equação de Antoine modificada (Magnus-Tetens)
- Umidade específica: `W = 0,622 · p_sat · φ / (p_atm - p_sat · φ)`
- Entalpia: `h = cp_ar · T + W · (h_fg0 + cp_vap · T)`
- Volume específico: equação dos gases ideais com correção de umidade

---

## 6. Catálogos de Dados

Todos os catálogos estão em `public/data/catalogs/` e são carregados em tempo de execução pelo browser. Nenhum catálogo é compilado no bundle — isso permite atualização sem rebuild.

| Arquivo | Conteúdo | Registros |
|---------|----------|-----------|
| `compressors.json` | Dados cadastrais de compressores BITZER | ~200 |
| `compressorCapacityPolynomials.json` | Polinômios EN 12900 — capacidade frigorífica | ~200 |
| `compressorPowerPolynomials.json` | Polinômios EN 12900 — potência absorvida | ~200 |
| `compressorCurrentPolynomials.json` | Polinômios EN 12900 — corrente elétrica | ~200 |
| `compressorOutletTemperature.json` | Temperatura de descarga por ponto de operação | ~200 |
| `geometries.json` | Geometrias de serpentinas aletadas (UNILAB) | 753 |
| `coilGeometries.json` | Geometrias CN COLD proprietárias | — |
| `coilCorrectionCoefficients_principal.json` | Coeficientes de correção por série CN COLD | 115 |
| `cncoilsCoefficients.json` | Coeficientes de correção CN Coils por velocidade | — |
| `fans.json` | Dados de ventiladores axiais e centrífugos | — |
| `fanAxial_type0_config1_principal.json` | Curvas de ventiladores axiais tipo 0 | — |
| `expansionValves.json` | Catálogo de válvulas TEV Danfoss | — |
| `distributorComplete.json` | Distribuidores de refrigerante | — |
| `bomComponents.json` | Componentes BOM (tubos, aletas, coletores) | — |

### 6.1 Geometrias CN Lantery

As geometrias da linha **CN Lantery** são as geometrias proprietárias da CN COLD para serpentinas de câmaras frias. Estão registradas no `geometries.json` com os seguintes códigos:

| Código | Sigla | Tipo | D_o (mm) | P_t (mm) | P_l (mm) | t_fin (mm) |
|--------|-------|------|----------|----------|----------|------------|
| 169 | 133228_C_S F Lantery EVP | Evaporador DX | 13,3 | 31,75 | 27,5 | 0,13 |
| 176 | 102522_C_S Lantery COND | Condensador | 10,3 | 25,4 | 22,0 | 0,13 |
| 230 | 166030_SW_S Lantery RESF | Resfriador | 16,4 | 60,0 | 30,0 | 0,13 |

> **Nota:** Os dados de dimensionamento específicos por modelo de máquina (número de tubos, fileiras, comprimento, circuitos, passo de aleta) são gerenciados no software UNILAB/VapCyc e não estão nos catálogos JSON do repositório. Para simular um modelo específico, esses dados devem ser informados manualmente ou importados via arquivo `.unilab`.

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
| `coil_geometry_overrides` | Sobrescritas de geometria por projeto |
| `equipment_test_bench_configs` | Configurações da bancada de testes por equipamento |

### Autenticação

O sistema usa **Lovable Cloud Auth** (`@lovable.dev/cloud-auth-js`) integrado ao Supabase Auth. O controle de acesso por módulo é feito via a tabela `module_permissions`, consultada na inicialização da sessão.

---

## 8. Rotas e Navegação

O sistema usa **TanStack Router** com rotas baseadas em arquivos (`src/routes/_app/`). O arquivo `src/routeTree.gen.ts` é **gerado automaticamente** pelo plugin `@tanstack/router-plugin` — nunca edite manualmente exceto para adicionar novas rotas ao `addChildren`.

### Mapa de Rotas

| Rota | Componente | Módulo |
|------|-----------|--------|
| `/coldpro` | `DashboardPage` | coldpro |
| `/coldpro/hub-de-testes` | `TestHubPage` | coldpro |
| `/coldpro/simulation` | `SimulationPage` | coldpro |
| `/coldpro/application-engineering` | `ApplicationEngineeringPage` | coldpro |
| `/coldpro/operating-map` | `OperatingMapPage` | coldpro |
| `/coldpro/assembly` | `AssemblyPage` | coldpro |
| `/coldpro/montagem` | `AssemblyPage` (alias) | coldpro |
| `/coldpro/curve` | `PerformanceCurvePage` | coldpro |
| `/coldpro/export` | `ExportPage` | coldpro |
| `/coldpro/frost` | `FrostAnalysisPage` | cn_coils |
| `/coldpro/cycle` | `CycleWorkspacePage` | cn_coils |
| `/coldpro/optimization` | `OptimizationPage` | cn_coils |
| `/coldpro/cn-coils` | `CnCoilsDashboardPage` | cn_coils |
| `/coldpro/cn-coils/workspace` | `CnCoilsWorkspacePage` | cn_coils |
| `/coldpro/cncoils/workspace` | `EvaporatorUnifiedWorkspacePage` | cn_coils |
| `/coldpro/cncoils/systems/cold-room` | Sistema câmara fria | cn_coils |
| `/coldpro/cncoils/systems/dx-complete` | Sistema DX completo | cn_coils |
| `/coldpro/cncoils/systems/heat-pump` | Bomba de calor | cn_coils |
| `/coldpro/cncoils/systems/dehumidification` | Desumidificação | cn_coils |
| `/coldpro/catalog` | `ComponentSelectorPage` | coldpro_catalog |
| `/coldpro/test-bench/:equipmentId` | `TestBenchPage` | coldpro_catalog |
| `/coldpro/agro` | `AgroWorkspacePage` | coldpro |
| `/coldpro/compare` | Comparação de configurações | coldpro_v2 |
| `/coldpro/map` | Mapa de operação | coldpro_v2 |
| `/coldpro/unilab` | Workspace UNILAB | coldpro_v2 |
| `/coldpro/audit` | Auditoria de cálculos | coldpro |
| `/coldpro/settings` | Configurações | coldpro |

---

## 9. Testes Automatizados

O sistema usa **Vitest** com configuração em `vitest.coldpro.config.ts`. Os testes cobrem os motores de cálculo críticos com valores de referência validados contra literatura técnica e dados experimentais.

### Configuração do Vitest

```typescript
// vitest.coldpro.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // ← alias obrigatório
    },
  },
});
```

> **Atenção:** O alias `@/` **deve estar presente** no `vitest.coldpro.config.ts`. Sem ele, todos os testes que importam de `@/modules/...` falham com "Cannot find module". Esse foi um bug corrigido em maio/2026.

### Suítes de Teste por Módulo

| Módulo | Arquivo de teste | O que testa |
|--------|-----------------|-------------|
| `coldpro_v2` | `exchange-area-validation.test.ts` | Área de troca com aletas (4 casos) |
| `coldpro_v2` | `coupled-solver-validation.test.ts` | Solver acoplado (convergência) |
| `coldpro_v2` | `testHub.test.ts` | Motor do Hub de Testes (25 casos) |
| `cn_coils` | `wangChiChang.test.ts` | Correlação Wang-Chi-Chang e Rich-1975 |
| `cn_coils` | `refrigerantProperties.test.ts` | Propriedades de refrigerantes |
| `cn_coils` | `cycleEngine.test.ts` | Motor de ciclo termodinâmico |
| `cn_coils` | `rowByRowEngine.test.ts` | Solver fileira-por-fileira |
| `cn_coils` | `fluidVelocity.test.ts` | Velocidade do fluido refrigerante |
| `coldpro_catalog` | `compressorSelector.test.ts` | Seleção de compressor por Te/Tc |

### Executar os Testes

```bash
# Todos os testes
pnpm exec vitest run

# Com cobertura
pnpm exec vitest run --coverage

# Modo watch (desenvolvimento)
pnpm exec vitest

# Apenas um módulo
pnpm exec vitest run src/modules/coldpro_v2
```

---

## 10. Guia de Atualização e Contribuição

### 10.1 Pré-requisitos

```bash
# Node.js 22+ e pnpm
node --version  # >= 22.0.0
pnpm --version  # >= 9.0.0

# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev

# Build de produção
pnpm build
```

### 10.2 Regras Fundamentais

**Nunca edite diretamente:**
- `src/routeTree.gen.ts` — gerado automaticamente pelo TanStack Router (exceto para adicionar novas rotas ao `addChildren` enquanto o gerador não detecta o arquivo)
- `src/integrations/supabase/types.ts` — gerado pelo Supabase CLI
- Arquivos em `src/modules/coldpro_v2/engines/core/` sem antes escrever um teste

**Sempre faça:**
- Escreva testes antes de modificar qualquer motor de cálculo
- Valide os resultados contra referências bibliográficas (ver Seção 12)
- Documente a correlação usada com referência no cabeçalho do arquivo
- Execute `pnpm exec vitest run` antes de fazer commit
- Mantenha o `vitest.coldpro.config.ts` com o alias `@/` configurado

### 10.3 Como Adicionar um Novo Motor de Cálculo

1. **Crie o arquivo** em `src/modules/coldpro_v2/engines/<categoria>/<nome>.ts`
2. **Documente a correlação** no cabeçalho com referência bibliográfica completa
3. **Exporte as interfaces** de entrada e saída com tipos TypeScript estritos (sem `any`)
4. **Escreva o teste** em `src/modules/coldpro_v2/__tests__/<nome>.test.ts`
5. **Valide contra literatura** — inclua pelo menos um caso de teste com valor de referência publicado
6. **Importe no motor principal** via `coldpro_v2/engines/solver/` ou `coilCalculationEngine.ts`

**Exemplo de cabeçalho obrigatório:**

```typescript
/**
 * nomeDaCorrelacao.ts
 *
 * Implementa a correlação de [Autor] ([Ano]) para [grandeza física].
 *
 * Referência:
 *   [Autor, A.B.] ([Ano]). [Título do artigo/livro]. [Periódico/Editora],
 *   [Volume]([Número]), [páginas]. DOI: [doi]
 *
 * Faixa de validade:
 *   - [parâmetro 1]: [min] ≤ X ≤ [max]
 *   - [parâmetro 2]: [min] ≤ Y ≤ [max]
 *
 * Unidades de entrada: SI (m, kg, s, K, Pa, W)
 * Unidades de saída: SI
 */
```

### 10.4 Como Adicionar uma Nova Rota

1. **Crie o arquivo** em `src/routes/_app/coldpro.<nome-da-rota>.tsx`
2. **Crie a página** em `src/modules/<modulo>/pages/<NomeDaPagina>.tsx`
3. **Adicione ao `routeTree.gen.ts`** nos três blocos obrigatórios:
   - Import do arquivo de rota
   - Interface `AppColdproRouteChildren`
   - Objeto `addChildren` do coldpro route
4. **Adicione ao Sidebar** em `src/modules/coldpro/components/layout/Sidebar.tsx`
5. **Adicione a chave i18n** em `src/i18n/pt-BR.ts`

### 10.5 Como Atualizar um Catálogo JSON

Os catálogos em `public/data/catalogs/` são carregados diretamente pelo browser. Para atualizar:

1. Edite o arquivo JSON diretamente (mantenha a estrutura existente)
2. Valide o JSON com `python3 -c "import json; json.load(open('arquivo.json'))"`
3. Se adicionar novos campos, atualize os tipos TypeScript correspondentes em `src/modules/coldpro_v2/domain/types.ts`
4. Execute os testes para garantir que nenhum motor quebrou

### 10.6 Fluxo de Git

```bash
# Criar branch para nova feature
git checkout -b feat/nome-da-feature

# Desenvolver e testar
pnpm exec vitest run  # deve passar 645+ testes

# Commit com mensagem semântica
git add -A
git commit -m "feat(modulo): descrição da mudança"

# Push e PR
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

Esta seção documenta as correções matemáticas aplicadas nos motores de cálculo. Toda correção deve ser documentada aqui para rastreabilidade.

### Correções de Maio/2026

| ID | Arquivo | Bug | Correção | Impacto |
|----|---------|-----|----------|---------|
| C1 | `coilDerivedMetrics.ts` | `ṁ = Q/h_fg` assumia `x=1` | `ṁ = Q/(h_fg·Δx)` com `Δx=0,70` (evap) | Subestimava vazão em ~30% |
| C2 | `coilDerivedMetrics.ts` | Void fraction de Zivi com `rho*0.06` | Correlação de Zivi (1964) correta | Erro de ~15% no void fraction |
| C3 | `pressureDrop.ts` | Darcy monofásico para todo o circuito | Müller-Steinhagen & Heck (1986) bifásico | Subestimava ΔP em ~40% |
| C4 | `finEfficiency.ts` | `L_c = 0,01 m` fixo | Schmidt (1949) com geometria real | Erro de ±20% na eficiência |
| C5 | `wetCoil.ts` | `T_surf = T_evap + 2°C` fixo | Iteração NTU acoplada | Não convergia fora do ponto de projeto |
| C6 | `coilCalculationEngine.ts` | `v = ṁ/1000` (constante arbitrária) | `v = ṁ/(ρ·A)` com densidade real | Velocidade fisicamente impossível |
| C7 | `simulatorCoreV2.ts` | `fluidVelocityMs` ausente no resultado | Campo incluído no objeto de saída | Resultado incompleto |
| C8 | `finnedExternalArea.ts` | Arquivo inexistente | Criado do zero com A_bare + A_fin | Motor usava área estimada |
| C9 | `vitest.coldpro.config.ts` | Alias `@/` ausente | `resolve.alias` adicionado | 3 suítes de teste falhavam |

---

## 12. Referências Bibliográficas

As correlações implementadas neste sistema são baseadas nas seguintes referências:

| # | Referência | Correlação |
|---|-----------|-----------|
| 1 | Wang, C.-C., Chi, K.-Y., & Chang, C.-J. (2000). Heat transfer and friction characteristics of plain fin-and-tube heat exchangers. *International Journal of Heat and Mass Transfer*, 43(15), 2693–2700. | h_ar aletas planas |
| 2 | Rich, D.G. (1975). The effect of fin spacing on the heat transfer and friction performance of multi-row, smooth plate fin-and-tube heat exchangers. *ASHRAE Transactions*, 81(1), 137–145. | h_ar condensadores (F_p ≤ 2,5 mm) |
| 3 | Schmidt, T.E. (1949). Heat transfer calculations for extended surfaces. *Refrigerating Engineering*, 57(4), 351–357. | Eficiência de aleta circular |
| 4 | Müller-Steinhagen, H., & Heck, K. (1986). A simple friction pressure drop correlation for two-phase flow in pipes. *Chemical Engineering and Processing*, 20(6), 297–308. | ΔP bifásico |
| 5 | Chen, J.C. (1966). Correlation for boiling heat transfer to saturated fluids in convective flow. *Industrial & Engineering Chemistry Process Design and Development*, 5(3), 322–329. | h_evap bifásico |
| 6 | Nusselt, W. (1916). Die Oberflächenkondensation des Wasserdampfes. *Zeitschrift des Vereines Deutscher Ingenieure*, 60, 541–546, 569–575. | h_cond em filme |
| 7 | Zivi, S.M. (1964). Estimation of steady-state steam void-fraction by means of the principle of minimum entropy production. *Journal of Heat Transfer*, 86(2), 247–252. | Void fraction bifásico |
| 8 | Incropera, F.P., DeWitt, D.P., Bergman, T.L., & Lavine, A.S. (2011). *Fundamentals of Heat and Mass Transfer* (7th ed.). John Wiley & Sons. | NTU-ε, LMTD, Nusselt |
| 9 | ASHRAE. (2017). *ASHRAE Handbook — Fundamentals*, Chapter 1: Psychrometrics. American Society of Heating, Refrigerating and Air-Conditioning Engineers. | Psicrometria |
| 10 | ASHRAE. (2022). *ASHRAE Handbook — Refrigeration*, Chapter 1: Halocarbons. | Propriedades de refrigerantes |
| 11 | EN 12900:2013. *Refrigerant compressors — Rating conditions, tolerances and presentation of manufacturer's performance data*. European Committee for Standardization. | Polinômios de compressor |
| 12 | AHRI Standard 540 (2020). *Performance Rating of Positive Displacement Refrigerant Compressors and Compressor Units*. Air-Conditioning, Heating, and Refrigeration Institute. | Polinômios de compressor |
| 13 | Gnielinski, V. (1976). New equations for heat and mass transfer in turbulent pipe and channel flow. *International Chemical Engineering*, 16(2), 359–368. | h_fluido monofásico |
| 14 | Dittus, F.W., & Boelter, L.M.K. (1930). Heat transfer in automobile radiators of the tubular type. *University of California Publications on Engineering*, 2(13), 443–461. | h_fluido turbulento |

---

*Documento gerado em maio/2026. Para atualizações, edite este arquivo e faça commit com a mensagem `docs: atualiza README técnico`.*
