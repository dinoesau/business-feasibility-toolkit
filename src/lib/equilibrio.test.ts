import { describe, expect, it } from "vitest";
import { calcularPuntoEquilibrio, crearMezcla, margenContribucionPonderado } from "./equilibrio";

// Cafeteria MX: Americano $45 (CV $15) y Latte $55 (CV $20), mezcla 50/50, fijos $60,000/mes.
// MC pond = 30x0.5 + 35x0.5 = 32.5 -> PE = 60000/32.5 = 1846.15 uds, $92,307.69.
const MEZCLA = [
  { nombre: "Americano", precio: 45, costoVariable: 15, participacion: 0.5 },
  { nombre: "Latte", precio: 55, costoVariable: 20, participacion: 0.5 },
];

describe("equilibrio", () => {
  it("margen ponderado = 32.5", () => {
    expect(margenContribucionPonderado(MEZCLA)).toBeCloseTo(32.5, 10);
  });

  it("punto de equilibrio multiproducto verificable a mano", () => {
    const pe = calcularPuntoEquilibrio(MEZCLA, 60000);
    expect(pe.unidadesTotales).toBeCloseTo(1846.15, 2);
    expect(pe.ingresosTotales).toBeCloseTo(92307.69, 2);
    expect(pe.detalle[0]?.unidades).toBeCloseTo(923.08, 2);
    expect(pe.detalle[1]?.ingresos).toBeCloseTo(50769.23, 2);
  });

  it("rechaza participaciones que no suman 1", () => {
    const r = crearMezcla([{ nombre: "X", precio: 10, costoVariable: 5, participacion: 0.4 }]);
    expect(r.ok).toBe(false);
  });

  it("rechaza costo variable mayor que el precio", () => {
    expect(() => calcularPuntoEquilibrio([{ nombre: "X", precio: 10, costoVariable: 12, participacion: 1 }], 100)).toThrow(
      "debe ser menor que el precio",
    );
  });
});
