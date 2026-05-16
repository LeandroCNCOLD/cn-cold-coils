/**
 * datasheetPdfGenerator.ts
 *
 * Geração de PDF de Data Sheet técnico.
 * Extraído de ExportPage para ser compartilhado com exportação em lote.
 */
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  buildProductTechnicalRecord,
  exportMachineDatasheet,
  type CompressorSpec,
  type CondenserSpec,
  type ProductIdentity,
  type SystemComponentsInput,
  type MachineDatasheetExport,
} from "@/modules/coldpro_v2";
import { CN_COLD_LOGO_BASE64 } from "@/assets/cn-cold-logo";
import type { CatalogEquipmentRow } from "@/modules/coldpro_catalog/data/equipmentCatalog.types";
import { catalogToCompressorSpec } from "@/modules/coldpro_catalog/adapters/compressorAdapter";
import { catalogToCondenserSpec } from "@/modules/coldpro_catalog/adapters/condenserAdapter";
import { buildMinimalEvaporatorInput } from "../components/forms/EvaporatorForm";

const KCALH_TO_W = 1.163;

export interface LogoConfig {
  companyName: string;
  logoDataUrl?: string;
}

type AutotableDoc = { lastAutoTable: { finalY: number } };
type InternalDoc  = { internal: { getNumberOfPages: () => number } };

// ── Gráfico COP × Te ─────────────────────────────────────────────────────────

export function drawCopChart(
  doc: jsPDF,
  performanceCurve: MachineDatasheetExport["performance_curve"],
  yStart: number,
): number {
  if (!performanceCurve || performanceCurve.length === 0) return yStart;

  const margin = 14;
  const pageW  = doc.internal.pageSize.getWidth();
  const chartH = 58;
  const chartW = pageW - margin * 2;
  const plotX  = margin + 18;
  const plotY  = yStart + 6;
  const plotW  = chartW - 20;
  const plotH  = chartH - 14;

  const tcValues = [...new Set(performanceCurve.map((p) => p.cond_temp_c))].sort((a, b) => a - b);
  const teValues = [...new Set(performanceCurve.map((p) => p.evap_temp_c))].sort((a, b) => a - b);
  const minTe = teValues[0];
  const maxTe = teValues[teValues.length - 1];
  const maxCop = Math.max(...performanceCurve.filter((p) => p.cop_system > 0).map((p) => p.cop_system));
  const copMax = Math.ceil(maxCop * 10) / 10 + 0.2;
  const copMin = 0;

  const COLORS: [number, number, number][] = [
    [59, 130, 246], [16, 185, 129], [245, 158, 11], [239, 68, 68], [139, 92, 246],
  ];

  const toX = (te: number) => plotX + ((te - minTe) / Math.max(maxTe - minTe, 1)) * plotW;
  const toY = (cop: number) => plotY + plotH - ((cop - copMin) / Math.max(copMax - copMin, 0.1)) * plotH;

  doc.setFillColor(248, 250, 252);
  doc.rect(margin, yStart, chartW, chartH, "F");
  doc.setDrawColor(220, 220, 220);
  doc.rect(margin, yStart, chartW, chartH, "S");

  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 41, 59);
  doc.text("COP Sistema × Temperatura de Evaporação", margin + 2, yStart + 4.5);

  for (let i = 0; i <= 5; i++) {
    const cop = copMin + (i / 5) * (copMax - copMin);
    const py  = toY(cop);
    doc.setDrawColor(220, 230, 240);
    doc.setLineWidth(0.15);
    doc.line(plotX, py, plotX + plotW, py);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 120, 120);
    doc.text(cop.toFixed(1), plotX - 2, py + 1, { align: "right" });
  }

  teValues.forEach((te) => {
    const px = toX(te);
    doc.setFontSize(6);
    doc.setTextColor(120, 120, 120);
    doc.text(`${te}°`, px, plotY + plotH + 4, { align: "center" });
    doc.setDrawColor(220, 230, 240);
    doc.setLineWidth(0.15);
    doc.line(px, plotY, px, plotY + plotH);
  });

  doc.setFontSize(6.5);
  doc.setTextColor(80, 80, 80);
  doc.text("Te (°C)", plotX + plotW / 2, plotY + plotH + 8, { align: "center" });

  tcValues.forEach((tc, idx) => {
    const pts = performanceCurve
      .filter((p) => p.cond_temp_c === tc && p.cop_system > 0)
      .sort((a, b) => a.evap_temp_c - b.evap_temp_c);
    if (pts.length < 2) return;
    const [r, g, b] = COLORS[idx % COLORS.length];
    doc.setDrawColor(r, g, b);
    doc.setLineWidth(0.5);
    for (let i = 0; i < pts.length - 1; i++) {
      doc.line(toX(pts[i].evap_temp_c), toY(pts[i].cop_system),
               toX(pts[i + 1].evap_temp_c), toY(pts[i + 1].cop_system));
    }
    pts.forEach((p) => {
      doc.setFillColor(r, g, b);
      doc.circle(toX(p.evap_temp_c), toY(p.cop_system), 0.8, "F");
    });
  });

  const legendX = plotX + plotW + 3;
  tcValues.forEach((tc, idx) => {
    const [r, g, b] = COLORS[idx % COLORS.length];
    const ly = plotY + idx * 7;
    doc.setFillColor(r, g, b);
    doc.rect(legendX, ly, 4, 2.5, "F");
    doc.setFontSize(6);
    doc.setTextColor(60, 60, 60);
    doc.text(`Tc=${tc}°C`, legendX + 5, ly + 2);
  });

  doc.setDrawColor(160, 170, 180);
  doc.setLineWidth(0.3);
  doc.line(plotX, plotY, plotX, plotY + plotH);
  doc.line(plotX, plotY + plotH, plotX + plotW, plotY + plotH);

  return yStart + chartH + 4;
}

