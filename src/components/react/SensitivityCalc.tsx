import { useMemo, useState } from 'react';
import { CalculatorShell, Field, ResultRow, inputStyle } from './CalculatorShell';
import { LineChart } from './Charts';
import { formatCurrency, formatNumber, parseNum, validateNumber, type Lang } from './i18n';

/**
 * Sensibilidad precio/volumen → utilidad.
 *
 * Given-When-Then:
 * - Given P=100, CV=60, U=1000, CF=20k, When precio +10%, Then utilidad sube exactly 10_000.
 * - Given rango=20%, When computed, Then 9 escenarios (-20..+20 paso 5) con utilidad base al centro.
 * - Given unidades=0, When validated, Then error inline (allowZero=false).
 * 12 Factors III/V: rango por input, render cliente, sin SSR.
 */
// TODO(lib): import { type SensitivityInput, type SensitivityRow } from '../../lib/sensitivity' when available.
export interface SensitivityInput {
  price: number;
  variableCost: number;
  units: number;
  fixedCosts: number;
  rangePct: number;
}
export interface SensitivityRow {
  deltaPct: number;
  price: number;
  profit: number;
}

export function calculateSensitivity(input: SensitivityInput): SensitivityRow[] {
  const { price, variableCost, units, fixedCosts, rangePct } = input;
  if (![price, variableCost, units, fixedCosts, rangePct].every(Number.isFinite)) return [];
  if (price <= 0 || variableCost < 0 || units <= 0 || fixedCosts < 0 || rangePct <= 0 || rangePct > 100) return [];
  const steps = [-4, -3, -2, -1, 0, 1, 2, 3, 4].map((k) => (k * rangePct) / 4);
  return steps.map((d) => {
    const p = price * (1 + d / 100);
    return { deltaPct: Math.round(d * 10) / 10, price: p, profit: (p - variableCost) * units - fixedCosts };
  });
}

export default function SensitivityCalc({ lang, currency }: { lang: Lang; currency?: string }) {
  const [price, setPrice] = useState('100');
  const [variable, setVariable] = useState('60');
  const [units, setUnits] = useState('1000');
  const [fixed, setFixed] = useState('20000');
  const [range, setRange] = useState('20');

  const ePrice = validateNumber(price, lang, { allowZero: false });
  const eVar = validateNumber(variable, lang, { min: 0 });
  const eUnits = validateNumber(units, lang, { allowZero: false });
  const eFixed = validateNumber(fixed, lang, { min: 0 });
  const eRange = validateNumber(range, lang, { min: 1, max: 100 });
  const valid = !ePrice && !eVar && !eUnits && !eFixed && !eRange;

  const rows = useMemo(
    () =>
      calculateSensitivity({
        price: parseNum(price),
        variableCost: parseNum(variable),
        units: parseNum(units),
        fixedCosts: parseNum(fixed),
        rangePct: parseNum(range),
      }),
    [price, variable, units, fixed, range],
  );
  const base = rows.find((r) => r.deltaPct === 0);

  return (
    <CalculatorShell
      lang={lang}
      title={lang === 'es' ? 'Sensibilidad' : 'Sensitivity'}
      description={
        lang === 'es'
          ? '¿Qué pasa si el precio varía ±20%? 9 escenarios instantáneos sobre tu utilidad.'
          : 'What if price moves ±20%? 9 instant scenarios on your profit.'
      }
      backHref={`${import.meta.env.BASE_URL}${lang === 'es' ? 'es/calculadoras/' : 'en/calculators/'}`}
      csvFilename="sensibilidad"
      csvHeaders={['delta_pct', 'price', 'profit']}
      csvRows={valid ? rows.map((r) => [r.deltaPct, Math.round(r.price * 100) / 100, Math.round(r.profit * 100) / 100]) : []}
      form={
        <>
          <Field label={lang === 'es' ? 'Precio ($)' : 'Price ($)'} error={ePrice} htmlFor="se-price">
            <input id="se-price" style={inputStyle} inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} />
          </Field>
          <Field label={lang === 'es' ? 'Costo variable ($)' : 'Variable cost ($)'} error={eVar} htmlFor="se-var">
            <input id="se-var" style={inputStyle} inputMode="decimal" value={variable} onChange={(e) => setVariable(e.target.value)} />
          </Field>
          <Field label={lang === 'es' ? 'Unidades' : 'Units'} error={eUnits} htmlFor="se-units">
            <input id="se-units" style={inputStyle} inputMode="decimal" value={units} onChange={(e) => setUnits(e.target.value)} />
          </Field>
          <Field label={lang === 'es' ? 'Costos fijos ($)' : 'Fixed costs ($)'} error={eFixed} htmlFor="se-fixed">
            <input id="se-fixed" style={inputStyle} inputMode="decimal" value={fixed} onChange={(e) => setFixed(e.target.value)} />
          </Field>
          <Field label={lang === 'es' ? 'Rango (%)' : 'Range (%)'} error={eRange} htmlFor="se-range">
            <input id="se-range" style={inputStyle} inputMode="decimal" value={range} onChange={(e) => setRange(e.target.value)} />
          </Field>
        </>
      }
      results={
        valid && base ? (
          <>
            <ResultRow label={lang === 'es' ? 'Utilidad base' : 'Base profit'} value={formatCurrency(base.profit, lang, currency)} strong />
            <ResultRow
              label={lang === 'es' ? `Utilidad +${parseNum(range)}% precio` : `Profit at +${parseNum(range)}% price`}
              value={formatCurrency(rows[rows.length - 1]?.profit ?? NaN, lang, currency)}
            />
            <ResultRow
              label={lang === 'es' ? `Utilidad -${parseNum(range)}% precio` : `Profit at -${parseNum(range)}% price`}
              value={formatCurrency(rows[0]?.profit ?? NaN, lang, currency)}
            />
            <p style={{ fontSize: 13, color: '#6c6a64' }}>
              {lang === 'es'
                ? `Apalancamiento precio: 1% de precio ≈ ${formatNumber(((parseNum(price) * parseNum(units)) / Math.max(1, Math.abs(base.profit))) * 1, lang, 1)}% de utilidad.`
                : `Price leverage: 1% price ≈ ${formatNumber(((parseNum(price) * parseNum(units)) / Math.max(1, Math.abs(base.profit))) * 1, lang, 1)}% profit.`}
            </p>
          </>
        ) : (
          <p style={{ color: '#6c6a64' }}>{lang === 'es' ? 'Corrige los campos para ver resultados.' : 'Fix the fields to see results.'}</p>
        )
      }
      chart={
        valid && rows.length > 0 ? (
          <LineChart
            series={[
              {
                name: lang === 'es' ? 'Utilidad' : 'Profit',
                points: rows.map((r) => ({ label: `${r.deltaPct > 0 ? '+' : ''}${r.deltaPct}%`, value: Math.round(r.profit) })),
              },
            ]}
          />
        ) : undefined
      }
    />
  );
}
