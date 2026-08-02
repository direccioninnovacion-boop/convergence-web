/* =====================================================================
   CONVERGENCE — CONSTRUCTOR DE EJÉRCITOS
   Lógica extraída del piloto MESBG_Army_Builder.html.
   Reglas de composición: Rules Manual 2024 (pp. 154-157)

   El cálculo de costes, la validación y el seguimiento de partida están
   VERBATIM. Los únicos cambios son de integración, todos marcados con
   /* INTEGRACIÓN * / y ninguno toca la aritmética:

     1. bind() / guardas de render: el piloto era una página con tres
        pestañas y todo el DOM presente a la vez. Ahora son tres páginas
        y cada renderer se salta el trabajo si su contenedor no está.
     2. guardarSesion() tras plegar/desplegar y tras guardar lista: en el
        piloto ese estado no hacía falta persistirlo porque no había
        navegación entre páginas.
     3. El cambio de pestaña pasa a ser navegación a constructor.html.

   Requiere data.js cargado antes (IMGS, MOUNTS, TIERS, FACTIONS).
   ===================================================================== */

/* =====================================================================
   ESTADO
   ===================================================================== */
let S = nuevaLista("bolton");

function nuevaLista(fid){
  return { fac:fid, name:"", limit:600, warbands:[], general:null, id:null };
}
function fac(){ return FACTIONS[S.fac]; }
function heroDef(id){ return fac().heroes.find(h=>h.id===id); }
function warDef(id){ return fac().warriors.find(w=>w.id===id); }

/* =====================================================================
   LÓGICA PURA (costes, conteos, validación)
   ===================================================================== */
function costeHeroe(wb){
  const h = heroDef(wb.hero); if(!h) return 0;
  let c = h.cost;
  (wb.opts||[]).forEach(oid=>{ const o=h.options.find(x=>x.id===oid); if(o) c+=o.cost; });
  return c;
}
function costeUnitario(def, opts){
  let c = def.cost;
  (opts||[]).forEach(oid=>{ const o=def.options.find(x=>x.id===oid); if(o) c+=o.cost; });
  return c;
}
function costeStack(st){
  const d = warDef(st.type); if(!d) return 0;
  // El estandarte es una mejora de un único modelo del stack, no de todos
  let base = d.cost, extra = 0;
  (st.opts||[]).forEach(oid=>{
    const o = d.options.find(x=>x.id===oid); if(!o) return;
    if(o.banner) extra += o.cost; else base += o.cost;
  });
  return base*st.qty + extra;
}
function costeWarband(wb){
  return costeHeroe(wb) + (wb.troops||[]).reduce((a,s)=>a+costeStack(s),0);
}
function totales(){
  let pts=0, modelos=0, guerreros=0, arcos=0, throwing=0;
  S.warbands.forEach(wb=>{
    pts += costeWarband(wb); modelos += 1;
    (wb.troops||[]).forEach(st=>{
      const d = warDef(st.type); if(!d) return;
      modelos += st.qty; guerreros += st.qty;
      (st.opts||[]).forEach(oid=>{
        const o = d.options.find(x=>x.id===oid); if(!o) return;
        if(o.bow) arcos += st.qty;
        if(o.throwing) throwing += st.qty;
      });
    });
  });
  return {pts, modelos, guerreros, arcos, throwing};
}
function seguidores(wb){ return (wb.troops||[]).reduce((a,s)=>a+s.qty,0); }
function limiteProyectiles(guerreros){ return Math.ceil(guerreros/3); }

function generalAuto(){
  if(!S.warbands.length) return null;
  if(S.general && S.warbands.some(w=>w.uid===S.general)) return S.general;
  let best=null, r=-1;
  S.warbands.forEach(wb=>{
    const h=heroDef(wb.hero); if(!h) return;
    const rank=TIERS[h.tier].rank;
    if(rank>r){ r=rank; best=wb.uid; }
  });
  return best;
}
function empateGeneral(){
  const rs = S.warbands.map(wb=>{const h=heroDef(wb.hero);return h?TIERS[h.tier].rank:0;});
  const mx = Math.max(...rs, 0);
  return rs.filter(x=>x===mx).length > 1;
}

