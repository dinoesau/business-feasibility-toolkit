% .latexmkrc — compilacion reproducible (12-Factor V: build explicito).
$pdf_mode = 1;                       # pdflatex -> PDF directo
$pdflatex = 'pdflatex -interaction=nonstopmode -synctex=0 -halt-on-error %O %S';
$bibtex_use = 0;                     # plantillas sin bibliografia externa
$max_repeat = 3;                     # pasadas suficientes para TOC y refs
$out_dir = 'build';                  # artefactos fuera del arbol de fuentes
