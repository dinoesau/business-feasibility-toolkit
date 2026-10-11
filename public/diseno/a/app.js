/* Propuesta A: punto de equilibrio en JS vanilla. Sin dependencias. */
(function () {
  "use strict";
  function num(id) {
    var raw = document.getElementById(id).value.trim().replace(/[$,\s]/g, "");
    if (raw === "") return NaN;
    var n = Number(raw);
    return Number.isFinite(n) ? n : NaN;
  }
  function fmtMoney(n) {
    if (!Number.isFinite(n)) return "$—";
    return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);
  }
  function fmtNum(n) {
    if (!Number.isFinite(n)) return "—";
    return new Intl.NumberFormat("es-MX", { maximumFractionDigits: 0 }).format(n);
  }
  function setErr(id, msg) { document.getElementById(id).textContent = msg || ""; }
  function calc() {
    var cf = num("f-cf"), p = num("f-p"), cv = num("f-cv");
    var ok = true;
    if (!Number.isFinite(cf) || cf < 0) { setErr("e-cf", "Pon un numero de 0 o mas."); ok = false; } else setErr("e-cf");
    if (!Number.isFinite(p) || p <= 0) { setErr("e-p", "Pon un precio mayor que 0."); ok = false; } else setErr("e-p");
    if (!Number.isFinite(cv) || cv < 0) { setErr("e-cv", "Pon un numero de 0 o mas."); ok = false; } else setErr("e-cv");
    if (ok && cv >= p) { setErr("e-cv", "El costo debe ser menor que el precio."); ok = false; }
    var R = { q: NaN, v: NaN, m: NaN, cf: cf, cvT: NaN };
    if (ok) {
      R.q = cf / (p - cv); R.v = R.q * p; R.m = p - cv; R.cvT = R.q * cv;
      document.getElementById("r-q").textContent = fmtNum(R.q);
      document.getElementById("r-v").textContent = fmtMoney(R.v);
      document.getElementById("r-m").textContent = fmtMoney(R.m);
      var max = Math.max(cf, R.cvT, R.v, 1);
      [["b-cf", cf], ["b-cv", R.cvT], ["b-v", R.v]].forEach(function (pair) {
        var el = document.getElementById(pair[0]);
        el.style.height = Math.max(4, (pair[1] / max) * 100) + "%";
        el.querySelector("i").textContent = fmtMoney(pair[1]);
      });
      document.getElementById("bars").hidden = false;
    } else {
      document.getElementById("r-q").textContent = "—";
      document.getElementById("r-v").textContent = "$—";
      document.getElementById("r-m").textContent = "$—";
      document.getElementById("bars").hidden = true;
    }
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