function validar(){
  const t = totales(), out = [];
  if(!S.warbands.length){ out.push({t:"warn", m:"Tu ejército está vacío. Añade al menos un héroe."}); return out; }

  if(t.pts > S.limit) out.push({t:"err", m:`Te pasas del límite por <b>${t.pts-S.limit} puntos</b> (${t.pts} de ${S.limit}).`});
  else out.push({t:"good", m:`Dentro del límite. Te quedan <b>${S.limit-t.pts} puntos</b>.`});

  // Únicos duplicados
  const cont={};
  S.warbands.forEach(wb=>{ cont[wb.hero]=(cont[wb.hero]||0)+1; });
  Object.keys(cont).forEach(hid=>{
    const h=heroDef(hid);
    if(h && h.unique && cont[hid]>1) out.push({t:"err", m:`<b>${h.name}</b> es un modelo Único: solo puede aparecer una vez en el ejército.`});
  });

  // Límite de seguidores por Tier
  S.warbands.forEach((wb,i)=>{
    const h=heroDef(wb.hero); if(!h) return;
    const max=TIERS[h.tier].followers, n=seguidores(wb);
    if(n>max) out.push({t:"err", m:`Warband ${i+1} (<b>${h.name}</b>, ${TIERS[h.tier].name}): ${n} seguidores, el máximo es ${max}.`});
    if(max===0 && n>0) out.push({t:"err", m:`<b>${h.name}</b> es un Héroe Independiente: nunca puede llevar seguidores.`});
  });

  // Límite de arcos y de armas arrojadizas (1/3 de los GUERREROS; los héroes se ignoran)
  const lim = limiteProyectiles(t.guerreros);
  if(t.arcos > lim) out.push({t:"err", m:`Límite de arcos superado: <b>${t.arcos}</b> guerreros con arco y el máximo es <b>${lim}</b> (un tercio de ${t.guerreros} guerreros).`});
  else if(t.arcos>0) out.push({t:"good", m:`Arcos: ${t.arcos} de ${lim} permitidos.`});
  if(t.throwing > lim) out.push({t:"err", m:`Límite de armas arrojadizas superado: <b>${t.throwing}</b> y el máximo es <b>${lim}</b>.`});

  // Estandartes: uno por warband como máximo
  S.warbands.forEach((wb,i)=>{
    let b=0;
    (wb.troops||[]).forEach(st=>{
      const d=warDef(st.type); if(!d) return;
      (st.opts||[]).forEach(oid=>{ const o=d.options.find(x=>x.id===oid); if(o&&o.banner) b++; });
    });
    if(b>1) out.push({t:"warn", m:`Warband ${i+1} lleva ${b} estandartes. Lo habitual es un único portaestandarte por warband.`});
  });

  // General
  if(empateGeneral()) out.push({t:"warn", m:"Hay empate en el Tier más alto: puedes elegir tú qué héroe es el General (toca la estrella)."});

  return out;
}

/* =====================================================================
   MODO PARTIDA
   ===================================================================== */
function initGame(wb){
  if(!wb.g) wb.g = {};
  const h = heroDef(wb.hero);
  if(h){
    wb.g.might = wb.g.might ?? 0; wb.g.will = wb.g.will ?? 0;
    wb.g.fate = wb.g.fate ?? 0; wb.g.wounds = wb.g.wounds ?? 0;
  }
  (wb.troops||[]).forEach(st=>{ st.dead = st.dead ?? 0; });
}
function vivos(){
  let vivos=0, inicio=0;
  S.warbands.forEach(wb=>{
    initGame(wb);
    const h=heroDef(wb.hero);
    inicio += 1;
    const heroMuerto = h ? ((wb.g.wounds||0) >= h.stats.w) : false;
    if(!heroMuerto) vivos += 1;
    (wb.troops||[]).forEach(st=>{ inicio += st.qty; vivos += Math.max(0, st.qty - (st.dead||0)); });
  });
  // Rules Manual 2024: un ejército se Rompe al quedar reducido a MENOS del 50% de sus modelos iniciales.
  const minSeguro = Math.ceil(inicio/2);
  return {vivos, inicio, minSeguro, roto: inicio>0 && vivos < minSeguro};
}

/* =====================================================================
   RENDER
   ===================================================================== */
const $ = s=>document.querySelector(s);
const esc = s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* INTEGRACIÓN: enlaza un listener sólo si el elemento existe en esta
   página. En el piloto todos los controles estaban siempre en el DOM. */
function bind(sel, ev, fn){
  const el = $(sel);
  if(el) el.addEventListener(ev, fn);
  return el;
}
/* INTEGRACIÓN: asigna .value sólo si el control existe. */
function setVal(sel, v){
  const el = $(sel);
  if(el) el.value = v;
}

function statTable(st, mods){
  mods = mods||{};
  const k=["mv","fv","sv","s","d","a","w","c","i"];
  const lb={mv:"Mv",fv:"Fv",sv:"Sv",s:"S",d:"D",a:"A",w:"W",c:"C",i:"I"};
  let th="",td="";
  k.forEach(x=>{
    th+=`<th>${lb[x]}</th>`;
    let v=st[x], m=false;
    if(mods[x]!=null && typeof v==="number"){ v=v+mods[x]; m=true; }
    td+=`<td class="${m?'mod':''}">${esc(v)}</td>`;
  });
  return `<table class="st"><tr>${th}</tr><tr>${td}</tr></table>`;
}
function modsDe(def, opts){
  const m={};
  (opts||[]).forEach(oid=>{
    const o=def.options.find(x=>x.id===oid);
    if(o&&o.mod) Object.keys(o.mod).forEach(k=>{ m[k]=(m[k]||0)+o.mod[k]; });
  });
  return m;
}
/* Miniatura pequeña (catálogo, cabeceras, modo partida) */
function thumb(id, cls){
  return IMGS[id] ? `<img class="thumb ${cls||''}" src="${IMGS[id]}" alt="" loading="lazy">` : "";
}
/* Retrato grande (ficha desplegada) */
function retrato(def){
  if(!IMGS[def.id]) return "";
  return `<div class="pfigure"><img class="portrait" src="${IMGS[def.id]}" alt="${esc(def.name)}" loading="lazy">
    <div class="pcap">${esc(def.name)}</div></div>`;
}

