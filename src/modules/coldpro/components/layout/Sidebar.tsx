import { Link, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FlaskConical,
  Gauge,
  FileText,
  Database,
  Library,
  ShieldCheck,
  Settings,
  Terminal,
  LogOut,
  BookOpen,
  Cpu,
  Wrench,
  ClipboardList,
  Package,
  ChevronDown,
  ChevronRight,
  Sprout,
  Cog,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/useTranslation";
import { useAuth } from "@/lib/auth";

type NavItem = {
  to: string;
  label: string;
  Icon: typeof LayoutDashboard;
  exact?: boolean;
  badge?: string;
};

const NAV_PROJETOS: NavItem[] = [
  { to: "/coldpro", label: "navigation.dashboard", Icon: LayoutDashboard, exact: true },
];

const NAV_ENGENHARIA: NavItem[] = [
  { to: "/coldpro/catalog", label: "navigation.catalogSelection", Icon: Database },
  { to: "/coldpro/cncoils", label: "navigation.cnCoilsSimulator", Icon: Gauge },
  { to: "/coldpro/hub-de-testes", label: "navigation.testHub", Icon: FlaskConical },
  { to: "/coldpro/application-engineering", label: "navigation.applicationEngineering", Icon: Cog },
  { to: "/coldpro/agro", label: "AGRO", Icon: Sprout },
];

const NAV_CADASTROS: NavItem[] = [
  { to: "/coldpro/components", label: "navigation.components", Icon: Cpu },
  { to: "/coldpro/library", label: "navigation.library", Icon: Library },
  { to: "/coldpro/record", label: "navigation.productRecord", Icon: ClipboardList },
  { to: "/coldpro/registry", label: "navigation.productRegistry", Icon: BookOpen },
  { to: "/coldpro/assembly", label: "navigation.assembly", Icon: Wrench },
];

const NAV_DOCUMENTACAO: NavItem[] = [
  { to: "/coldpro/ficha-tecnica", label: "navigation.technicalSheet", Icon: FileText },
  { to: "/coldpro/export", label: "navigation.export", Icon: Package },
];

const NAV_ADMIN: NavItem[] = [
  { to: "/coldpro/audit", label: "navigation.audit", Icon: ShieldCheck },
  { to: "/coldpro/settings", label: "navigation.settings", Icon: Settings },
  { to: "/coldpro/dev", label: "DevAssistant", Icon: Terminal },
];

function NavSection({
  title,
  items,
  collapsible = false,
  defaultOpen = true,
}: {
  title: string;
  items: NavItem[];
  collapsible?: boolean;
  defaultOpen?: boolean;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="mb-2">
      <button
        type="button"
        onClick={() => collapsible && setOpen((v) => !v)}
        className={`cn-nav-section flex w-full items-center justify-between ${collapsible ? "cursor-pointer" : "cursor-default"}`}
      >
        <span>{title}</span>
        {collapsible && (
          open
            ? <ChevronDown className="h-3 w-3" style={{ color: "var(--text-muted)" }} />
            : <ChevronRight className="h-3 w-3" style={{ color: "var(--text-muted)" }} />
        )}
      </button>
      {open && (
        <ul className="space-y-0.5 mt-0.5">
          {items.map((item) => {
            const Icon = item.Icon;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.exact ?? false }}
                  activeProps={{ className: "cn-nav-item active flex items-center gap-2.5" }}
                  inactiveProps={{ className: "cn-nav-item flex items-center gap-2.5" }}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate flex-1">{t(item.label)}</span>
                  {item.badge && (
                    <span className="ml-auto rounded px-1.5 py-0.5 text-[10px] font-semibold"
                          style={{ background: "var(--bg-500)", color: "var(--ice-400)" }}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function Sidebar({ onClose: _onClose }: { onClose?: () => void } = {}) {
  const { t } = useTranslation();
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="app-sidebar flex h-full flex-col" style={{ width: "var(--sidebar-w, 240px)" }}>
      {/* Logo mark */}
      <div className="flex items-center gap-3 border-b px-5 py-4"
           style={{ borderColor: "var(--border-subtle)" }}>
        <div className="flex h-9 w-9 items-center justify-center rounded-md font-display font-black text-white text-base"
             style={{ background: "linear-gradient(135deg, var(--ice-600), var(--ice-400))" }}>
          CN
        </div>
        <div className="min-w-0">
          <p className="font-display font-bold text-lg tracking-wide"
             style={{ color: "var(--text-primary)", lineHeight: 1.1 }}>
            CN COLD
          </p>
          <p className="text-[10px] font-semibold uppercase tracking-widest"
             style={{ color: "var(--ice-400)" }}>
            Engenharia
          </p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        <NavSection title={t("navigation.sectionProjects")} items={NAV_PROJETOS} />
        <NavSection title={t("navigation.sectionEngineering")} items={NAV_ENGENHARIA} />
        <NavSection
          title={t("navigation.sectionCadastros")}
          items={NAV_CADASTROS}
          collapsible
          defaultOpen={true}
        />
        <NavSection title={t("navigation.sectionDocumentation")} items={NAV_DOCUMENTACAO} collapsible defaultOpen={false} />
        {isAdmin && (
          <NavSection title={t("navigation.sectionAdmin")} items={NAV_ADMIN} collapsible defaultOpen={false} />
        )}
      </nav>

      <div className="border-t px-4 py-3 space-y-2"
           style={{ borderColor: "var(--border-subtle)" }}>
        <div>
          <p className="truncate text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
            {user?.user_metadata?.full_name || user?.email}
          </p>
          <p className="truncate text-[10px]" style={{ color: "var(--text-muted)" }}>
            {isAdmin ? t("common.administrator") : t("common.engineer")}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2"
          style={{ color: "var(--text-secondary)" }}
          onClick={async () => {
            await signOut();
            navigate({ to: "/auth" });
          }}
        >
          <LogOut className="h-4 w-4" />
          {t("common.signOut")}
        </Button>
      </div>
    </aside>
  );
}
