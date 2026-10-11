/* Propuesta C: progreso en localStorage + punto de equilibrio en JS vanilla. */
(function () {
  "use strict";
  var KEY = "ruta-pasos-c";
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
    catch (e) { return []; }
  }
  function save(list) { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {} }
  function paint() {
    var done = load();
    document.querySelectorAll("#steps li").forEach(function (li) {
      var n = Number(li.getAttribute("data-step"));
      var isDone = done.indexOf(n) !== -1;
      li.classList.toggle("done", isDone);
      var b = li.querySelector("button");
      if (b) b.textContent = isDone ? "Listo ✓ — desmarcar" : "Marcar listo";
    });
    var nav = document.getElementById("nav-progress");
    if (nav) nav.textContent = done.length + " de 10";
    var bar = document.getElementById("bar"), pct = document.getElementById("pct");
    if (bar) bar.style.width = (done.length * 10) + "%";
    if (pct) pct.textContent = (done.length * 10) + "% completo";
  }
  document.querySelectorAll("#steps li button").forEach(function (b) {
    b.addEventListener("click", function () {
      var li = b.closest("li");
      var n = Number(li.getAttribute("data-step"));
      var done = load();
      var i = done.indexOf(n);
      if (i === -1) done.push(n); else done.splice(i, 1);
      save(done); paint();
    });
  });
  var navOnly = document.getElementById("nav-progress");
  if (navOnly && !document.getElementById("steps")) navOnly.textContent = load().length + " de 10";
  var doneBtn = document.getElementById("btn-done");
  if (doneBtn) doneBtn.addEventListener("click", function () {
    var done = load();
    if (done.indexOf(5) === -1) { done.push(5); save(done); }
    doneBtn.textContent = "Paso 5 listo ✓";
  });
  /* Calculadora */
  function num(id) {
    var el = document.getElementById(id);
    if (!el) return NaN;
    var raw = el.value.trim().replace(/[$,\s]/g, "");
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
  function setErr(id, msg) { var e = document.getElementById(id); if (e) e.textContent = msg || ""; }
  function calc() {
    var cf = num("f-cf"), p = num("f-p"), cv = num("f-cv");
    var ok = true;
    if (!Number.isFinite(cf) || cf < 0) { setErr("e-cf", "Pon un numero de 0 o mas."); ok = false; } else setErr("e-cf");
    if (!Number.isFinite(p) || p <= 0) { setErr("e-p", "Pon un precio mayor que 0."); ok = false; } else setErr("e-p");
    if (!Number.isFinite(cv) || cv < 0) { setErr("e-cv", "Pon un numero de 0 o mas."); ok = false; } else setErr("e-cv");
    if (ok && cv >= p) { setErr("e-cv", "El costo debe ser menor que el precio."); ok = false; }
    var R = { q: NaN, v: NaN, m: NaN };
    var q = document.getElementById("r-q"), v = document.getElementById("r-v"), m = document.getElementById("r-m");
    if (!q) return R;
    if (ok) {
      R.q = cf / (p - cv); R.v = R.q * p; R.m = p - cv;
      q.textContent = fmtNum(R.q); v.textContent = fmtMoney(R.v); m.textContent = fmtMoney(R.m);
    } else { q.textContent = "—"; v.textContent = "$—"; m.textContent = "$—"; }
    return R;
  }
  ["f-cf", "f-p", "f-cv"].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener("input", calc);
  });
  var csv = document.getElementById("btn-csv");
  if (csv) csv.addEventListener("click", function () {
    var r = calc();
    var text = "piezas_mes,ventas_mes,margen_pieza\n" + [r.q, r.v, r.m].map(function (n) {
      return Number.isFinite(n) ? Math.round(n * 100) / 100 : "";
    }).join(",") + "\n";
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type: "text/csv" }));
    a.download = "punto-equilibrio.csv";
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  });
  var pr = document.getElementById("btn-print");
  if (pr) pr.addEventListener("click", function () { window.print(); });
  paint(); calc();
})();
