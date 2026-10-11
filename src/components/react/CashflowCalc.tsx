import { useMemo, useState } from 'react';
import { CalculatorShell, Field, ResultRow, inputStyle } from './CalculatorShell';
import { LineChart } from './Charts';
import { formatCurrency, formatNumber, parseNum, validateNumber, type Lang } from './i18n';

/**
 * Flujo de caja / runway.
 *
 * Given-When-Then:
 * - Given caja=50k, ingresos=20k/mes, egresos=15k/mes, 12 meses, When computed, Then saldo final=110k y mínimo=50k.
 * - Given burn (egresos>ingresos), When computed, Then runway = caja/quema en meses.
 * - Given meses > 60, When validated, Then error inline (límite de horizonte).
 * 12 Factors III/V: horizonte por input, sin estado servidor, cliente puro.
 */
// TODO(lib): import { type CashflowInput, type CashflowResult } from '../../lib/cashflow' when available.
export interface CashflowInput {
  starting: number;
  inflow: number;
  outflow: number;
  months: number;
}
export interface CashflowResult {
  balances: number[];
  finalBalance: number;
  minBalance: number;
  runwayMonths: number | null; // null = no burn (crece)
}

export function calculateCashflow(input: CashflowInput): CashflowResult {
  const { starting, inflow, outflow, months } = input;
  if (![starting, inflow, outflow, months].every(Number.isFinite))
    return { balances: [], finalBalance: NaN, minBalance: NaN, runwayMonths: null };
  if (months < 1 || months > 60 || inflow < 0 || outflow < 0) return { balances: [], finalBalance: NaN, minBalance: NaN, runwayMonths: null };
  const balances: number[] = [];
  let bal = starting;
  let min = starting;
  for (let m = 0; m < months; m++) {
    bal += inflow - outflow;
    balances.push(Math.round(bal * 100) / 100);
    if (bal < min) min = bal;
  }
  const burn = outflow - inflow;
  const runwayMonths = burn > 0 ? starting / burn : null;
  return { balances, finalBalance: bal, minBalance: min, runwayMonths };
}

export default function CashflowCalc({ lang, currency }: { lang: Lang; currency?: string }) {
  const [starting, setStarting] = useState('50000');
  const [inflow, setInflow] = useState('20000');
  const [outflow, setOutflow] = useState('15000');
  const [months, setMonths] = useState('12');

  const eStart = validateNumber(starting, lang, { min: 0 });
  const eIn = validateNumber(inflow, lang, { min: 0 });
  const eOut = validateNumber(outflow, lang, { min: 0 });
  const eMonths = validateNumber(months, lang, { min: 1, max: 60 });
  const valid = !eStart && !eIn && !eOut && !eMonths;

  const r = useMemo(
    () =>
      calculateCashflow({
        starting: parseNum(starting),
        inflow: parseNum(inflow),
        outflow: parseNum(outflow),
        months: Math.floor(parseNum(months)),
      }),
    [starting, inflow, outflow, months],
  );

  return (
    <CalculatorShell
      lang={lang}
      title={lang === 'es' ? 'Flujo de caja' : 'Cash flow'}
      description={
        lang === 'es'
          ? 'Proyecta tu saldo mes a mes y descubre tu runway antes de quedarte sin caja.'
          : 'Project your balance month by month and find your runway before cash runs out.'
      }
      backHref={`${import.meta.env.BASE_URL}${lang === 'es' ? 'es/calculadoras/' : 'en/calculators/'}`}
      csvFilename="flujo-caja"
      csvHeaders={['month', 'balance']}
      csvRows={valid ? r.balances.map((b, i) => [i + 1, b]) : []}
      form={
        <>
          <Field label={lang === 'es' ? 'Caja inicial ($)' : 'Starting cash ($)'} error={eStart} htmlFor="cf-start">
            <input id="cf-start" style={inputStyle} inputMode="decimal" value={starting} onChange={(e) => setStarting(e.target.value)} />
          </Field>
          <Field label={lang === 'es' ? 'Ingresos / mes ($)' : 'Inflow / month ($)'} error={eIn} htmlFor="cf-in">
            <input id="cf-in" style={inputStyle} inputMode="decimal" value={inflow} onChange={(e) => setInflow(e.target.value)} />
          </Field>
          <Field label={lang === 'es' ? 'Egresos / mes ($)' : 'Outflow / month ($)'} error={eOut} htmlFor="cf-out">
            <input id="cf-out" style={inputStyle} inputMode="decimal" value={outflow} onChange={(e) => setOutflow(e.target.value)} />
          </Field>
          <Field label={lang === 'es' ? 'Meses (1-60)' : 'Months (1-60)'} error={eMonths} htmlFor="cf-months">
            <input id="cf-months" style={inputStyle} inputMode="numeric" value={months} onChange={(e) => setMonths(e.target.value)} />
          </Field>
        </>
      }
      results={
        valid ? (
          <>
            <ResultRow label={lang === 'es' ? 'Saldo final' : 'Final balance'} value={formatCurrency(r.finalBalance, lang, currency)} strong />
            <ResultRow label={lang === 'es' ? 'Saldo mínimo' : 'Minimum balance'} value={formatCurrency(r.minBalance, lang, currency)} />
            <ResultRow
              label="Runway"
              value={
                r.runwayMonths === null
                  ? lang === 'es'
                    ? 'Sin burn (crece)'
                    : 'No burn (growing)'
                  : `${formatNumber(r.runwayMonths, lang, 1)} ${lang === 'es' ? 'meses' : 'months'}`
              }
            />
            {r.minBalance < 0 ? (
              <p role="alert" style={{ color: '#c64545', fontSize: 14 }}>
                {lang === 'es' ? 'Te quedas sin caja: recorta egresos o consigue capital.' : 'Cash runs out: cut burn or raise capital.'}
              </p>
            ) : null}
          </>
        ) : (
          <p style={{ color: '#6c6a64' }}>{lang === 'es' ? 'Corrige los campos para ver resultados.' : 'Fix the fields to see results.'}</p>
        )
      }
      chart={
        valid && r.balances.length > 0 ? (
          <LineChart
            series={[
              {
                name: lang === 'es' ? 'Saldo' : 'Balance',
                points: r.balances.map((b, i) => ({ label: `M${i + 1}`, value: b })),
              },
            ]}
          />
        ) : undefined
      }
    />
  );
}
