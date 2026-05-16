/**
 * useRevisionStore — P3: Controle de Revisões (lightweight, sem banco de dados)
 *
 * Snapshot imutável dos parâmetros de configuração do Hub por revisão.
 * Persiste em localStorage para sobreviver a reload. Suporta até 20 revisões.
 * Quando Supabase estiver disponível, este store pode ser substituído por
 * uma implementação com persistência real no servidor.
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CompressorSpec, CondenserSpec } from "@/modules/coldpro_v2";
import type { EvaporatorFormValue } from "../components/forms/EvaporatorForm";
import type { SystemConditions } from "../components/forms/SystemConditionsForm";

export interface RevisionSnapshot {
  id: string;
  label: string;
  created_at: number;
  approved_by?: string;
  note?: string;
  compressor: Partial<CompressorSpec>;
  condenser: Partial<CondenserSpec>;
  evaporator: EvaporatorFormValue;
  conditions: Partial<SystemConditions>;
}

export type DiffField = {
  field: string;
  before: string;
  after: string;
};

/** Computes a human-readable field diff between two snapshots. */
export function diffRevisions(a: RevisionSnapshot, b: RevisionSnapshot): DiffField[] {
  const diffs: DiffField[] = [];

  function compare(prefix: string, obj1: Record<string, unknown>, obj2: Record<string, unknown>) {
    const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
    for (const k of keys) {
      const v1 = obj1[k];
      const v2 = obj2[k];
      if (v1 !== v2) {
        diffs.push({
          field: `${prefix}.${k}`,
          before: v1 == null ? "—" : String(v1),
          after: v2 == null ? "—" : String(v2),
        });
      }
    }
  }

  compare("compressor", a.compressor as Record<string, unknown>, b.compressor as Record<string, unknown>);
  compare("condenser", a.condenser as Record<string, unknown>, b.condenser as Record<string, unknown>);
  compare("evaporator", a.evaporator as Record<string, unknown>, b.evaporator as Record<string, unknown>);
  compare("conditions", a.conditions as Record<string, unknown>, b.conditions as Record<string, unknown>);

  return diffs;
}

const MAX_REVISIONS = 20;

interface RevisionState {
  revisions: RevisionSnapshot[];
  saveRevision: (
    label: string,
    data: {
      compressor: Partial<CompressorSpec>;
      condenser: Partial<CondenserSpec>;
      evaporator: EvaporatorFormValue;
      conditions: Partial<SystemConditions>;
    },
    note?: string,
    approvedBy?: string,
  ) => string;
  deleteRevision: (id: string) => void;
  clearAll: () => void;
}

export const useRevisionStore = create<RevisionState>()(
  persist(
    (set) => ({
      revisions: [],

      saveRevision: (label, data, note, approvedBy) => {
        const id = `rev-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        const snap: RevisionSnapshot = {
          id,
          label,
          created_at: Date.now(),
          approved_by: approvedBy,
          note,
          compressor: { ...data.compressor },
          condenser: { ...data.condenser },
          evaporator: { ...data.evaporator },
          conditions: { ...data.conditions },
        };
        set((s) => ({
          revisions: [snap, ...s.revisions].slice(0, MAX_REVISIONS),
        }));
        return id;
      },

      deleteRevision: (id) =>
        set((s) => ({ revisions: s.revisions.filter((r) => r.id !== id) })),

      clearAll: () => set({ revisions: [] }),
    }),
    { name: "cn-cold-revisions" },
  ),
);
