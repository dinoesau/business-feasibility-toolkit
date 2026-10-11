import { describe, expect, it } from "vitest";
import { aplicarEscenario, evaluarEscenarios } from "./sensibilidad";

// Cafeteria MX (mensual): ingresos $140k, fijos $60k, variables $49k => utilidad base $31k.
// Optimista (+20% ventas, +5% costos): 168k - 114.45k = 53.55k.
// Pesimista (-20% ventas, +10% costos): 112k - 119.9k = -7.9k.
describe("sensibilidad", () => {
  const BASE = { ingresos: 140_000, costosFijos: 60_000, costosVariables: 49_000 };
  const DELTAS = {
    optimista: { ventasPct: 0.2, costosPct: 0.05 },
    base: { ventasPct: 0, costosPct: 0 },
    pesimista: { ventasPct: -0.2, costosPct: 0.1 },
  };

  it("caso base: utilidad $31k", () => {
    const r = evaluarEscenarios(BASE, DELTAS);
    expect(r.base.utilidad).toBeCloseTo(31000, 2);
    expect(r.base.margen).toBeCloseTo(31000 / 140000, 10);
  });

  it("optimista: utilidad $53,550", () => {
    expect(evaluarEscenarios(BASE, DELTAS).optimista.utilidad).toBeCloseTo(53550, 2);
  });

  it("pesimista: perdida de -$7,900", () => {
    expect(evaluarEscenarios(BASE, DELTAS).pesimista.utilidad).toBeCloseTo(-7900, 2);
  });

  it("aplicarEscenario: +20% de 100 = 120", () => {
    expect(aplicarEscenario(100, 0.2)).toBeCloseTo(120, 10);
  });

  it("exige los 3 escenarios", () => {
    expect(() =>
      evaluarEscenarios(BASE, { base: { ventasPct: 0, costosPct: 0 } } as never),
    ).toThrow("falta el escenario");
  });
});
