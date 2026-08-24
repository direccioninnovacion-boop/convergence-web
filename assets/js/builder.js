/* =====================================================================
   CONVERGENCE — ARMY BUILDER
   Logic extracted from the MESBG_Army_Builder.html pilot.
   Army composition rules: Rules Manual 2024 (pp. 154-157)

   Cost calculation, validation and in-game tracking are VERBATIM. The
   only changes are integration ones, all marked with
   /* INTEGRATION * / and none of them touch the arithmetic:

     1. bind() / render guards: the pilot was one page with three tabs
        and the whole DOM present at once. Now there are three pages and
        each renderer skips its work if its container is not present.
     2. saveSession() after collapse/expand and after saving a list: in
        the pilot that state did not need persisting because there was no
        navigation between pages.
     3. Switching tabs becomes navigation to builder.html.

   Requires data.js loaded first (IMGS, MOUNTS, TIERS, FACTIONS).
   ===================================================================== */

/* =====================================================================
   STATE
   ===================================================================== */
let S = newList("bolton");

function newList(fid){
  return { fac:fid, name:"", limit:600, warbands:[], general:null, id:null };
}
function fac(){ return FACTIONS[S.fac]; }
function heroDef(id){ return fac().heroes.find(h=>h.id===id); }
function warDef(id){ return fac().warriors.find(w=>w.id===id); }

/* =====================================================================
   PURE LOGIC (costs, counts, validation)
   ===================================================================== */
function heroCost(wb){
  const h = heroDef(wb.hero); if(!h) return 0;
  let c = h.cost;
  (wb.opts||[]).forEach(oid=>{ const o=h.options.find(x=>x.id===oid); if(o) c+=o.cost; });
  return c;
}
function unitCost(def, opts){
  let c = def.cost;
  (opts||[]).forEach(oid=>{ const o=def.options.find(x=>x.id===oid); if(o) c+=o.cost; });
  return c;
}
function stackCost(st){
  const d = warDef(st.type); if(!d) return 0;
  // The banner upgrades a single model in the stack, not all of them
  let base = d.cost, extra = 0;
  (st.opts||[]).forEach(oid=>{
    const o = d.options.find(x=>x.id===oid); if(!o) return;
    if(o.banner) extra += o.cost; else base += o.cost;
  });
  return base*st.qty + extra;
}
function warbandCost(wb){
  return heroCost(wb) + (wb.troops||[]).reduce((a,s)=>a+stackCost(s),0);
}
function totals(){
  let pts=0, models=0, warriors=0, bows=0, throwing=0;
  S.warbands.forEach(wb=>{
    pts += warbandCost(wb); models += 1;
    (wb.troops||[]).forEach(st=>{
      const d = warDef(st.type); if(!d) return;
      models += st.qty; warriors += st.qty;
      (st.opts||[]).forEach(oid=>{
        const o = d.options.find(x=>x.id===oid); if(!o) return;
        if(o.bow) bows += st.qty;
        if(o.throwing) throwing += st.qty;
      });
    });
  });
  return {pts, models, warriors, bows, throwing};
}
function followerCount(wb){ return (wb.troops||[]).reduce((a,s)=>a+s.qty,0); }
function missileLimit(warriors){ return Math.ceil(warriors/3); }

