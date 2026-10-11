import { useMemo, useState } from 'react';
import { CalculatorShell, Field, ResultRow, inputStyle } from './CalculatorShell';
import { DonutChart } from './Charts';
import { formatCurrency, formatPercent, parseNum, validateNumber, type Lang } from './i18n';
import {
  calcularBaseObjetivo,
  calcularCostoHora,
  calcularCostoProducto,
  calcularReceta,
  resolverDirectos,
  resolverIndirectos,
  type InsumoReceta,
  type ModoMonto,
  type ModoUtilidad,
  type ParametrosVenta,
} from '../../lib/costo-producto';

/**
 * Costo real en tres metodos: por unidad, por hora (servicios) y por receta.
 *
 * Given-When-Then:
 * - Given directos 165 + indirectos 70 y markup 50%,
 *   When computed, Then costo 235, base 352.50, total 408.90 e IVA 56.40.
 * - Given sueldo 20,000 + gastos 5,000 entre 100 horas,
 *   When computed, Then costo $250/hora.
 * - Given receta de 3 insumos que suma $65 con merma 10% y 10 porciones,
 *   When computed, Then $7.15 por porcion.
 * 12 Factors III/V: moneda por prop, sin llamadas red, computo cliente.
 */
const RESICO_OPTS = ['1', '1.1', '1.5', '2', '2.5'];

type Metodo = 'unidad' | 'hora' | 'receta';

interface FilaReceta {
  id: number;
  nombre: string;
  cantidad: string;
  precio: string;
}

let nextId = 1;
const nuevaFila = (nombre: string, cantidad: string, precio: string): FilaReceta => ({
  id: nextId++,
  nombre,
  cantidad,
  precio,
});

