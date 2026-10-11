import type { Lang } from './i18n';

export type CsvCell = string | number;
export interface ExportCSVProps {
  lang: Lang;
  filename: string;
  headers: string[];
  rows: CsvCell[][];
}

function toCsvCell(cell: CsvCell): string {
  const s = String(cell);
  return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function buildCsv(headers: string[], rows: CsvCell[][]): string {
  const lines = [headers.map(toCsvCell).join(','), ...rows.map((r) => r.map(toCsvCell).join(','))];
  return '\uFEFF' + lines.join('\n');
}

export function downloadCsv(filename: string, headers: string[], rows: CsvCell[][]): void {
  const csv = buildCsv(headers, rows);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.csv') ? filename : `${filename}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function ExportCSV({ lang, filename, headers, rows }: ExportCSVProps) {
  const label = lang === 'es' ? 'Exportar CSV' : 'Export CSV';
  return (
    <button
      type="button"
      onClick={() => downloadCsv(filename, headers, rows)}
      style={btnPrimary}
      aria-label={label}
    >
      {label}
    </button>
  );
}

export function PrintButton({ lang }: { lang: Lang }) {
  const label = lang === 'es' ? 'Imprimir' : 'Print';
  return (
    <button type="button" onClick={() => window.print()} style={btnSecondary} aria-label={label}>
      {label}
    </button>
  );
}

const btnPrimary: React.CSSProperties = {
  backgroundColor: '#cc785c',
  color: '#ffffff',
  border: 'none',
  borderRadius: 8,
  padding: '12px 20px',
  minHeight: 40,
  fontSize: 14,
  fontWeight: 500,
  cursor: 'pointer',
};

const btnSecondary: React.CSSProperties = {
  backgroundColor: '#faf9f5',
  color: '#141413',
  border: '1px solid #e6dfd8',
  borderRadius: 8,
  padding: '12px 20px',
  minHeight: 40,
  fontSize: 14,
  fontWeight: 500,
  cursor: 'pointer',
};