function autoGeneral(){
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
function generalTied(){
  const rs = S.warbands.map(wb=>{const h=heroDef(wb.hero);return h?TIERS[h.tier].rank:0;});
  const mx = Math.max(...rs, 0);
  return rs.filter(x=>x===mx).length > 1;
}

function validate(){
  const t = totals(), out = [];
  if(!S.warbands.length){ out.push({t:"warn", m:"Your army is empty. Add at least one hero."}); return out; }

  if(t.pts > S.limit) out.push({t:"err", m:`You are over the limit by <b>${t.pts-S.limit} points</b> (${t.pts} of ${S.limit}).`});
  else out.push({t:"good", m:`Within the limit. You have <b>${S.limit-t.pts} points</b> left.`});

  // Duplicated Unique models
  const counts={};
  S.warbands.forEach(wb=>{ counts[wb.hero]=(counts[wb.hero]||0)+1; });
  Object.keys(counts).forEach(hid=>{
    const h=heroDef(hid);
    if(h && h.unique && counts[hid]>1) out.push({t:"err", m:`<b>${h.name}</b> is a Unique model: it may only appear once in the army.`});
  });

  // Follower limit by Heroic Tier
  S.warbands.forEach((wb,i)=>{
    const h=heroDef(wb.hero); if(!h) return;
    const max=TIERS[h.tier].followers, n=followerCount(wb);
    if(n>max) out.push({t:"err", m:`Warband ${i+1} (<b>${h.name}</b>, ${TIERS[h.tier].name}): ${n} followers, the maximum is ${max}.`});
    if(max===0 && n>0) out.push({t:"err", m:`<b>${h.name}</b> is an Independent Hero: it can never take followers.`});
  });

  // Bow and throwing weapon limit (1/3 of the WARRIORS; heroes are ignored)
  const lim = missileLimit(t.warriors);
  if(t.bows > lim) out.push({t:"err", m:`Bow limit exceeded: <b>${t.bows}</b> warriors with bows and the maximum is <b>${lim}</b> (one third of ${t.warriors} warriors).`});
  else if(t.bows>0) out.push({t:"good", m:`Bows: ${t.bows} of ${lim} allowed.`});
  if(t.throwing > lim) out.push({t:"err", m:`Throwing weapon limit exceeded: <b>${t.throwing}</b> and the maximum is <b>${lim}</b>.`});

  // Banners: one per warband at most
  S.warbands.forEach((wb,i)=>{
    let b=0;
    (wb.troops||[]).forEach(st=>{
      const d=warDef(st.type); if(!d) return;
      (st.opts||[]).forEach(oid=>{ const o=d.options.find(x=>x.id===oid); if(o&&o.banner) b++; });
    });
    if(b>1) out.push({t:"warn", m:`Warband ${i+1} carries ${b} banners. The usual practice is a single banner bearer per warband.`});
  });

  // General
  if(generalTied()) out.push({t:"warn", m:"There is a tie at the highest Heroic Tier: you may choose which hero is the General (tap the star)."});

  return out;
}

/* =====================================================================
   GAME MODE
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
function aliveCount(){
  let alive=0, starting=0;
  S.warbands.forEach(wb=>{
    initGame(wb);
    const h=heroDef(wb.hero);
    starting += 1;
    const heroDead = h ? ((wb.g.wounds||0) >= h.stats.w) : false;
    if(!heroDead) alive += 1;
    (wb.troops||[]).forEach(st=>{ starting += st.qty; alive += Math.max(0, st.qty - (st.dead||0)); });
  });
  // Rules Manual 2024: an army is Broken when reduced to FEWER than 50% of its starting models.
  const minSafe = Math.ceil(starting/2);
  return {alive, starting, minSafe, broken: starting>0 && alive < minSafe};
}

/* =====================================================================
   RENDER
   ===================================================================== */
const $ = s=>document.querySelector(s);
const esc = s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* INTEGRATION: binds a listener only if the element exists on this
   page. In the pilot every control was always in the DOM. */
function bind(sel, ev, fn){
  const el = $(sel);
  if(el) el.addEventListener(ev, fn);
  return el;
}
/* INTEGRATION: assigns .value only if the control exists. */
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
function modsFor(def, opts){
  const m={};
  (opts||[]).forEach(oid=>{
    const o=def.options.find(x=>x.id===oid);
    if(o&&o.mod) Object.keys(o.mod).forEach(k=>{ m[k]=(m[k]||0)+o.mod[k]; });
  });
  return m;
}
/* Small thumbnail (catalogue, headers, game mode) */
function thumb(id, cls){
  return IMGS[id] ? `<img class="thumb ${cls||''}" src="${IMGS[id]}" alt="" loading="lazy">` : "";
}
/* Large portrait (expanded card) */
function portrait(def){
  if(!IMGS[def.id]) return "";
  return `<div class="pfigure"><img class="portrait" src="${IMGS[def.id]}" alt="${esc(def.name)}" loading="lazy">
    <div class="pcap">${esc(def.name)}</div></div>`;
}

function rulesBlock(def){
  let h="";
  if(def.wargear) h+=`<div class="blk"><div class="lb">Wargear</div><p>${esc(def.wargear)}</p></div>`;
  if(def.heroic&&def.heroic.length){
    h+=`<div class="blk"><div class="lb">Heroic Actions</div>`;
    def.heroic.forEach(a=>h+=`<div class="rule"><b>${esc(a.name)}:</b> ${esc(a.desc)}</div>`);
    h+=`</div>`;
  }
  if(def.rules&&def.rules.length){
    h+=`<div class="blk"><div class="lb">Special Rules</div>`;
    def.rules.forEach(a=>h+=`<div class="rule"><b>${esc(a.name)}:</b> ${esc(a.desc)}</div>`);
    h+=`</div>`;
  }
  if(def.flavor) h+=`<div class="flavor">“${esc(def.flavor)}”</div>`;
  return h;
}

function renderCatalog(){
  if(!$("#catalog")) return;   /* INTEGRATION: builder.html only */
  const f=fac(); let h=`<div class="cathead">Heroes</div>`;
  f.heroes.forEach(x=>{
    h+=`<div class="cat-item" data-add-hero="${x.id}">${thumb(x.id)}
      <div class="nm">${esc(x.name)}<div class="tg">${TIERS[x.tier].name}${x.unique?" · Unique":""}</div></div>
      <div class="pt">${x.cost}</div></div>`;
  });
  h+=`<div class="cathead">Warriors</div>`;
  f.warriors.forEach(x=>{
    h+=`<div class="cat-item" data-info-war="${x.id}">${thumb(x.id)}
      <div class="nm">${esc(x.name)}<div class="tg">${x.keywords.join(" · ")}</div></div>
      <div class="pt">${x.cost}</div></div>`;
  });
  h+=`<div class="tiny muted" style="margin-top:9px">Tap a hero to create their warband. Warriors are added from inside each warband.</div>`;
  $("#catalog").innerHTML=h;
}

function renderArmy(){
  if(!$("#army")) return;      /* INTEGRATION: builder.html only */
  const cont=$("#army"); let h="";
  const gen=autoGeneral(); S.general=gen;

  S.warbands.forEach((wb,i)=>{
    const hd=heroDef(wb.hero); if(!hd) return;
    const mods=modsFor(hd, wb.opts);
    const nf=followerCount(wb), mx=TIERS[hd.tier].followers;
    const isGeneral = wb.uid===gen;

    h+=`<div class="wb">
      <div class="wb-head">
        <span class="tier">${TIERS[hd.tier].name}</span>
        <span class="t">${esc(hd.name)}</span>
        ${isGeneral?`<span class="genbadge">★ General</span>`:`<button class="btn sm" data-general="${wb.uid}" title="Make General">☆</button>`}
        <span class="grow"></span>
        <span class="small muted">${nf}/${mx} followers</span>
        <span class="pt">${warbandCost(wb)} pts</span>
        <button class="x" data-del-wb="${wb.uid}" aria-label="Remove warband">✕</button>
      </div>
      <div class="wb-body">`;

    /* --- hero --- */
    h+=`<div class="unit ${wb.open?'open':''}">
      <div class="unit-head" data-toggle-hero="${wb.uid}">
        <span class="chev">${wb.open?'▾':'▸'}</span>${thumb(hd.id,'sm')}
        <span class="nm">${esc(hd.name)}</span>
        <span class="pt">${heroCost(wb)}</span>
      </div>
      <div class="unit-detail">
        ${portrait(hd)}
        <div class="tiny muted" style="margin-bottom:5px">${hd.race} · ${hd.keywords.join(", ")}</div>
        ${statTable(hd.stats, mods)}
        <div class="shields">
          <div class="shield"><div class="v">${hd.might}</div><div class="l">Might</div></div>
          <div class="shield"><div class="v">${hd.will}</div><div class="l">Will</div></div>
          <div class="shield"><div class="v">${hd.fate}</div><div class="l">Fate</div></div>
        </div>
        <div class="blk"><div class="lb">Options</div>`;
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
        h+=`<div class="blk"><div class="lb">Mount · ${esc(m.name)}</div>${statTable(m.stats,{})}
          ${m.rules.map(r=>`<div class="rule"><b>${esc(r.name)}:</b> ${esc(r.desc)}</div>`).join("")}</div>`;
      }
    });
    h+=rulesBlock(hd)+`</div></div>`;

    /* --- warriors --- */
    (wb.troops||[]).forEach((st,j)=>{
      const d=warDef(st.type); if(!d) return;
      const m2=modsFor(d, st.opts);
      h+=`<div class="unit ${st.open?'open':''}">
        <div class="unit-head" data-toggle-troop="${wb.uid}|${j}">
          <span class="chev">${st.open?'▾':'▸'}</span>${thumb(d.id,'sm')}
          <span class="nm">${st.qty}× ${esc(d.name)}</span>
          <span class="pt">${stackCost(st)}</span>
          <button class="x" data-del-troop="${wb.uid}|${j}" aria-label="Remove warriors">✕</button>
        </div>
        <div class="unit-detail">
          ${portrait(d)}
          <div class="row" style="margin-bottom:9px">
            <div class="qty">
              <button data-qty="${wb.uid}|${j}|-1" aria-label="Remove one">−</button>
              <div class="n">${st.qty}</div>
              <button data-qty="${wb.uid}|${j}|1" aria-label="Add one">+</button>
            </div>
            <span class="small muted">${unitCost(d,(st.opts||[]).filter(o=>{const oo=d.options.find(x=>x.id===o);return oo&&!oo.banner;}))} pts per model</span>
          </div>
          <div class="tiny muted" style="margin-bottom:5px">${d.race} · ${d.keywords.join(", ")}</div>
          ${statTable(d.stats,m2)}
          <div class="blk"><div class="lb">Options (applied to the whole group)</div>`;
      d.options.forEach(o=>{
        const on=(st.opts||[]).includes(o.id);
        h+=`<div class="opt ${on?'on':''}">
          <input type="checkbox" ${on?'checked':''} data-topt="${wb.uid}|${j}|${o.id}" id="to${wb.uid}${j}${o.id}">
          <label for="to${wb.uid}${j}${o.id}">${esc(o.name)}${o.banner?' <span class="tiny muted">(1 model)</span>':''}${o.desc?`<span class="od">${esc(o.desc)}</span>`:''}</label>
          <span class="oc">+${o.cost}${o.banner?'':'/mod'}</span></div>`;
      });
      h+=`</div>${rulesBlock(d)}</div></div>`;
    });

    /* --- add warriors --- */
    h+=`<div class="row wrap" style="margin-top:8px">
      <select data-addsel="${wb.uid}" aria-label="Warriors to add" style="flex:1;min-width:150px">
        ${fac().warriors.map(w=>`<option value="${w.id}">${esc(w.name)} · ${w.cost} pts</option>`).join("")}
      </select>
      <button class="btn" data-add-troop="${wb.uid}">+ Add warriors</button>
    </div>`;

    h+=`</div></div>`;
  });

  cont.innerHTML=h;
  $("#emptyArmy").classList.toggle("hidden", S.warbands.length>0);
}

