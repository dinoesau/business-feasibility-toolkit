import { describe, expect, it } from "vitest";
import {
  calcularCostoTotal,
  desglosarPrecio,
  margenDesdePrecio,
  precioPorMargen,
  precioPorMarkup,
  precioPorValor,
} from "./pricing";

// Cafeteria MX: materiales $15 + mano de obra $8 + overhead $5 = $28 por bebida.
// Margen 60% sobre precio -> $28/0.4 = $70 (el ticket del caso TAM).
describe("pricing", () => {
  it("costo total = $28", () => {
    expect(calcularCostoTotal({ materiales: 15, manoObra: 8, overhead: 5 })).toBe(28);
  });

  it("precio por margen 60% = $70", () => {
    expect(precioPorMargen(28, 0.6)).toBeCloseTo(70, 10);
  });

  it("precio por markup 150% = $70 (equivale al margen 60%)", () => {
    expect(precioPorMarkup(28, 1.5)).toBeCloseTo(70, 10);
  });

  it("margen real de $70 con costo $28 = 60%", () => {
    expect(margenDesdePrecio(28, 70)).toBeCloseTo(0.6, 10);
  });

  it("precio por valor: referencia $65 con ajuste +10% = $71.5", () => {
    expect(precioPorValor(65, 0.1)).toBeCloseTo(71.5, 10);
  });

  it("desglose integra costo, precio y margen", () => {
    const d = desglosarPrecio({ materiales: 15, manoObra: 8, overhead: 5 }, 0.6);
    expect(d.costoTotal).toBe(28);
    expect(d.precio).toBeCloseTo(70, 10);
    expect(d.margenReal).toBeCloseTo(0.6, 10);
  });

  it("rechaza margen >= 1 y costo mayor que precio", () => {
    expect(() => precioPorMargen(28, 1)).toThrow("menor que 1");
    expect(() => margenDesdePrecio(80, 70)).toThrow("no puede superar al precio");
  });
});
