/**
 * CN COLD — Biblioteca de Componentes Base
 * Arquivo: src/components/ui/cn-cold/index.tsx
 *
 * Uso:
 *   import { KpiCard, CnBadge, CnBtn, CheckRow, ModelBadge } from '@/components/ui/cn-cold'
 */

import React from 'react'
import { cn } from '@/lib/utils'   // sua função utilitária de classes

// ─── TIPOS COMPARTILHADOS ────────────────────────────────────────

type Variant = 'ice' | 'green' | 'warn' | 'red' | 'default'
type Status  = 'approved' | 'pending' | 'failed' | 'draft' | 'info'
type CheckStatus = 'pass' | 'fail' | 'warn'
type BtnVariant  = 'primary' | 'ghost' | 'danger' | 'success' | 'agro'

// ─── KPI CARD ────────────────────────────────────────────────────

interface KpiCardProps {
  label:    string
  value:    string | number
  unit?:    string
  variant?: Variant
  className?: string
}

export function KpiCard({ label, value, unit, variant = 'default', className }: KpiCardProps) {
  const variantClass = {
    ice:     'cn-kpi--ice',
    green:   'cn-kpi--green',
    warn:    'cn-kpi--warn',
    red:     'cn-kpi--red',
    default: '',
  }[variant]

  return (
    <div className={cn('cn-kpi', variantClass, className)}>
      <div className="cn-kpi__label">{label}</div>
      <div className="cn-kpi__value">{value}</div>
      {unit && <div className="cn-kpi__unit">{unit}</div>}
    </div>
  )
}

// ─── KPI STRIP ───────────────────────────────────────────────────

interface KpiStripProps {
  cols?:     number
  children:  React.ReactNode
  className?: string
}

export function KpiStrip({ cols = 6, children, className }: KpiStripProps) {
  return (
    <div
      className={cn('cn-kpi-strip', className)}
      style={{ '--cols': cols } as React.CSSProperties}
    >
      {children}
    </div>
  )
}

// ─── BADGE DE STATUS ─────────────────────────────────────────────

const STATUS_LABELS: Record<Status, string> = {
  approved: 'Aprovado',
  pending:  'Pendente',
  failed:   'Falhou',
  draft:    'Rascunho',
  info:     'Info',
}

interface CnBadgeProps {
  status:     Status
  label?:     string
  className?: string
}

export function CnBadge({ status, label, className }: CnBadgeProps) {
  return (
    <span className={cn('cn-badge', `cn-badge--${status}`, className)}>
      {label ?? STATUS_LABELS[status]}
    </span>
  )
}

// ─── BOTÃO ───────────────────────────────────────────────────────

interface CnBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariant
  size?:    'sm' | 'md' | 'lg'
  icon?:    React.ReactNode
}

export function CnBtn({
  variant = 'ghost',
  size = 'md',
  icon,
  children,
  className,
  ...props
}: CnBtnProps) {
  return (
    <button
      className={cn(
        'cn-btn',
        `cn-btn--${variant}`,
        size !== 'md' && `cn-btn--${size}`,
        className,
      )}
      {...props}
    >
      {icon && <span className="cn-btn__icon">{icon}</span>}
      {children}
    </button>
  )
}

// ─── CARD ────────────────────────────────────────────────────────

interface CnCardProps {
  title?:     string
  glow?:      boolean
  children:   React.ReactNode
  action?:    React.ReactNode
  className?: string
}

export function CnCard({ title, glow, children, action, className }: CnCardProps) {
  return (
    <div className={cn('cn-card', glow && 'cn-card--glow', className)}>
      {(title || action) && (
        <div className="flex items-center justify-between mb-3">
          {title && <span className="cn-label">{title}</span>}
          {action}
        </div>
      )}
      {children}
    </div>
  )
}

// ─── CHECK ROW (validação) ────────────────────────────────────────

const CHECK_ICONS: Record<CheckStatus, string> = {
  pass: '✓',
  fail: '✗',
  warn: '⚠',
}

