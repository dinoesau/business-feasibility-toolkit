import { useEffect, useMemo, useState } from "react";
import { Field, inputStyle } from "./CalculatorShell";
import type { Lang } from "./i18n";
import {
  contarSeccionesLlenas,
  estaListoParaPdf,
  resumenVacio,
  type ResumenDatos,
} from "../../lib/resumen";

/**
 * Formulario de resumen ejecutivo con vista previa e impresion a PDF.
 * Mismo patron que las calculadoras (form izquierda, documento derecha,
 * boton que imprime). Sin backend: el PDF sale del dialogo de impresion
 * del navegador (Guardar como PDF).
 */
const STORAGE = (lang: Lang) => `bft-resumen-${lang}`;

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  height: "auto",
  minHeight: 72,
  resize: "vertical",
  lineHeight: 1.5,
  fontFamily: "inherit",
};

type Campo = {
  key: keyof ResumenDatos;
  es: string;
  en: string;
  ayudaEs: string;
  ayudaEn: string;
  largo?: boolean;
};

const CAMPOS: Campo[] = [
  { key: "empresa", es: "Nombre de la empresa", en: "Company name", ayudaEs: "Ej: Cafeteria Roma", ayudaEn: "E.g. Roma Coffee" },
  { key: "fecha", es: "Fecha", en: "Date", ayudaEs: "Ej: octubre 2026", ayudaEn: "E.g. October 2026" },
  { key: "contacto", es: "Contacto", en: "Contact", ayudaEs: "Nombre, email y telefono", ayudaEn: "Name, email and phone" },
  { key: "apertura", es: "1. Apertura", en: "1. Opening", ayudaEs: "Que ofreces, a que mercado, cuanto buscas y para que (18 meses).", ayudaEn: "What you offer, to which market, how much you raise and for what (18 months).", largo: true },
  { key: "problema", es: "2. Problema y oportunidad", en: "2. Problem and opportunity", ayudaEs: "Quien pierde cuanto por que causa + tu SOM verificado.", ayudaEn: "Who loses how much to what cause + your verified SOM.", largo: true },
  { key: "solucion", es: "3. Solucion y propuesta de valor", en: "3. Solution and value proposition", ayudaEs: "Que mejora en X% frente a la alternativa + diferenciador.", ayudaEn: "What improves by X% vs the alternative + differentiator.", largo: true },
  { key: "modelo", es: "4. Modelo de negocio", en: "4. Business model", ayudaEs: "Como cobras, margen objetivo y canales.", ayudaEn: "How you charge, target margin and channels.", largo: true },
  { key: "mercado", es: "5. Mercado y traccion", en: "5. Market and traction", ayudaEs: "Segmento + traccion (pilotos, ARR, crecimiento).", ayudaEn: "Segment + traction (pilots, ARR, growth).", largo: true },
  { key: "equipo", es: "6. Equipo", en: "6. Team", ayudaEs: "Fundadores, asesores y vacante por cubrir.", ayudaEn: "Founders, advisors and open hire.", largo: true },
  { key: "roadmap", es: "7. Roadmap 12-18 meses", en: "7. 12–18-month roadmap", ayudaEs: "Hitos por trimestre hasta el equilibrio.", ayudaEn: "Quarterly milestones to break-even.", largo: true },
  { key: "financiamiento", es: "8. Financiamiento solicitado", en: "8. Funding ask", ayudaEs: "Monto + reparto (% desarrollo, ventas, operacion).", ayudaEn: "Amount + split (% product, sales, ops).", largo: true },
  { key: "proyecciones", es: "9. Proyecciones (3 anos)", en: "9. Projections (3 years)", ayudaEs: "Ingresos, EBITDA ano 3, equilibrio y supuestos.", ayudaEn: "Revenue, year-3 EBITDA, break-even and assumptions.", largo: true },
  { key: "riesgos", es: "10. Riesgos y mitigacion", en: "10. Risks and mitigation", ayudaEs: "3 riesgos con su mitigacion cada uno.", ayudaEn: "3 risks with one mitigation each.", largo: true },
  { key: "cierre", es: "11. Cierre", en: "11. Close", ayudaEs: "Pide la reunion de 30 min + contacto.", ayudaEn: "Ask for the 30-min meeting + contact.", largo: true },
];

const SECCIONES: Array<{ key: keyof ResumenDatos; es: string; en: string }> = CAMPOS.filter((c) =>
  ["apertura", "problema", "solucion", "modelo", "mercado", "equipo", "roadmap", "financiamiento", "proyecciones", "riesgos", "cierre"].includes(c.key),
).map((c) => ({ key: c.key, es: c.es, en: c.en }));