export default function ProductCostCalc({ lang, currency }: { lang: Lang; currency?: string }) {
  const [metodo, setMetodo] = useState<Metodo>('unidad');

  // Metodo por unidad.
  const [materia, setMateria] = useState('150');
  const [empaque, setEmpaque] = useState('15');
  const [manoObra, setManoObra] = useState('0');
  const [envio, setEnvio] = useState('0');
  const [mermas, setMermas] = useState('0');
  const [mermasModo, setMermasModo] = useState<ModoMonto>('fijo');
  const [renta, setRenta] = useState('20');
  const [rentaModo, setRentaModo] = useState<ModoMonto>('fijo');
  const [servicios, setServicios] = useState('10');
  const [serviciosModo, setServiciosModo] = useState<ModoMonto>('fijo');
  const [software, setSoftware] = useState('20');
  const [softwareModo, setSoftwareModo] = useState<ModoMonto>('fijo');
  const [marketing, setMarketing] = useState('5');
  const [marketingModo, setMarketingModo] = useState<ModoMonto>('fijo');
  const [admin, setAdmin] = useState('0');
  const [adminModo, setAdminModo] = useState<ModoMonto>('fijo');
  const [desgaste, setDesgaste] = useState('15');
  const [desgasteModo, setDesgasteModo] = useState<ModoMonto>('fijo');
  const [modo, setModo] = useState<ModoUtilidad>('markup');
  const [utilidad, setUtilidad] = useState('50');
  const [iva, setIva] = useState('16');
  const [termPct, setTermPct] = useState('0');
  const [termFija, setTermFija] = useState('0');
  const [resico, setResico] = useState('1');
  const [isrEmp, setIsrEmp] = useState('30');

  // Metodo por hora (servicios).
  const [hSueldo, setHSueldo] = useState('20000');
  const [hGastos, setHGastos] = useState('5000');
  const [hHoras, setHHoras] = useState('100');
  const [hModo, setHModo] = useState<ModoUtilidad>('margen');
  const [hUtilidad, setHUtilidad] = useState('30');
  const [hIva, setHIva] = useState('16');

  // Metodo por receta.
  const [filas, setFilas] = useState<FilaReceta[]>([
    nuevaFila('', '2', '10'),
    nuevaFila('', '1.5', '20'),
    nuevaFila('', '3', '5'),
  ]);
  const [recMerma, setRecMerma] = useState('10');
  const [recRinde, setRecRinde] = useState('10');

  const t = (es: string, en: string) => (lang === 'es' ? es : en);
  const money = (v: string) => validateNumber(v, lang, { min: 0 });
  const flex = (v: string, modo: ModoMonto) =>
    modo === 'pct' ? validateNumber(v, lang, { min: 0, max: 100 }) : money(v);

  // Unidad.
  const errsUnidad = [
    money(materia), money(empaque), money(manoObra), money(envio), flex(mermas, mermasModo),
    flex(renta, rentaModo), flex(servicios, serviciosModo), flex(software, softwareModo),
    flex(marketing, marketingModo), flex(admin, adminModo), flex(desgaste, desgasteModo),
    validateNumber(utilidad, lang, { min: 0, max: modo === 'margen' ? 99.99 : 1000 }),
    validateNumber(iva, lang, { min: 0, max: 100 }),
    validateNumber(termPct, lang, { min: 0, max: 99.99 }),
    money(termFija),
    validateNumber(isrEmp, lang, { min: 0, max: 100 }),
  ];
  const validUnidad = errsUnidad.every((e) => !e);

  const unidad = useMemo(() => {
    if (!validUnidad) return null;
    try {
      const { directos } = resolverDirectos({
        materiaPrima: parseNum(materia), empaque: parseNum(empaque),
        manoObra: parseNum(manoObra), envioInsumos: parseNum(envio),
        merma: { monto: parseNum(mermas), modo: mermasModo },
      });
      const subDirectos = directos.materiaPrima + directos.empaque + directos.manoObra + directos.envioInsumos + directos.mermas;
      const indirectos = resolverIndirectos(
        {
          renta: { monto: parseNum(renta), modo: rentaModo },
          servicios: { monto: parseNum(servicios), modo: serviciosModo },
          software: { monto: parseNum(software), modo: softwareModo },
          marketing: { monto: parseNum(marketing), modo: marketingModo },
          administracion: { monto: parseNum(admin), modo: adminModo },
          desgasteEquipo: { monto: parseNum(desgaste), modo: desgasteModo },
        },
        subDirectos,
      );
      const params: ParametrosVenta = {
        iva: parseNum(iva) / 100,
        terminalPct: parseNum(termPct) / 100,
        terminalFija: parseNum(termFija),
        tasaResico: parseNum(resico) / 100,
        tasaIsrEmpresarial: parseNum(isrEmp) / 100,
      };
      const r = calcularCostoProducto(directos, indirectos, modo, parseNum(utilidad) / 100, params);
      return { r, directos, indirectos };
    } catch {
      return null;
    }
  }, [validUnidad, materia, empaque, manoObra, envio, mermas, mermasModo, renta, rentaModo, servicios, serviciosModo, software, softwareModo, marketing, marketingModo, admin, adminModo, desgaste, desgasteModo, modo, utilidad, iva, termPct, termFija, resico, isrEmp]);

  // Hora.
  const eSueldo = money(hSueldo);
  const eGastos = money(hGastos);
  const eHoras = validateNumber(hHoras, lang, { allowZero: false });
  const eHUtilidad = validateNumber(hUtilidad, lang, { min: 0, max: hModo === 'margen' ? 99.99 : 1000 });
  const eHIva = validateNumber(hIva, lang, { min: 0, max: 100 });
  const validHora = !eSueldo && !eGastos && !eHoras && !eHUtilidad && !eHIva;

  const hora = useMemo(() => {
    if (!validHora) return null;
    try {
      const costoHora = calcularCostoHora(parseNum(hSueldo), parseNum(hGastos), parseNum(hHoras));
      const base = calcularBaseObjetivo(costoHora, hModo, parseNum(hUtilidad) / 100);
      const ivaTasa = parseNum(hIva) / 100;
      const precioFinal = base * (1 + ivaTasa);
      return { costoHora, base, precioFinal, sueldoHora: parseNum(hSueldo) / parseNum(hHoras), gastosHora: parseNum(hGastos) / parseNum(hHoras) };
    } catch {
      return null;
    }
  }, [validHora, hSueldo, hGastos, hHoras, hModo, hUtilidad, hIva]);

  // Receta.
  const eFilas = filas.map((f) => ({
    cantidad: validateNumber(f.cantidad, lang, { min: 0 }),
    precio: validateNumber(f.precio, lang, { min: 0 }),
  }));
  const eRecMerma = validateNumber(recMerma, lang, { min: 0, max: 100 });
  const eRecRinde = validateNumber(recRinde, lang, { allowZero: false });
  const validReceta = eFilas.every((e) => !e.cantidad && !e.precio) && !eRecMerma && !eRecRinde;

  const receta = useMemo(() => {
    if (!validReceta) return null;
    try {
      const insumos: InsumoReceta[] = filas.map((f) => ({ cantidad: parseNum(f.cantidad), precioUnitario: parseNum(f.precio) }));
      const r = calcularReceta(insumos, parseNum(recMerma), parseNum(recRinde));
      const detalle = filas.map((f, i) => ({
        label: f.nombre.trim() === '' ? `${t('Insumo', 'Input')} ${i + 1}` : f.nombre.trim(),
        value: parseNum(f.cantidad) * parseNum(f.precio),
      }));
      return { ...r, detalle };
    } catch {
      return null;
    }
  }, [validReceta, filas, recMerma, recRinde, lang]);

  const moneyField = (
    id: string, label: string, value: string, set: (v: string) => void, err?: string | null,
  ) => (
    <Field label={label} error={err ?? null} htmlFor={id}>
      <input id={id} style={inputStyle} inputMode="decimal" value={value} onChange={(e) => set(e.target.value)} />
    </Field>
  );

  const toggle = (modo: ModoMonto, set: (m: ModoMonto) => void) => (
    <span style={toggleRow} role="group" aria-label={t('Monto fijo o porcentaje', 'Fixed amount or percent')}>
      {(['fijo', 'pct'] as const).map((m) => (
        <button
          key={m}
          type="button"
          aria-pressed={modo === m}
          aria-label={m === 'fijo' ? t('En pesos', 'In money') : t('En porcentaje', 'In percent')}
          onClick={() => set(m)}
          style={modo === m ? toggleOn : toggleOff}
        >
          {m === 'fijo' ? '$' : '%'}
        </button>
      ))}
    </span>
  );

  const flexField = (
    id: string,
    label: string,
    value: string,
    set: (v: string) => void,
    modo: ModoMonto,
    setModo: (m: ModoMonto) => void,
    err?: string | null,
  ) => (
    <Field label={`${label} (${modo === 'pct' ? '%' : '$'})`} error={err ?? null} htmlFor={id}>
      <span style={{ display: 'block' }}>{toggle(modo, setModo)}</span>
      <input id={id} style={inputStyle} inputMode="decimal" value={value} onChange={(e) => set(e.target.value)} />
    </Field>
  );

  const tabs: Array<{ id: Metodo; label: string }> = [
    { id: 'unidad', label: t('Por unidad', 'Per unit') },
    { id: 'hora', label: t('Por hora', 'Per hour') },
    { id: 'receta', label: t('Por receta', 'Per recipe') },
  ];

  const formUnidad = (
    <>
      <fieldset style={group}>
        <legend style={legend}>{t('1 · Directos: lo que se va en cada pieza', '1 · Direct: what each unit eats')}</legend>
        <p style={helper}>
          {t(
            'Insumo, empaque y fletes se cotizan en $. La merma acepta % de esos directos.',
            'Materials, packaging and freight are quoted in $. Shrinkage takes % of those direct costs.',
          )}
        </p>
        {moneyField('pc-mat', t('Insumo principal ($)', 'Main input ($)'), materia, setMateria, errsUnidad[0])}
        {moneyField('pc-emp', t('Empaque y etiquetas ($)', 'Packaging and labels ($)'), empaque, setEmpaque, errsUnidad[1])}
        {moneyField('pc-mo', t('Mano de obra directa ($)', 'Direct labor ($)'), manoObra, setManoObra, errsUnidad[2])}
        {moneyField('pc-env', t('Fletes de insumos ($)', 'Inbound freight ($)'), envio, setEnvio, errsUnidad[3])}
        {flexField('pc-mer', t('Mermas y defectuosos', 'Shrinkage and defects'), mermas, setMermas, mermasModo, setMermasModo, errsUnidad[4])}
      </fieldset>
      <fieldset style={group}>
        <legend style={legend}>{t('2 · Indirectos: tu mes dividido entre tus piezas', '2 · Overhead: your month split across units')}</legend>
        <p style={helper}>
          {t(
            'Cada linea acepta $ o %. El % se calcula sobre el subtotal de directos.',
            'Each line takes $ or %. The % applies to the direct subtotal.',
          )}
        </p>
        {flexField('pc-renta', t('Renta del local', 'Shop rent'), renta, setRenta, rentaModo, setRentaModo, errsUnidad[5])}
        {flexField('pc-serv', t('Servicios (luz, agua)', 'Utilities (power, water)'), servicios, setServicios, serviciosModo, setServiciosModo, errsUnidad[6])}
        {flexField('pc-soft', t('Software y suscripciones', 'Software and subscriptions'), software, setSoftware, softwareModo, setSoftwareModo, errsUnidad[7])}
        {flexField('pc-mkt', t('Marketing y publicidad', 'Marketing and ads'), marketing, setMarketing, marketingModo, setMarketingModo, errsUnidad[8])}
        {flexField('pc-adm', t('Contador / administracion', 'Accounting / admin'), admin, setAdmin, adminModo, setAdminModo, errsUnidad[9])}
        {flexField('pc-des', t('Desgaste de equipo', 'Equipment wear'), desgaste, setDesgaste, desgasteModo, setDesgasteModo, errsUnidad[10])}
      </fieldset>
      <fieldset style={group}>
        <legend style={legend}>{t('3 · Utilidad: cuanto quieres ganar', '3 · Profit: how much you want to earn')}</legend>
        <p style={helper}>
          {t(
            'Markup suma sobre el costo. Margen aparta del precio. 50% de markup es 33.3% de margen.',
            'Markup adds on top of cost. Margin sets aside from price. 50% markup is 33.3% margin.',
          )}
        </p>
        <Field label={t('Modo', 'Mode')} htmlFor="pc-modo">
          <select id="pc-modo" style={inputStyle} value={modo} onChange={(e) => setModo(e.target.value as ModoUtilidad)}>
            <option value="markup">{t('Markup sobre costo', 'Markup on cost')}</option>
            <option value="margen">{t('Margen sobre precio', 'Margin on price')}</option>
          </select>
        </Field>
        {moneyField('pc-util', t('Utilidad (%)', 'Profit (%)'), utilidad, setUtilidad, errsUnidad[11])}
      </fieldset>
      <fieldset style={group}>
        <legend style={legend}>{t('4 · Cobro: terminal e IVA', '4 · Checkout: terminal and VAT')}</legend>
        <p style={helper}>
          {t(
            'Si cobras con tarjeta o facturas, eso tambien cuesta. La terminal cobra sobre el total.',
            'Cards and invoices cost too. The terminal takes its cut from the total.',
          )}
        </p>
        {moneyField('pc-term', t('Comision terminal (%)', 'Terminal fee (%)'), termPct, setTermPct, errsUnidad[13])}
        {moneyField('pc-termf', t('Comision terminal fija ($)', 'Terminal flat fee ($)'), termFija, setTermFija, errsUnidad[14])}
        {moneyField('pc-iva', t('IVA (%)', 'VAT (%)'), iva, setIva, errsUnidad[12])}
      </fieldset>
      <fieldset style={group}>
        <legend style={legend}>{t('5 · Impuestos: ISR (Mexico)', '5 · Taxes: income tax (Mexico)')}</legend>
        <p style={helper}>
          {t(
            'RESICO paga sobre lo cobrado. Empresarial paga sobre la utilidad, nunca sobre el ingreso.',
            'RESICO pays on revenue. The business regime pays on profit, never on revenue.',
          )}
        </p>
        <Field label={t('Tasa RESICO (oficial)', 'RESICO rate (official)')} htmlFor="pc-resico">
          <select id="pc-resico" style={inputStyle} value={resico} onChange={(e) => setResico(e.target.value)}>
            {RESICO_OPTS.map((o) => (
              <option key={o} value={o}>{o}%</option>
            ))}
          </select>
        </Field>
        {moneyField('pc-isr', t('ISR empresarial sobre utilidad (%)', 'Business ISR on profit (%)'), isrEmp, setIsrEmp, errsUnidad[15])}
      </fieldset>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button type="button" className="rts-btn rts-btn-secondary" onClick={() => {
          setMateria('0'); setEmpaque('0'); setManoObra('0'); setEnvio('0'); setMermas('0');
          setRenta('0'); setServicios('0'); setSoftware('0'); setMarketing('0'); setAdmin('0'); setDesgaste('0');
        }}>
          {t('Limpiar', 'Clear')}
        </button>
      </div>
    </>
  );

  const formHora = (
    <>
      <p style={helper}>
        {t(
          'Para servicios y oficios: tu sueldo meta mas los gastos del mes, entre las horas que si facturas.',
          'For services and trades: your target pay plus monthly bills, across the hours you bill.',
        )}
      </p>
      {moneyField('pc-hsueldo', t('Sueldo meta del mes ($)', 'Target monthly pay ($)'), hSueldo, setHSueldo, eSueldo)}
      {moneyField('pc-hgastos', t('Gastos fijos del mes ($)', 'Monthly fixed bills ($)'), hGastos, setHGastos, eGastos)}
      {moneyField('pc-hhoras', t('Horas facturables del mes', 'Billable hours a month'), hHoras, setHHoras, eHoras)}
      <fieldset style={group}>
        <legend style={legend}>{t('Utilidad e IVA', 'Profit and VAT')}</legend>
        <Field label={t('Modo', 'Mode')} htmlFor="pc-hmodo">
          <select id="pc-hmodo" style={inputStyle} value={hModo} onChange={(e) => setHModo(e.target.value as ModoUtilidad)}>
            <option value="markup">{t('Markup sobre costo', 'Markup on cost')}</option>
            <option value="margen">{t('Margen sobre precio', 'Margin on price')}</option>
          </select>
        </Field>
        {moneyField('pc-hutil', t('Utilidad (%)', 'Profit (%)'), hUtilidad, setHUtilidad, eHUtilidad)}
        {moneyField('pc-hiva', t('IVA (%)', 'VAT (%)'), hIva, setHIva, eHIva)}
      </fieldset>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button type="button" className="rts-btn rts-btn-secondary" onClick={() => { setHSueldo('0'); setHGastos('0'); setHHoras('0'); }}>
          {t('Limpiar', 'Clear')}
        </button>
      </div>
    </>
  );

  const formReceta = (
    <>
      <p style={helper}>
        {t(
          'Para cocina y fabricacion: lista cada insumo con cantidad y precio. La merma va en % del subtotal.',
          'For food and making: list each input with amount and price. Shrinkage goes in % of the subtotal.',
        )}
      </p>
      {filas.map((f, i) => (
        <div key={f.id} style={filaReceta}>
          <Field label={t('Insumo', 'Input')} htmlFor={`pc-rn-${f.id}`}>
            <input
              id={`pc-rn-${f.id}`}
              style={inputStyle}
              value={f.nombre}
              placeholder={t(`Insumo ${i + 1}`, `Input ${i + 1}`)}
              onChange={(e) => setFilas(filas.map((x) => (x.id === f.id ? { ...x, nombre: e.target.value } : x)))}
            />
          </Field>
          <div style={filaDoble}>
            <Field label={t('Cantidad', 'Amount')} error={eFilas[i]?.cantidad ?? null} htmlFor={`pc-rc-${f.id}`}>
              <input
                id={`pc-rc-${f.id}`}
                style={inputStyle}
                inputMode="decimal"
                value={f.cantidad}
                onChange={(e) => setFilas(filas.map((x) => (x.id === f.id ? { ...x, cantidad: e.target.value } : x)))}
              />
            </Field>
            <Field label={t('Precio unitario ($)', 'Unit price ($)')} error={eFilas[i]?.precio ?? null} htmlFor={`pc-rp-${f.id}`}>
              <input
                id={`pc-rp-${f.id}`}
                style={inputStyle}
                inputMode="decimal"
                value={f.precio}
                onChange={(e) => setFilas(filas.map((x) => (x.id === f.id ? { ...x, precio: e.target.value } : x)))}
              />
            </Field>
          </div>
          {filas.length > 1 ? (
            <button
              type="button"
              onClick={() => setFilas(filas.filter((x) => x.id !== f.id))}
              style={linkBtn}
            >
              {t('Quitar', 'Remove')}
            </button>
          ) : null}
        </div>
      ))}
      {filas.length < 12 ? (
        <button type="button" className="rts-btn rts-btn-secondary" onClick={() => setFilas([...filas, nuevaFila('', '', '')])}>
          {t('Agregar insumo', 'Add input')}
        </button>
      ) : null}
      <div style={{ marginTop: 16 }}>
        {moneyField('pc-rmerma', t('Merma (%)', 'Shrinkage (%)'), recMerma, setRecMerma, eRecMerma)}
        {moneyField('pc-rrinde', t('Piezas o porciones que rinde', 'Units or servings it yields'), recRinde, setRecRinde, eRecRinde)}
      </div>
    </>
  );

  const r = metodo === 'unidad' ? unidad?.r ?? null : null;
  const slicesUnidad = unidad
    ? [
        { label: t('Insumo principal', 'Main input'), value: unidad.directos.materiaPrima },
        { label: t('Empaque', 'Packaging'), value: unidad.directos.empaque },
        { label: t('Mano de obra', 'Labor'), value: unidad.directos.manoObra },
        { label: t('Fletes', 'Freight'), value: unidad.directos.envioInsumos },
        { label: t('Mermas', 'Shrinkage'), value: unidad.directos.mermas },
        { label: t('Renta', 'Rent'), value: unidad.indirectos.renta },
        { label: t('Servicios', 'Utilities'), value: unidad.indirectos.servicios },
        { label: t('Software', 'Software'), value: unidad.indirectos.software },
        { label: t('Marketing', 'Marketing'), value: unidad.indirectos.marketing },
        { label: t('Contador', 'Accounting'), value: unidad.indirectos.administracion },
        { label: t('Desgaste', 'Wear'), value: unidad.indirectos.desgasteEquipo },
      ].filter((d) => d.value > 0)
    : [];
  const slicesHora = hora
    ? [
        { label: t('Sueldo', 'Pay'), value: hora.sueldoHora },
        { label: t('Gastos', 'Bills'), value: hora.gastosHora },
      ].filter((d) => d.value > 0)
    : [];
  const slicesReceta = receta ? receta.detalle.filter((d) => d.value > 0) : [];

  const resultsUnidad = r ? (
    <>
      <p style={heroLabel}>{t('Costo total real por pieza', 'True total cost per unit')}</p>
      <p style={heroValue}>{formatCurrency(r.costoTotal, lang, currency)}</p>
      <p style={heroSub}>
        {t(
          'Con todo: directos + indirectos. Si queda arriba del precio de hoy, el paso 4 lo pone a prueba.',
          'All in: direct + overhead. If it lands above today’s price, step 4 puts it to the test.',
        )}
      </p>
      <ResultRow label={t('Subtotal directos', 'Direct subtotal')} value={formatCurrency(r.subtotalDirectos, lang, currency)} />
      <ResultRow label={t('Subtotal indirectos', 'Overhead subtotal')} value={formatCurrency(r.subtotalIndirectos, lang, currency)} />
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
  );

  const resultsHora = hora ? (
    <>
      <p style={heroLabel}>{t('Costo por hora', 'Cost per hour')}</p>
      <p style={heroValue}>{formatCurrency(hora.costoHora, lang, currency)}</p>
      <p style={heroSub}>
        {t(
          'Sueldo + gastos entre horas facturables. Cobra por debajo y trabajas gratis.',
          'Pay + bills across billable hours. Charge below and you work for free.',
        )}
      </p>
      <ResultRow label={t('Sueldo por hora', 'Pay per hour')} value={formatCurrency(hora.sueldoHora, lang, currency)} />
      <ResultRow label={t('Gastos por hora', 'Bills per hour')} value={formatCurrency(hora.gastosHora, lang, currency)} />
      <ResultRow label={t('Base objetivo (costo + utilidad)', 'Target base (cost + profit)')} value={formatCurrency(hora.base, lang, currency)} />
      <ResultRow label={t('Precio por hora con IVA', 'Hourly price with VAT')} value={formatCurrency(hora.precioFinal, lang, currency)} strong />
    </>
  ) : (
    <p style={{ color: '#6c6a64' }}>{t('Corrige los campos para ver resultados.', 'Fix the fields to see results.')}</p>
  );

  const resultsReceta = receta ? (
    <>
      <p style={heroLabel}>{t('Costo por pieza o porcion', 'Cost per unit or serving')}</p>
      <p style={heroValue}>{formatCurrency(receta.costoPorUnidad, lang, currency)}</p>
      <p style={heroSub}>
        {t(
          'Receta total entre lo que rinde. Ese numero entra al metodo por unidad como insumo.',
          'Whole recipe across its yield. That number feeds the per-unit method as an input.',
        )}
      </p>
      <ResultRow label={t('Subtotal receta', 'Recipe subtotal')} value={formatCurrency(receta.subtotal, lang, currency)} />
      <ResultRow label={t('Merma', 'Shrinkage')} value={formatCurrency(receta.merma, lang, currency)} />
      <ResultRow label={t('Total receta', 'Recipe total')} value={formatCurrency(receta.total, lang, currency)} strong />
    </>
  ) : (
    <p style={{ color: '#6c6a64' }}>{t('Corrige los campos para ver resultados.', 'Fix the fields to see results.')}</p>
  );

  const chartData = metodo === 'unidad' ? slicesUnidad : metodo === 'hora' ? slicesHora : slicesReceta;
  const chartOk = (metodo === 'unidad' && r !== null) || (metodo === 'hora' && hora !== null) || (metodo === 'receta' && receta !== null);

  const csv =
    metodo === 'unidad'
      ? {
          filename: 'costo-producto',
          headers: ['subtotal_directos', 'subtotal_indirectos', 'costo_total', 'base_objetivo', 'precio_final', 'iva', 'isr_resico', 'neta_resico', 'isr_empresarial', 'neta_empresarial'],
          rows: r ? [[r.subtotalDirectos, r.subtotalIndirectos, r.costoTotal, r.baseObjetivo, r.precioFinal, r.ivaMonto, r.isrResico, r.netaResico, r.isrEmpresarial, r.netaEmpresarial]] : [],
        }
      : metodo === 'hora'
        ? {
            filename: 'costo-hora',
            headers: ['sueldo', 'gastos', 'horas', 'costo_hora', 'base_objetivo', 'precio_final'],
            rows: hora ? [[parseNum(hSueldo), parseNum(hGastos), parseNum(hHoras), hora.costoHora, hora.base, hora.precioFinal]] : [],
          }
        : {
            filename: 'costo-receta',
            headers: ['insumo', 'cantidad', 'precio', 'importe'],
            rows: receta
              ? [
                  ...filas.map((f, i) => [
                    f.nombre.trim() === '' ? `insumo-${i + 1}` : f.nombre.trim(),
                    parseNum(f.cantidad),
                    parseNum(f.precio),
                    parseNum(f.cantidad) * parseNum(f.precio),
                  ]),
                  ['merma', parseNum(recMerma), '', receta.merma],
                  ['total', '', '', receta.total],
                  ['costo_por_unidad', parseNum(recRinde), '', receta.costoPorUnidad],
                ]
              : [],
          };

  return (
    <CalculatorShell
      lang={lang}
      title={t('Costo real: pieza, hora o receta', 'True cost: unit, hour or recipe')}
      description={t(
        'Elige tu metodo. Por unidad para productos, por hora para servicios, por receta para cocina y fabricacion.',
        'Pick your method. Per unit for products, per hour for services, per recipe for food and making.',
      )}
      backHref={`${import.meta.env.BASE_URL}${lang === 'es' ? 'es/calculadoras/' : 'en/calculators/'}`}
      csvFilename={csv.filename}
      csvHeaders={csv.headers}
      csvRows={csv.rows}
      form={
        <>
          <div style={tabRow} role="tablist" aria-label={t('Metodo de costeo', 'Costing method')}>
            {tabs.map((tb) => (
              <button
                key={tb.id}
                type="button"
                role="tab"
                aria-selected={metodo === tb.id}
                onClick={() => setMetodo(tb.id)}
                style={metodo === tb.id ? tabOn : tabOff}
              >
                {tb.label}
              </button>
            ))}
          </div>
          {metodo === 'unidad' ? formUnidad : metodo === 'hora' ? formHora : formReceta}
        </>
      }
      results={metodo === 'unidad' ? resultsUnidad : metodo === 'hora' ? resultsHora : resultsReceta}
      chart={
        chartOk && chartData.length > 0 ? (
          <div>
            <p style={chartTitle}>{t('A donde se va cada peso', 'Where each peso goes')}</p>
            <DonutChart data={chartData} />
          </div>
        ) : undefined
      }
    />
  );
}

