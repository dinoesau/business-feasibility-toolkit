import { describe, expect, it } from "vitest";
import { mesRecuperacion, proyectarFlujoCaja } from "./flujo";

// Cafeteria MX: inversion $500k, base $140k/mes, crecimiento 2%, fijos $60k, CV 35%.
// Mes 1 a mano: ingresos 140k, egresos 109k, flujo 31k, acumulado -469k.
describe("flujo", () => {
  const PARAMS = {
    inversionInicial: 500_000,
    ingresoMensualBase: 140_000,
    crecimientoMensual: 0.02,
    costoFijoMensual: 60_000,
    costoVariableRatio: 0.35,
  };

  it("proyecta 36 meses por defecto", () => {
    expect(proyectarFlujoCaja(PARAMS)).toHaveLength(36);
  });

  it("mes 1 verificable a mano", () => {
    const [m1] = proyectarFlujoCaja({ ...PARAMS, meses: 1 });
    expect(m1?.ingresos).toBeCloseTo(140000, 2);
    expect(m1?.egresos).toBeCloseTo(109000, 2);
    expect(m1?.flujo).toBeCloseTo(31000, 2);
    expect(m1?.acumulado).toBeCloseTo(-469000, 2);
  });

  it("el acumulado es monotono consistente (acum_t = acum_{t-1} + flujo_t)", () => {
    const filas = proyectarFlujoCaja({ ...PARAMS, meses: 12 });
    for (let i = 1; i < filas.length; i++) {
      expect((filas[i]?.acumulado as number)).toBeCloseTo(
        (filas[i - 1]?.acumulado as number) + (filas[i]?.flujo as number),
        6,
      );
    }
  });

  it("mes de recuperacion coincide con el primer acumulado >= 0", () => {
    const filas = proyectarFlujoCaja(PARAMS);
    const esperado = filas.find((f) => f.acumulado >= 0)?.mes ?? null;
    expect(mesRecuperacion(filas)).toBe(esperado);
  });

  it("rechaza ratio variable > 1", () => {
    expect(() => proyectarFlujoCaja({ ...PARAMS, costoVariableRatio: 1.2 })).toThrow("entre 0 y 1");
  });
});