function bloqueReglas(def){
  let h="";
  if(def.wargear) h+=`<div class="blk"><div class="lb">Equipamiento</div><p>${esc(def.wargear)}</p></div>`;
  if(def.heroic&&def.heroic.length){
    h+=`<div class="blk"><div class="lb">Acciones Heroicas</div>`;
    def.heroic.forEach(a=>h+=`<div class="rule"><b>${esc(a.name)}:</b> ${esc(a.desc)}</div>`);
    h+=`</div>`;
  }
  if(def.rules&&def.rules.length){
    h+=`<div class="blk"><div class="lb">Reglas especiales</div>`;
    def.rules.forEach(a=>h+=`<div class="rule"><b>${esc(a.name)}:</b> ${esc(a.desc)}</div>`);
    h+=`</div>`;
  }
  if(def.flavor) h+=`<div class="flavor">“${esc(def.flavor)}”</div>`;
  return h;
}

function renderCatalogo(){
  if(!$("#catalog")) return;   /* INTEGRACIÓN: sólo en constructor.html */
  const f=fac(); let h=`<div class="cathead">Héroes</div>`;
  f.heroes.forEach(x=>{
    h+=`<div class="cat-item" data-add-hero="${x.id}">${thumb(x.id)}
      <div class="nm">${esc(x.name)}<div class="tg">${TIERS[x.tier].name}${x.unique?" · Único":""}</div></div>
      <div class="pt">${x.cost}</div></div>`;
  });
  h+=`<div class="cathead">Tropas</div>`;
  f.warriors.forEach(x=>{
    h+=`<div class="cat-item" data-info-war="${x.id}">${thumb(x.id)}
      <div class="nm">${esc(x.name)}<div class="tg">${x.keywords.join(" · ")}</div></div>
      <div class="pt">${x.cost}</div></div>`;
  });
  h+=`<div class="tiny muted" style="margin-top:9px">Toca un héroe para crear su warband. Las tropas se añaden desde dentro de cada warband.</div>`;
  $("#catalog").innerHTML=h;
}