function renderValidation(){
  if(!$("#validation")) return;  /* INTEGRATION: builder.html only */
  const v=validate();
  $("#validation").innerHTML = v.map(x=>`<div class="val ${x.t}">${x.m}</div>`).join("")
    + `<div class="tiny muted" style="margin-top:6px">Followers by Heroic Tier: Legend 18 · Valour 15 · Fortitude 12 · Minor 6 · Independent 0.
       Bow and throwing weapon limit: one third of the warriors (heroes do not count).</div>`;
}

function renderHeader(){
  const t=totals(), f=fac();
  document.documentElement.style.setProperty("--fac", f.color);
  if(!$("#ptNow")) return;       /* INTEGRATION: list bar */
  $("#ptNow").textContent=t.pts;
  $("#ptNow").className = t.pts>S.limit?"over":(t.pts===S.limit?"ok":"");
  $("#mdCount").textContent=t.models;
  $("#wbCount").textContent=S.warbands.length;
  /* INTEGRATION: the limit is now shown next to the total as well as in
     its own field. Presentation only. */
  const pl=$("#ptLim"); if(pl) pl.textContent=S.limit;
}

function renderGame(){
  if(!$("#gameBody")) return;    /* INTEGRATION: game.html only */
  const c=$("#gameBody");
  if(!S.warbands.length){ c.innerHTML=`<div class="panel"><div class="pbody muted small">Build an army first in the <a href="builder.html">Builder</a>.</div></div>`;
    $("#brkTxt").textContent="—"; $("#brkFill").style.width="0%"; $("#brkInfo").textContent=""; return; }

  const v=aliveCount(); let h="";
  S.warbands.forEach(wb=>{
    initGame(wb);
    const hd=heroDef(wb.hero); if(!hd) return;
    const dead = wb.g.wounds >= hd.stats.w;
    const mountOpt=(wb.opts||[]).map(o=>hd.options.find(x=>x.id===o)).find(o=>o&&o.mount);
    h+=`<div class="gcard ${dead?'dead':''}">
      <div class="ghead">
        <span class="tier">${TIERS[hd.tier].name}</span>
        <span class="gname">${esc(hd.name)}</span>
        ${wb.uid===S.general?'<span class="genbadge">★ General</span>':''}
        <span class="grow"></span>
        ${dead?'<span class="small critical">OUT OF ACTION</span>':''}
        <span class="gsub">${hd.keywords.join(" · ")}${mountOpt?" · "+esc(MOUNTS[mountOpt.mount].name):""}</span>
      </div>
      <div class="gmain">
        <div class="gres">`;
    h+=resRow("Might", hd.might, wb.g.might, wb.uid, "might");
    h+=resRow("Will", hd.will, wb.g.will, wb.uid, "will");
    h+=resRow("Fate", hd.fate, wb.g.fate, wb.uid, "fate");
    h+=`<div class="res"><span class="lb">Wounds</span><br>`;
    for(let i=0;i<hd.stats.w;i++)
      h+=`<span class="pip ${i<wb.g.wounds?'wound':''}" data-wound="${wb.uid}|${i}">${i<wb.g.wounds?'✖':'♥'}</span>`;
    h+=`<span class="small muted">&nbsp;${hd.stats.w-wb.g.wounds} of ${hd.stats.w}</span></div>`;
    h+=`</div>
        <div class="gpic">${IMGS[hd.id]?`<img src="${IMGS[hd.id]}" alt="${esc(hd.name)}" loading="lazy">`:''}</div>
      </div>`;

    (wb.troops||[]).forEach((st,j)=>{
      const d=warDef(st.type); if(!d) return;
      const alive=st.qty-(st.dead||0);
      h+=`<div class="res troop-line ${alive===0?'dead':''}">
        ${thumb(d.id,'sm')}
        <span class="grow"><b>${esc(d.name)}</b> <span class="small muted">${alive} alive of ${st.qty}</span></span>
        <div class="qty">
          <button data-kill="${wb.uid}|${j}|-1" aria-label="Mark casualty">−</button>
          <div class="n">${alive}</div>
          <button data-kill="${wb.uid}|${j}|1" aria-label="Undo casualty">+</button>
        </div>
        <span class="tiny muted">casualties: ${st.dead||0}</span></div>`;
    });
    h+=`</div>`;
  });
  c.innerHTML=h;

  const pct = v.starting? (v.alive/v.starting*100):0;
  $("#brkFill").style.width = pct.toFixed(1)+"%";
  $("#brkFill").className = "breakfill"+(v.broken?" brk":"");
  $("#brkTxt").textContent = `${v.alive} / ${v.starting} models standing`;
  $("#brkInfo").innerHTML = v.broken
    ? `<b class="critical">ARMY BROKEN.</b> Models that wish to Move must pass a Courage Test. If it drops below <b>${Math.ceil(v.starting/4)}</b> models (25%) the game may end.`
    : `Broken when it drops below <b>${v.minSafe}</b> models (fewer than 50% of ${v.starting}). It can take <b>${v.alive - v.minSafe + 1}</b> more casualties.`;
}
function resRow(lb, total, spent, uid, key){
  if(!total) return "";
  let h=`<div class="res"><span class="lb">${lb}</span><br>`;
  for(let i=0;i<total;i++)
    h+=`<span class="pip ${i<spent?'spent':''}" data-res="${uid}|${key}|${i}">${i<spent?'·':'●'}</span>`;
  h+=`<span class="small muted">&nbsp;${total-spent} of ${total}</span></div>`;
  return h;
}

