## Resumo

Incluir os 5 modelos Ziehl-Abegg do PDF (FN040, FP045, FG040, FN042, FG035 — ~10 variantes Hz/V) no `fanCatalog.ts`, anexar a imagem do gráfico Q×ΔP a cada um e calcular um polinômio aproximado da curva via leitura por visão.

**Importante:** nenhum desses modelos está hoje no catálogo (98 entradas atuais). Isto é **inclusão**, não atualização dos 70 instalados. O FN040 que você procurava entra agora.

## Passos

1. **Extrair dados textuais do PDF** (já feito no parse): para cada variante coletar `model`, `article_number`, `family`, `diameter_mm`, `voltage`, `frequency_hz`, `motor_technology`, `p1_nominal_w`, `current_nominal_a`, `rpm_nominal`, `q_max_m3h`, `sound_lwa_db`, `erp_efficiency_pct`, ponto de operação (Q=2500, ΔP=50) e espectro acústico.

2. **Copiar imagens para `public/data/fans/`:**
   - `curves/{model}_{voltage}_{hz}.jpg` ← crop do gráfico principal Caudal×Pressão (`page_X_chart_1_v2.jpg`)
   - `photos/{model}.jpg` ← foto do produto (`page_X_image_1_v2.jpg`)

3. **Calcular polinômio Q×ΔP** (parte aproximada):
   - Script Python no sandbox usando Lovable AI Gateway (gemini-3-flash) para ler 6-8 pontos `(Q, ΔP)` da curva de RPM nominal de cada chart.
   - `numpy.polyfit(Q, ΔP, 2)` → `psf_coeffs: [c, b, a]`.
   - Validação: o polinômio deve passar a ≤10% do ponto de operação conhecido (Q=2500, ΔP=50). Se desviar mais, marco `psf_coeffs: null` e mantenho só os pontos brutos.
   - Demais rotações via leis de afinidade (`Q∝rpm`, `ΔP∝rpm²`).

4. **Atualizar `src/data/fanCatalog.ts`** acrescentando as ~10 entradas com:
   - todos os campos extraídos
   - `curve_points` (pontos lidos)
   - `psf_coeffs` (quando aprovado pela validação)
   - `curve_image` e `product_image` (caminhos relativos)

5. **Pequena edição em `FanLibraryBrowser`** para exibir o `curve_image` e `product_image` no card do produto, quando presentes.

6. **Verificação final:** rodar `bunx tsc --noEmit` e abrir `/coldpro/components` para confirmar que os 10 novos ventiladores aparecem com gráfico e foto.

## Limitações honestas

- Coeficientes via leitura por visão são **estimativa de engenharia** (±5%), não dados certificados. Marcados como tal no campo (ex.: `psf_coeffs_source: "vision-fit"`).
- Charts secundários (Potência, Eficiência, Acústica) ficam só como imagem — não vou ajustar polinômios para eles, só para Q×ΔP que é o que o app consome.