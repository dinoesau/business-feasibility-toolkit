import { describe, expect, it } from "vitest";
import { calcularPRI, calcularROI, calcularTIR, calcularVAN, evaluarProyecto } from "./van-tir";

// Cafeteria MX: inversion $500k, flujos [120k,180k,220k,260k,300k], tasa 12%.
// Verificado con calculadora independiente: VAN 242,692.17, TIR 27.36%, PRI 2.909, ROI 116%.
const FLUJOS = [120_000, 180_000, 220_000, 260_000, 300_000];
const INV = 500_000;

describe("van-tir", () => {
  it("VAN a 12% = $242,692.17", () => {
    expect(calcularVAN(FLUJOS, 0.12, INV)).toBeCloseTo(242692.17, 2);
  });

  it("TIR ~= 27.36% y anula el VAN", () => {
    const tir = calcularTIR(FLUJOS, INV);
    expect(tir).not.toBeNull();
    expect(tir as number).toBeCloseTo(0.2736, 3);
    expect(calcularVAN(FLUJOS, tir as number, INV)).toBeCloseTo(0, 2);
  });

  it("PRI = 2.909 anios (se recupera en el anio 3)", () => {
    expect(calcularPRI(FLUJOS, INV)).toBeCloseTo(2.909, 3);
  });

  it("PRI es null si nunca se recupera", () => {
    expect(calcularPRI([10_000, 10_000], INV)).toBeNull();
  });

  it("ROI = 116%", () => {
    expect(calcularROI(FLUJOS, INV)).toBeCloseTo(1.16, 10);
  });

  it("evaluarProyecto integra las 4 metricas", () => {
    const e = evaluarProyecto(FLUJOS, 0.12, INV);
    expect(e.van).toBeCloseTo(242692.17, 2);
    expect(e.roi).toBeCloseTo(1.16, 10);
    expect(e.pri).toBeCloseTo(2.909, 3);
  });

  it("rechaza tasa <= -1 y flujos vacios", () => {
    expect(() => calcularVAN(FLUJOS, -1, INV)).toThrow("mayor que -1");
    expect(() => calcularROI([], INV)).toThrow("no puede estar vacio");
  });
});
