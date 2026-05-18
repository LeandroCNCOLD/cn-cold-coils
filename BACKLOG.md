# CN Coils — Backlog Oficial de Melhorias

**Data:** Maio 2026 | **Total:** 42 tarefas | **Fonte:** Análise de vídeos UNILAB + auditoria do código-fonte + sessão de planejamento

---

## ✅ CONCLUÍDO — Correções de Motor (Maio 2026)

| ID  | Correção                                        | Data     |
|-----|-------------------------------------------------|----------|
| C10 | Constante TR = 3516.8528 W (ASHRAE)             | Mai/2026 |
| C11 | Imports simulatorCore → simulatorCoreAdapter    | Mai/2026 |
| C12 | Zustand persist middleware (sessão salva)        | Mai/2026 |
| C13 | Psicrometria Hyland-Wexler canônica             | Mai/2026 |
| C14 | Ar úmido no airProperties (RH + altitude)       | Mai/2026 |
| C15 | Fan fields: airflow_m3h (snake_case)            | Mai/2026 |

---

## 🔴 CRÍTICO — Motor e cálculos incorretos ou ausentes

| # | Tarefa | Status |
|---|---|---|
| C1 | **COP do sistema incorreto** — corrigir para `Q / (W_comp + W_fans)` em todos os pontos da curva | [x] Mai/2026 |
| C2 | **Dados elétricos no `CompressorSpec`** — adicionar corrente, tensão, fases, fator de potência, frequência | [x] Mai/2026 |
| C3 | **`electricalAnalysisEngine`** — motor que calcula `W_total`, `I_total`, `COP_sistema` | [x] Mai/2026 |
| C4 | **Polinômio `cop_system(Te, Tc)`** e **`total_power_w(Te, Tc)`** como novos targets | [x] Mai/2026 |
| C5 | **Queda de pressão bifásica** (Lockhart-Martinelli) — motor atual subestima ΔP em 2–5× | [x] Mai/2026 |
| C6 | **Campos undefined/NaN na edição ao vivo** — valores não resolvidos aparecem na tela (`fmtSafe`) | [x] Mai/2026 |

---

## 🟠 IMPORTANTE — Workspace AGRO

| # | Tarefa | Status |
|---|---|---|
| A1 | **Workspace AGRO — Aba 1: Câmara** — carga térmica (dimensões, produto, T, UR alvo) | [x] Mai/2026 |
| A2 | **Workspace AGRO — Aba 2: Aletado integrado** — evaporador + bateria gás quente + ventilador | [x] Mai/2026 |
| A3 | **Workspace AGRO — Aba 3: Ciclo com gás quente** — P-h com by-pass, fração de by-pass, equilíbrio real | [x] Mai/2026 |
| A4 | **Workspace AGRO — Aba 4: Psicrometria** — diagrama h-x completo com curva de saturação e 3 estados | [x] Mai/2026 |
| A5 | **Workspace AGRO — Aba 5: Condensador** — carga total, validação, sugestão automática de modelo | [x] Mai/2026 |
| A6 | **Diagrama psicrométrico completo** — curva de saturação + estados do ar (hoje só 2 pontos scatter) | [ ] |

---

## 🟠 IMPORTANTE — Hub de Testes (abas que faltam)

| # | Tarefa | Status |
|---|---|---|
| H1 | **Aba "Elétrico"** — corrente, tensão, potência total, COP do sistema | [x] Mai/2026 |
| H2 | **Aba "Validação de Máquina"** — checklist PASS/FAIL por critério, botão "Validar Plug-in" | [x] Mai/2026 |
| H3 | **Aba "Catálogo & Data Sheet"** — visualiza e exporta o `ProductTechnicalRecord` completo | [x] Mai/2026 |
| H4 | **Aba "Start-up"** — referências de campo + formulário de medições reais + comparativo PASS/FAIL | [x] Mai/2026 |
| H5 | **Aba "Revisões"** — histórico de revisões com diff entre versões | [x] Mai/2026 |

---

## 🟡 MÉDIO — Hub de Start-up (motor + tipos novos)

| # | Tarefa | Status |
|---|---|---|
| S1 | **`StartupReferenceSheet`** — tipo com parâmetros de campo (pressões, temperaturas, SH, SC, correntes, carga de fluido, ar) com tolerâncias | [x] Mai/2026 |
| S2 | **`startupReferenceEngine.ts`** — calcula referências de campo a partir do `ProductTechnicalRecord` | [x] Mai/2026 |
| S3 | **Estimativa de carga de fluido** — volume interno do evaporador × densidade do refrigerante | [x] Mai/2026 |
| S4 | **`startup_reference` no `ProductTechnicalRecord`** — campo novo no registro técnico | [x] Mai/2026 |

