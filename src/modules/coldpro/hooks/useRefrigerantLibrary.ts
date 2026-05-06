// Catálogo de fluidos refrigerantes (puros + misturas) com carregamento
// "estilo Spotify": índice leve em memória + localStorage; detalhes
// completos buscados sob demanda e cacheados individualmente.

import { useEffect, useState } from "react";

export interface RefrigerantIndexEntry {
  id: string;
  name: string;
  shortName: string | null;
  fileName: string | null;
  cas: string | null;
  chemicalName: string | null;
  chemicalFormula: string | null;
  commercialName: string | null;
  synonym: string | null;
  maxTempC: number | null;
  maxPressKPa: number | null;
  isMixture: boolean;
  cncoils?: boolean;
}

export interface RefrigerantDetail {
  id: number;
  name: string;
  description_id?: number;
  cas?: string | null;
  chemical_name?: string | null;
  n_applications?: number;
  fast_calc?: boolean;
  max_velocity_ms?: number;
  [k: string]: unknown;
}

export interface RefrigerantLibraryState {
  loading: boolean;
  error: string | null;
  index: RefrigerantIndexEntry[];
  source: "memory" | "storage" | "network" | null;
}

const INDEX_VERSION = "v1";
const INDEX_KEY = `coldpro:refrigerants:index:${INDEX_VERSION}`;
const DETAIL_KEY = (name: string) =>
  `coldpro:refrigerants:detail:${INDEX_VERSION}:${name.toUpperCase()}`;

let memCache: RefrigerantIndexEntry[] | null = null;
let inflight: Promise<RefrigerantIndexEntry[]> | null = null;

function readStorageIndex(): RefrigerantIndexEntry[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(INDEX_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as RefrigerantIndexEntry[];
    if (!Array.isArray(parsed) || parsed.length === 0) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeStorageIndex(data: RefrigerantIndexEntry[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(INDEX_KEY, JSON.stringify(data));
  } catch {
    // quota cheia / modo privado — ignorar silenciosamente
  }
}

async function fetchIndex(): Promise<RefrigerantIndexEntry[]> {
  const [pure, mixtures] = await Promise.all([
    fetch("/data/catalogs/refrigerantsPure.json", { cache: "force-cache" }).then(
      (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status} (puros)`);
        return r.json() as Promise<RefrigerantIndexEntry[]>;
      },
    ),
    fetch("/data/catalogs/refrigerantsMixtures.json", { cache: "force-cache" }).then(
      (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status} (misturas)`);
        return r.json() as Promise<RefrigerantIndexEntry[]>;
      },
    ),
  ]);
  // Concatena e ordena por nome (curto), priorizando os habilitados em CN Coils.
  const all = [...pure, ...mixtures].sort((a, b) => {
    if (!!b.cncoils !== !!a.cncoils) return b.cncoils ? 1 : -1;
    return (a.shortName ?? a.name).localeCompare(b.shortName ?? b.name);
  });
  return all;
}

async function loadIndex(): Promise<RefrigerantIndexEntry[]> {
  if (memCache) return memCache;
  if (inflight) return inflight;
  inflight = fetchIndex()
    .then((data) => {
      memCache = data;
      writeStorageIndex(data);
      return data;
    })
    .finally(() => {
      inflight = null;
    });
  return inflight;
}

/**
 * Hook principal. Devolve o índice completo de refrigerantes.
 * - 1ª render: tenta carregar do localStorage instantaneamente (source: "storage").
 * - Em paralelo, busca a versão atualizada da rede e atualiza (source: "network").
 * - Próximas montagens: cache em memória (source: "memory").
 */
export function useRefrigerantLibrary(): RefrigerantLibraryState {
  const [state, setState] = useState<RefrigerantLibraryState>(() => {
    if (memCache) {
      return { loading: false, error: null, index: memCache, source: "memory" };
    }
    const fromStorage = readStorageIndex();
    if (fromStorage) {
      memCache = fromStorage;
      return { loading: false, error: null, index: fromStorage, source: "storage" };
    }
    return { loading: true, error: null, index: [], source: null };
  });

  useEffect(() => {
    let cancelled = false;
    // Sempre revalida na rede (a menos que já tenhamos carregado nesta sessão).
    if (state.source === "memory") return;
    loadIndex()
      .then((data) => {
        if (cancelled) return;
        setState({ loading: false, error: null, index: data, source: "network" });
      })
      .catch((err) => {
        if (cancelled) return;
        setState((prev) => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : String(err),
        }));
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}

/** Busca os detalhes "pesados" (termodinâmica) de um refrigerante puro pelo nome. */
export async function fetchRefrigerantDetail(
  name: string,
): Promise<RefrigerantDetail | null> {
  if (typeof window !== "undefined") {
    try {
      const cached = window.localStorage.getItem(DETAIL_KEY(name));
      if (cached) return JSON.parse(cached) as RefrigerantDetail;
    } catch {
      /* ignore */
    }
  }

  // Por enquanto o "detalhe" vem do mesmo arquivo *_full*; futuramente poderá
  // ser substituído por uma chamada a uma server function que consulta o banco.
  const res = await fetch("/data/catalogs/refrigerantsPure_full.json", {
    cache: "force-cache",
  });
  if (!res.ok) return null;
  const list = (await res.json()) as RefrigerantDetail[];
  const upper = name.toUpperCase();
  const found = list.find((d) => (d.name ?? "").toUpperCase() === upper) ?? null;
  if (found && typeof window !== "undefined") {
    try {
      window.localStorage.setItem(DETAIL_KEY(name), JSON.stringify(found));
    } catch {
      /* ignore */
    }
  }
  return found;
}

/** Hook utilitário para buscar detalhe sob demanda. */
export function useRefrigerantDetail(name: string | null) {
  const [state, setState] = useState<{
    loading: boolean;
    error: string | null;
    detail: RefrigerantDetail | null;
  }>({ loading: false, error: null, detail: null });

  useEffect(() => {
    if (!name) {
      setState({ loading: false, error: null, detail: null });
      return;
    }
    let cancelled = false;
    setState({ loading: true, error: null, detail: null });
    fetchRefrigerantDetail(name)
      .then((d) => {
        if (!cancelled) setState({ loading: false, error: null, detail: d });
      })
      .catch((err) => {
        if (!cancelled)
          setState({
            loading: false,
            error: err instanceof Error ? err.message : String(err),
            detail: null,
          });
      });
    return () => {
      cancelled = true;
    };
  }, [name]);

  return state;
}
