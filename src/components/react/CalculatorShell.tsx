import type { CSSProperties, ReactNode } from 'react';
import type { Lang } from './i18n';
import { ExportCSV, PrintButton, type CsvCell } from './ExportCSV';

// Uniform shell: form left, results right, chart below, Export CSV + Print.
// Composition-based (slots) to avoid prop-drilling. No calculation logic here.
export interface CalculatorShellProps {
  lang: Lang;
  title: string;
  description: string;
  backHref: string;
  form: ReactNode;
  results: ReactNode;
  chart?: ReactNode;
  csvFilename: string;
  csvHeaders: string[];
  csvRows: CsvCell[][];
}

export function CalculatorShell({
  lang,
  title,
  description,
  backHref,
  form,
  results,
  chart,
  csvFilename,
  csvHeaders,
  csvRows,
}: CalculatorShellProps) {
  const backLabel = lang === 'es' ? '← Calculadoras' : '← Calculators';
  return (
    <div style={wrap}>
      <a href={backHref} style={backLink}>
        {backLabel}
      </a>
      <h1 style={h1}>{title}</h1>
      <p style={lede}>{description}</p>
      <div style={grid}>
        <section style={card} aria-label={lang === 'es' ? 'Entradas' : 'Inputs'}>
          {form}
        </section>
        <section style={card} aria-label={lang === 'es' ? 'Resultados' : 'Results'} aria-live="polite">
          {results}
        </section>
      </div>
      {chart ? (
        <section style={{ ...card, marginTop: 24 }} aria-label={lang === 'es' ? 'Gráfico' : 'Chart'}>
          {chart}
        </section>
      ) : null}
      <div style={actions}>
        <ExportCSV lang={lang} filename={csvFilename} headers={csvHeaders} rows={csvRows} />
        <PrintButton lang={lang} />
      </div>
    </div>
  );
}

export function Field({
  label,
  error,
  children,
  htmlFor,
}: {
  label: string;
  error?: string | null;
  children: ReactNode;
  htmlFor?: string;
}) {
  return (
    <label htmlFor={htmlFor} style={fieldWrap}>
      <span style={fieldLabel}>{label}</span>
      {children}
      {error ? (
        <span role="alert" style={fieldError}>
          {error}
        </span>
      ) : null}
    </label>
  );
}

export const inputStyle: CSSProperties = {
  backgroundColor: '#faf9f5',
  color: '#141413',
  border: '1px solid #e6dfd8',
  borderRadius: 8,
  padding: '10px 14px',
  height: 40,
  fontSize: 16,
  width: '100%',
  boxSizing: 'border-box',
};

export function ResultRow({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div style={resultRow}>
      <span style={{ color: '#6c6a64', fontSize: 14 }}>{label}</span>
      <strong style={{ fontSize: strong ? 22 : 16, color: '#141413' }}>{value}</strong>
    </div>
  );
}

const wrap: CSSProperties = { maxWidth: 1200, margin: '0 auto', padding: '48px 24px 96px' };
const backLink: CSSProperties = { color: '#cc785c', fontSize: 14, fontWeight: 500, textDecoration: 'none' };
const h1: CSSProperties = {
  fontFamily: 'Cormorant Garamond, EB Garamond, Georgia, serif',
  fontSize: 36,
  fontWeight: 400,
  letterSpacing: -0.5,
  color: '#141413',
  margin: '16px 0 8px',
};
const lede: CSSProperties = { color: '#3d3d3a', fontSize: 16, lineHeight: 1.55, maxWidth: 720 };
const grid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: 24,
  marginTop: 32,
};
const card: CSSProperties = {
  backgroundColor: '#efe9de',
  borderRadius: 12,
  padding: 32,
};
const actions: CSSProperties = { display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' };
const fieldWrap: CSSProperties = { display: 'block', marginBottom: 16 };
const fieldLabel: CSSProperties = { display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 6, color: '#141413' };
const fieldError: CSSProperties = { display: 'block', fontSize: 13, color: '#c64545', marginTop: 4 };
const resultRow: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  gap: 12,
  padding: '10px 0',
  borderBottom: '1px solid #e6dfd8',
};