function renderEjercito(){
  if(!$("#army")) return;      /* INTEGRACIÓN: sólo en constructor.html */
  const cont=$("#army"); let h="";
  const gen=generalAuto(); S.general=gen;

  S.warbands.forEach((wb,i)=>{
    const hd=heroDef(wb.hero); if(!hd) return;
    const mods=modsDe(hd, wb.opts);
    const nf=seguidores(wb), mx=TIERS[hd.tier].followers;
    const esGen = wb.uid===gen;

    h+=`<div class="wb">
      <div class="wb-head">
        <span class="tier">${TIERS[hd.tier].es}</span>
        <span class="t">${esc(hd.name)}</span>
        ${esGen?`<span class="genbadge">★ General</span>`:`<button class="btn sm" data-general="${wb.uid}" title="Nombrar General">☆</button>`}
        <span class="grow"></span>
        <span class="small muted">${nf}/${mx} seguidores</span>
        <span class="pt">${costeWarband(wb)} pts</span>
        <button class="x" data-del-wb="${wb.uid}" aria-label="Quitar warband">✕</button>
      </div>
      <div class="wb-body">`;

    /* --- héroe --- */
    h+=`<div class="unit ${wb.open?'open':''}">
      <div class="unit-head" data-toggle-hero="${wb.uid}">
        <span class="chev">${wb.open?'▾':'▸'}</span>${thumb(hd.id,'sm')}
        <span class="nm">${esc(hd.name)}</span>
        <span class="pt">${costeHeroe(wb)}</span>
      </div>
      <div class="unit-detail">
        ${retrato(hd)}
        <div class="tiny muted" style="margin-bottom:5px">${hd.race} · ${hd.keywords.join(", ")}</div>
        ${statTable(hd.stats, mods)}
        <div class="shields">
          <div class="shield"><div class="v">${hd.might}</div><div class="l">Poder</div></div>
          <div class="shield"><div class="v">${hd.will}</div><div class="l">Voluntad</div></div>
          <div class="shield"><div class="v">${hd.fate}</div><div class="l">Destino</div></div>
        </div>
        <div class="blk"><div class="lb">Opciones</div>`;
    hd.options.forEach(o=>{
      const on=(wb.opts||[]).includes(o.id);
      h+=`<div class="opt ${on?'on':''}">
        <input type="checkbox" ${on?'checked':''} data-hopt="${wb.uid}|${o.id}" id="ho${wb.uid}${o.id}">
        <label for="ho${wb.uid}${o.id}">${esc(o.name)}${o.desc?`<span class="od">${esc(o.desc)}</span>`:''}</label>
        <span class="oc">+${o.cost}</span></div>`;
    });
    h+=`</div>`;
    (wb.opts||[]).forEach(oid=>{
      const o=hd.options.find(x=>x.id===oid);
      if(o&&o.mount){ const m=MOUNTS[o.mount];
        h+=`<div class="blk"><div class="lb">Montura · ${esc(m.name)}</div>${statTable(m.stats,{})}
          ${m.rules.map(r=>`<div class="rule"><b>${esc(r.name)}:</b> ${esc(r.desc)}</div>`).join("")}</div>`;
      }
    });
    h+=bloqueReglas(hd)+`</div></div>`;

    /* --- tropas --- */
    (wb.troops||[]).forEach((st,j)=>{
      const d=warDef(st.type); if(!d) return;
      const m2=modsDe(d, st.opts);
      h+=`<div class="unit ${st.open?'open':''}">
        <div class="unit-head" data-toggle-troop="${wb.uid}|${j}">
          <span class="chev">${st.open?'▾':'▸'}</span>${thumb(d.id,'sm')}
          <span class="nm">${st.qty}× ${esc(d.name)}</span>
          <span class="pt">${costeStack(st)}</span>
          <button class="x" data-del-troop="${wb.uid}|${j}" aria-label="Quitar tropa">✕</button>
        </div>
        <div class="unit-detail">
          ${retrato(d)}
          <div class="row" style="margin-bottom:9px">
            <div class="qty">
              <button data-qty="${wb.uid}|${j}|-1" aria-label="Quitar uno">−</button>
              <div class="n">${st.qty}</div>
              <button data-qty="${wb.uid}|${j}|1" aria-label="Añadir uno">+</button>
            </div>
            <span class="small muted">${costeUnitario(d,(st.opts||[]).filter(o=>{const oo=d.options.find(x=>x.id===o);return oo&&!oo.banner;}))} pts por modelo</span>
          </div>
          <div class="tiny muted" style="margin-bottom:5px">${d.race} · ${d.keywords.join(", ")}</div>
          ${statTable(d.stats,m2)}
          <div class="blk"><div class="lb">Opciones (se aplican a todo el grupo)</div>`;
      d.options.forEach(o=>{
        const on=(st.opts||[]).includes(o.id);
        h+=`<div class="opt ${on?'on':''}">
          <input type="checkbox" ${on?'checked':''} data-topt="${wb.uid}|${j}|${o.id}" id="to${wb.uid}${j}${o.id}">
          <label for="to${wb.uid}${j}${o.id}">${esc(o.name)}${o.banner?' <span class="tiny muted">(1 modelo)</span>':''}${o.desc?`<span class="od">${esc(o.desc)}</span>`:''}</label>
          <span class="oc">+${o.cost}${o.banner?'':'/mod'}</span></div>`;
      });
      h+=`</div>${bloqueReglas(d)}</div></div>`;
    });

    /* --- añadir tropa --- */
    h+=`<div class="row wrap" style="margin-top:8px">
      <select data-addsel="${wb.uid}" aria-label="Tropa a añadir" style="flex:1;min-width:150px">
        ${fac().warriors.map(w=>`<option value="${w.id}">${esc(w.name)} · ${w.cost} pts</option>`).join("")}
      </select>
      <button class="btn" data-add-troop="${wb.uid}">+ Añadir tropa</button>
    </div>`;

    h+=`</div></div>`;
  });

  cont.innerHTML=h;
  $("#emptyArmy").classList.toggle("hidden", S.warbands.length>0);
}

function renderValidacion(){
  if(!$("#validation")) return;  /* INTEGRACIÓN: sólo en constructor.html */
  const v=validar();
  $("#validation").innerHTML = v.map(x=>`<div class="val ${x.t}">${x.m}</div>`).join("")
    + `<div class="tiny muted" style="margin-top:6px">Seguidores por Tier: Leyenda 18 · Valor 15 · Fortaleza 12 · Menor 6 · Independiente 0.
       Límite de arcos y de armas arrojadizas: un tercio de los guerreros (los héroes no cuentan).</div>`;
}

function renderCabecera(){
  const t=totales(), f=fac();
  document.documentElement.style.setProperty("--fac", f.color);
  if(!$("#ptNow")) return;       /* INTEGRACIÓN: barra de lista */
  $("#ptNow").textContent=t.pts;
  $("#ptNow").className = t.pts>S.limit?"over":(t.pts===S.limit?"ok":"");
  $("#mdCount").textContent=t.modelos;
  $("#wbCount").textContent=S.warbands.length;
  /* INTEGRACIÓN: el límite ahora se muestra al lado del total además de
     en su propio campo. Sólo presentación. */
  const pl=$("#ptLim"); if(pl) pl.textContent=S.limit;
}

