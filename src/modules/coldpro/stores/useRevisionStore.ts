/**
 * useRevisionStore — P3: Controle de Revisões
 *
 * Snapshot imutável dos parâmetros de configuração do Hub por revisão.
 * Persiste em Supabase (product_revisions) com fallback para localStorage.
 * Suporta até 20 revisões em memória. Sync assíncrono: salva localmente
 * de imediato, depois persiste no servidor em background.
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CompressorSpec, CondenserSpec } from "@/modules/coldpro_v2";
import type { EvaporatorFormValue } from "../components/forms/EvaporatorForm";
import type { SystemConditions } from "../components/forms/SystemConditionsForm";
import { supabase } from "@/integrations/supabase/client";

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
  /** Supabase sync status */
  synced?: boolean;
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
    catalogModelId?: string,
  ) => string;
  deleteRevision: (id: string) => void;
  clearAll: () => void;
  loadFromSupabase: (catalogModelId?: string) => Promise<void>;
}

async function persistToSupabase(snap: RevisionSnapshot, catalogModelId?: string) {
  try {
    const { error } = await supabase.from("product_revisions").insert({
      id: snap.id,
      catalog_model_id: catalogModelId ?? null,
      revision_label: snap.label,
      status: "draft",
      note: snap.note ?? null,
      created_by: snap.approved_by ?? null,
      snapshot: {
        compressor: snap.compressor,
        condenser: snap.condenser,
        evaporator: snap.evaporator,
        conditions: snap.conditions,
      },
      created_at: new Date(snap.created_at).toISOString(),
    });
    if (error) {
      console.warn("[RevisionStore] Supabase insert failed (localStorage preserved):", error.message);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export const useRevisionStore = create<RevisionState>()(
  persist(
    (set, get) => ({
      revisions: [],

      saveRevision: (label, data, note, approvedBy, catalogModelId) => {
        const id = `rev-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        const snap: RevisionSnapshot = {
          id,
          label,
          created_at: Date.now(),
          approved_by: approvedBy,
          note,
          synced: false,
          compressor: { ...data.compressor },
          condenser: { ...data.condenser },
          evaporator: { ...data.evaporator },
          conditions: { ...data.conditions },
        };
        set((s) => ({
          revisions: [snap, ...s.revisions].slice(0, MAX_REVISIONS),
        }));
        // Fire-and-forget Supabase sync; mark synced on success
        persistToSupabase(snap, catalogModelId).then((ok) => {
          if (ok) {
            set((s) => ({
              revisions: s.revisions.map((r) =>
                r.id === id ? { ...r, synced: true } : r
              ),
            }));
          }
        });
        return id;
      },

      deleteRevision: (id) =>
        set((s) => ({ revisions: s.revisions.filter((r) => r.id !== id) })),

      clearAll: () => set({ revisions: [] }),

      loadFromSupabase: async (catalogModelId) => {
        try {
          let query = supabase
            .from("product_revisions")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(MAX_REVISIONS);

          if (catalogModelId) {
            query = query.eq("catalog_model_id", catalogModelId);
          }

          const { data, error } = await query;
          if (error || !data) return;

          const loaded: RevisionSnapshot[] = data.map((row) => {
            const snap = (row.snapshot ?? {}) as Record<string, unknown>;
            return {
              id: row.id,
              label: row.revision_label,
              created_at: new Date(row.created_at).getTime(),
              approved_by: row.created_by ?? undefined,
              note: row.note ?? undefined,
              synced: true,
              compressor: (snap.compressor ?? {}) as Partial<CompressorSpec>,
              condenser: (snap.condenser ?? {}) as Partial<CondenserSpec>,
              evaporator: (snap.evaporator ?? {}) as EvaporatorFormValue,
              conditions: (snap.conditions ?? {}) as Partial<SystemConditions>,
            };
          });

          // Merge: server rows take precedence; keep local-only rows (unsynced)
          const localOnly = get().revisions.filter((r) => !r.synced);
          const merged = [...localOnly, ...loaded]
            .filter((r, i, arr) => arr.findIndex((x) => x.id === r.id) === i)
            .slice(0, MAX_REVISIONS);

          set({ revisions: merged });
        } catch {
          // Supabase unavailable — localStorage data remains
        }
      },
    }),
    { name: "cn-cold-revisions" },
  ),
);
