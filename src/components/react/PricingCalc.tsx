import { useMemo, useState } from 'react';
import { CalculatorShell, Field, ResultRow, inputStyle } from './CalculatorShell';
import { BarChart } from './Charts';
import { formatCurrency, formatPercent, parseNum, validateNumber, type Lang } from './i18n';

/**
 * Pricing por margen.
 *
 * Given-When-Then:
 * - Given costo=60 y margen=40%, When computed, Then precio=100 y utilidad=40.
 * - Given margen ≥ 100%, When validated, Then error inline (margen imposible).
 * - Given precio competencia, When precio > competencia, Then aviso "por encima del mercado".
 * 12 Factors III/V: moneda por prop, sin llamadas red, cómputo cliente.
 */
// TODO(lib): import { type PricingInput, type PricingResult } from '../../lib/pricing' when available.
export interface PricingInput {
  unitCost: number;
  marginPct: number;
}
export interface PricingResult {
  price: number;
  profit: number;
  markupPct: number;
}

export function calculatePricing(input: PricingInput): PricingResult {
  const { unitCost, marginPct } = input;
  if (!Number.isFinite(unitCost) || !Number.isFinite(marginPct)) return { price: NaN, profit: NaN, markupPct: NaN };
  if (unitCost < 0 || marginPct < 0 || marginPct >= 100) return { price: NaN, profit: NaN, markupPct: NaN };
  const price = unitCost / (1 - marginPct / 100);
  return { price, profit: price - unitCost, markupPct: ((price - unitCost) / unitCost) * 100 };
}

export default function PricingCalc({ lang, currency }: { lang: Lang; currency?: string }) {
  const [cost, setCost] = useState('60');
  const [margin, setMargin] = useState('40');
  const [comp, setComp] = useState('');

  const eCost = validateNumber(cost, lang, { min: 0 });
  const eMargin = validateNumber(margin, lang, { min: 0, max: 99.99 });
  const eComp = comp.trim() === '' ? null : validateNumber(comp, lang, { allowZero: false });
  const valid = !eCost && !eMargin && !eComp;

  const r = useMemo(
    () => calculatePricing({ unitCost: parseNum(cost), marginPct: parseNum(margin) }),
    [cost, margin],
  );
  const compN = comp.trim() === '' ? NaN : parseNum(comp);
  const aboveMarket = valid && Number.isFinite(compN) && Number.isFinite(r.price) && r.price > compN;

  return (
    <CalculatorShell
      lang={lang}
      title={lang === 'es' ? 'Precio por margen' : 'Margin pricing'}
      description={
        lang === 'es'
          ? 'Del costo al precio con el margen que quieres ganar. Compara con la competencia.'
          : 'From cost to price with your target margin. Compare against competitors.'
      }
      backHref={`${import.meta.env.BASE_URL}${lang === 'es' ? 'es/calculadoras/' : 'en/calculators/'}`}
      csvFilename="pricing"
      csvHeaders={['price', 'profit', 'markup_pct']}
      csvRows={valid ? [[r.price, r.profit, r.markupPct]] : []}
      form={
        <>
          <Field label={lang === 'es' ? 'Costo unitario ($)' : 'Unit cost ($)'} error={eCost} htmlFor="pr-cost">
            <input id="pr-cost" style={inputStyle} inputMode="decimal" value={cost} onChange={(e) => setCost(e.target.value)} />
          </Field>
          <Field label={lang === 'es' ? 'Margen deseado (%)' : 'Target margin (%)'} error={eMargin} htmlFor="pr-margin">
            <input id="pr-margin" style={inputStyle} inputMode="decimal" value={margin} onChange={(e) => setMargin(e.target.value)} />
          </Field>
          <Field label={lang === 'es' ? 'Precio competencia (opcional)' : 'Competitor price (optional)'} error={eComp} htmlFor="pr-comp">
            <input id="pr-comp" style={inputStyle} inputMode="decimal" value={comp} onChange={(e) => setComp(e.target.value)} placeholder="—" />
          </Field>
        </>
      }
      results={
        valid ? (
          <>
            <ResultRow label={lang === 'es' ? 'Precio sugerido' : 'Suggested price'} value={formatCurrency(r.price, lang, currency)} strong />
            <ResultRow label={lang === 'es' ? 'Utilidad / unidad' : 'Profit / unit'} value={formatCurrency(r.profit, lang, currency)} />
            <ResultRow label="Markup" value={formatPercent(r.markupPct / 100, lang)} />
            {aboveMarket ? (
              <p role="alert" style={{ color: '#d4a017', fontSize: 14 }}>
                {lang === 'es' ? 'Por encima del mercado: justifica valor o ajusta margen.' : 'Above market: justify value or trim margin.'}
              </p>
            ) : null}
          </>
        ) : (
          <p style={{ color: '#6c6a64' }}>{lang === 'es' ? 'Corrige los campos para ver resultados.' : 'Fix the fields to see results.'}</p>
        )
      }
      chart={
        valid ? (
          <BarChart
            data={[
              { label: lang === 'es' ? 'Costo' : 'Cost', value: parseNum(cost) },
              { label: lang === 'es' ? 'Utilidad' : 'Profit', value: r.profit },
            ]}
          />
        ) : undefined
      }
    />
  );
}
