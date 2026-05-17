import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

type StatusFilter = "all" | "PASS" | "FAIL";

interface ValidationRow {
  id: string;
  catalog_model_id: string | null;
  validated_at: string;
  overall_status: string;
  score_pct: number | null;
  engine_version: string | null;
  criteria: unknown;
}

interface Summary { total: number; pass: number; fail: number; avgScore: number; }

export function useValidationDashboard() {
  const [allRows, setAllRows]     = useState<ValidationRow[]>([]);
  const [filter, setFilter]       = useState<StatusFilter>("all");
  const [isLoading, setLoading]   = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [lastUpdated, setUpdated] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from("validation_results")
        .select("id, catalog_model_id, validated_at, overall_status, score_pct, engine_version, criteria")
        .order("validated_at", { ascending: false })
        .limit(500);

      if (err) throw new Error(err.message);
      setAllRows((data ?? []) as ValidationRow[]);
      setUpdated(new Date().toISOString());
    } catch (e) {
      setError(String(e instanceof Error ? e.message : e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const rows = filter === "all" ? allRows : allRows.filter((r) => r.overall_status === filter);

  const summary: Summary = {
    total:    allRows.length,
    pass:     allRows.filter((r) => r.overall_status === "PASS").length,
    fail:     allRows.filter((r) => r.overall_status === "FAIL").length,
    avgScore: allRows.length > 0
      ? allRows.reduce((s, r) => s + (r.score_pct ?? 0), 0) / allRows.length
      : 0,
  };

  return { rows, summary, filter, setFilter, isLoading, error, refresh, lastUpdated };
}
