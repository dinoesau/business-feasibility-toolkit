import { useMemo, useState } from 'react';
import { CalculatorShell, Field, ResultRow, inputStyle } from './CalculatorShell';
import { LineChart } from './Charts';
import { formatCurrency, formatPercent, parseNum, validateNumber, type Lang } from './i18n';

/**
 * VPN / TIR.
 *
 * Given-When-Then:
 * - Given inversión=100_000, flujos=[30k×5], tasa=10%, When computed, Then VPN≈13_724 y TIR≈15.2%.
 * - Given tasa negativa o flujos vacíos, When validated, Then error inline.
 * - Given TIR < tasa, When rendered, Then se muestra "rechazar" (VPN<0).
 * 12 Factors III/V: tasa y flujos por props/inputs (config), cómputo cliente puro.
 */
// TODO(lib): import { type NpvIrrInput, type NpvIrrResult } from '../../lib/npv-irr' when available.
export interface NpvIrrInput {
  investment: number;
  cashFlows: number[];
  ratePct: number;
}
export interface NpvIrrResult {
  npv: number;
  irrPct: number; // NaN if no sign change / no convergence
  cumulative: number[];
}

export function calculateNpv(input: NpvIrrInput): NpvIrrResult {
  const { investment, cashFlows, ratePct } = input;
  if (!Number.isFinite(investment) || !Number.isFinite(ratePct) || cashFlows.some((c) => !Number.isFinite(c)))
    return { npv: NaN, irrPct: NaN, cumulative: [] };
  const r = ratePct / 100;
  let npv = -investment;
  const cumulative: number[] = [];
  let acc = -investment;
  cashFlows.forEach((cf, i) => {
    npv += cf / Math.pow(1 + r, i + 1);
    acc += cf / Math.pow(1 + r, i + 1);
    cumulative.push(acc);
  });
  // IRR by bisection on NPV(rate)=0, bounded [-90%, +1000%]
  let irrPct = NaN;
  const npvAt = (rate: number) => {
    let v = -investment;
    cashFlows.forEach((cf, i) => {
      v += cf / Math.pow(1 + rate, i + 1);
    });
    return v;
  };
  let lo = -0.9;
  let hi = 10;
  const loV = npvAt(lo);
  const hiV = npvAt(hi);
  if (Number.isFinite(loV) && Number.isFinite(hiV) && loV * hiV < 0) {
    for (let k = 0; k < 100; k++) {
      const mid = (lo + hi) / 2;
      const v = npvAt(mid);
      if (Math.abs(v) < 1e-6) {
        lo = mid;
        hi = mid;
        break;
      }
      if (loV * v <= 0) hi = mid;
      else lo = mid;
    }
    irrPct = ((lo + hi) / 2) * 100;
  }
  return { npv, irrPct, cumulative };
}

export default function NpvIrrCalc({ lang, currency }: { lang: Lang; currency?: string }) {
  const [inv, setInv] = useState('100000');
  const [flows, setFlows] = useState('30000, 30000, 30000, 30000, 30000');
  const [rate, setRate] = useState('10');

  const eInv = validateNumber(inv, lang, { allowZero: false });
  const eRate = validateNumber(rate, lang, { min: -90, max: 1000 });
  const parsedFlows = useMemo(() => flows.split(/[,\s;]+/).filter(Boolean).map(parseNum), [flows]);
  const eFlows =
    parsedFlows.length === 0
      ? lang === 'es'
        ? 'Ingresa al menos un flujo (separados por coma).'
        : 'Enter at least one cash flow (comma separated).'
      : parsedFlows.some((n) => !Number.isFinite(n))
        ? lang === 'es'
          ? 'Todos los flujos deben ser números.'
          : 'All cash flows must be numbers.'
        : null;
  const valid = !eInv && !eRate && !eFlows;

  const res = useMemo(
    () => calculateNpv({ investment: parseNum(inv), cashFlows: parsedFlows, ratePct: parseNum(rate) }),
    [inv, parsedFlows, rate],
  );
  const verdict =
    valid && Number.isFinite(res.npv)
      ? res.npv >= 0
        ? lang === 'es'
          ? 'Aceptar (VPN ≥ 0)'
          : 'Accept (NPV ≥ 0)'
        : lang === 'es'
          ? 'Rechazar (VPN < 0)'
          : 'Reject (NPV < 0)'
      : null;

  return (
    <CalculatorShell
      lang={lang}
      title={lang === 'es' ? 'VPN / TIR' : 'NPV / IRR'}
      description={
        lang === 'es'
          ? 'Evalúa si la inversión crea valor. Flujos anuales separados por coma.'
          : 'Check whether the investment creates value. Yearly cash flows, comma separated.'
      }
      backHref={`${import.meta.env.BASE_URL}${lang === 'es' ? 'es/calculadoras/' : 'en/calculators/'}`}
      csvFilename="vpn-tir"
      csvHeaders={['year', 'discounted_cumulative']}
      csvRows={valid ? res.cumulative.map((c, i) => [i + 1, Math.round(c * 100) / 100]) : []}
      form={
        <>
          <Field label={lang === 'es' ? 'Inversión inicial ($)' : 'Initial investment ($)'} error={eInv} htmlFor="npv-inv">
            <input id="npv-inv" style={inputStyle} inputMode="decimal" value={inv} onChange={(e) => setInv(e.target.value)} />
          </Field>
          <Field label={lang === 'es' ? 'Flujos anuales (coma)' : 'Yearly cash flows (comma)'} error={eFlows} htmlFor="npv-flows">
            <input id="npv-flows" style={inputStyle} inputMode="text" value={flows} onChange={(e) => setFlows(e.target.value)} />
          </Field>
          <Field label={lang === 'es' ? 'Tasa de descuento (%)' : 'Discount rate (%)'} error={eRate} htmlFor="npv-rate">
            <input id="npv-rate" style={inputStyle} inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} />
          </Field>
        </>
      }
      results={
        valid ? (
          <>
            <ResultRow label="VPN / NPV" value={formatCurrency(res.npv, lang, currency)} strong />
            <ResultRow label="TIR / IRR" value={Number.isFinite(res.irrPct) ? formatPercent(res.irrPct / 100, lang) : '—'} strong />
            {verdict ? <ResultRow label={lang === 'es' ? 'Veredicto' : 'Verdict'} value={verdict} /> : null}
          </>
        ) : (
          <p style={{ color: '#6c6a64' }}>{lang === 'es' ? 'Corrige los campos para ver resultados.' : 'Fix the fields to see results.'}</p>
        )
      }
      chart={
        valid && res.cumulative.length > 0 ? (
          <LineChart
            series={[
              {
                name: lang === 'es' ? 'Acumulado descontado' : 'Discounted cumulative',
                points: res.cumulative.map((c, i) => ({ label: `Y${i + 1}`, value: Math.round(c) })),
              },
            ]}
          />
        ) : undefined
      }
    />
  );
}
