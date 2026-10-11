# Makefile — plantillas LaTeX del Business Feasibility Toolkit.
# 12-Factor V: build (latex) y release (zip-overleaf) explicitos y repetibles.
# Uso: make latex | make test | make zip-overleaf | make clean

LATEXMK  := latexmk -pdf -interaction=nonstopmode -synctex=0
MAINS    := 01-estudio-factibilidad/main-es 01-estudio-factibilidad/main-en \
            02-plan-negocios/main-es 02-plan-negocios/main-en \
            03-resumen-ejecutivo/main-es 03-resumen-ejecutivo/main-en \
            04-pitch-deck/main-es 04-pitch-deck/main-en
ZIPDIR   := ../../public/plantillas

.PHONY: latex test zip-overleaf clean help

latex: ## Compila los 8 documentos a build/ (Given-When-Then A1)
	@mkdir -p build
	@for m in $(MAINS); do \
	  d=$$(dirname $$m); b=$$(basename $$m); \
	  j=$$(echo "$$m" | tr '/' '-' | sed 's/-main-/-/'); \
	  (cd $$d && $(LATEXMK) -outdir=../build -jobname=$$j $$b.tex) || exit 1; \
	done
	@ls -la build/*.pdf

test: ## Criterio de aceptacion rapido: compila 1 PDF prueba (resumen ES)
	@mkdir -p build
	@(cd 03-resumen-ejecutivo && $(LATEXMK) -outdir=../build -jobname=03-resumen-ejecutivo-es main-es.tex)
	@test -f build/03-resumen-ejecutivo-es.pdf && echo "OK: build/03-resumen-ejecutivo-es.pdf generado"

zip-overleaf: ## Empaqueta 8 zips Overleaf-ready en public/plantillas/ (A4)
	@mkdir -p $(ZIPDIR)
	@rm -f $(ZIPDIR)/*.zip
	@for m in $(MAINS); do \
	  d=$$(dirname $$m); b=$$(basename $$m); l=$$(echo $$b | sed 's/^main-//'); \
	  rm -rf /tmp/bft-zip && mkdir -p /tmp/bft-zip/$$d /tmp/bft-zip/common; \
	  cp $$d/$$b.tex /tmp/bft-zip/$$d/; \
	  cp common/preambulo.sty common/portada.tex /tmp/bft-zip/common/; \
	  cp .latexmkrc /tmp/bft-zip/; \
	  (cd /tmp/bft-zip && zip -qr $(abspath $(ZIPDIR))/$$d-$$l.zip $$d common .latexmkrc); \
	done
	@python3 -c "import json,glob,os; fs=sorted(os.path.basename(p) for p in glob.glob('../../public/plantillas/*.zip')); json.dump({'plantillas':fs}, open('../../public/plantillas/manifest.json','w'), indent=2)"
	@ls -la $(ZIPDIR)

clean: ## Limpia artefactos de compilacion
	@rm -rf build /tmp/bft-zip

help: ## Ayuda
	@grep -E '^[a-z-]+:.*##' $(MAKEFILE_LIST) | sort
