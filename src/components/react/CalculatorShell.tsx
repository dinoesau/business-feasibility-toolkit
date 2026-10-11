import type { ReactNode } from 'react';
import type { Lang } from './i18n';
import { ExportCSV, PrintButton, type CsvCell } from './ExportCSV';

// Uniform shell (diseno C): form en tarjeta crema, resultado destacado en dark,
// grafico en crema, acciones CSV + print. Composicion por slots, sin logica.
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
    <div className="rts">
      <h1 style={{ marginBottom: 0 }}>{title}</h1>
      <p className="rts-lede">{description}</p>
      <div className="rts-grid">
        <section className="rts-panel" aria-label={lang === 'es' ? 'Entradas' : 'Inputs'}>
          {form}
        </section>
        <section className="rts-result" aria-label={lang === 'es' ? 'Resultados' : 'Results'} aria-live="polite">
          {results}
        </section>
      </div>
      {chart ? (
        <section className="rts-chart" aria-label={lang === 'es' ? 'Gráfico' : 'Chart'}>
          {chart}
        </section>
      ) : null}
      <div className="rts-actions">
        <ExportCSV lang={lang} filename={csvFilename} headers={csvHeaders} rows={csvRows} />
        <PrintButton lang={lang} />
      </div>
      <p style={{ marginTop: 16 }}>
        <a href={backHref} style={{ color: 'var(--primary)', fontWeight: 500, textDecoration: 'none', fontSize: 14 }}>
          {backLabel}
        </a>
      </p>
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
    <label htmlFor={htmlFor} className="rts-field">
      <span>{label}</span>
      {children}
      {error ? (
        <span role="alert" className="rts-err">
          {error}
        </span>
      ) : null}
    </label>
  );
}

export const inputStyle: React.CSSProperties = {
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
    <div className={strong ? 'rts-row big' : 'rts-row'}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
