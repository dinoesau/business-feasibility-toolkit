import { describe, expect, it } from "vitest";
import {
  calcularBaseObjetivo,
  calcularCostoHora,
  calcularCostoProducto,
  calcularReceta,
  resolverDirectos,
  resolverIndirectos,
  sumarDirectos,
  sumarIndirectos,
  type CostosDirectos,
  type CostosIndirectos,
  type ParametrosVenta,
} from "./costo-producto";

// Caso de la hoja de ejemplo: directos 150+15, indirectos 20+10+20+5+15.
// Numeros verificados a mano; donde la hoja se equivoca se documenta el valor correcto.
const DIRECTOS: CostosDirectos = {
  materiaPrima: 150,
  empaque: 15,
  manoObra: 0,
  envioInsumos: 0,
  mermas: 0,
};
const INDIRECTOS: CostosIndirectos = {
  renta: 20,
  servicios: 10,
  software: 20,
  marketing: 5,
  administracion: 0,
  desgasteEquipo: 15,
};
const BASE_PARAMS: ParametrosVenta = {
  iva: 0.16,
  terminalPct: 0,
  terminalFija: 0,
  tasaResico: 0.01,
  tasaIsrEmpresarial: 0.3,
};

describe("costo-producto", () => {
  it("subtotal directos = $165", () => {
    expect(sumarDirectos(DIRECTOS)).toBe(165);
  });

  it("subtotal indirectos = $70", () => {
    expect(sumarIndirectos(INDIRECTOS)).toBe(70);
  });

  it("ejemplo hoja: costo $235, base $352.50, total $408.90, IVA $56.40", () => {
    const r = calcularCostoProducto(DIRECTOS, INDIRECTOS, "markup", 0.5, BASE_PARAMS);
    expect(r.costoTotal).toBeCloseTo(235, 10);
    expect(r.baseObjetivo).toBeCloseTo(352.5, 10);
    expect(r.precioFinal).toBeCloseTo(408.9, 10);
    expect(r.ivaMonto).toBeCloseTo(56.4, 10);
  });

  it("RESICO 1% oficial sobre base sin IVA: ISR $3.525, neta $113.975", () => {
    const r = calcularCostoProducto(DIRECTOS, INDIRECTOS, "markup", 0.5, BASE_PARAMS);
    expect(r.isrResico).toBeCloseTo(3.525, 10);
    expect(r.netaResico).toBeCloseTo(113.975, 10);
  });

  it("empresarial 30% SOBRE LA UTILIDAD ($117.50): ISR $35.25, neta $82.25", () => {
    const r = calcularCostoProducto(DIRECTOS, INDIRECTOS, "markup", 0.5, BASE_PARAMS);
    expect(r.isrEmpresarial).toBeCloseTo(35.25, 10);
    expect(r.netaEmpresarial).toBeCloseTo(82.25, 10);
  });

  it("margen 33.33% equivale a markup 50%: misma base $352.50", () => {
    expect(calcularBaseObjetivo(235, "margen", 1 / 3)).toBeCloseTo(352.5, 8);
    const r = calcularCostoProducto(DIRECTOS, INDIRECTOS, "margen", 1 / 3, BASE_PARAMS);
    expect(r.margenReal).toBeCloseTo(1 / 3, 8);
    expect(r.markupReal).toBeCloseTo(0.5, 8);
  });

  it("terminal 10% usa gross-up: base $100 sin IVA cobra $111.11", () => {
    const r = calcularCostoProducto(
      { materiaPrima: 100, empaque: 0, manoObra: 0, envioInsumos: 0, mermas: 0 },
      { renta: 0, servicios: 0, software: 0, marketing: 0, administracion: 0, desgasteEquipo: 0 },
      "markup",
      0,
      { ...BASE_PARAMS, iva: 0, terminalPct: 0.1 },
    );
    expect(r.precioFinal).toBeCloseTo(111.111, 2);
  });

  it("rechaza tasa RESICO no oficial como el 1.25% de la hoja", () => {
    expect(() =>
      calcularCostoProducto(DIRECTOS, INDIRECTOS, "markup", 0.5, { ...BASE_PARAMS, tasaResico: 0.0125 }),
    ).toThrow(/oficial/);
  });

  it("rechaza margen >= 100%, terminal >= 100% y costos negativos", () => {
    expect(() => calcularBaseObjetivo(235, "margen", 1)).toThrow(/menor que 1/);
    expect(() =>
      calcularCostoProducto(DIRECTOS, INDIRECTOS, "markup", 0.5, { ...BASE_PARAMS, terminalPct: 1 }),
    ).toThrow(/menor que 1/);
    expect(() => sumarDirectos({ ...DIRECTOS, materiaPrima: -1 })).toThrow(/no puede ser negativo/);
  });
});

