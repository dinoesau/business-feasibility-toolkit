import { describe, expect, it } from "vitest";
import {
  aplicarFunnel,
  calcularSAM,
  calcularSOM,
  calcularTAM,
  calcularTamSamSom,
  crearTamInputs,
} from "./tam";
import { unwrap } from "./result";

// Caso cafeteria MX: colonia con 50,000 personas, ticket $70, 2 visitas/semana (96/anio).
describe("tam", () => {
  it("calcula el TAM: 50000 x $70 x 96 = $336M", () => {
    expect(calcularTAM({ poblacion: 50000, ticketPromedio: 70, frecuenciaAnual: 96 })).toBe(336_000_000);
  });

  it("encadena SAM (10%) y SOM (5% del SAM)", () => {
    const inputs = unwrap(
      crearTamInputs({ poblacion: 50000, ticketPromedio: 70, frecuenciaAnual: 96, samShare: 0.1, somShare: 0.05 }),
    );
    const r = calcularTamSamSom(inputs);
    expect(r.tam).toBe(336_000_000);
    expect(r.sam).toBe(33_600_000);
    expect(r.som).toBe(1_680_000);
  });

  it("aplica el funnel 40% -> 25% -> 20% sobre 50,000 y deja 1,000 clientes", () => {
    const r = aplicarFunnel(50000, [0.4, 0.25, 0.2]);
    expect(r.clientesFinales).toBe(1000);
    expect(r.detallePorEtapa).toEqual([20000, 5000, 1000]);
  });

  it("rechaza shares fuera de [0,1] con Result, no con throw", () => {
    expect(crearTamInputs({ poblacion: 1, ticketPromedio: 1, frecuenciaAnual: 1, samShare: 1.5, somShare: 0 }).ok).toBe(false);
  });

  it("rechaza funnel vacio y tasas invalidas con throw claro", () => {
    expect(() => aplicarFunnel(100, [])).toThrow("etapas no puede estar vacio");
    expect(() => calcularSAM(100, -0.1)).toThrow("samShare debe estar entre 0 y 1");
    expect(() => calcularSOM(-5, 0.1)).toThrow("sam no puede ser negativo");
  });
});
