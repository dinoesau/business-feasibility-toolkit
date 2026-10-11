import { describe, expect, it } from "vitest";
import {
  contarSeccionesLlenas,
  estaListoParaPdf,
  resumenVacio,
} from "./resumen";

describe("resumen ejecutivo (formulario a PDF)", () => {
  it("vacio no esta listo y cuenta 0", () => {
    expect(contarSeccionesLlenas(resumenVacio())).toBe(0);
    expect(estaListoParaPdf(resumenVacio())).toBe(false);
  });

  it("ignora espacios en blanco", () => {
    expect(contarSeccionesLlenas({ empresa: "   " })).toBe(0);
  });

  it("listo cuando empresa + 11 secciones tienen texto", () => {
    const lleno = {
      empresa: "Cafeteria Roma",
      fecha: "Oct 2026",
      contacto: "hola@ejemplo.mx",
      apertura: "Ofrecemos cafe...",
      problema: "Falta cafe...",
      solucion: "Vending...",
      modelo: "Venta por taza...",
      mercado: "Estudiantes...",
      equipo: "Dos socios...",
      roadmap: "Q1 MVP...",
      financiamiento: "$200k...",
      proyecciones: "0.5/2/5 MM...",
      riesgos: "Adopcion...",
      cierre: "Reunion 30 min...",
    };
    expect(contarSeccionesLlenas(lleno)).toBe(14);
    expect(estaListoParaPdf(lleno)).toBe(true);
  });

  it("sin empresa no esta listo aunque el resto llene", () => {
    const sinEmpresa = {
      apertura: "a",
      problema: "b",
      solucion: "c",
      modelo: "d",
      mercado: "e",
      equipo: "f",
      roadmap: "g",
      financiamiento: "h",
      proyecciones: "i",
      riesgos: "j",
      cierre: "k",
    };
    expect(estaListoParaPdf(sinEmpresa)).toBe(false);
  });
});