const group = { border: '1px solid #e6dfd8', borderRadius: 8, padding: '16px 16px 4px', marginBottom: 16 };
const legend = { fontSize: 14, fontWeight: 500, padding: '0 6px' };
const helper = { fontSize: 13, color: '#6c6a64', margin: '0 0 12px' };
const heroLabel = { fontSize: 13, color: '#a09d96', margin: '0 0 4px' };
const heroValue = { fontFamily: '"JetBrains Mono", monospace', fontSize: 40, margin: '0 0 4px', lineHeight: 1.1 };
const heroSub = { fontSize: 13, color: '#a09d96', margin: '0 0 16px' };
const chartTitle = { fontSize: 14, fontWeight: 500, color: '#3d3d3a', margin: '0 0 8px' };
const toggleRow = { display: 'inline-flex', gap: 4, marginBottom: 8 };
const toggleOn = {
  background: '#cc785c',
  color: '#fff',
  border: '1px solid #cc785c',
  borderRadius: 6,
  minWidth: 36,
  minHeight: 28,
  fontSize: 13,
  fontWeight: 700,
  cursor: 'pointer',
};
const toggleOff = {
  background: 'transparent',
  color: '#6c6a64',
  border: '1px solid #e6dfd8',
  borderRadius: 6,
  minWidth: 36,
  minHeight: 28,
  fontSize: 13,
  fontWeight: 500,
  cursor: 'pointer',
};
const tabRow = { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 } as const;
const tabOn = {
  background: '#181715',
  color: '#faf9f5',
  border: '1px solid #181715',
  borderRadius: 8,
  padding: '10px 16px',
  minHeight: 40,
  fontSize: 14,
  fontWeight: 500,
  cursor: 'pointer',
};
const tabOff = {
  background: 'transparent',
  color: '#3d3d3a',
  border: '1px solid #e6dfd8',
  borderRadius: 8,
  padding: '10px 16px',
  minHeight: 40,
  fontSize: 14,
  fontWeight: 500,
  cursor: 'pointer',
};
const filaReceta = { border: '1px solid #e6dfd8', borderRadius: 8, padding: '12px 12px 4px', marginBottom: 12 };
const filaDoble = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 };
const linkBtn = {
  background: 'none',
  border: 'none',
  padding: 0,
  margin: '0 0 8px',
  color: '#cc785c',
  fontSize: 13,
  fontWeight: 500,
  cursor: 'pointer',
};