describe("monto fijo o porcentaje", () => {
  it("merma 5% sobre directos $0.90 = $0.045", () => {
    const { directos } = resolverDirectos({
      materiaPrima: 0.9, empaque: 0, manoObra: 0, envioInsumos: 0,
      merma: { monto: 5, modo: "pct" },
    });
    expect(directos.mermas).toBeCloseTo(0.045, 10);
    expect(sumarDirectos(directos)).toBeCloseTo(0.945, 10);
  });

  it("merma fija $0.05 se respeta", () => {
    const { directos } = resolverDirectos({
      materiaPrima: 0.9, empaque: 0, manoObra: 0, envioInsumos: 0,
      merma: { monto: 0.05, modo: "fijo" },
    });
    expect(directos.mermas).toBeCloseTo(0.05, 10);
  });

  it("indirecto 10% sobre directos $1.00 = $0.10", () => {
    const ind = resolverIndirectos(
      {
        renta: { monto: 0.63, modo: "fijo" },
        servicios: { monto: 10, modo: "pct" },
        software: { monto: 0, modo: "fijo" },
        marketing: { monto: 0, modo: "fijo" },
        administracion: { monto: 0, modo: "fijo" },
        desgasteEquipo: { monto: 0, modo: "fijo" },
      },
      1.0,
    );
    expect(ind.servicios).toBeCloseTo(0.1, 10);
    expect(ind.renta).toBeCloseTo(0.63, 10);
  });

  it("rechaza porcentaje > 100 y modo desconocido", () => {
    expect(() =>
      resolverDirectos({
        materiaPrima: 1, empaque: 0, manoObra: 0, envioInsumos: 0,
        merma: { monto: 101, modo: "pct" },
      }),
    ).toThrow(/entre 0 y 100/);
    expect(() =>
      resolverIndirectos(
        {
          renta: { monto: 1, modo: "fijo" },
          servicios: { monto: 1, modo: "fijo" },
          software: { monto: 1, modo: "fijo" },
          marketing: { monto: 1, modo: "fijo" },
          administracion: { monto: 1, modo: "fijo" },
          // @ts-expect-error modo invalido a proposito
          desgasteEquipo: { monto: 1, modo: "tasa" },
        },
        1.0,
      ),
    ).toThrow(/fijo.*pct/);
  });

  it("vending integrado: directos $0.945 + indirectos $1.48 = costo $2.425", () => {
    const { directos } = resolverDirectos({
      materiaPrima: 0.9, empaque: 0, manoObra: 0, envioInsumos: 0,
      merma: { monto: 5, modo: "pct" },
    });
    const sub = sumarDirectos(directos);
    const ind = resolverIndirectos(
      {
        renta: { monto: 0.63, modo: "fijo" },
        servicios: { monto: 0.08, modo: "fijo" },
        software: { monto: 0.13, modo: "fijo" },
        marketing: { monto: 0.08, modo: "fijo" },
        administracion: { monto: 0.21, modo: "fijo" },
        desgasteEquipo: { monto: 0.35, modo: "fijo" },
      },
      sub,
    );
    expect(sub).toBeCloseTo(0.945, 10);
    expect(sumarIndirectos(ind)).toBeCloseTo(1.48, 10);
    const r = calcularCostoProducto(directos, ind, "markup", 0.5, BASE_PARAMS);
    expect(r.costoTotal).toBeCloseTo(2.425, 10);
    expect(r.baseObjetivo).toBeCloseTo(3.6375, 10);
  });
});

describe("costo por hora (servicios)", () => {
  it("sueldo 20,000 + gastos 5,000 entre 100 horas = $250/hora", () => {
    expect(calcularCostoHora(20000, 5000, 100)).toBeCloseTo(250, 10);
  });

  it("con 50% markup la base es $375/hora", () => {
    const costo = calcularCostoHora(20000, 5000, 100);
    expect(calcularBaseObjetivo(costo, "markup", 0.5)).toBeCloseTo(375, 10);
  });

  it("rechaza cero horas y montos negativos", () => {
    expect(() => calcularCostoHora(20000, 5000, 0)).toThrow(/mayor que cero/);
    expect(() => calcularCostoHora(-1, 5000, 100)).toThrow(/no puede ser negativo/);
  });
});

describe("receta (cocina y fabricacion)", () => {
  it("3 insumos suman exacto: 2x10 + 1.5x20 + 3x5 = $65", () => {
    const r = calcularReceta(
      [
        { cantidad: 2, precioUnitario: 10 },
        { cantidad: 1.5, precioUnitario: 20 },
        { cantidad: 3, precioUnitario: 5 },
      ],
      0,
      1,
    );
    expect(r.subtotal).toBeCloseTo(65, 10);
    expect(r.total).toBeCloseTo(65, 10);
    expect(r.costoPorUnidad).toBeCloseTo(65, 10);
  });

  it("merma 10% sobre $65 = $6.50 y entre 10 porciones = $7.15", () => {
    const r = calcularReceta(
      [
        { cantidad: 2, precioUnitario: 10 },
        { cantidad: 1.5, precioUnitario: 20 },
        { cantidad: 3, precioUnitario: 5 },
      ],
      10,
      10,
    );
    expect(r.merma).toBeCloseTo(6.5, 10);
    expect(r.total).toBeCloseTo(71.5, 10);
    expect(r.costoPorUnidad).toBeCloseTo(7.15, 10);
  });

  it("rechaza receta vacia, merma > 100 y cero porciones", () => {
    expect(() => calcularReceta([], 0, 1)).toThrow(/al menos un insumo/);
    expect(() => calcularReceta([{ cantidad: 1, precioUnitario: 1 }], 101, 1)).toThrow(/entre 0 y 100/);
    expect(() => calcularReceta([{ cantidad: 1, precioUnitario: 1 }], 0, 0)).toThrow(/mayor que cero/);
  });
});
