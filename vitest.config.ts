import { defineConfig } from "vitest/config";

// Aislado del tsconfig raiz (pertenece al scaffold Astro de otro worker):
// tsconfigRaw inline evita que esbuild intente resolver "extends: astro/...".
export default defineConfig({
  test: { include: ["src/lib/*.test.ts"], environment: "node" },
  esbuild: {
    tsconfigRaw: JSON.stringify({
      compilerOptions: {
        target: "ES2022",
        module: "ESNext",
        moduleResolution: "bundler",
        strict: true,
        noUncheckedIndexedAccess: true,
        exactOptionalPropertyTypes: true,
      },
    }),
  },
});