function renderPartida(){
  if(!$("#gameBody")) return;    /* INTEGRACIÓN: sólo en partida.html */
  const c=$("#gameBody");
  if(!S.warbands.length){ c.innerHTML=`<div class="panel"><div class="pbody muted small">Construye primero un ejército en <a href="constructor.html">Constructor</a>.</div></div>`;
    $("#brkTxt").textContent="—"; $("#brkFill").style.width="0%"; $("#brkInfo").textContent=""; return; }

  const v=vivos(); let h="";
  S.warbands.forEach(wb=>{
    initGame(wb);
    const hd=heroDef(wb.hero); if(!hd) return;
    const muerto = wb.g.wounds >= hd.stats.w;
    const mont=(wb.opts||[]).map(o=>hd.options.find(x=>x.id===o)).find(o=>o&&o.mount);
    h+=`<div class="gcard ${muerto?'dead':''}">
      <div class="ghead">
        <span class="tier">${TIERS[hd.tier].es}</span>
        <span class="gname">${esc(hd.name)}</span>
        ${wb.uid===S.general?'<span class="genbadge">★ General</span>':''}
        <span class="grow"></span>
        ${muerto?'<span class="small fuera">FUERA DE COMBATE</span>':''}
        <span class="gsub">${hd.keywords.join(" · ")}${mont?" · "+esc(MOUNTS[mont.mount].name):""}</span>
      </div>
      <div class="gmain">
        <div class="gres">`;
    h+=resRow("Poder", hd.might, wb.g.might, wb.uid, "might");
    h+=resRow("Voluntad", hd.will, wb.g.will, wb.uid, "will");
    h+=resRow("Destino", hd.fate, wb.g.fate, wb.uid, "fate");
    h+=`<div class="res"><span class="lb">Heridas</span><br>`;
    for(let i=0;i<hd.stats.w;i++)
      h+=`<span class="pip ${i<wb.g.wounds?'wound':''}" data-wound="${wb.uid}|${i}">${i<wb.g.wounds?'✖':'♥'}</span>`;
    h+=`<span class="small muted">&nbsp;${hd.stats.w-wb.g.wounds} de ${hd.stats.w}</span></div>`;
    h+=`</div>
        <div class="gpic">${IMGS[hd.id]?`<img src="${IMGS[hd.id]}" alt="${esc(hd.name)}" loading="lazy">`:''}</div>
      </div>`;

    (wb.troops||[]).forEach((st,j)=>{
      const d=warDef(st.type); if(!d) return;
      const viv=st.qty-(st.dead||0);
      h+=`<div class="res tropa-linea ${viv===0?'dead':''}">
        ${thumb(d.id,'sm')}
        <span class="grow"><b>${esc(d.name)}</b> <span class="small muted">${viv} vivos de ${st.qty}</span></span>
        <div class="qty">
          <button data-kill="${wb.uid}|${j}|-1" aria-label="Marcar baja">−</button>
          <div class="n">${viv}</div>
          <button data-kill="${wb.uid}|${j}|1" aria-label="Deshacer baja">+</button>
        </div>
        <span class="tiny muted">bajas: ${st.dead||0}</span></div>`;
    });
    h+=`</div>`;
  });
  c.innerHTML=h;

  const pct = v.inicio? (v.vivos/v.inicio*100):0;
  $("#brkFill").style.width = pct.toFixed(1)+"%";
  $("#brkFill").className = "breakfill"+(v.roto?" brk":"");
  $("#brkTxt").textContent = `${v.vivos} / ${v.inicio} modelos en pie`;
  $("#brkInfo").innerHTML = v.roto
    ? `<b class="fuera">EJÉRCITO ROTO.</b> Los modelos que quieran moverse deben superar una Prueba de Coraje. Al bajar de <b>${Math.ceil(v.inicio/4)}</b> modelos (25%) la partida puede terminar.`
    : `Se rompe al quedar por debajo de <b>${v.minSeguro}</b> modelos (menos del 50% de ${v.inicio}). Aguanta <b>${v.vivos - v.minSeguro + 1}</b> bajas más.`;
}
function resRow(lb, total, gastado, uid, key){
  if(!total) return "";
  let h=`<div class="res"><span class="lb">${lb}</span><br>`;
  for(let i=0;i<total;i++)
    h+=`<span class="pip ${i<gastado?'spent':''}" data-res="${uid}|${key}|${i}">${i<gastado?'·':'●'}</span>`;
  h+=`<span class="small muted">&nbsp;${total-gastado} de ${total}</span></div>`;
  return h;
}

function render(){
  renderCabecera(); renderCatalogo(); renderEjercito(); renderValidacion(); renderPartida(); guardarSesion();
}

/* =====================================================================
   EVENTOS
   ===================================================================== */
let UID=1;
function nuevoUid(){ return "w"+(UID++); }

