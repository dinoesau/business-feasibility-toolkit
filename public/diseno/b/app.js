/* Propuesta B: punto de equilibrio en JS vanilla. Sin dependencias. */
(function () {
  "use strict";
  function num(id) {
    var raw = document.getElementById(id).value.trim().replace(/[$,\s]/g, "");
    if (raw === "") return NaN;
    var n = Number(raw);
    return Number.isFinite(n) ? n : NaN;
  }
  function fmt(n, dec) {
    if (!Number.isFinite(n)) return "—";
    return new Intl.NumberFormat("es-MX", { maximumFractionDigits: dec === undefined ? 0 : dec }).format(n);
  }
  function setErr(id, msg) { document.getElementById(id).textContent = msg || ""; }
  function calc() {
    var cf = num("f-cf"), p = num("f-p"), cv = num("f-cv");
    var ok = true;
    if (!Number.isFinite(cf) || cf < 0) { setErr("e-cf", "ERR: >= 0"); ok = false; } else setErr("e-cf");
    if (!Number.isFinite(p) || p <= 0) { setErr("e-p", "ERR: > 0"); ok = false; } else setErr("e-p");
    if (!Number.isFinite(cv) || cv < 0) { setErr("e-cv", "ERR: >= 0"); ok = false; } else setErr("e-cv");
    if (ok && cv >= p) { setErr("e-cv", "ERR: costo < precio"); ok = false; }
    var out = document.getElementById("out"), fill = document.getElementById("fill");
    var R = { q: NaN, v: NaN, m: NaN };
    if (!ok) {
      out.textContent = "q* = —\nventas = —\nmargen = —";
      fill.style.width = "0";
      return R;
    }
    R.q = cf / (p - cv); R.v = R.q * p; R.m = p - cv;
    out.innerHTML = "q* = <b>" + fmt(R.q) + "</b>/mes  <i class=\"ok\">●</i>\n" +
      "ventas = <b>$" + fmt(R.v) + "</b>/mes\n" +
      "margen = <b>$" + fmt(R.m, 2) + "</b>/pieza";
    fill.style.width = Math.min(100, (R.m / p) * 100) + "%";
    return R;
  }
  ["f-cf", "f-p", "f-cv"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", calc);
  });
  document.getElementById("btn-csv").addEventListener("click", function () {
    var r = calc();
    var csv = "piezas_mes,ventas_mes,margen_pieza\n" + [r.q, r.v, r.m].map(function (n) {
      return Number.isFinite(n) ? Math.round(n * 100) / 100 : "";
    }).join(",") + "\n";
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "punto-equilibrio.csv";
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  });
  document.getElementById("btn-print").addEventListener("click", function () { window.print(); });
  calc();
})();
