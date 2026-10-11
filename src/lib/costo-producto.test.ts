import { describe, expect, it } from "vitest";
import {
  calcularBaseObjetivo,
  calcularCostoProducto,
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