document.addEventListener("click", e=>{
  const t=e.target.closest("[data-add-hero],[data-del-wb],[data-toggle-hero],[data-toggle-troop],[data-add-troop],[data-del-troop],[data-qty],[data-general],[data-info-war],[data-res],[data-wound],[data-kill]");
  if(!t) return;
  const d=t.dataset;

  if(d.addHero){ S.warbands.push({uid:nuevoUid(), hero:d.addHero, opts:[], troops:[], open:false, g:{}}); render(); }
  else if(d.delWb){ S.warbands=S.warbands.filter(w=>w.uid!==d.delWb); render(); }
  else if(d.general){ S.general=d.general; render(); }
  /* INTEGRACIÓN: + guardarSesion(). Plegar/desplegar muta S y ahora hay
     que conservarlo al cambiar de página. */
  else if(d.toggleHero){ const w=S.warbands.find(x=>x.uid===d.toggleHero); w.open=!w.open; renderEjercito(); guardarSesion(); }
  else if(d.toggleTroop){ const [u,j]=d.toggleTroop.split("|"); const w=S.warbands.find(x=>x.uid===u);
    w.troops[j].open=!w.troops[j].open; renderEjercito(); guardarSesion(); }
  else if(d.addTroop){ const w=S.warbands.find(x=>x.uid===d.addTroop);
    const sel=document.querySelector(`[data-addsel="${d.addTroop}"]`);
    w.troops.push({type:sel.value, qty:1, opts:[], dead:0, open:true}); render(); }
  else if(d.delTroop){ const [u,j]=d.delTroop.split("|"); const w=S.warbands.find(x=>x.uid===u);
    w.troops.splice(j,1); render(); e.stopPropagation(); }
  else if(d.qty){ const [u,j,v]=d.qty.split("|"); const w=S.warbands.find(x=>x.uid===u);
    const st=w.troops[j]; st.qty=Math.max(1, st.qty+parseInt(v));
    if(st.dead>st.qty) st.dead=st.qty; render(); }
  else if(d.infoWar){ alert(fac().warriors.find(x=>x.id===d.infoWar).name+"\n\nAñade esta tropa desde dentro de una warband."); }
  /* --- partida --- */
  else if(d.res){ const [u,k,i]=d.res.split("|"); const w=S.warbands.find(x=>x.uid===u);
    initGame(w); const n=parseInt(i)+1; w.g[k] = (w.g[k]===n)? n-1 : n; renderPartida(); guardarSesion(); }
  else if(d.wound){ const [u,i]=d.wound.split("|"); const w=S.warbands.find(x=>x.uid===u);
    initGame(w); const n=parseInt(i)+1; w.g.wounds = (w.g.wounds===n)? n-1 : n; renderPartida(); guardarSesion(); }
  else if(d.kill){ const [u,j,v]=d.kill.split("|"); const w=S.warbands.find(x=>x.uid===u);
    const st=w.troops[j]; st.dead=Math.min(st.qty, Math.max(0,(st.dead||0) - parseInt(v)));
    renderPartida(); guardarSesion(); }
});

document.addEventListener("change", e=>{
  const d=e.target.dataset;
  if(d.hopt){ const [u,oid]=d.hopt.split("|"); const w=S.warbands.find(x=>x.uid===u);
    w.opts=w.opts||[];
    if(e.target.checked){ if(!w.opts.includes(oid)) w.opts.push(oid); }
    else w.opts=w.opts.filter(x=>x!==oid);
    render(); }
  else if(d.topt){ const [u,j,oid]=d.topt.split("|"); const w=S.warbands.find(x=>x.uid===u);
    const st=w.troops[j]; st.opts=st.opts||[];
    if(e.target.checked){ if(!st.opts.includes(oid)) st.opts.push(oid); }
    else st.opts=st.opts.filter(x=>x!==oid);
    render(); }
});

/* INTEGRACIÓN: los tres controles de la barra de lista están en las tres
   páginas de herramienta, así que estos enlaces valen en todas. */
bind("#selFac", "change", e=>{
  if(S.warbands.length && !confirm("Cambiar de facción vaciará el ejército actual. ¿Continuar?")){
    e.target.value=S.fac; return; }
  const nm=$("#inName").value, lim=S.limit;
  S=nuevaLista(e.target.value); S.name=nm; S.limit=lim; render();
});
bind("#inLimit", "input", e=>{ S.limit=parseInt(e.target.value)||0; renderCabecera(); renderValidacion(); guardarSesion(); });
bind("#inName", "input", e=>{ S.name=e.target.value; guardarSesion(); });

/* INTEGRACIÓN: el piloto cambiaba de pestaña aquí
   (document.querySelectorAll("nav button")). Ahora cada vista es una
   página y la navegación la resuelve el <nav> del sitio. Ese bloque se
   elimina: si se dejara, engancharía los botones de hamburguesa. */

bind("#btnReset", "click", ()=>{
  if(!confirm("¿Reiniciar todos los marcadores de partida?")) return;
  S.warbands.forEach(w=>{ w.g={might:0,will:0,fate:0,wounds:0}; (w.troops||[]).forEach(s=>s.dead=0); });
  renderPartida(); guardarSesion();
});

/* =====================================================================
   PERSISTENCIA
   Las claves NO cambian: quien ya usó el piloto conserva sus listas.
   ===================================================================== */
const KEY_SES="mesbg_sesion", KEY_LST="mesbg_listas";
function guardarSesion(){ try{ localStorage.setItem(KEY_SES, JSON.stringify({S,UID})); }catch(e){} }
function cargarSesion(){
  try{ const d=JSON.parse(localStorage.getItem(KEY_SES)||"null");
    if(d&&d.S&&FACTIONS[d.S.fac]){ S=d.S; UID=d.UID||1; return true; } }catch(e){}
  return false;
}
function listas(){ try{ return JSON.parse(localStorage.getItem(KEY_LST)||"[]"); }catch(e){ return []; } }
function setListas(a){ localStorage.setItem(KEY_LST, JSON.stringify(a)); }