function render(){
  renderHeader(); renderCatalog(); renderArmy(); renderValidation(); renderGame(); saveSession();
}

/* =====================================================================
   EVENTS
   ===================================================================== */
let UID=1;
function newUid(){ return "w"+(UID++); }

document.addEventListener("click", e=>{
  const t=e.target.closest("[data-add-hero],[data-del-wb],[data-toggle-hero],[data-toggle-troop],[data-add-troop],[data-del-troop],[data-qty],[data-general],[data-info-war],[data-res],[data-wound],[data-kill]");
  if(!t) return;
  const d=t.dataset;

  if(d.addHero){ S.warbands.push({uid:newUid(), hero:d.addHero, opts:[], troops:[], open:false, g:{}}); render(); }
  else if(d.delWb){ S.warbands=S.warbands.filter(w=>w.uid!==d.delWb); render(); }
  else if(d.general){ S.general=d.general; render(); }
  /* INTEGRATION: + saveSession(). Collapsing/expanding mutates S and it
     now has to survive navigating to another page. */
  else if(d.toggleHero){ const w=S.warbands.find(x=>x.uid===d.toggleHero); w.open=!w.open; renderArmy(); saveSession(); }
  else if(d.toggleTroop){ const [u,j]=d.toggleTroop.split("|"); const w=S.warbands.find(x=>x.uid===u);
    w.troops[j].open=!w.troops[j].open; renderArmy(); saveSession(); }
  else if(d.addTroop){ const w=S.warbands.find(x=>x.uid===d.addTroop);
    const sel=document.querySelector(`[data-addsel="${d.addTroop}"]`);
    w.troops.push({type:sel.value, qty:1, opts:[], dead:0, open:true}); render(); }
  else if(d.delTroop){ const [u,j]=d.delTroop.split("|"); const w=S.warbands.find(x=>x.uid===u);
    w.troops.splice(j,1); render(); e.stopPropagation(); }
  else if(d.qty){ const [u,j,v]=d.qty.split("|"); const w=S.warbands.find(x=>x.uid===u);
    const st=w.troops[j]; st.qty=Math.max(1, st.qty+parseInt(v));
    if(st.dead>st.qty) st.dead=st.qty; render(); }
  else if(d.infoWar){ alert(fac().warriors.find(x=>x.id===d.infoWar).name+"\n\nAdd these warriors from inside a warband."); }
  /* --- game mode --- */
  else if(d.res){ const [u,k,i]=d.res.split("|"); const w=S.warbands.find(x=>x.uid===u);
    initGame(w); const n=parseInt(i)+1; w.g[k] = (w.g[k]===n)? n-1 : n; renderGame(); saveSession(); }
  else if(d.wound){ const [u,i]=d.wound.split("|"); const w=S.warbands.find(x=>x.uid===u);
    initGame(w); const n=parseInt(i)+1; w.g.wounds = (w.g.wounds===n)? n-1 : n; renderGame(); saveSession(); }
  else if(d.kill){ const [u,j,v]=d.kill.split("|"); const w=S.warbands.find(x=>x.uid===u);
    const st=w.troops[j]; st.dead=Math.min(st.qty, Math.max(0,(st.dead||0) - parseInt(v)));
    renderGame(); saveSession(); }
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

/* INTEGRATION: the three list-bar controls are on all three tool pages,
   so these bindings work everywhere. */
bind("#selFac", "change", e=>{
  if(S.warbands.length && !confirm("Changing faction will empty the current army. Continue?")){
    e.target.value=S.fac; return; }
  const nm=$("#inName").value, lim=S.limit;
  S=newList(e.target.value); S.name=nm; S.limit=lim; render();
});
bind("#inLimit", "input", e=>{ S.limit=parseInt(e.target.value)||0; renderHeader(); renderValidation(); saveSession(); });
bind("#inName", "input", e=>{ S.name=e.target.value; saveSession(); });

/* INTEGRATION: the pilot switched tabs here
   (document.querySelectorAll("nav button")). Each view is now its own
   page and navigation is handled by the site <nav>. That block is
   removed: if left in, it would hijack the hamburger buttons. */

bind("#btnReset", "click", ()=>{
  if(!confirm("Reset all game trackers?")) return;
  S.warbands.forEach(w=>{ w.g={might:0,will:0,fate:0,wounds:0}; (w.troops||[]).forEach(s=>s.dead=0); });
  renderGame(); saveSession();
});

/* =====================================================================
   PERSISTENCE
   The storage keys do NOT change: anyone who used the pilot keeps their lists.
   ===================================================================== */
const KEY_SES="mesbg_sesion", KEY_LST="mesbg_listas";
function saveSession(){ try{ localStorage.setItem(KEY_SES, JSON.stringify({S,UID})); }catch(e){} }
function loadSession(){
  try{ const d=JSON.parse(localStorage.getItem(KEY_SES)||"null");
    if(d&&d.S&&FACTIONS[d.S.fac]){ S=d.S; UID=d.UID||1; return true; } }catch(e){}
  return false;
}
function savedLists(){ try{ return JSON.parse(localStorage.getItem(KEY_LST)||"[]"); }catch(e){ return []; } }
function setSavedLists(a){ localStorage.setItem(KEY_LST, JSON.stringify(a)); }

/* INTEGRATION: loads a saved list into the active session (S/UID) and
   refreshes the bar fields. Shared by "Load" in savedLists.html and by the new
   selector in game.html: same load, each place then decides whether to
   navigate or stay. */
function loadListIntoSession(l){
  S=JSON.parse(JSON.stringify(l));
  UID=Math.max(1,...S.warbands.map(w=>parseInt((w.uid||"w0").slice(1))||0))+1;
  setVal("#inName", S.name||""); setVal("#inLimit", S.limit); setVal("#selFac", S.fac);
  render();
}

bind("#btnSave", "click", ()=>{
  if(!S.name.trim()){ const n=prompt("List name:"); if(!n) return; S.name=n; setVal("#inName", n); }
  const a=savedLists(); const copia=JSON.parse(JSON.stringify(S));
  copia.saved=new Date().toISOString();
  if(!copia.id) copia.id="L"+Date.now();
  S.id=copia.id;
  const i=a.findIndex(x=>x.id===copia.id);
  if(i>=0) a[i]=copia; else a.push(copia);
  setSavedLists(a); saveSession(); /* INTEGRATION: S.id has just changed */
  renderSavedLists(); alert("List saved: "+copia.name);
});
bind("#btnNew", "click", ()=>{
  if(!confirm("Start a new list? Unsaved changes will be lost.")) return;
  S=newList(S.fac); setVal("#inName", ""); render();
});
function renderSavedLists(){
  if(!$("#savedList")) return;   /* INTEGRATION: savedLists.html only */
  const a=savedLists();
  $("#savedList").innerHTML = a.length? a.map(l=>{
    const f=FACTIONS[l.fac];
    const pts=(()=>{ const bak=S; S=l; const t=totals(); S=bak; return t.pts; })();
    return `<div class="saved">
      <span class="grow"><b>${esc(l.name||"(unnamed)")}</b>
        <div class="tiny muted">${f?esc(f.name):l.fac} · ${pts}/${l.limit} pts · ${new Date(l.saved).toLocaleDateString()}</div></span>
      <button class="btn sm" data-load="${l.id}">Load</button>
      <button class="btn sm dan" data-drop="${l.id}">Delete</button></div>`;
  }).join("") : `<div class="muted small">You have not saved any lists yet.</div>`;
  $("#savedList").querySelectorAll("[data-load]").forEach(b=>b.onclick=()=>{
    const l=savedLists().find(x=>x.id===b.dataset.load); if(!l) return;
    loadListIntoSession(l);
    /* INTEGRATION: this used to switch to the Builder tab. It now
       navigates, with the session already written by render(). */
    location.href="builder.html";
  });
  $("#savedList").querySelectorAll("[data-drop]").forEach(b=>b.onclick=()=>{
    if(!confirm("Delete this list?")) return;
    setSavedLists(savedLists().filter(x=>x.id!==b.dataset.drop)); renderSavedLists();
  });
}

/* INTEGRATION: the "load saved list" selector on game.html. It lets
   you play a saved list without going through the builder. Painted once on
   page load: the saved list does not change while you are playing, so it
   does not need repainting on every render(). */
function renderLoadIntoGame(){
  const sel=$("#gameListSelect");
  if(!sel) return;   /* INTEGRATION: game.html only */
  const a=savedLists();
  sel.innerHTML = a.length
    ? a.map(l=>{
        const f=FACTIONS[l.fac];
        const pts=(()=>{ const bak=S; S=l; const t=totals().pts; S=bak; return t; })();
        return `<option value="${l.id}">${esc(l.name||"(unnamed)")} — ${f?esc(f.name):l.fac} · ${pts}/${l.limit} pts</option>`;
      }).join("")
    : `<option value="">You have not saved any lists yet</option>`;
  const btn=$("#btnLoadIntoGame");
  if(btn) btn.disabled = !a.length;
}
bind("#btnLoadIntoGame", "click", () => {
  const sel=$("#gameListSelect");
  if(!sel || !sel.value) return;
  const l=savedLists().find(x=>x.id===sel.value);
  if(!l) return;
  if(S.warbands.length && !confirm("This replaces the current army in this game with the chosen list. The trackers for this session (wounds, Might, casualties) will be lost. Continue?")) return;
  loadListIntoSession(l);
});

/* ---------- Shareable code ---------- */
function compactList(){
  return {v:1, f:S.fac, n:S.name, l:S.limit,
    w:S.warbands.map(wb=>({h:wb.hero, o:wb.opts||[], t:(wb.troops||[]).map(s=>[s.type,s.qty,s.opts||[]])}))};
}
function b64e(s){ return btoa(unescape(encodeURIComponent(s))).replace(/=+$/,""); }
function b64d(s){ return decodeURIComponent(escape(atob(s))); }
bind("#btnGenCode", "click", ()=>{
  $("#txtCode").value = "MESBG1:"+b64e(JSON.stringify(compactList()));
});
bind("#btnCopyCode", "click", ()=>{
  const t=$("#txtCode"); if(!t.value) $("#btnGenCode").click();
  t.select(); try{ document.execCommand("copy"); alert("Code copied."); }catch(e){}
});
bind("#btnLoadCode", "click", ()=>{
  let v=$("#txtCode").value.trim();
  if(!v.startsWith("MESBG1:")){ alert("The code must start with MESBG1:"); return; }
  try{
    const d=JSON.parse(b64d(v.slice(7)));
    if(!FACTIONS[d.f]){ alert("That faction is not loaded in this version."); return; }
    S=newList(d.f); S.name=d.n||""; S.limit=d.l||600;
    S.warbands = d.w.map(wb=>({uid:newUid(), hero:wb.h, opts:wb.o||[], open:false, g:{},
      troops:(wb.t||[]).map(t=>({type:t[0], qty:t[1], opts:t[2]||[], dead:0, open:false}))}));
    setVal("#inName", S.name); setVal("#inLimit", S.limit); setVal("#selFac", S.fac);
    render();
    /* INTEGRATION: same — navigation instead of a tab switch. */
    location.href="builder.html";
  }catch(e){ alert("Could not read that code."); }
});

/* ---------- Printable sheet ---------- */
bind("#btnPrint", "click", ()=>{
  const f=fac(), t=totals();
  let h=`<h1>${esc(S.name||"Unnamed army")}</h1>
    <div><b>${esc(f.name)}</b> · ${t.pts} of ${S.limit} points · ${t.models} models ·
    ${S.warbands.length} warbands · Broken below ${Math.ceil(t.models/2)} models</div>`;
  S.warbands.forEach((wb,i)=>{
    const hd=heroDef(wb.hero); if(!hd) return;
    const mods=modsFor(hd,wb.opts);
    const opts=(wb.opts||[]).map(o=>hd.options.find(x=>x.id===o)).filter(Boolean);
    h+=`<div class="wbp"><h2>Warband ${i+1} — ${esc(hd.name)} (${warbandCost(wb)} pts)</h2>
      <div class="u"><span class="un">${esc(hd.name)}</span> — ${heroCost(wb)} pts · ${TIERS[hd.tier].name}${wb.uid===S.general?" · GENERAL":""}
      <div class="ul">${esc(hd.wargear)}${opts.length?", "+opts.map(o=>esc(o.name)).join(", "):""}</div>
      ${printTable(hd.stats,mods,hd)}
      <div class="ul">Heroic Actions: ${hd.heroic.map(a=>esc(a.name)).join(" · ")}</div>
      <div class="ul">Special Rules: ${hd.rules.map(a=>esc(a.name)).join(" · ")}</div></div>`;
    (wb.troops||[]).forEach(st=>{
      const d=warDef(st.type); if(!d) return;
      const m2=modsFor(d,st.opts);
      const o2=(st.opts||[]).map(o=>d.options.find(x=>x.id===o)).filter(Boolean);
      h+=`<div class="u"><span class="un">${st.qty}× ${esc(d.name)}</span> — ${stackCost(st)} pts
        <div class="ul">${esc(d.wargear)}${o2.length?", "+o2.map(o=>esc(o.name)).join(", "):""}</div>
        ${printTable(d.stats,m2,null)}
        <div class="ul">Special Rules: ${d.rules.map(a=>esc(a.name)).join(" · ")}</div></div>`;
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
   BOOTSTRAP
   INTEGRATION: loadSession() runs before the first render, on all three
   pages. That is what makes the army survive navigation.
   ===================================================================== */
(function init(){
  const sel=$("#selFac");
  if(sel){
    sel.innerHTML = Object.values(FACTIONS)
      .map(f=>`<option value="${f.id}">${esc(f.name)}${f.custom?" (custom)":""}</option>`).join("");
  }
  loadSession();
  setVal("#selFac", S.fac); setVal("#inName", S.name||""); setVal("#inLimit", S.limit);
  render(); renderSavedLists(); renderLoadIntoGame();
})();
