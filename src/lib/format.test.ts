import { describe, expect, it } from "vitest";
import { formatAbreviado, formatMXN, formatNumero, formatPct } from "./format";
import { formatMoneda, formatPorcentaje, localePorDefecto, t } from "./i18n-format";

describe("format", () => {
  it("formatea MXN es-MX", () => {
    expect(formatMXN(1680000)).toContain("1,680,000.00");
  });

  it("formatea porcentaje 27.36%", () => {
    expect(formatPct(0.2736)).toContain("27.4");
  });

  it("abrevia millones para TAM", () => {
    expect(formatAbreviado(336_000_000)).toBe("$336.00 M");
    expect(formatAbreviado(1_680_000)).toBe("$1.68 M");
  });

  it("formatNumero agrupa miles", () => {
    expect(formatNumero(50000)).toBe("50,000");
  });

  it("rechaza NaN", () => {
    expect(() => formatMXN(Number.NaN)).toThrow("finito");
  });
});

describe("i18n-format", () => {
  it("traduce claves ES/EN", () => {
    expect(t("es", "puntoEquilibrio")).toBe("Punto de equilibrio");
    expect(t("en", "puntoEquilibrio")).toBe("Break-even point");
    expect(t("es", "tir")).toBe("Tasa interna de retorno");
  });

  it("moneda por locale (MXN vs USD)", () => {
    expect(formatMoneda("es", 70000)).toContain("70,000.00");
    expect(formatMoneda("en", 70000)).toContain("70,000.00");
    expect(formatMoneda("en", 70000)).toContain("$");
  });

  it("porcentaje por locale", () => {
    expect(formatPorcentaje("es", 0.6)).toContain("60");
    expect(formatPorcentaje("en", 0.6)).toContain("60");
  });

  it("locale por defecto es es", () => {
    expect(localePorDefecto()).toBe("es");
  });

  it("rechaza locale invalido", () => {
    expect(() => t("fr" as never, "van")).toThrow("locale invalido");
  });
});
