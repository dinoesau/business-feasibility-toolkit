import { useMemo, useState } from 'react';
import { CalculatorShell, Field, ResultRow, inputStyle } from './CalculatorShell';
import { BarChart } from './Charts';
import { formatCurrency, formatPercent, parseNum, validateNumber, type Lang } from './i18n';
import {
  calcularCostoProducto,
  type ModoUtilidad,
  type ParametrosVenta,
} from '../../lib/costo-producto';

/**
 * Costo real de producto con IVA, terminal e ISR (MX).
 *
 * Given-When-Then:
 * - Given costos de la hoja ejemplo (directos 165 + indirectos 70) y markup 50%,
 *   When computed, Then costo 235, base 352.50, total 408.90 e IVA 56.40.
 * - Given tasa RESICO 1.25%, When validated, Then error (no es tasa oficial).
 * - Given ISR empresarial, When computed, Then va sobre la utilidad, no el ingreso.
 * 12 Factors III/V: moneda por prop, sin llamadas red, computo cliente.
 */
const RESICO_OPTS = ['1', '1.1', '1.5', '2', '2.5'];

export default function ProductCostCalc({ lang, currency }: { lang: Lang; currency?: string }) {
  const [materia, setMateria] = useState('150');
  const [empaque, setEmpaque] = useState('15');
  const [manoObra, setManoObra] = useState('0');
  const [envio, setEnvio] = useState('0');
  const [mermas, setMermas] = useState('0');
  const [renta, setRenta] = useState('20');
  const [servicios, setServicios] = useState('10');
  const [software, setSoftware] = useState('20');
  const [marketing, setMarketing] = useState('5');
  const [admin, setAdmin] = useState('0');
  const [desgaste, setDesgaste] = useState('15');
  const [modo, setModo] = useState<ModoUtilidad>('markup');
  const [utilidad, setUtilidad] = useState('50');
  const [iva, setIva] = useState('16');
  const [termPct, setTermPct] = useState('0');
  const [termFija, setTermFija] = useState('0');
  const [resico, setResico] = useState('1');
  const [isrEmp, setIsrEmp] = useState('30');

  const money = (v: string) => validateNumber(v, lang, { min: 0 });
  const errs = [
    money(materia), money(empaque), money(manoObra), money(envio), money(mermas),
    money(renta), money(servicios), money(software), money(marketing), money(admin), money(desgaste),
    validateNumber(utilidad, lang, { min: 0, max: modo === 'margen' ? 99.99 : 1000 }),
    validateNumber(iva, lang, { min: 0, max: 100 }),
    validateNumber(termPct, lang, { min: 0, max: 99.99 }),
    money(termFija),
    validateNumber(isrEmp, lang, { min: 0, max: 100 }),
  ];
  const valid = errs.every((e) => !e);

  const r = useMemo(() => {
    if (!valid) return null;
    try {
      const params: ParametrosVenta = {
        iva: parseNum(iva) / 100,
        terminalPct: parseNum(termPct) / 100,
        terminalFija: parseNum(termFija),
        tasaResico: parseNum(resico) / 100,
        tasaIsrEmpresarial: parseNum(isrEmp) / 100,
      };
      return calcularCostoProducto(
        {
          materiaPrima: parseNum(materia), empaque: parseNum(empaque), manoObra: parseNum(manoObra),
          envioInsumos: parseNum(envio), mermas: parseNum(mermas),
        },
        {
          renta: parseNum(renta), servicios: parseNum(servicios), software: parseNum(software),
          marketing: parseNum(marketing), administracion: parseNum(admin), desgasteEquipo: parseNum(desgaste),
        },
        modo,
        parseNum(utilidad) / 100,
        params,
      );
    } catch {
      return null;
    }
  }, [valid, materia, empaque, manoObra, envio, mermas, renta, servicios, software, marketing, admin, desgaste, modo, utilidad, iva, termPct, termFija, resico, isrEmp]);

  const moneyField = (
    id: string, label: string, value: string, set: (v: string) => void, err?: string | null,
  ) => (
    <Field label={label} error={err ?? null} htmlFor={id}>
      <input id={id} style={inputStyle} inputMode="decimal" value={value} onChange={(e) => set(e.target.value)} />
    </Field>
  );

  const t = (es: string, en: string) => (lang === 'es' ? es : en);
  const moneyInputs: Array<[string, string, string, (v: string) => void, string | null | undefined]> = [
    ['pc-mat', t('Materia prima / producto base ($)', 'Raw material / base product ($)'), materia, setMateria, errs[0]],
    ['pc-emp', t('Empaque y etiquetas ($)', 'Packaging and labels ($)'), empaque, setEmpaque, errs[1]],
    ['pc-mo', t('Mano de obra directa ($)', 'Direct labor ($)'), manoObra, setManoObra, errs[2]],
    ['pc-env', t('Envio de insumos ($)', 'Inbound shipping ($)'), envio, setEnvio, errs[3]],
    ['pc-mer', t('Reserva mermas / defectuosos ($)', 'Shrinkage reserve ($)'), mermas, setMermas, errs[4]],
  ];
  const overheadInputs: Array<[string, string, string, (v: string) => void, string | null | undefined]> = [
    ['pc-renta', t('Proporcion de renta ($)', 'Rent share ($)'), renta, setRenta, errs[5]],
    ['pc-serv', t('Proporcion de servicios ($)', 'Utilities share ($)'), servicios, setServicios, errs[6]],
    ['pc-soft', t('Software y suscripciones ($)', 'Software and subscriptions ($)'), software, setSoftware, errs[7]],
    ['pc-mkt', t('Marketing y publicidad ($)', 'Marketing share ($)'), marketing, setMarketing, errs[8]],
    ['pc-adm', t('Contador / administracion ($)', 'Accounting / admin ($)'), admin, setAdmin, errs[9]],
    ['pc-des', t('Desgaste de equipo ($)', 'Equipment wear ($)'), desgaste, setDesgaste, errs[10]],
  ];

  return (
    <CalculatorShell
      lang={lang}
      title={t('Costo real de producto', 'True product cost')}
      description={t(
        'Directos + indirectos, utilidad con markup o margen, IVA, comision de terminal e ISR mexicano (RESICO y empresarial sobre la utilidad).',
        'Direct + overhead costs, markup or margin profit, VAT, card-terminal fees and Mexican income tax (RESICO and business regime on profit).',
      )}
      backHref={`${import.meta.env.BASE_URL}${lang === 'es' ? 'es/calculadoras/' : 'en/calculators/'}`}
      csvFilename="costo-producto"
      csvHeaders={['subtotal_directos', 'subtotal_indirectos', 'costo_total', 'base_objetivo', 'precio_final', 'iva', 'isr_resico', 'neta_resico', 'isr_empresarial', 'neta_empresarial']}
      csvRows={r ? [[r.subtotalDirectos, r.subtotalIndirectos, r.costoTotal, r.baseObjetivo, r.precioFinal, r.ivaMonto, r.isrResico, r.netaResico, r.isrEmpresarial, r.netaEmpresarial]] : []}
      form={
        <>
          <fieldset style={group}>
            <legend style={legend}>{t('Costos directos por unidad', 'Direct costs per unit')}</legend>
            {moneyInputs.map(([id, label, value, set, err]) => (
              <span key={id}>{moneyField(id, label, value, set, err)}</span>
            ))}
          </fieldset>
          <fieldset style={group}>
            <legend style={legend}>{t('Costos indirectos por unidad', 'Overhead per unit')}</legend>
            {overheadInputs.map(([id, label, value, set, err]) => (
              <span key={id}>{moneyField(id, label, value, set, err)}</span>
            ))}
          </fieldset>
          <fieldset style={group}>
            <legend style={legend}>{t('Utilidad deseada', 'Target profit')}</legend>
            <Field label={t('Modo', 'Mode')} htmlFor="pc-modo">
              <select id="pc-modo" style={inputStyle} value={modo} onChange={(e) => setModo(e.target.value as ModoUtilidad)}>
                <option value="markup">{t('Markup sobre costo', 'Markup on cost')}</option>
                <option value="margen">{t('Margen sobre precio', 'Margin on price')}</option>
              </select>
            </Field>
            {moneyField('pc-util', t('Utilidad (%)', 'Profit (%)'), utilidad, setUtilidad, errs[11])}
          </fieldset>
          <fieldset style={group}>
            <legend style={legend}>{t('Terminal e IVA', 'Card terminal and VAT')}</legend>
            {moneyField('pc-term', t('Comision terminal (%)', 'Terminal fee (%)'), termPct, setTermPct, errs[13])}
            {moneyField('pc-termf', t('Comision terminal fija ($)', 'Terminal flat fee ($)'), termFija, setTermFija, errs[14])}
            {moneyField('pc-iva', t('IVA (%)', 'VAT (%)'), iva, setIva, errs[12])}
          </fieldset>
          <fieldset style={group}>
            <legend style={legend}>{t('ISR (Mexico)', 'Income tax (Mexico)')}</legend>
            <Field label={t('Tasa RESICO (oficial)', 'RESICO rate (official)')} htmlFor="pc-resico">
              <select id="pc-resico" style={inputStyle} value={resico} onChange={(e) => setResico(e.target.value)}>
                {RESICO_OPTS.map((o) => (
                  <option key={o} value={o}>{o}%</option>
                ))}
              </select>
            </Field>
            {moneyField('pc-isr', t('ISR empresarial sobre utilidad (%)', 'Business ISR on profit (%)'), isrEmp, setIsrEmp, errs[15])}
          </fieldset>
        </>
      }
      results={
        r ? (
          <>
            <ResultRow label={t('Subtotal directos', 'Direct subtotal')} value={formatCurrency(r.subtotalDirectos, lang, currency)} />
            <ResultRow label={t('Subtotal indirectos', 'Overhead subtotal')} value={formatCurrency(r.subtotalIndirectos, lang, currency)} />
            <ResultRow label={t('Costo total real', 'True total cost')} value={formatCurrency(r.costoTotal, lang, currency)} strong />
            <ResultRow label={t('Base objetivo (costo + utilidad)', 'Target base (cost + profit)')} value={formatCurrency(r.baseObjetivo, lang, currency)} />
            <ResultRow label={t('Precio final con IVA', 'Final price with VAT')} value={formatCurrency(r.precioFinal, lang, currency)} strong />
            <ResultRow label={t('IVA', 'VAT')} value={formatCurrency(r.ivaMonto, lang, currency)} />
            <ResultRow label={t('Utilidad neta (RESICO)', 'Net profit (RESICO)')} value={formatCurrency(r.netaResico, lang, currency)} strong />
            <ResultRow label={t('ISR RESICO', 'RESICO tax')} value={formatCurrency(r.isrResico, lang, currency)} />
            <ResultRow label={t('Utilidad neta (empresarial)', 'Net profit (business regime)')} value={formatCurrency(r.netaEmpresarial, lang, currency)} strong />
            <ResultRow label={t('ISR empresarial (sobre utilidad)', 'Business ISR (on profit)')} value={formatCurrency(r.isrEmpresarial, lang, currency)} />
            <ResultRow label={t('Margen real', 'True margin')} value={formatPercent(r.margenReal, lang)} />
            <ResultRow label={t('Markup real', 'True markup')} value={formatPercent(r.markupReal, lang)} />
          </>
        ) : (
          <p style={{ color: '#6c6a64' }}>{t('Corrige los campos para ver resultados.', 'Fix the fields to see results.')}</p>
        )
      }
      chart={
        r ? (
          <BarChart
            data={[
              { label: t('Costo', 'Cost'), value: r.costoTotal },
              { label: t('Utilidad bruta', 'Gross profit'), value: r.utilidadBruta },
              { label: t('Precio final', 'Final price'), value: r.precioFinal },
            ]}
          />
        ) : undefined
      }
    />
  );
}

const group = { border: '1px solid #e6dfd8', borderRadius: 8, padding: '16px 16px 4px', marginBottom: 16 };
const legend = { fontSize: 14, fontWeight: 500, padding: '0 6px' };