// ── Gerador principal ─────────────────────────────────────────────────────────

export function downloadDatasheetPdf(sheet: MachineDatasheetExport, logo: LogoConfig = { companyName: "CN COLD Engenharia" }) {
  const doc    = new jsPDF({ unit: "mm", format: "a4" });
  const margin = 14;
  const pageW  = doc.internal.pageSize.getWidth();
  let y = margin;

  const logoSrc = logo.logoDataUrl ?? CN_COLD_LOGO_BASE64;

  // Header dark
  doc.setFillColor(10, 22, 40);
  doc.rect(0, 0, pageW, 30, "F");
  doc.setFillColor(18, 38, 68);
  doc.rect(0, 22, pageW, 8, "F");
  doc.setFillColor(30, 111, 217);
  doc.rect(0, 28, pageW, 2, "F");

  try {
    const fmt = logoSrc.startsWith("data:image/svg") ? "SVG" : "PNG";
    doc.addImage(logoSrc, fmt, margin, 4, 36, 11);
  } catch {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(255, 255, 255);
    doc.text("CN COLD", margin, 12);
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text(sheet.product.model, pageW - margin, 12, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text(`${sheet.product.family}  ·  ${sheet.product.refrigerant}  ·  Data Sheet Técnico`, pageW - margin, 19, { align: "right" });
  doc.setTextColor(0, 0, 0);
  y = 36;

  // Cards 3×2
  const el = sheet.electrical;
  const nominalPoint = sheet.performance_curve?.find((p) => p.status === "approved")
    ?? sheet.performance_curve?.[Math.floor((sheet.performance_curve?.length ?? 0) / 2)];

  type Card = { label: string; value: string; accent: [number, number, number] };
  const cards: Card[] = [
    { label: "Capacidade",    value: nominalPoint ? `${(nominalPoint.capacity_w / 1000).toFixed(1)} kW` : "—", accent: [30, 111, 217] },
    { label: "COP Sistema",   value: el ? el.cop_system.toFixed(2) : "—",                                      accent: [16, 185, 129] },
    { label: "Potência Total",value: el ? `${el.total_power_w.toFixed(0)} W` : "—",                            accent: [245, 158, 11] },
    { label: "Corrente",      value: el ? `${el.estimated_current_a.toFixed(1)} A` : "—",                      accent: [239, 68, 68]  },
    { label: "EER",           value: el ? `${el.eer_btu_wh.toFixed(2)} BTU/W·h` : "—",                        accent: [139, 92, 246] },
    { label: "Refrigerante",  value: sheet.product.refrigerant,                                                 accent: [56, 189, 248] },
  ];

  const cardW = (pageW - margin * 2 - 4) / 3;
  const cardH = 14;
  const cardGap = 2;

  cards.forEach((card, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const cx  = margin + col * (cardW + cardGap);
    const cy  = y + row * (cardH + cardGap);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(cx, cy, cardW, cardH, 1, 1, "F");
    doc.setDrawColor(...card.accent);
    doc.setLineWidth(0.4);
    doc.line(cx, cy, cx, cy + cardH);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(120, 130, 145);
    doc.text(card.label, cx + 3, cy + 4.5);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...card.accent);
    doc.text(card.value, cx + 3, cy + 11);
  });

  y += 2 * (cardH + cardGap) + 6;

  doc.setFontSize(8);
  doc.setTextColor(80, 80, 80);
  doc.text(`Gerado em: ${new Date(sheet.exported_at).toLocaleString("pt-BR")}   |   Status: ${sheet.validation_status.toUpperCase()}`, margin, y);
  doc.setTextColor(0, 0, 0);
  y += 6;

  // Identidade
  autoTable(doc, {
    startY: y,
    head: [["Identificação", ""]],
    body: [
      ["ID", sheet.product.id], ["Modelo", sheet.product.model], ["Família", sheet.product.family],
      ["Linha", sheet.product.line], ["Refrigerante", sheet.product.refrigerant],
      ...(sheet.product.application ? [["Aplicação", sheet.product.application]] : []),
    ],
    styles: { fontSize: 8, cellPadding: 1.5 },
    headStyles: { fillColor: [30, 111, 217], textColor: 255 },
    margin: { left: margin, right: margin },
    theme: "grid",
  });
  y = (doc as unknown as AutotableDoc).lastAutoTable.finalY + 5;

  // Elétrica
  if (sheet.electrical) {
    const e = sheet.electrical;
    autoTable(doc, {
      startY: y,
      head: [["Análise Elétrica", ""]],
      body: [
        ["Potência total", `${e.total_power_w.toFixed(0)} W`], ["Compressor", `${e.compressor_power_w.toFixed(0)} W`],
        ["Ventiladores", `${e.fans_total_power_w.toFixed(0)} W`], ["Corrente total", `${e.estimated_current_a.toFixed(2)} A`],
        ["Tensão / Fases", `${e.voltage_v} V / ${e.phases}∅`], ["Fator de potência", e.power_factor.toFixed(2)],
        ["COP sistema", e.cop_system.toFixed(2)], ["EER", `${e.eer_btu_wh.toFixed(2)} BTU/W·h`],
      ],
      styles: { fontSize: 8, cellPadding: 1.5 },
      headStyles: { fillColor: [245, 158, 11], textColor: 255 },
      margin: { left: margin, right: margin },
      theme: "grid",
    });
    y = (doc as unknown as AutotableDoc).lastAutoTable.finalY + 5;
  }

  // Performance + gráfico
  if (sheet.performance_curve && sheet.performance_curve.length > 0) {
    autoTable(doc, {
      startY: y,
      head: [["Te (°C)", "Tc (°C)", "Cap (W)", "W comp", "W tot", "COP c", "COP s", "Q cond", "Status"]],
      body: sheet.performance_curve.map((p) => [
        p.evap_temp_c.toFixed(1), p.cond_temp_c.toFixed(1), p.capacity_w.toFixed(0),
        p.compressor_power_w.toFixed(0), p.total_power_w.toFixed(0), p.cop_compressor.toFixed(2),
        p.cop_system.toFixed(2), p.q_cond_w.toFixed(0), p.status,
      ]),
      styles: { fontSize: 7, cellPadding: 1 },
      headStyles: { fillColor: [59, 130, 246], textColor: 255 },
      margin: { left: margin, right: margin },
      theme: "striped",
    });
    y = (doc as unknown as AutotableDoc).lastAutoTable.finalY + 5;
    if (y + 65 > doc.internal.pageSize.getHeight() - 20) { doc.addPage(); y = margin; }
    y = drawCopChart(doc, sheet.performance_curve, y);
  }

  // Polinômios
  if (sheet.polynomial_sets && sheet.polynomial_sets.length > 0) {
    autoTable(doc, {
      startY: y,
      head: [["Alvo", "Unidade", "R²", "Pontos", "Qualidade"]],
      body: sheet.polynomial_sets.map((p) => [p.target_label, p.unit, p.r_squared.toFixed(4), String(p.used_points), p.fit_quality]),
      styles: { fontSize: 8, cellPadding: 1.5 },
      headStyles: { fillColor: [139, 92, 246], textColor: 255 },
      margin: { left: margin, right: margin },
      theme: "grid",
    });
    y = (doc as unknown as AutotableDoc).lastAutoTable.finalY + 5;
  }

  // Start-up
  if (sheet.startup_reference) {
    const rows: (string | number)[][] = [];
    sheet.startup_reference.groups.forEach((g) => {
      g.parameters.forEach((p) => rows.push([g.group_label, p.label, `${p.reference_value.toFixed(2)} ${p.unit}`]));
    });
    autoTable(doc, {
      startY: y,
      head: [["Grupo", "Parâmetro", "Referência"]],
      body: rows,
      styles: { fontSize: 8, cellPadding: 1.5 },
      headStyles: { fillColor: [16, 185, 129], textColor: 255 },
      margin: { left: margin, right: margin },
      theme: "grid",
    });
    y = (doc as unknown as AutotableDoc).lastAutoTable.finalY + 5;
    doc.setFontSize(8);
    doc.text(`Carga estimada: ${sheet.startup_reference.estimated_charge_kg.toFixed(2)} kg ± ${sheet.startup_reference.charge_tolerance_kg.toFixed(2)} kg`, margin, y);
    y += 6;
  }

  // Avisos
  if (sheet.warnings.length > 0) {
    if (y > 250) { doc.addPage(); y = margin; }
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("Avisos:", margin, y);
    y += 4;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    sheet.warnings.forEach((w) => {
      const lines = doc.splitTextToSize(`• ${w}`, pageW - margin * 2);
      doc.text(lines, margin, y);
      y += lines.length * 4;
    });
  }

  // Footer
  const pageCount = (doc as unknown as InternalDoc).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(120, 120, 120);
    doc.text(`CN COLD Engenharia · Data Sheet ${sheet.schema_version} · Página ${i}/${pageCount}`, margin, doc.internal.pageSize.getHeight() - 6);
  }

  doc.save(`datasheet_${sheet.product.model.replace(/\s+/g, "_")}_${Date.now()}.pdf`);
}

