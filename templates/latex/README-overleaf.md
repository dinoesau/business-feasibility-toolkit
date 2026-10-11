# README Overleaf — importar las plantillas como ZIP

Requisito local alternativo: TeX Live 2024+ (`pdflatex`, `latexmk`).
En Overleaf no necesita instalar nada (usa pdfLaTeX, el motor por defecto).

## Contenido del ZIP

Cada zip de `public/plantillas/` preserva el arbol del repo para que las
rutas relativas `../common/...` funcionen identico en local y en Overleaf:

```text
01-estudio-factibilidad-es.zip
├── 01-estudio-factibilidad/main-es.tex
├── common/preambulo.sty
├── common/portada.tex
└── .latexmkrc
```

## Pasos para importar (5 minutos)

1. En Overleaf: **New Project → Upload Project** (o *Upload ZIP*).
2. Seleccione el zip, por ejemplo `01-estudio-factibilidad-es.zip`.
3. Abra **Menu (☰) → Main document** y elija
   `01-estudio-factibilidad/main-es.tex` (el main vive en subcarpeta para
   conservar las rutas relativas; este es el unico paso manual).
4. Confirme que el compilador sea **pdfLaTeX** (valor por defecto).
5. Pulse **Recompile** y descargue el PDF.

## Compilacion local (latexmk)

```sh
cd templates/latex
make test          # 1 PDF prueba (resumen ES) — criterio A1 rapido
make latex         # los 8 documentos a build/
make zip-overleaf  # regenera los 8 zips + manifest.json
make clean         # limpia build/
```

## Criterios de aceptacion (Given – When – Then)

- **A1**: Given TeX Live 2024+, When `make latex`, Then 8 PDFs sin errores.
- **A2**: Given el PDF del resumen ES, When cuento paginas, Then son 2.
- **A3**: Given un zip subido a Overleaf, When Recompile con pdfLaTeX,
  Then mismo PDF, sin errores ni rutas absolutas.
- **A4**: Given repo clonado, When `make zip-overleaf`, Then 8 zips
  reproducibles + `manifest.json` actualizado.

## Solucion de problemas

| Sintoma | Causa probable | Solucion |
|---------|----------------|----------|
| `File preambulo.sty not found` | Main document mal seleccionado | Menu → Main document → el `main-*.tex` de la subcarpeta |
| `Undefined control sequence \tituloProyecto` | Compilo `portada.tex` como main | Seleccione el `main-*.tex`, nunca un archivo de `common/` |
| Mas de 2 paginas en el resumen | Agrego secciones | El limite es intencional: edite, no agregue (ver RESEARCH.md) |
| `tcolorbox` no encontrado (TeX Live minimo) | Instalacion recortada | `tlmgr install tcolorbox siunitx microtype` o use TeX Live completo |
