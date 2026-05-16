import { Link } from "@tanstack/react-router";
import {
  Activity,
  TrendingUp,
  Map,
  FileText,
  Database,
  ShieldCheck,
  Plus,
  ArrowRight,
} from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import { useSessionStore } from "../stores/useSessionStore";
import { useUserModeStore } from "../stores/useUserModeStore";
import { useTranslation } from "@/i18n/useTranslation";

const MODULES = [
  {
    to: "/coldpro/simulation",
    labelKey: "navigation.systemEquilibrium",
    description: "Resolve o equilíbrio termodinâmico completo do sistema.",
    Icon: Activity,
  },
  {
    to: "/coldpro/curve",
    labelKey: "navigation.performanceCurve",
    description: "Gera a curva capacidade × temperatura do produto.",
    Icon: TrendingUp,
  },
  {
    to: "/coldpro/map",
    labelKey: "navigation.operatingMap",
    description: "Mapa multivariável de operação do equipamento.",
    Icon: Map,
  },
  {
    to: "/coldpro/record",
    labelKey: "navigation.productRecord",
    description: "Ficha técnica final auditada do produto.",
    Icon: FileText,
  },
  {
    to: "/coldpro/registry",
    labelKey: "navigation.productRegistry",
    description: "Registro de produtos versionados e auditados.",
    Icon: Database,
  },
  {
    to: "/coldpro/audit",
    labelKey: "navigation.audit",
    description: "Audita o catálogo CN COLD contra o motor.",
    Icon: ShieldCheck,
  },
] as const;

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

export function DashboardPage() {
  const { t } = useTranslation();
  const sessions = useSessionStore((s) => s.sessions);
  const activeSessionId = useSessionStore((s) => s.activeSessionId);
  const createSession = useSessionStore((s) => s.createSession);
  const setActiveSession = useSessionStore((s) => s.setActiveSession);
  const mode = useUserModeStore((s) => s.mode);

  const recent = [...sessions]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5);

  const handleNewSession = () => {
    const stamp = new Date().toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
    createSession(`Sessão ${stamp}`, mode);
  };

  return (
    <PageContainer
      title={t("dashboard.title")}
      subtitle={t("dashboard.subtitle")}
      actions={
        <button
          type="button"
          onClick={handleNewSession}
          className="cn-btn cn-btn--primary inline-flex items-center gap-1.5 px-3 py-2 text-sm"
        >
          <Plus className="h-4 w-4" />
          {t("dashboard.newSession")}
        </button>
      }
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="cn-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{t("dashboard.recentSessions")}</h2>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              {sessions.length} {t("dashboard.total")}
            </span>
          </div>

          {recent.length === 0 ? (
            <div className="mt-4 rounded-md border border-dashed p-6 text-center text-sm"
                 style={{ borderColor: "var(--border-subtle)", color: "var(--text-muted)" }}>
              {t("dashboard.emptySessions")}
            </div>
          ) : (
            <ul className="mt-4 divide-y" style={{ borderColor: "var(--border-subtle)" }}>
              {recent.map((s) => {
                const isActive = s.id === activeSessionId;
                return (
                  <li
                    key={s.id}
                    className="flex items-center justify-between gap-3 py-2.5 text-sm"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium" style={{ color: "var(--text-primary)" }}>{s.name}</p>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {formatDateTime(s.createdAt)} · {t("dashboard.mode")} {s.mode}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveSession(s.id)}
                      className={`shrink-0 rounded-md px-2.5 py-1 text-xs font-medium transition ${
                        isActive ? "cn-btn cn-btn--primary" : "cn-btn"
                      }`}
                    >
                      {isActive ? t("common.active") : t("common.select")}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="cn-card p-5">
          <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{t("dashboard.engineStatus")}</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <dt style={{ color: "var(--text-muted)" }}>{t("dashboard.version")}</dt>
              <dd className="font-mono font-medium" style={{ color: "var(--text-primary)" }}>ColdPro V2</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt style={{ color: "var(--text-muted)" }}>{t("dashboard.currentMode")}</dt>
              <dd className="font-medium capitalize" style={{ color: "var(--ice-400)" }}>{mode}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt style={{ color: "var(--text-muted)" }}>{t("dashboard.memorySessions")}</dt>
              <dd className="font-mono font-medium" style={{ color: "var(--text-primary)" }}>{sessions.length}</dd>
            </div>
          </dl>
        </section>
      </div>

      <section className="mt-6">
        <h2 className="mb-3 text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>{t("dashboard.availableModules")}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m) => {
            const Icon = m.Icon;
            return (
              <Link
                key={m.to}
                to={m.to}
                className="cn-card group flex flex-col gap-2 p-4 transition-all hover:border-[--ice-400]/40 hover:shadow-[0_0_12px_rgba(56,189,248,0.08)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md"
                       style={{ background: "rgba(56,189,248,0.12)", color: "var(--ice-400)" }}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5"
                              style={{ color: "var(--border-strong)" }} />
                </div>
                <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{t(m.labelKey)}</h3>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{m.description}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </PageContainer>
  );
}
