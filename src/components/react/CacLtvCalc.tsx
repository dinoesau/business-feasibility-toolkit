import { useMemo, useState } from 'react';
import { CalculatorShell, Field, ResultRow, inputStyle } from './CalculatorShell';
import { BarChart } from './Charts';
import { formatCurrency, formatNumber, parseNum, validateNumber, type Lang } from './i18n';

/**
 * CAC / LTV.
 *
 * Given-When-Then:
 * - Given CAC=500, ARPA=200, margen=80%, churn=5%, When computed, Then LTV=3_200, ratio=6.4, payback≈3.1 meses.
 * - Given churn=0, When computed, Then ratio no finito → mostrar "—" sin romper.
 * - Given ratio < 3, When rendered, Then aviso "unit economics débil".
 * 12 Factors III/V: props lang/currency, cálculo cliente puro.
 */
// TODO(lib): import { type CacLtvInput, type CacLtvResult } from '../../lib/cac-ltv' when available.
export interface CacLtvInput {
  cac: number;
  arpa: number;
  grossMarginPct: number;
  churnPct: number;
}
export interface CacLtvResult {
  ltv: number;
  ratio: number;
  paybackMonths: number;
}

export function calculateCacLtv(input: CacLtvInput): CacLtvResult {
  const { cac, arpa, grossMarginPct, churnPct } = input;
  if (![cac, arpa, grossMarginPct, churnPct].every(Number.isFinite))
    return { ltv: NaN, ratio: NaN, paybackMonths: NaN };
  if (cac <= 0 || arpa < 0 || grossMarginPct < 0 || grossMarginPct > 100 || churnPct < 0)
    return { ltv: NaN, ratio: NaN, paybackMonths: NaN };
  const monthlyGross = arpa * (grossMarginPct / 100);
  const ltv = churnPct === 0 ? (monthlyGross === 0 ? NaN : Infinity) : monthlyGross / (churnPct / 100);
  const ratio = Number.isFinite(ltv) ? ltv / cac : Infinity;
  const paybackMonths = monthlyGross > 0 ? cac / monthlyGross : NaN;
  return { ltv, ratio, paybackMonths };
}

export default function CacLtvCalc({ lang, currency }: { lang: Lang; currency?: string }) {
  const [cac, setCac] = useState('500');
  const [arpa, setArpa] = useState('200');
  const [margin, setMargin] = useState('80');
  const [churn, setChurn] = useState('5');

  const eCac = validateNumber(cac, lang, { allowZero: false });
  const eArpa = validateNumber(arpa, lang, { min: 0 });
  const eMargin = validateNumber(margin, lang, { min: 0, max: 100 });
  const eChurn = validateNumber(churn, lang, { min: 0, max: 100 });
  const valid = !eCac && !eArpa && !eMargin && !eChurn;

  const r = useMemo(
    () =>
      calculateCacLtv({
        cac: parseNum(cac),
        arpa: parseNum(arpa),
        grossMarginPct: parseNum(margin),
        churnPct: parseNum(churn),
      }),
    [cac, arpa, margin, churn],
  );
  const weak = valid && Number.isFinite(r.ratio) && r.ratio < 3;

  const fmt = (n: number) => (Number.isFinite(n) ? formatCurrency(n, lang, currency) : '—');

  return (
    <CalculatorShell
      lang={lang}
      title="CAC / LTV"
      description={
        lang === 'es'
          ? '¿Tu adquisición es rentable? Regla sana: LTV/CAC ≥ 3.'
          : 'Is acquisition profitable? Healthy rule: LTV/CAC ≥ 3.'
      }
      backHref={`${import.meta.env.BASE_URL}${lang === 'es' ? 'es/calculadoras/' : 'en/calculators/'}`}
      csvFilename="cac-ltv"
      csvHeaders={['ltv', 'ratio', 'payback_months']}
      csvRows={valid ? [[r.ltv, r.ratio, r.paybackMonths]] : []}
      form={
        <>
          <Field label="CAC ($)" error={eCac} htmlFor="cac">
            <input id="cac" style={inputStyle} inputMode="decimal" value={cac} onChange={(e) => setCac(e.target.value)} />
          </Field>
          <Field label={lang === 'es' ? 'Ingreso mensual / cliente ($)' : 'Monthly revenue / customer ($)'} error={eArpa} htmlFor="arpa">
            <input id="arpa" style={inputStyle} inputMode="decimal" value={arpa} onChange={(e) => setArpa(e.target.value)} />
          </Field>
          <Field label={lang === 'es' ? 'Margen bruto (%)' : 'Gross margin (%)'} error={eMargin} htmlFor="cac-margin">
            <input id="cac-margin" style={inputStyle} inputMode="decimal" value={margin} onChange={(e) => setMargin(e.target.value)} />
          </Field>
          <Field label={lang === 'es' ? 'Churn mensual (%)' : 'Monthly churn (%)'} error={eChurn} htmlFor="churn">
            <input id="churn" style={inputStyle} inputMode="decimal" value={churn} onChange={(e) => setChurn(e.target.value)} />
          </Field>
        </>
      }
      results={
        valid ? (
          <>
            <ResultRow label="LTV" value={fmt(r.ltv)} strong />
            <ResultRow label="LTV / CAC" value={Number.isFinite(r.ratio) ? formatNumber(r.ratio, lang, 1) : '—'} strong />
            <ResultRow
              label={lang === 'es' ? 'Payback (meses)' : 'Payback (months)'}
              value={Number.isFinite(r.paybackMonths) ? formatNumber(r.paybackMonths, lang, 1) : '—'}
            />
            {weak ? (
              <p role="alert" style={{ color: '#c64545', fontSize: 14 }}>
                {lang === 'es' ? 'Unit economics débil: sube precio/retención o baja CAC.' : 'Weak unit economics: raise price/retention or lower CAC.'}
              </p>
            ) : null}
          </>
        ) : (
          <p style={{ color: '#6c6a64' }}>{lang === 'es' ? 'Corrige los campos para ver resultados.' : 'Fix the fields to see results.'}</p>
        )
      }
      chart={
        valid && Number.isFinite(r.ltv) ? (
          <BarChart
            data={[
              { label: 'CAC', value: parseNum(cac) },
              { label: 'LTV', value: r.ltv },
            ]}
          />
        ) : undefined
      }
    />
  );
}