/* INTEGRACIÓN: vuelca una lista guardada en la sesión activa (S/UID) y
   refresca los campos de la barra. Compartida por "Cargar" en listas.html
   y por el selector nuevo de partida.html: mismo volcado, cada sitio
   decide después si navega o se queda. */
function cargarListaEnSesion(l){
  S=JSON.parse(JSON.stringify(l));
  UID=Math.max(1,...S.warbands.map(w=>parseInt((w.uid||"w0").slice(1))||0))+1;
  setVal("#inName", S.name||""); setVal("#inLimit", S.limit); setVal("#selFac", S.fac);
  render();
}

bind("#btnSave", "click", ()=>{
  if(!S.name.trim()){ const n=prompt("Nombre de la lista:"); if(!n) return; S.name=n; setVal("#inName", n); }
  const a=listas(); const copia=JSON.parse(JSON.stringify(S));
  copia.saved=new Date().toISOString();
  if(!copia.id) copia.id="L"+Date.now();
  S.id=copia.id;
  const i=a.findIndex(x=>x.id===copia.id);
  if(i>=0) a[i]=copia; else a.push(copia);
  setListas(a); guardarSesion(); /* INTEGRACIÓN: S.id acaba de cambiar */
  renderGuardadas(); alert("Lista guardada: "+copia.name);
});
bind("#btnNew", "click", ()=>{
  if(!confirm("¿Empezar una lista nueva? Se perderá lo no guardado.")) return;
  S=nuevaLista(S.fac); setVal("#inName", ""); render();
});
function renderGuardadas(){
  if(!$("#savedList")) return;   /* INTEGRACIÓN: sólo en listas.html */
  const a=listas();
  $("#savedList").innerHTML = a.length? a.map(l=>{
    const f=FACTIONS[l.fac];
    const pts=(()=>{ const bak=S; S=l; const t=totales(); S=bak; return t.pts; })();
    return `<div class="saved">
      <span class="grow"><b>${esc(l.name||"(sin nombre)")}</b>
        <div class="tiny muted">${f?esc(f.name):l.fac} · ${pts}/${l.limit} pts · ${new Date(l.saved).toLocaleDateString()}</div></span>
      <button class="btn sm" data-load="${l.id}">Cargar</button>
      <button class="btn sm dan" data-drop="${l.id}">Borrar</button></div>`;
  }).join("") : `<div class="muted small">Todavía no has guardado ninguna lista.</div>`;
  $("#savedList").querySelectorAll("[data-load]").forEach(b=>b.onclick=()=>{
    const l=listas().find(x=>x.id===b.dataset.load); if(!l) return;
    cargarListaEnSesion(l);
    /* INTEGRACIÓN: antes cambiaba a la pestaña Constructor. Ahora navega,
       con la sesión ya escrita por render(). */
    location.href="constructor.html";
  });
  $("#savedList").querySelectorAll("[data-drop]").forEach(b=>b.onclick=()=>{
    if(!confirm("¿Borrar esta lista?")) return;
    setListas(listas().filter(x=>x.id!==b.dataset.drop)); renderGuardadas();
  });
}

/* INTEGRACIÓN: selector de "cargar lista guardada" en partida.html.
   Deja jugar una lista guardada sin pasar por el constructor. Se pinta
   una vez al cargar la página: la lista de guardadas no cambia mientras
   estás jugando, así que no hace falta repintarla en cada render(). */
function renderCargarPartida(){
  const sel=$("#selListaPartida");
  if(!sel) return;   /* INTEGRACIÓN: sólo en partida.html */
  const a=listas();
  sel.innerHTML = a.length
    ? a.map(l=>{
        const f=FACTIONS[l.fac];
        const pts=(()=>{ const bak=S; S=l; const t=totales().pts; S=bak; return t; })();
        return `<option value="${l.id}">${esc(l.name||"(sin nombre)")} — ${f?esc(f.name):l.fac} · ${pts}/${l.limit} pts</option>`;
      }).join("")
    : `<option value="">Todavía no guardaste ninguna lista</option>`;
  const btn=$("#btnCargarPartida");
  if(btn) btn.disabled = !a.length;
}
bind("#btnCargarPartida", "click", () => {
  const sel=$("#selListaPartida");
  if(!sel || !sel.value) return;
  const l=listas().find(x=>x.id===sel.value);
  if(!l) return;
  if(S.warbands.length && !confirm("Esto reemplaza el ejército actual de esta partida por la lista elegida. Se pierden los marcadores de esta sesión (heridas, Poder, bajas). ¿Continuar?")) return;
  cargarListaEnSesion(l);
});

