/* =====================================================================
   CONVERGENCE — PERFILES Y REGLAS
   Vista pública de los datos. Lee TODO de data.js (FACTIONS, TIERS,
   IMGS): ningún perfil está escrito a mano en el HTML.
   ===================================================================== */
(function(){
  "use strict";

  const $  = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  /* ---------- Aplanado: una fila por perfil ----------
     Héroes, tropas y monturas comparten tabla; lo que no aplica queda vacío. */
  function filas(){
    const out = [];
    const montura = {};   // clave de MOUNTS -> {fac, cost} de quien la ofrece

    Object.values(FACTIONS).forEach(f => {
      (f.heroes || []).forEach(h => {
        out.push({
          def:h, fac:f, tipo:"hero",
          tier:h.tier, tierNom:TIERS[h.tier] ? TIERS[h.tier].es : "",
          rank:TIERS[h.tier] ? TIERS[h.tier].rank : 0
        });
        /* Una montura no tiene coste propio: lo pone la opción que la ofrece */
        (h.options || []).forEach(o => {
          if(o.mount && !montura[o.mount]) montura[o.mount] = { fac:f, cost:o.cost };
        });
      });
      (f.warriors || []).forEach(w => out.push({
        def:w, fac:f, tipo:"war", tier:null, tierNom:"", rank:0
      }));
    });

    Object.keys(montura).forEach(k => {
      const m = MOUNTS[k];
      if(!m) return;
      out.push({
        def:{ id:k, name:m.name, cost:montura[k].cost, race:"Montura",
              keywords:["Montura"], stats:m.stats, rules:m.rules, options:[] },
        fac:montura[k].fac, tipo:"mount", tier:null, tierNom:"", rank:0
      });
    });

    return out;
  }

  const TODAS = filas();

  /* Texto sobre el que busca el buscador: nombre, palabras clave,
     equipo, reglas y acciones heroicas. */
  function textoDe(r){
    const d = r.def;
    return [
      d.name, r.fac.name, d.race, (d.keywords || []).join(" "), d.wargear,
      (d.rules   || []).map(x => x.name + " " + x.desc).join(" "),
      (d.heroic  || []).map(x => x.name + " " + x.desc).join(" "),
      (d.options || []).map(x => x.name).join(" "),
      r.tierNom
    ].filter(Boolean).join(" ").toLowerCase();
  }
  TODAS.forEach(r => { r._txt = textoDe(r); });

  const COSTE_MAX = Math.max(...TODAS.map(r => r.def.cost), 0);

  /* ---------- Estado de la vista ---------- */
  const F = { fac:"", tipo:"", tier:"", coste:COSTE_MAX, q:"" };
  let orden = { col:"cost", dir:-1 };

  /* ---------- Poblado de los selectores ---------- */
  function initFiltros(){
    $("#fFac").innerHTML = '<option value="">Todas</option>' +
      Object.values(FACTIONS).map(f => `<option value="${f.id}">${esc(f.name)}</option>`).join("");

    /* Sólo los rangos que existen en los datos, de mayor a menor */
    const tiers = [...new Set(TODAS.filter(r => r.tier).map(r => r.tier))]
      .sort((a,b) => TIERS[b].rank - TIERS[a].rank);
    $("#fTier").innerHTML = '<option value="">Todos</option>' +
      tiers.map(t => `<option value="${t}">${esc(TIERS[t].es)}</option>`).join("");

    const sl = $("#fCoste");
    sl.max = COSTE_MAX; sl.value = COSTE_MAX;
    $("#fCosteVal").textContent = COSTE_MAX;

    /* Enlace directo desde facciones.html: perfiles.html?fac=bolton */
    const q = new URLSearchParams(location.search).get("fac");
    if(q && FACTIONS[q]){ F.fac = q; $("#fFac").value = q; }
  }

  /* ---------- Filtrado ---------- */
  function visibles(){
    return TODAS.filter(r => {
      if(F.fac  && r.fac.id !== F.fac)  return false;
      if(F.tipo && r.tipo   !== F.tipo) return false;
      if(F.tier && r.tier   !== F.tier) return false;
      if(r.def.cost > F.coste)          return false;
      if(F.q && r._txt.indexOf(F.q) === -1) return false;
      return true;
    });
  }

  /* ---------- Orden ----------
     Mv y los valores "4+" son texto: se ordenan por su parte numérica. */
  function valor(r, col){
    const d = r.def;
    if(col === "name") return d.name.toLowerCase();
    if(col === "cost") return d.cost;
    if(col === "might" || col === "will" || col === "fate") return d[col] != null ? d[col] : -1;
    const v = d.stats[col];
    if(typeof v === "number") return v;
    const n = parseFloat(String(v).replace(/[^\d.]/g, ""));
    return isNaN(n) ? -1 : n;
  }
  function ordenar(rs){
    return rs.slice().sort((a,b) => {
      const va = valor(a, orden.col), vb = valor(b, orden.col);
      if(va < vb) return -orden.dir;
      if(va > vb) return  orden.dir;
      return a.def.name.localeCompare(b.def.name);
    });
  }

  /* ---------- Tabla ---------- */
  function celda(v){
    return (v === undefined || v === null || v === "")
      ? '<td class="vacio">&mdash;</td>'
      : `<td>${esc(v)}</td>`;
  }

  function pintar(){
    const rs = ordenar(visibles());
    const tb = $("#cuerpoPerfiles");

    if(!rs.length){
      tb.innerHTML = `<tr><td colspan="14" class="sin-datos">
        Ning&uacute;n perfil coincide con estos filtros.</td></tr>`;
    } else {
      tb.innerHTML = rs.map((r, i) => {
        const d = r.def, s = d.stats;
        return `<tr data-perfil="${i}" tabindex="0">
          <td class="col-nm" style="--faccion:${r.fac.color}">
            <div class="p-nombre">
              ${IMGS[d.id] ? `<img src="${IMGS[d.id]}" alt="" loading="lazy">` : ""}
              <div>
                <div class="n">${esc(d.name)}</div>
                <div class="m">${esc(r.fac.name)} &middot; ${r.tipo === "hero" ? esc(r.tierNom) : esc((d.keywords||[]).join(" · "))}</div>
              </div>
            </div>
          </td>
          <td class="col-cost">${d.cost}</td>
          ${celda(s.mv)}${celda(s.fv)}${celda(s.sv)}${celda(s.s)}${celda(s.d)}
          ${celda(s.a)}${celda(s.w)}${celda(s.c)}${celda(s.i)}
          ${celda(d.might)}${celda(d.will)}${celda(d.fate)}
        </tr>`;
      }).join("");
      /* El índice del data-attribute apunta a la lista ya ordenada */
      tb._filas = rs;
    }

    const total = TODAS.length;
    $("#fInfo").innerHTML = rs.length === total
      ? `Mostrando los <b>${total}</b> perfiles cargados.`
      : `Mostrando <b>${rs.length}</b> de <b>${total}</b> perfiles.`;

    document.querySelectorAll("#tablaPerfiles th[data-sort]").forEach(th => {
      if(th.dataset.sort === orden.col) th.setAttribute("aria-sort", orden.dir === 1 ? "ascending" : "descending");
      else th.removeAttribute("aria-sort");
    });
  }

  /* ---------- Ficha completa ----------
     Mismo contenido que despliega el constructor, en modal. */
  function bloque(titulo, items){
    if(!items || !items.length) return "";
    return `<div class="blk"><div class="lb">${titulo}</div>` +
      items.map(a => `<div class="rule"><b>${esc(a.name)}:</b> ${esc(a.desc)}</div>`).join("") +
      `</div>`;
  }

  function abrirFicha(r){
    const d = r.def, s = d.stats;
    const k  = ["mv","fv","sv","s","d","a","w","c","i"];
    const lb = {mv:"Mv",fv:"Fv",sv:"Sv",s:"S",d:"D",a:"A",w:"W",c:"C",i:"I"};

    let tabla = `<table class="st"><tr>${k.map(x=>`<th>${lb[x]}</th>`).join("")}</tr>` +
                `<tr>${k.map(x=>`<td>${esc(s[x])}</td>`).join("")}</tr></table>`;

    let escudos = "";
    if(r.tipo === "hero"){
      escudos = `<div class="shields">
        <div class="shield"><div class="v">${d.might}</div><div class="l">Poder</div></div>
        <div class="shield"><div class="v">${d.will}</div><div class="l">Voluntad</div></div>
        <div class="shield"><div class="v">${d.fate}</div><div class="l">Destino</div></div>
      </div>`;
    }

    let opciones = "";
    if(d.options && d.options.length){
      opciones = `<div class="blk"><div class="lb">Opciones</div><ul class="ficha-opts">` +
        d.options.map(o => `<li><span>${esc(o.name)}
          ${o.desc ? `<span class="od">${esc(o.desc)}</span>` : ""}</span>
          <span class="oc">+${o.cost}</span></li>`).join("") +
        `</ul></div>`;
    }

    /* Sub-perfil de montura, igual que despliega el constructor */
    let monturas = "";
    (d.options || []).forEach(o => {
      const m = o.mount && MOUNTS[o.mount];
      if(!m) return;
      monturas += `<div class="blk sub-montura">
        <div class="lb">Montura &middot; ${esc(m.name)}</div>
        ${IMGS[o.mount] ? `<img class="sub-montura-img" src="${IMGS[o.mount]}" alt="${esc(m.name)}" loading="lazy">` : ""}
        <table class="st"><tr>${k.map(x=>`<th>${lb[x]}</th>`).join("")}</tr>
        <tr>${k.map(x=>`<td>${esc(m.stats[x])}</td>`).join("")}</tr></table>
        ${(m.rules||[]).map(x=>`<div class="rule"><b>${esc(x.name)}:</b> ${esc(x.desc)}</div>`).join("")}
      </div>`;
    });

    $("#fichaCuerpo").innerHTML = `
      <div class="ficha-head">
        ${IMGS[d.id] ? `<img src="${IMGS[d.id]}" alt="${esc(d.name)}">` : ""}
        <div class="ficha-id">
          <h2 id="fichaTitulo">${esc(d.name)}</h2>
          <div class="ficha-meta">${esc(r.fac.name)} &middot; ${esc(d.race)} &middot;
            ${esc((d.keywords||[]).join(" · "))}${r.tierNom ? " &middot; " + esc(r.tierNom) : ""}</div>
          <div class="ficha-coste">${d.cost}<span>PUNTOS</span></div>
        </div>
      </div>
      ${tabla}
      ${escudos}
      ${d.wargear ? `<div class="blk"><div class="lb">Equipamiento</div><p>${esc(d.wargear)}</p></div>` : ""}
      ${opciones}
      ${monturas}
      ${bloque("Acciones Heroicas", d.heroic)}
      ${bloque("Reglas especiales", d.rules)}
      ${d.flavor ? `<div class="flavor">“${esc(d.flavor)}”</div>` : ""}
    `;
    $("#ficha").style.setProperty("--faccion", r.fac.color);
    $("#fichaFondo").hidden = false;
    document.body.style.overflow = "hidden";
    $("#fichaCerrar").focus();
  }

  function cerrarFicha(){
    $("#fichaFondo").hidden = true;
    document.body.style.overflow = "";
  }

  /* ---------- Eventos ---------- */
  function initEventos(){
    $("#fFac").addEventListener("change", e => { F.fac = e.target.value; pintar(); });
    $("#fTipo").addEventListener("change", e => { F.tipo = e.target.value; pintar(); });
    $("#fTier").addEventListener("change", e => {
      F.tier = e.target.value;
      /* Filtrar por rango sólo tiene sentido sobre héroes */
      if(F.tier){ F.tipo = "hero"; $("#fTipo").value = "hero"; }
      pintar();
    });
    $("#fCoste").addEventListener("input", e => {
      F.coste = parseInt(e.target.value, 10);
      $("#fCosteVal").textContent = F.coste;
      pintar();
    });
    $("#fBusq").addEventListener("input", e => {
      F.q = e.target.value.trim().toLowerCase();
      pintar();
    });
    $("#fReset").addEventListener("click", () => {
      F.fac = ""; F.tipo = ""; F.tier = ""; F.coste = COSTE_MAX; F.q = "";
      $("#fFac").value = ""; $("#fTipo").value = ""; $("#fTier").value = "";
      $("#fCoste").value = COSTE_MAX; $("#fCosteVal").textContent = COSTE_MAX;
      $("#fBusq").value = "";
      pintar();
    });

    document.querySelectorAll("#tablaPerfiles th[data-sort]").forEach(th => {
      th.addEventListener("click", () => {
        const col = th.dataset.sort;
        if(orden.col === col) orden.dir = -orden.dir;
        else orden = { col:col, dir: col === "name" ? 1 : -1 };
        pintar();
      });
    });

    const tb = $("#cuerpoPerfiles");
    function abrirDesde(el){
      const tr = el.closest("[data-perfil]");
      if(!tr || !tb._filas) return;
      abrirFicha(tb._filas[parseInt(tr.dataset.perfil, 10)]);
    }
    tb.addEventListener("click", e => abrirDesde(e.target));
    tb.addEventListener("keydown", e => {
      if(e.key === "Enter" || e.key === " "){ e.preventDefault(); abrirDesde(e.target); }
    });

    $("#fichaCerrar").addEventListener("click", cerrarFicha);
    $("#fichaFondo").addEventListener("click", e => {
      if(e.target === $("#fichaFondo")) cerrarFicha();
    });
    document.addEventListener("keydown", e => {
      if(e.key === "Escape" && !$("#fichaFondo").hidden) cerrarFicha();
    });
  }

  function init(){
    initFiltros();
    initEventos();
    pintar();
  }

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