export default function ResumenForm({ lang }: { lang: Lang }) {
  const [datos, setDatos] = useState<ResumenDatos>(() => resumenVacio());
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE(lang));
      if (raw) setDatos({ ...resumenVacio(), ...JSON.parse(raw) });
    } catch {
      // localStorage no disponible: se sigue con el form vacio.
    }
    setCargado(true);
  }, [lang]);

  useEffect(() => {
    if (!cargado) return;
    try {
      window.localStorage.setItem(STORAGE(lang), JSON.stringify(datos));
    } catch {
      // Sin persistencia el form sigue funcionando en memoria.
    }
  }, [datos, cargado, lang]);

  const llenas = useMemo(() => contarSeccionesLlenas(datos), [datos]);
  const listo = useMemo(() => estaListoParaPdf(datos), [datos]);
  const t = (es: string, en: string) => (lang === "es" ? es : en);

  const set = (key: keyof ResumenDatos) => (v: string) =>
    setDatos((d) => ({ ...d, [key]: v }));

  const limpiar = () => {
    setDatos(resumenVacio());
    try {
      window.localStorage.removeItem(STORAGE(lang));
    } catch {
      // Nada que limpiar en disco.
    }
  };

  const ver = (v: string, ayuda: string) =>
    v.trim() !== "" ? v : ayuda;

  return (
    <div>
      <div className="rts-grid doc-grid">
        <section className="rts-panel doc-form" aria-label={t("Formulario", "Form")}>
          {CAMPOS.map((c) => (
            <Field
              key={c.key}
              label={lang === "es" ? c.es : c.en}
              htmlFor={`res-${c.key}`}
            >
              {c.largo ? (
                <textarea
                  id={`res-${c.key}`}
                  style={textareaStyle}
                  rows={3}
                  placeholder={lang === "es" ? c.ayudaEs : c.ayudaEn}
                  value={datos[c.key]}
                  onChange={(e) => set(c.key)(e.target.value)}
                />
              ) : (
                <input
                  id={`res-${c.key}`}
                  style={inputStyle}
                  placeholder={lang === "es" ? c.ayudaEs : c.ayudaEn}
                  value={datos[c.key]}
                  onChange={(e) => set(c.key)(e.target.value)}
                />
              )}
            </Field>
          ))}
          <p style={{ fontSize: 14, color: "var(--muted)", margin: "8px 0 0" }}>
            {t(
              `${llenas} de 14 campos. Se guarda solo en tu navegador.`,
              `${llenas} of 14 fields. Saved only in your browser.`,
            )}
          </p>
        </section>

        <section className="doc-sheet" aria-label={t("Vista previa", "Preview")} aria-live="polite">
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <p style={{ fontSize: 22, fontWeight: 700, margin: "0 0 2px", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              {ver(datos.empresa, t("[Nombre de la empresa]", "[Company name]"))}
            </p>
            <p style={{ fontSize: 13, color: "#6c6a64", margin: 0 }}>
              {t("Resumen ejecutivo — solicitud de inversión", "Executive summary — investment ask")}
              {datos.fecha.trim() !== "" ? ` · ${datos.fecha}` : ""}
            </p>
            <div style={{ width: "30%", height: 2, background: "#cc785c", margin: "8px auto 0" }} />
          </div>
          {SECCIONES.map((s) => (
            <div key={s.key} style={{ marginBottom: 10 }}>
              <h3 style={{ fontSize: 14, margin: "0 0 2px", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
                {lang === "es" ? s.es : s.en}
              </h3>
              <p style={{ fontSize: 13.5, lineHeight: 1.55, margin: 0, whiteSpace: "pre-wrap" }}>
                {datos[s.key].trim() !== ""
                  ? datos[s.key]
                  : t("Sin escribir.", "Not written yet.")}
              </p>
            </div>
          ))}
          {datos.contacto.trim() !== "" && (
            <p style={{ fontSize: 13, marginTop: 12, borderTop: "1px solid #e6dfd8", paddingTop: 8 }}>
              <strong>{t("Contacto:", "Contact:")}</strong> {datos.contacto}
            </p>
          )}
        </section>
      </div>

      <div className="rts-actions">
        <button type="button" className="rts-btn" onClick={() => window.print()}>
          {t("Guardar PDF", "Save PDF")}
        </button>
        <button type="button" className="rts-btn rts-btn-secondary" onClick={limpiar}>
          {t("Limpiar", "Clear")}
        </button>
      </div>
      <p style={{ fontSize: 14, color: "var(--muted)" }}>
        {listo
          ? t("Listo: dale a Guardar PDF y elige «Guardar como PDF».", "Ready: hit Save PDF and pick “Save as PDF”.")
          : t("Tip: al imprimir, elige «Guardar como PDF». Solo sale la hoja, no el formulario.", "Tip: when printing, pick “Save as PDF”. Only the sheet prints, not the form.")}
      </p>
    </div>
  );
}
