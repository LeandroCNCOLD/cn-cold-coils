import type { ReactNode } from "react";

interface PageContainerProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function PageContainer({ title, subtitle, actions, children }: PageContainerProps) {
  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-3 p-3 sm:p-4 lg:p-5">
      <header className="flex flex-col gap-2 border-b pb-2 sm:flex-row sm:items-start sm:justify-between"
              style={{ borderColor: "var(--border-subtle)" }}>
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-base font-bold leading-tight tracking-wide"
              style={{ color: "var(--text-primary)" }}>{title}</h1>
          {subtitle && (
            <p className="mt-0.5 line-clamp-2 text-xs" style={{ color: "var(--text-muted)" }}>{subtitle}</p>
          )}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-1.5">{actions}</div>}
      </header>
      <div>{children}</div>
    </div>
  );
}
