import { describe, expect, it } from "vitest";
import { calcularCAC, calcularLTV, evaluarUnitEconomics, paybackCAC, ratioLtvCac, veredictoRatio } from "./cac-ltv";

// Cafeteria MX: $20,000 en marketing -> 200 clientes nuevos => CAC $100.
// Cliente: ticket $70 x 4 visitas/mes = $280 ARPU, margen 60%, churn 15%.
// LTV = 280x0.6/0.15 = $1,120. Ratio 11.2 (sobresaliente). Payback = 100/168 = 0.595 meses.
describe("cac-ltv", () => {
  it("CAC = $100", () => {
    expect(calcularCAC(20000, 200)).toBe(100);
  });

  it("LTV = $1,120", () => {
    expect(calcularLTV(280, 0.6, 0.15)).toBeCloseTo(1120, 10);
  });

  it("ratio 11.2 y payback 0.595 meses", () => {
    expect(ratioLtvCac(1120, 100)).toBeCloseTo(11.2, 10);
    expect(paybackCAC(280, 0.6, 100)).toBeCloseTo(0.595, 3);
  });

  it("evaluacion integrada + veredicto sobresaliente", () => {
    const e = evaluarUnitEconomics(20000, 200, 280, 0.6, 0.15);
    expect(e.cac).toBe(100);
    expect(e.ltv).toBeCloseTo(1120, 10);
    expect(veredictoRatio(e.ratioLtvCac)).toBe("sobresaliente");
  });

  it("veredicto insostenible bajo 1:1", () => {
    expect(veredictoRatio(0.8)).toBe("insostenible");
    expect(veredictoRatio(2)).toBe("ajustado");
    expect(veredictoRatio(4)).toBe("sano");
  });

  it("rechaza churn cero y cero clientes", () => {
    expect(() => calcularLTV(280, 0.6, 0)).toThrow("mayor que cero");
    expect(() => calcularCAC(20000, 0)).toThrow("mayor que cero");
  });
});
