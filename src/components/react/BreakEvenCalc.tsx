import { useMemo, useState } from 'react';
import { CalculatorShell, Field, ResultRow, inputStyle } from './CalculatorShell';
import { BarChart } from './Charts';
import { formatCurrency, formatNumber, parseNum, validateNumber, type Lang } from './i18n';

/**
 * Punto de equilibrio.
 *
 * Given-When-Then:
 * - Given CF=10_000, P=100, CV=60, When computed, Then contribución=40, PE=250 uds, ingreso PE=25_000.
 * - Given P ≤ CV, When validated, Then error inline (sin contribución no hay equilibrio).
 * - Given meta de unidades, When supera PE, Then utilidad mostrada > 0.
 * 12 Factors III/V: locale por props, cálculo 100% cliente sin SSR.
 */
// TODO(lib): import { type BreakEvenInput, type BreakEvenResult } from '../../lib/break-even' when available.
export interface BreakEvenInput {
  fixedCosts: number;
  price: number;
  variableCost: number;
}
export interface BreakEvenResult {
  contribution: number;
  units: number;
  revenue: number;
}

export function calculateBreakEven(input: BreakEvenInput): BreakEvenResult {
  const { fixedCosts, price, variableCost } = input;
  if (![fixedCosts, price, variableCost].every(Number.isFinite)) return { contribution: NaN, units: NaN, revenue: NaN };
  const contribution = price - variableCost;
  if (fixedCosts < 0 || price <= 0 || variableCost < 0 || contribution <= 0)
    return { contribution, units: NaN, revenue: NaN };
  const units = fixedCosts / contribution;
  return { contribution, units, revenue: units * price };
}

const STR = {
  title: { es: 'Punto de equilibrio', en: 'Break-even point' },
  desc: {
    es: '¿Cuántas unidades debes vender para no perder? 3 entradas, respuesta inmediata.',
    en: 'How many units to stop losing money? 3 inputs, instant answer.',
  },
  fixed: { es: 'Costos fijos ($)', en: 'Fixed costs ($)' },
  price: { es: 'Precio por unidad ($)', en: 'Price per unit ($)' },
  variable: { es: 'Costo variable por unidad ($)', en: 'Variable cost per unit ($)' },
  badMargin: { es: 'El precio debe ser mayor que el costo variable.', en: 'Price must exceed variable cost.' },
} as const;

export default function BreakEvenCalc({ lang, currency }: { lang: Lang; currency?: string }) {
  const [fixed, setFixed] = useState('10000');
  const [price, setPrice] = useState('100');
  const [variable, setVariable] = useState('60');

  const eFixed = validateNumber(fixed, lang, { min: 0 });
  const ePrice = validateNumber(price, lang, { allowZero: false });
  const eVar = validateNumber(variable, lang, { min: 0 });
  const marginErr =
    !ePrice && !eVar && parseNum(price) <= parseNum(variable) ? STR.badMargin[lang] : null;
  const valid = !eFixed && !ePrice && !eVar && !marginErr;

  const r = useMemo(
    () => calculateBreakEven({ fixedCosts: parseNum(fixed), price: parseNum(price), variableCost: parseNum(variable) }),
    [fixed, price, variable],
  );

  return (
    <CalculatorShell
      lang={lang}
      title={STR.title[lang]}
      description={STR.desc[lang]}
      backHref={`${import.meta.env.BASE_URL}${lang === 'es' ? 'es/calculadoras/' : 'en/calculators/'}`}
      csvFilename="punto-equilibrio"
      csvHeaders={['contribution', 'units', 'revenue']}
      csvRows={valid ? [[r.contribution, r.units, r.revenue]] : []}
      form={
        <>
          <Field label={STR.fixed[lang]} error={eFixed} htmlFor="be-fixed">
            <input id="be-fixed" style={inputStyle} inputMode="decimal" value={fixed} onChange={(e) => setFixed(e.target.value)} />
          </Field>
          <Field label={STR.price[lang]} error={ePrice} htmlFor="be-price">
            <input id="be-price" style={inputStyle} inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} />
          </Field>
          <Field label={STR.variable[lang]} error={eVar ?? marginErr} htmlFor="be-var">
            <input id="be-var" style={inputStyle} inputMode="decimal" value={variable} onChange={(e) => setVariable(e.target.value)} />
          </Field>
        </>
      }
      results={
        valid ? (
          <>
            <ResultRow label={lang === 'es' ? 'Contribución / unidad' : 'Contribution / unit'} value={formatCurrency(r.contribution, lang, currency)} />
            <ResultRow label={lang === 'es' ? 'Unidades de equilibrio' : 'Break-even units'} value={formatNumber(r.units, lang)} strong />
            <ResultRow label={lang === 'es' ? 'Ingreso de equilibrio' : 'Break-even revenue'} value={formatCurrency(r.revenue, lang, currency)} strong />
          </>
        ) : (
          <p style={{ color: '#6c6a64' }}>{marginErr ?? (lang === 'es' ? 'Corrige los campos para ver resultados.' : 'Fix the fields to see results.')}</p>
        )
      }
      chart={
        valid ? (
          <BarChart
            data={[
              { label: lang === 'es' ? 'Fijos' : 'Fixed', value: parseNum(fixed) },
              { label: lang === 'es' ? 'Ingreso PE' : 'BE revenue', value: r.revenue },
            ]}
          />
        ) : undefined
      }
    />
  );
}
