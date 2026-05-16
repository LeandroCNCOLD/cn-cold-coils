import { Bell, Settings, ChevronRight, Menu } from "lucide-react";
import { useRouterState } from "@tanstack/react-router";
import { useUserModeStore } from "../../stores/useUserModeStore";
import { useSessionStore } from "../../stores/useSessionStore";
import { AIAssistantButton } from "../ai/AIAssistantButton";
import type { UserMode } from "../../types/frontend.types";

const MODE_LABEL: Record<UserMode, string> = {
  basic: "Básico",
  intermediate: "Intermediário",
  professional: "Profissional",
};

const MODE_BADGE: Record<UserMode, string> = {
  basic: "bg-slate-100 text-slate-700",
  intermediate: "bg-blue-100 text-[#1E6FD9]",
  professional: "bg-indigo-100 text-indigo-700",
};

interface TopBarProps {
  onToggleAI: () => void;
  onToggleSidebar?: () => void;
}

interface Crumb {
  label: string;
  isWorkspace?: boolean;
}

function buildCrumbs(pathname: string): Crumb[] {
  const map: Array<{ test: (p: string) => boolean; crumbs: Crumb[] }> = [
    { test: (p) => p === "/coldpro" || p === "/coldpro/", crumbs: [{ label: "Dashboard" }] },
    {
      test: (p) => p.startsWith("/coldpro/cncoils/workspace"),
      crumbs: [{ label: "CN COILS" }, { label: "Workspace", isWorkspace: true }],
    },
    { test: (p) => p.startsWith("/coldpro/cncoils"), crumbs: [{ label: "CN COILS" }] },
    { test: (p) => p.startsWith("/coldpro/components"), crumbs: [{ label: "Componentes" }] },
    { test: (p) => p.startsWith("/coldpro/catalog"), crumbs: [{ label: "Catálogo CN COLD" }] },
    { test: (p) => p.startsWith("/coldpro/assembly"), crumbs: [{ label: "Montagem" }] },
    { test: (p) => p.startsWith("/coldpro/montagem"), crumbs: [{ label: "Montagem" }] },
    { test: (p) => p.startsWith("/coldpro/simulation"), crumbs: [{ label: "Equilíbrio do Sistema" }] },
    { test: (p) => p.startsWith("/coldpro/curve"), crumbs: [{ label: "Curva de Desempenho" }] },
    { test: (p) => p.startsWith("/coldpro/map"), crumbs: [{ label: "Mapa Operacional" }] },
    { test: (p) => p.startsWith("/coldpro/record"), crumbs: [{ label: "Ficha Técnica" }] },
    { test: (p) => p.startsWith("/coldpro/ficha-tecnica"), crumbs: [{ label: "Ficha Técnica" }] },
    { test: (p) => p.startsWith("/coldpro/registry"), crumbs: [{ label: "Registry de Produtos" }] },
    { test: (p) => p.startsWith("/coldpro/export"), crumbs: [{ label: "Exportação" }] },
    { test: (p) => p.startsWith("/coldpro/audit"), crumbs: [{ label: "Auditoria CN COLD" }] },
  ];
  const match = map.find((m) => m.test(pathname));
  return match ? match.crumbs : [{ label: "ColdPro V2" }];
}

export function TopBar({ onToggleAI, onToggleSidebar }: TopBarProps) {
  const mode = useUserModeStore((s) => s.mode);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const activeSession = useSessionStore((s) =>
    s.sessions.find((sess) => sess.id === s.activeSessionId),
  );

  const crumbs = buildCrumbs(pathname);
  const showSession = crumbs.some((c) => c.isWorkspace);

  const modeBadgeStyle: Record<UserMode, React.CSSProperties> = {
    basic:        { background: "var(--bg-600)", color: "var(--text-secondary)" },
    intermediate: { background: "rgba(56,189,248,0.12)", color: "var(--ice-400)", borderColor: "rgba(56,189,248,0.3)" },
    professional: { background: "rgba(99,102,241,0.15)", color: "#a5b4fc", borderColor: "rgba(99,102,241,0.35)" },
  };

  return (
    <header className="app-topbar shrink-0">
      <div className="flex min-w-0 items-center gap-2">
        {/* Hamburger — only on mobile (<lg) */}
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="rounded p-1.5 lg:hidden transition-colors"
            style={{ color: "var(--text-muted)" }}
            aria-label="Abrir menu"
          >
            <Menu className="h-4 w-4" />
          </button>
        )}

        <nav className="flex min-w-0 items-center gap-1 text-xs" aria-label="Breadcrumb">
          <span className="hidden text-[10px] font-bold uppercase tracking-widest sm:inline"
                style={{ color: "var(--text-muted)" }}>
            CN COLD
          </span>
          {crumbs.map((c, i) => {
            const last = i === crumbs.length - 1;
            return (
              <span key={i} className="flex min-w-0 items-center gap-1">
                <ChevronRight className="hidden h-3 w-3 sm:inline" style={{ color: "var(--border-strong)" }} />
                <span className={`truncate font-${last ? "semibold" : "normal"}`}
                      style={{ color: last ? "var(--text-primary)" : "var(--text-muted)" }}>
                  {c.label}
                </span>
              </span>
            );
          })}
          {showSession && (
            <span className="ml-2 hidden items-center gap-1 border-l pl-2 sm:flex"
                  style={{ borderColor: "var(--border-subtle)" }}>
              <span className="text-[10px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                Sessão
              </span>
              {activeSession ? (
                <span className="truncate font-medium" style={{ color: "var(--text-primary)" }}>{activeSession.name}</span>
              ) : (
                <span className="truncate" style={{ color: "var(--text-muted)" }}>Nenhuma ativa</span>
              )}
            </span>
          )}
        </nav>
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        <span
          className="cn-badge hidden text-[10px] sm:inline"
          style={modeBadgeStyle[mode]}
          title="Modo do usuário"
        >
          {MODE_LABEL[mode]}
        </span>

        <AIAssistantButton onClick={onToggleAI} />

        <button type="button" className="rounded p-1.5 transition-colors"
                style={{ color: "var(--text-muted)" }} aria-label="Notificações">
          <Bell className="h-3.5 w-3.5" />
        </button>
        <button type="button" className="rounded p-1.5 transition-colors"
                style={{ color: "var(--text-muted)" }} aria-label="Configurações">
          <Settings className="h-3.5 w-3.5" />
        </button>
      </div>
    </header>
  );
}