/* ---------- Código compartible ---------- */
function compacta(){
  return {v:1, f:S.fac, n:S.name, l:S.limit,
    w:S.warbands.map(wb=>({h:wb.hero, o:wb.opts||[], t:(wb.troops||[]).map(s=>[s.type,s.qty,s.opts||[]])}))};
}
function b64e(s){ return btoa(unescape(encodeURIComponent(s))).replace(/=+$/,""); }
function b64d(s){ return decodeURIComponent(escape(atob(s))); }
bind("#btnGenCode", "click", ()=>{
  $("#txtCode").value = "MESBG1:"+b64e(JSON.stringify(compacta()));
});
bind("#btnCopyCode", "click", ()=>{
  const t=$("#txtCode"); if(!t.value) $("#btnGenCode").click();
  t.select(); try{ document.execCommand("copy"); alert("Código copiado."); }catch(e){}
});
bind("#btnLoadCode", "click", ()=>{
  let v=$("#txtCode").value.trim();
  if(!v.startsWith("MESBG1:")){ alert("El código debe empezar por MESBG1:"); return; }
  try{
    const d=JSON.parse(b64d(v.slice(7)));
    if(!FACTIONS[d.f]){ alert("Esa facción no está cargada en esta versión."); return; }
    S=nuevaLista(d.f); S.name=d.n||""; S.limit=d.l||600;
    S.warbands = d.w.map(wb=>({uid:nuevoUid(), hero:wb.h, opts:wb.o||[], open:false, g:{},
      troops:(wb.t||[]).map(t=>({type:t[0], qty:t[1], opts:t[2]||[], dead:0, open:false}))}));
    setVal("#inName", S.name); setVal("#inLimit", S.limit); setVal("#selFac", S.fac);
    render();
    /* INTEGRACIÓN: idem — navegación en lugar de cambio de pestaña. */
    location.href="constructor.html";
  }catch(e){ alert("No he podido leer ese código."); }
});

/* ---------- Hoja imprimible ---------- */
bind("#btnPrint", "click", ()=>{
  const f=fac(), t=totales();
  let h=`<h1>${esc(S.name||"Ejército sin nombre")}</h1>
    <div><b>${esc(f.name)}</b> · ${t.pts} de ${S.limit} puntos · ${t.modelos} modelos ·
    ${S.warbands.length} warbands · Rotura al bajar de ${Math.ceil(t.modelos/2)} modelos</div>`;
  S.warbands.forEach((wb,i)=>{
    const hd=heroDef(wb.hero); if(!hd) return;
    const mods=modsDe(hd,wb.opts);
    const opts=(wb.opts||[]).map(o=>hd.options.find(x=>x.id===o)).filter(Boolean);
    h+=`<div class="wbp"><h2>Warband ${i+1} — ${esc(hd.name)} (${costeWarband(wb)} pts)</h2>
      <div class="u"><span class="un">${esc(hd.name)}</span> — ${costeHeroe(wb)} pts · ${TIERS[hd.tier].name}${wb.uid===S.general?" · GENERAL":""}
      <div class="ul">${esc(hd.wargear)}${opts.length?", "+opts.map(o=>esc(o.name)).join(", "):""}</div>
      ${printTable(hd.stats,mods,hd)}
      <div class="ul">Acciones: ${hd.heroic.map(a=>esc(a.name)).join(" · ")}</div>
      <div class="ul">Reglas: ${hd.rules.map(a=>esc(a.name)).join(" · ")}</div></div>`;
    (wb.troops||[]).forEach(st=>{
      const d=warDef(st.type); if(!d) return;
      const m2=modsDe(d,st.opts);
      const o2=(st.opts||[]).map(o=>d.options.find(x=>x.id===o)).filter(Boolean);
      h+=`<div class="u"><span class="un">${st.qty}× ${esc(d.name)}</span> — ${costeStack(st)} pts
        <div class="ul">${esc(d.wargear)}${o2.length?", "+o2.map(o=>esc(o.name)).join(", "):""}</div>
        ${printTable(d.stats,m2,null)}
        <div class="ul">Reglas: ${d.rules.map(a=>esc(a.name)).join(" · ")}</div></div>`;
    });
    h+=`</div>`;
  });
  $("#print").innerHTML=h;
  window.print();
});
function printTable(st,mods,hero){
  const k=["mv","fv","sv","s","d","a","w","c","i"], lb={mv:"Mv",fv:"Fv",sv:"Sv",s:"S",d:"D",a:"A",w:"W",c:"C",i:"I"};
  let th="",td="";
  k.forEach(x=>{ th+=`<th>${lb[x]}</th>`;
    let v=st[x]; if(mods[x]!=null&&typeof v==="number") v=v+mods[x];
    td+=`<td>${esc(v)}</td>`; });
  if(hero){ th+="<th>M</th><th>Wi</th><th>Fa</th>"; td+=`<td>${hero.might}</td><td>${hero.will}</td><td>${hero.fate}</td>`; }
  return `<table><tr>${th}</tr><tr>${td}</tr></table>`;
}

/* =====================================================================
   ARRANQUE
   INTEGRACIÓN: cargarSesion() antes del primer render, en las tres
   páginas. Es lo que hace que el ejército sobreviva a la navegación.
   ===================================================================== */
(function init(){
  const sel=$("#selFac");
  if(sel){
    sel.innerHTML = Object.values(FACTIONS)
      .map(f=>`<option value="${f.id}">${esc(f.name)}${f.custom?" (custom)":""}</option>`).join("");
  }
  cargarSesion();
  setVal("#selFac", S.fac); setVal("#inName", S.name||""); setVal("#inLimit", S.limit);
  render(); renderGuardadas(); renderCargarPartida();
})();