---

## 🟡 MÉDIO — Catálogo e exportação

| # | Tarefa | Status |
|---|---|---|
| E1 | **Data Sheet PDF profissional** — logo CN Coils + blueprint + tabela de seleção + diagrama psicrométrico | [ ] |
| E2 | **`MachineDatasheetExport`** — formato JSON para integração com ferramentas de carga térmica | [ ] |
| E3 | **`total_power_w` e `cop_system` no payload de exportação** | [ ] |
| E4 | **`startup_reference` no payload de exportação** | [ ] |
| E5 | **Catálogo comercial multi-modelo** — tabela comparativa da linha, filtros, exportação Excel (.xlsx) | [x] Mai/2026 |
| E6 | **Logo da empresa no PDF** — campo customizável no Data Sheet | [ ] |

---

## 🟡 MÉDIO — Sistemas completos (scaffolding existe, falta completar)

| # | Tarefa | Status |
|---|---|---|
| SC1 | **Sistema DX Completo** — ativar o wizard existente com motor real (evap + condensador acoplados) | [ ] |
| SC3 | **Bomba de Calor** — completar o wizard com ciclo reverso | [ ] |
| SC4 | **ΔP nas tubulações** (SHARK simplificado) — impacto na Te efetiva para linhas longas | [ ] |

---

## 🟢 COMPLEMENTAR — Ponte Workspace → Hub

| # | Tarefa | Status |
|---|---|---|
| P1 | **Botão "Enviar para Hub"** nos workspaces — mapeia automaticamente `CnCoilsProject → SystemComponentsInput` | [x] Mai/2026 |
| P2 | **Badge de origem no Hub** — "Origem: CN 750 LT Rev. B" para rastreabilidade | [ ] |
| P3 | **Controle de revisões com diff** — snapshot imutável por aprovação, comparação Rev. A vs Rev. B | [~] Em andamento |
| P4 | **Dados de teste real integrados** — engenheiro insere valores medidos, sistema compara e aprova/reprova | [ ] |
| P5 | **Coeficientes de calibração por produto** — após teste aprovado, motor usa `C_rich_calibrado` específico | [ ] |

---

## 🔵 UX e navegação

| # | Tarefa | Status |
|---|---|---|
| U1 | **Wizard de configuração passo a passo** para novos projetos | [ ] |
| U2 | **Perfis de acesso** (Design / Vendas / Produção) — campos simplificados por perfil | [ ] |
| U3 | **Semáforo de qualidade** — verde/amarelo/vermelho vs catálogo ±5% / ±15% / >15% | [x] Mai/2026 |
| U4 | **Drill-down nos resultados** — clicar em Q abre detalhamento (U, NTU, h_ar, h_fluid) | [x] Mai/2026 |
| U5 | **Análise de sensibilidade** — variação de um parâmetro e impacto na capacidade | [x] Mai/2026 |
| U6 | **Tooltips explicativos** em todos os campos técnicos | [x] Mai/2026 |

---

## ⚪ Baixa prioridade

| # | Tarefa | Status |
|---|---|---|
| B1 | **Heat pipe desumidificador** — alternativa passiva ao gás quente | [ ] |
| B2 | **Aletas onduladas/lanceoladas** — correlação Wang 1997 wavy fin | [x] Mai/2026 |
| B3 | **Tubos com ranhuras internas** (enhanced tubes) | [~] Em andamento |
| B4 | **Coeficiente de fouling** (incrustação) | [x] Mai/2026 |
| B5 | **Visualização 3D** do coil | [ ] |
| B6 | **Responsividade mobile** | [~] Em andamento |

---

## Ordem de execução por sprint

| Sprint | Tarefas | Entrega |
|---|---|---|
| **1** | C1✅, C2✅, C3✅, C4✅ | Análise elétrica + COP correto do sistema |
| **2** | H1✅, H2✅, H3✅, H4✅, H5✅ | Abas do Hub de Testes |
| **3** | S1✅, S2✅, S3✅, S4✅ | Motor de referências de start-up |
| **4** | A1✅, A2✅, A3✅, A4✅, A5✅, A6 | Workspace AGRO completo |
| **5** | E1, E2, E3, E4, E5✅, E6 | Catálogo e exportação profissional |
| **6** | SC1, SC3, SC4, P1✅, P2 | Sistemas completos + ponte workspace |
| **7** | C5✅, C6✅, P3~, P4, P5, U1–U6✅ | Correções motor + UX + calibração |
| **8** | B1, B2✅, B3~, B4✅, B5, B6~ | Nice to have |
