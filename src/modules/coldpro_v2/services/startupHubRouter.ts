/**
 * startupHubRouter.ts
 * Sprint 5 — Hub de Start-up: API REST pública
 *
 * Endpoints expostos para o app do técnico em campo (PWA) e terceiros:
 *
 *   GET  /api/startup/:model
 *     → Retorna a StartupReferenceSheet do produto pelo modelo
 *     → Usado pelo técnico para carregar os valores de referência antes de medir
 *
 *   POST /api/startup/:model/commissioning
 *     → Recebe as medições do técnico e gera o CommissioningReport
 *     → Retorna o relatório completo com PASS/WARNING/FAIL por parâmetro
 *
 *   GET  /api/startup/:model/datasheet
 *     → Retorna o MachineDatasheetExport completo (catálogo + polinômios + elétrico)
 *     → Usado por ferramentas de carga térmica para integração
 *
 * Este módulo exporta um factory function que recebe o registry de produtos
 * e retorna um objeto com handlers puros (sem dependência de framework HTTP).
 * O Lovable/TanStack Start pode envolver esses handlers em suas rotas.
 */

import type {
  StartupReferenceSheet,
  CommissioningReport,
  CommissioningReportInput,
  StartupFieldMeasurements,
  MachineDatasheetExport,
} from "../domain/types";
import { generateCommissioningReport, validateCommissioningInput } from "./startupHubService";
import { exportMachineDatasheet } from "../adapters/machineDatasheetExportAdapter";

// ─── Tipos de resposta da API ─────────────────────────────────────────────────

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  error: string;
  details?: string[];
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

// ─── Tipos de entrada dos endpoints ──────────────────────────────────────────

export interface GetStartupReferenceParams {
  model: string;
}

export interface PostCommissioningBody {
  measurements: StartupFieldMeasurements;
  serial_number: string;
  technician_name: string;
  location: string;
  technician_notes?: string;
}

// ─── Interface do registry de produtos (injeção de dependência) ───────────────

export interface StartupHubProductRegistry {
  /** Busca o registro técnico de um produto pelo modelo (case-insensitive). */
  getByModel(model: string): { startup_reference?: StartupReferenceSheet } | undefined;
}

// ─── Factory: cria os handlers da API ────────────────────────────────────────

export interface StartupHubHandlers {
  /**
   * GET /api/startup/:model
   * Retorna a planilha de referências de start-up do produto.
   */
  getStartupReference(
    params: GetStartupReferenceParams,
  ): ApiResponse<StartupReferenceSheet>;

  /**
   * POST /api/startup/:model/commissioning
   * Recebe medições do técnico e gera o relatório de comissionamento.
   */
  postCommissioning(
    params: GetStartupReferenceParams,
    body: PostCommissioningBody,
  ): ApiResponse<CommissioningReport>;

  /**
   * GET /api/startup/:model/datasheet
   * Retorna o data sheet completo do produto para integração com terceiros.
   */
  getDatasheet(
    params: GetStartupReferenceParams,
  ): ApiResponse<MachineDatasheetExport>;
}

/**
 * Cria os handlers da API do Hub de Start-up.
 * Injetar o registry de produtos para desacoplar da persistência.
 */
export function createStartupHubHandlers(
  registry: StartupHubProductRegistry,
): StartupHubHandlers {
  function getStartupReference(
    params: GetStartupReferenceParams,
  ): ApiResponse<StartupReferenceSheet> {
    const { model } = params;

    if (!model || model.trim() === "") {
      return { success: false, error: "Parâmetro 'model' é obrigatório." };
    }

    const record = registry.getByModel(model.trim());

    if (!record) {
      return {
        success: false,
        error: `Produto não encontrado: "${model}". Verifique o modelo e tente novamente.`,
      };
    }

    if (!record.startup_reference) {
      return {
        success: false,
        error: `Referências de start-up não disponíveis para o modelo "${model}". O produto pode precisar ser recalculado no simulador.`,
      };
    }

    return { success: true, data: record.startup_reference };
  }

  function postCommissioning(
    params: GetStartupReferenceParams,
    body: PostCommissioningBody,
  ): ApiResponse<CommissioningReport> {
    const { model } = params;

    if (!model || model.trim() === "") {
      return { success: false, error: "Parâmetro 'model' é obrigatório." };
    }

    const record = registry.getByModel(model.trim());

    if (!record) {
      return {
        success: false,
        error: `Produto não encontrado: "${model}".`,
      };
    }

    if (!record.startup_reference) {
      return {
        success: false,
        error: `Referências de start-up não disponíveis para o modelo "${model}".`,
      };
    }

    // Montar input completo
    const reportInput: Partial<CommissioningReportInput> = {
      reference_sheet: record.startup_reference,
      measurements: body.measurements,
      serial_number: body.serial_number,
      technician_name: body.technician_name,
      location: body.location,
      technician_notes: body.technician_notes,
    };

    // Validar entrada
    const validation = validateCommissioningInput(reportInput);
    if (!validation.valid) {
      return {
        success: false,
        error: "Dados de entrada inválidos.",
        details: validation.errors,
      };
    }

    // Gerar relatório
    const report = generateCommissioningReport(reportInput as CommissioningReportInput);

    return { success: true, data: report };
  }

  function getDatasheet(
    params: GetStartupReferenceParams,
  ): ApiResponse<MachineDatasheetExport> {
    const { model } = params;

    if (!model || model.trim() === "") {
      return { success: false, error: "Parâmetro 'model' é obrigatório." };
    }

    const record = registry.getByModel(model.trim());

    if (!record) {
      return {
        success: false,
        error: `Produto não encontrado: "${model}".`,
      };
    }

    // O record precisa ser um ProductTechnicalRecord completo para exportar
    // Verificar se tem os campos mínimos necessários
    const hasIdentity = "identity" in record && record.identity !== undefined;
    if (!hasIdentity) {
      return {
        success: false,
        error: `Data sheet não disponível para o modelo "${model}". O produto pode precisar ser recalculado.`,
      };
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const datasheet = exportMachineDatasheet({ record: record as any });
      return { success: true, data: datasheet };
    } catch (err) {
      return {
        success: false,
        error: `Erro ao gerar data sheet: ${err instanceof Error ? err.message : String(err)}`,
      };
    }
  }

  return {
    getStartupReference,
    postCommissioning,
    getDatasheet,
  };
}