// ── Builder: CatalogEquipmentRow → MachineDatasheetExport ────────────────────

export function buildSheetFromRow(row: CatalogEquipmentRow): MachineDatasheetExport | null {
  try {
    const compressor: Partial<CompressorSpec> = catalogToCompressorSpec(row);
    if (!compressor.cooling_capacity_w || !compressor.power_w ||
        compressor.evap_temp_c == null || compressor.cond_temp_c == null || !compressor.refrigerant) {
      return null;
    }

    let condenser: Partial<CondenserSpec>;
    try {
      condenser = catalogToCondenserSpec(row);
    } catch {
      condenser = {
        heat_rejection_capacity_w: (row.calorRejeitadoKcalH ?? 0) * KCALH_TO_W,
        max_cond_temp_c: compressor.cond_temp_c,
      };
    }
    if (!condenser.heat_rejection_capacity_w) return null;

    const ambient = row.tempAmbienteC ?? row.tempCamaraC ?? compressor.cond_temp_c - 10;
    const conds   = { ambient_temp_c: ambient, required_airflow_m3_h: row.vazaoArEvaporadorM3H ?? 0 };

    const identity: ProductIdentity = {
      id:         row.id,
      model:      row.modeloBaseReferencia ?? row.modelo ?? "—",
      family:     row.family ?? "—",
      line:       row.linha ?? "—",
      refrigerant: compressor.refrigerant,
    };

    const system: SystemComponentsInput = {
      compressor: compressor as CompressorSpec,
      evaporator: { progressive_input: buildMinimalEvaporatorInput(compressor, conds) },
      condenser: { ...(condenser as CondenserSpec), max_cond_temp_c: condenser.max_cond_temp_c ?? compressor.cond_temp_c } as CondenserSpec,
      system_conditions: conds,
    };

    const Te = compressor.evap_temp_c;
    const Tc = compressor.cond_temp_c;
    const operating_points = [Te - 10, Te - 5, Te, Te + 5, Te + 10].flatMap((te) =>
      [Tc - 10, Tc - 5, Tc, Tc + 5, Tc + 10].map((tc) => ({ evap_temp_c: te, cond_temp_c: tc })),
    );

    const record = buildProductTechnicalRecord({ identity, system, operating_points });
    return exportMachineDatasheet({ record, options: { include_electrical: true, include_performance_curve: true, include_startup_reference: true, include_validation: true } });
  } catch {
    return null;
  }
}
