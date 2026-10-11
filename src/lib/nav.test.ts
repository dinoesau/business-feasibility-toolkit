import { describe, expect, it } from "vitest";
import { seccionActiva } from "./nav";

// GWT-1: sección calculadoras en ambos idiomas, con base dev y prod.
// GWT-2: sección guía y sus alias (guia/guide/ficha/idea-sheet).
// GWT-3: sección plantillas en ambos idiomas + casos inicio/null.

describe("seccionActiva", () => {
  // Given "/bt/es/calculadoras/x/" con base "/bt/", When se evalúa, Then "calculadoras".
  it("GWT-1: calcula sección calculadoras tras base+idioma (es/en, con/sin trailing slash)", () => {
    expect(seccionActiva("/bt/es/calculadoras/x/", "/bt/", "es")).toBe("calculadoras");
    expect(seccionActiva("/bt/es/calculadoras/x", "/bt", "es")).toBe("calculadoras");
    expect(seccionActiva("/es/calculadoras/", "/", "es")).toBe("calculadoras");
    expect(seccionActiva("/es/calculadoras", "/", "es")).toBe("calculadoras");
    expect(seccionActiva("/en/calculators/pricing/", "/", "en")).toBe("calculadoras");
    expect(seccionActiva("/en/calculators/pricing", "/", "en")).toBe("calculadoras");
    expect(
      seccionActiva(
        "/business-feasibility-toolkit/en/calculators/pricing/",
        "/business-feasibility-toolkit/",
        "en",
      ),
    ).toBe("calculadoras");
    expect(
      seccionActiva(
        "/business-feasibility-toolkit/en/calculators/pricing",
        "/business-feasibility-toolkit",
        "en",
      ),
    ).toBe("calculadoras");
  });

  // Given "/en/guide/step/y/", When se evalúa, Then "guia".
  it("GWT-2: resuelve guía y sus alias en ambos idiomas", () => {
    expect(seccionActiva("/en/guide/step/y/", "/", "en")).toBe("guia");
    expect(seccionActiva("/en/guide/step/y", "/", "en")).toBe("guia");
    expect(seccionActiva("/es/guia/paso/x/", "/", "es")).toBe("guia");
    expect(seccionActiva("/es/ficha/paso/x", "/", "es")).toBe("guia");
    expect(seccionActiva("/en/idea-sheet/step/x/", "/", "en")).toBe("guia");
    expect(
      seccionActiva("/business-feasibility-toolkit/es/guia/", "/business-feasibility-toolkit/", "es"),
    ).toBe("guia");
  });

  // Given "/es/plantillas/", When se evalúa, Then "plantillas".
  it("GWT-3: resuelve plantillas en ambos idiomas", () => {
    expect(seccionActiva("/es/plantillas/", "/", "es")).toBe("plantillas");
    expect(seccionActiva("/es/plantillas", "/", "es")).toBe("plantillas");
    expect(seccionActiva("/en/templates/", "/", "en")).toBe("plantillas");
    expect(seccionActiva("/en/templates", "/", "en")).toBe("plantillas");
    expect(
      seccionActiva(
        "/business-feasibility-toolkit/es/plantillas/reporte/",
        "/business-feasibility-toolkit/",
        "es",
      ),
    ).toBe("plantillas");
  });

  it("inicio: raíz de idioma o raíz del sitio → inicio", () => {
    expect(seccionActiva("/es/", "/", "es")).toBe("inicio");
    expect(seccionActiva("/es", "/", "es")).toBe("inicio");
    expect(seccionActiva("/en/", "/", "en")).toBe("inicio");
    expect(seccionActiva("/bt/es/", "/bt/", "es")).toBe("inicio");
    expect(seccionActiva("/bt/es", "/bt", "es")).toBe("inicio");
    expect(seccionActiva("/", "/", "es")).toBe("inicio");
    expect(seccionActiva("/business-feasibility-toolkit/", "/business-feasibility-toolkit/", "es")).toBe(
      "inicio",
    );
  });

  it("null: segmento desconocido, idioma distinto o fuera de base → null", () => {
    expect(seccionActiva("/es/contacto/", "/", "es")).toBeNull();
    expect(seccionActiva("/en/pricing/", "/", "en")).toBeNull();
    expect(seccionActiva("/es/calculadoras/", "/", "en")).toBeNull();
    expect(seccionActiva("/en/guide/", "/", "es")).toBeNull();
    expect(seccionActiva("/other/es/calculadoras/", "/bt/", "es")).toBeNull();
  });
});
