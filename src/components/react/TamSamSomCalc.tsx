import { useMemo, useState } from 'react';
import { CalculatorShell, Field, ResultRow, inputStyle } from './CalculatorShell';
import { BarChart } from './Charts';
import { formatCurrency, parseNum, validateNumber, type Lang } from './i18n';

/**
 * TAM / SAM / SOM funnel.
 *
 * Given-When-Then:
 * - Given TAM=1_000_000 and SAM%=20 and SOM%=10, When computed, Then SAM=200_000 and SOM=20_000.
 * - Given any share outside 0..100, When validated, Then inline error shown and result hidden.
 * - Given empty input, When rendered, Then "Requerido"/"Required" hint, no NaN in results.
 *
 * 12 Factors: III config via `lang`/`currency` props (no hardcoded locale);
 * V build strict: pure client-side calc, no SSR/fetch.
 * good-typescript: typed props, total `calculateTamSamSom` (NaN-safe).
 */
// TODO(lib): import { type TamSamSomInput, type TamSamSomResult } from '../../lib/tam-sam-som' when available.
export interface TamSamSomInput {
  tam: number;
  samPct: number;
  somPct: number;
}
export interface TamSamSomResult {
  sam: number;
  som: number;
}

export function calculateTamSamSom(input: TamSamSomInput): TamSamSomResult {
  const { tam, samPct, somPct } = input;
  if (![tam, samPct, somPct].every(Number.isFinite)) return { sam: NaN, som: NaN };
  if (tam < 0 || samPct < 0 || samPct > 100 || somPct < 0 || somPct > 100)
    return { sam: NaN, som: NaN };
  const sam = (tam * samPct) / 100;
  const som = (sam * somPct) / 100;
  return { sam, som };
}

const STR = {
  title: { es: 'TAM / SAM / SOM', en: 'TAM / SAM / SOM' },
  desc: {
    es: 'Dimensiona tu mercado: total, alcanzable y obtenible. Máximo 3 entradas, resultado instantáneo.',
    en: 'Size your market: total, serviceable, obtainable. Max 3 inputs, instant result.',
  },
  tam: { es: 'TAM (mercado total, $)', en: 'TAM (total market, $)' },
  samPct: { es: 'SAM (% del TAM)', en: 'SAM (% of TAM)' },
  somPct: { es: 'SOM (% del SAM)', en: 'SOM (% of SAM)' },
} as const;

export default function TamSamSomCalc({ lang, currency }: { lang: Lang; currency?: string }) {
  const [tam, setTam] = useState('1000000');
  const [samPct, setSamPct] = useState('20');
  const [somPct, setSomPct] = useState('10');

  const eTam = validateNumber(tam, lang, { min: 0 });
  const eSam = validateNumber(samPct, lang, { min: 0, max: 100 });
  const eSom = validateNumber(somPct, lang, { min: 0, max: 100 });
  const valid = !eTam && !eSam && !eSom;

  const result = useMemo(
    () => calculateTamSamSom({ tam: parseNum(tam), samPct: parseNum(samPct), somPct: parseNum(somPct) }),
    [tam, samPct, somPct],
  );

  return (
    <CalculatorShell
      lang={lang}
      title={STR.title[lang]}
      description={STR.desc[lang]}
      backHref={`${import.meta.env.BASE_URL}${lang === 'es' ? 'es/calculadoras/' : 'en/calculators/'}`}
      csvFilename="tam-sam-som"
      csvHeaders={['TAM', 'SAM', 'SOM']}
      csvRows={valid ? [[parseNum(tam), result.sam, result.som]] : []}
      form={
        <>
          <Field label={STR.tam[lang]} error={eTam} htmlFor="tam">
            <input id="tam" style={inputStyle} inputMode="decimal" value={tam} onChange={(e) => setTam(e.target.value)} />
          </Field>
          <Field label={STR.samPct[lang]} error={eSam} htmlFor="sampct">
            <input id="sampct" style={inputStyle} inputMode="decimal" value={samPct} onChange={(e) => setSamPct(e.target.value)} />
          </Field>
          <Field label={STR.somPct[lang]} error={eSom} htmlFor="sompct">
            <input id="sompct" style={inputStyle} inputMode="decimal" value={somPct} onChange={(e) => setSomPct(e.target.value)} />
          </Field>
        </>
      }
      results={
        valid ? (
          <>
            <ResultRow label="TAM" value={formatCurrency(parseNum(tam), lang, currency)} />
            <ResultRow label="SAM" value={formatCurrency(result.sam, lang, currency)} strong />
            <ResultRow label="SOM" value={formatCurrency(result.som, lang, currency)} strong />
          </>
        ) : (
          <p style={{ color: '#6c6a64' }}>{lang === 'es' ? 'Corrige los campos para ver resultados.' : 'Fix the fields to see results.'}</p>
        )
      }
      chart={
        valid ? (
          <BarChart
            data={[
              { label: 'TAM', value: parseNum(tam) },
              { label: 'SAM', value: result.sam },
              { label: 'SOM', value: result.som },
            ]}
          />
        ) : undefined
      }
    />
  );
}