interface CheckRowProps {
  label:      string
  status:     CheckStatus
  result?:    string
  className?: string
}

export function CheckRow({ label, status, result, className }: CheckRowProps) {
  return (
    <div className={cn('cn-check-row', `cn-check-row--${status}`, className)}>
      <span className="cn-check-icon">{CHECK_ICONS[status]}</span>
      <span className="cn-check-text">{label}</span>
      {result && <span className="cn-check-result">{result}</span>}
    </div>
  )
}

// ─── MODEL BADGE (topbar) ────────────────────────────────────────

interface ModelBadgeProps {
  children:   React.ReactNode
  agro?:      boolean
  className?: string
}

export function ModelBadge({ children, agro, className }: ModelBadgeProps) {
  return (
    <span
      className={cn('cn-model-badge', className)}
      style={agro ? { borderColor: 'var(--color-agro-light)', color: 'var(--color-agro)' } : {}}
    >
      {children}
    </span>
  )
}

// ─── SECTION LABEL ───────────────────────────────────────────────

interface SectionLabelProps {
  children:   React.ReactNode
  className?: string
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div className={cn('section-label flex items-center gap-2 mb-2', className)}>
      {children}
      <div className="flex-1 h-px bg-border-subtle" />
    </div>
  )
}

// ─── SEMÁFORO DOT ────────────────────────────────────────────────

interface SemaDotProps {
  color: 'g' | 'y' | 'r'
  pulse?: boolean
}

export function SemaDot({ color, pulse }: SemaDotProps) {
  return (
    <span
      className={cn('cn-sema-dot', `cn-sema-dot--${color}`, pulse && 'cn-dot-live')}
    />
  )
}

// ─── VERDICT BANNER ──────────────────────────────────────────────

interface VerdictProps {
  status:   'approved' | 'warning' | 'failed'
  title:    string
  subtitle?: string
  icon?:    string
}

export function Verdict({ status, title, subtitle, icon }: VerdictProps) {
  const icons = { approved: '✓', warning: '⚠', failed: '✗' }
  return (
    <div className={cn('cn-verdict', `cn-verdict--${status}`)}>
      <span style={{ fontSize: '1.25rem' }}>{icon ?? icons[status]}</span>
      <div>
        <div>{title}</div>
        {subtitle && (
          <div style={{ fontSize: '0.6875rem', fontWeight: 400, marginTop: 2, opacity: 0.8 }}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── TIMELINE DE REVISÕES ────────────────────────────────────────

interface TimelineItemProps {
  rev:      string
  date:     string
  author:   string
  active?:  boolean
  changes?: string[]
}

export function TimelineItem({ rev, date, author, active, changes }: TimelineItemProps) {
  return (
    <div className="cn-timeline-item">
      <div className={cn('cn-timeline-dot', active ? 'cn-timeline-dot--active' : 'cn-timeline-dot--done')}>
        {rev}
      </div>
      <div style={{ flex: 1, paddingTop: 2 }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: active ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
          Rev. {rev} {active && '— Ativo'}
        </div>
        <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', marginTop: 1 }}>
          {date} · {author}
        </div>
        {changes && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
            {changes.map(c => (
              <span key={c} className="cn-change-tag" style={{ opacity: active ? 1 : 0.5 }}>{c}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── GLOW LINE ───────────────────────────────────────────────────

export function GlowLine({ className }: { className?: string }) {
  return <div className={cn('cn-glow-line', className)} />
}

// ─── CHANGE TAG ──────────────────────────────────────────────────

export function ChangeTag({ children }: { children: React.ReactNode }) {
  return <span className="cn-change-tag">{children}</span>
}

// ─── EXPORTAÇÕES ─────────────────────────────────────────────────

export default {
  KpiCard, KpiStrip, CnBadge, CnBtn, CnCard,
  CheckRow, ModelBadge, SectionLabel, SemaDot,
  Verdict, TimelineItem, GlowLine, ChangeTag,
}
