# CN Coils — Backlog Oficial de Melhorias

**Data:** Maio 2026 | **Total:** 42 tarefas | **Fonte:** Análise de vídeos UNILAB + auditoria do código-fonte + sessão de planejamento

---

## 🔴 CRÍTICO — Motor e cálculos incorretos ou ausentes

| # | Tarefa | Status |
|---|---|---|
| C1 | **COP do sistema incorreto** — corrigir para `Q / (W_comp + W_fans)` em todos os pontos da curva | [ ] |
| C2 | **Dados elétricos no `CompressorSpec`** — adicionar corrente, tensão, fases, fator de potência, frequência | [ ] |
| C3 | **`electricalAnalysisEngine`** — motor que calcula `W_total`, `I_total`, `COP_sistema` | [ ] |
| C4 | **Polinômio `cop_system(Te, Tc)`** e **`total_power_w(Te, Tc)`** como novos targets | [ ] |
| C5 | **Queda de pressão bifásica** (Lockhart-Martinelli) — motor atual subestima ΔP em 2–5× | [ ] |
| C6 | **Campos undefined/NaN na edição ao vivo** — valores não resolvidos aparecem na tela | [ ] |

---

## 🟠 IMPORTANTE — Workspace AGRO (não existe)

| # | Tarefa | Status |
|---|---|---|
| A1 | **Workspace AGRO — Aba 1: Câmara** — carga térmica (dimensões, produto, T, UR alvo) | [ ] |
| A2 | **Workspace AGRO — Aba 2: Aletado integrado** — evaporador + bateria gás quente + ventilador | [ ] |
| A3 | **Workspace AGRO — Aba 3: Ciclo com gás quente** — P-h com by-pass, fração de by-pass, equilíbrio real | [ ] |
| A4 | **Workspace AGRO — Aba 4: Psicrometria** — diagrama h-x completo com curva de saturação e 3 estados | [ ] |
| A5 | **Workspace AGRO — Aba 5: Condensador** — carga total, validação, sugestão automática de modelo | [ ] |
| A6 | **Diagrama psicrométrico completo** — curva de saturação + estados do ar (hoje só 2 pontos scatter) | [ ] |

---

## 🟠 IMPORTANTE — Hub de Testes (abas que faltam)

| # | Tarefa | Status |
|---|---|---|
| H1 | **Aba "Elétrico"** — corrente, tensão, potência total, COP do sistema | [ ] |
| H2 | **Aba "Validação de Máquina"** — checklist PASS/FAIL por critério, botão "Validar Plug-in" | [ ] |
| H3 | **Aba "Catálogo & Data Sheet"** — visualiza e exporta o `ProductTechnicalRecord` completo | [ ] |
| H4 | **Aba "Start-up"** — referências de campo + formulário de medições reais + comparativo PASS/FAIL | [ ] |
| H5 | **Aba "Revisões"** — histórico de revisões com diff entre versões | [ ] |

---

## 🟡 MÉDIO — Hub de Start-up (motor + tipos novos)

| # | Tarefa | Status |
|---|---|---|
| S1 | **`StartupReferenceSheet`** — tipo com parâmetros de campo (pressões, temperaturas, SH, SC, correntes, carga de fluido, ar) com tolerâncias | [ ] |
| S2 | **`startupReferenceEngine.ts`** — calcula referências de campo a partir do `ProductTechnicalRecord` | [ ] |
| S3 | **Estimativa de carga de fluido** — volume interno do evaporador × densidade do refrigerante | [ ] |
| S4 | **`startup_reference` no `ProductTechnicalRecord`** — campo novo no registro técnico | [ ] |

---

## 🟡 MÉDIO — Catálogo e exportação

| # | Tarefa | Status |
|---|---|---|
| E1 | **Data Sheet PDF profissional** — logo CN Coils + blueprint + tabela de seleção + diagrama psicrométrico | [ ] |
| E2 | **`MachineDatasheetExport`** — formato JSON para integração com ferramentas de carga térmica | [ ] |
| E3 | **`total_power_w` e `cop_system` no payload de exportação** | [ ] |
| E4 | **`startup_reference` no payload de exportação** | [ ] |
| E5 | **Catálogo comercial multi-modelo** — tabela comparativa da linha, filtros, exportação Excel (.xlsx) | [ ] |
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
| P1 | **Botão "Enviar para Hub"** nos workspaces — mapeia automaticamente `CnCoilsProject → SystemComponentsInput` | [ ] |
| P2 | **Badge de origem no Hub** — "Origem: CN 750 LT Rev. B" para rastreabilidade | [ ] |
| P3 | **Controle de revisões com diff** — snapshot imutável por aprovação, comparação Rev. A vs Rev. B | [ ] |
| P4 | **Dados de teste real integrados** — engenheiro insere valores medidos, sistema compara e aprova/reprova | [ ] |
| P5 | **Coeficientes de calibração por produto** — após teste aprovado, motor usa `C_rich_calibrado` específico | [ ] |

---

## 🔵 UX e navegação

| # | Tarefa | Status |
|---|---|---|
| U1 | **Wizard de configuração passo a passo** para novos projetos | [ ] |
| U2 | **Perfis de acesso** (Design / Vendas / Produção) — campos simplificados por perfil | [ ] |
| U3 | **Semáforo de qualidade** — verde/amarelo/vermelho vs catálogo ±5% / ±15% / >15% | [ ] |
| U4 | **Drill-down nos resultados** — clicar em Q abre detalhamento (U, NTU, h_ar, h_fluid) | [ ] |
| U5 | **Análise de sensibilidade** — variação de um parâmetro e impacto na capacidade | [ ] |
| U6 | **Tooltips explicativos** em todos os campos técnicos | [ ] |

---

## ⚪ Baixa prioridade

| # | Tarefa | Status |
|---|---|---|
| B1 | **Heat pipe desumidificador** — alternativa passiva ao gás quente | [ ] |
| B2 | **Aletas onduladas/lanceoladas** — correlação Wang 1997 wavy fin | [ ] |
| B3 | **Tubos com ranhuras internas** (enhanced tubes) | [ ] |
| B4 | **Coeficiente de fouling** (incrustação) | [ ] |
| B5 | **Visualização 3D** do coil | [ ] |
| B6 | **Responsividade mobile** | [ ] |

---

## Ordem de execução por sprint

| Sprint | Tarefas | Entrega |
|---|---|---|
| **1** | C1, C2, C3, C4 | Análise elétrica + COP correto do sistema |
| **2** | H1, H2, H3, H4, H5 | Abas do Hub de Testes |
| **3** | S1, S2, S3, S4 | Motor de referências de start-up |
| **4** | A1, A2, A3, A4, A5, A6 | Workspace AGRO completo |
| **5** | E1, E2, E3, E4, E5, E6 | Catálogo e exportação profissional |
| **6** | SC1, SC3, SC4, P1, P2 | Sistemas completos + ponte workspace |
| **7** | C5, C6, P3, P4, P5, U1–U6 | Correções motor + UX + calibração |
| **8** | B1–B6 | Nice to have |
