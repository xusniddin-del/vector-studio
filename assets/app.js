/* =====================================================================
   VECTOR STUDIO — SAYT DVIGATELI
   Matn va ma’lumotlar: assets/config.js. Bu fayl ularni sahifaga chizadi.
   Bo‘limlar: 1 yordamchilar · 2 ikonkalar · 3 aksiya va ish vaqti ·
   4 header/menyu · 5 hero va kalkulyator · 6 bo‘limlar · 7 kontakt ·
   8 footer · 9 formalar · 10 interaktivlik · 11 ishga tushirish
   ===================================================================== */
"use strict";
document.documentElement.classList.add("js");

/* ---------- 1. YORDAMCHILAR ---------- */
const PAGE_ID = document.body.dataset.page || "home";
const PAGE = PAGES[PAGE_ID] || PAGES.home;
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fmt = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
const money = (n) => (n >= 1e6 ? String(+(n / 1e6).toFixed(2)).replace(".", ",") + " mln" : n >= 1e3 ? Math.round(n / 1e3) + " ming" : String(n));
const CUR = "so‘m";
const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  del(k) { try { localStorage.removeItem(k); } catch (e) {} }
};
const S = SOZLAMALAR, T = TEXTS;
const pctText = (s) => s.replace("{percent}", S.promo.percent);

/* ---------- 2. IKONKALAR ---------- */
const ICONS = {
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>',
  mobile: '<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M11 18h2"/>',
  bot: '<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 8V4M9 13h.01M15 13h.01M9 17h6"/>',
  crm: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 21V9"/>',
  trend: '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
  cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L22 7H6"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  tag: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z"/><circle cx="7" cy="7" r="1.5"/>',
  headset: '<path d="M3 14v-2a9 9 0 0 1 18 0v2"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
  key: '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  users: '<circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0M16 3.5a4 4 0 0 1 0 8M22 21a7 7 0 0 0-4-6.3"/>',
  edu: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>',
  health: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/>',
  smile: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
  scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12"/>',
  build: '<path d="M2 20h20M5 20V8l7-5 7 5v12M10 20v-6h4v6"/>',
  food: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  insta: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6"/>',
  handshake: '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.9-3.9a2 2 0 0 0-2.8 0l-.9.9a2 2 0 0 1-2.8-2.8L12 4.8a5 5 0 0 1 6.4-.5L22 7v6l-2 2"/><path d="M2 7l3.6-2.7a5 5 0 0 1 6 .2M2 13l6.5 6.5a1 1 0 1 0 3-3"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/>',
  chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 13h5"/>',
  help: '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  back: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
  chev: '<path d="m6 9 6 6 6-6"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  checkc: '<circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  xc: '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  percent: '<path d="M19 5 5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
  youtube: '<path d="M22.5 6.4a2.8 2.8 0 0 0-2-2C18.8 4 12 4 12 4s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 12a29 29 0 0 0 .5 5.6 2.8 2.8 0 0 0 2 2C5.2 20 12 20 12 20s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2A29 29 0 0 0 23 12a29 29 0 0 0-.5-5.6z"/><path d="m10 15 5-3-5-3z"/>',
  instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6"/>',
  telegram: { fill: true, d: '<path d="M21.9 4.6 18.7 19.5c-.2 1-.9 1.3-1.7.8l-4.8-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.3-.1-.5-.6-.2L6.5 13.3l-4.7-1.5c-1-.3-1-1 .2-1.5l18.5-7.1c.9-.3 1.6.2 1.4 1.4z"/>' },
  whatsapp: { fill: true, d: '<path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.6 2 1.1 1 2 1.3 2.3 1.4.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.1.1.7-.1 1.3z"/>' },
  bubble: { fill: true, d: '<path d="M12 3C6.5 3 2 6.8 2 11.5c0 2.6 1.4 4.9 3.6 6.5L5 21.5l4-2.1c.9.2 1.9.3 3 .3 5.5 0 10-3.8 10-8.5S17.5 3 12 3zm-4 9.8a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6zm4 0a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6zm4 0a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6z"/>' }
};
function icon(name) {
  const i = ICONS[name] || ICONS.star;
  if (typeof i === "object") return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">${i.d}</svg>`;
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${i}</svg>`;
}
const tile = (o, sm, lg) => `<span class="tile${sm ? " tile-sm" : ""}${lg ? " tile-lg" : ""}" style="background:linear-gradient(135deg,${o.c[0]},${o.c[1]});--tc:${o.c[1]}66">${icon(o.icon)}</span>`;
const LOGO = '<svg viewBox="0 0 340 400" aria-hidden="true"><path fill="currentColor" d="M62 5H268Q286 5 294 20L328 84Q336 100 318 100H20Q2 100 10 84L44 20Q52 5 62 5Z"/><path fill="currentColor" d="M20 145H92Q110 145 120 161L166 236Q172 245 178 236L224 161Q234 145 252 145H322Q336 145 328 158L186 380Q175 396 164 380L12 158Q4 145 20 145Z"/></svg>';
const FLAG_UZ = '<svg viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#1EB53A"/><rect width="30" height="13.3" fill="#fff"/><rect width="30" height="6.4" fill="#0099B5"/><rect y="6.4" width="30" height=".6" fill="#CE1126"/><rect y="12.7" width="30" height=".6" fill="#CE1126"/><circle cx="5" cy="3.2" r="2" fill="#fff"/><circle cx="5.7" cy="3.2" r="1.8" fill="#0099B5"/></svg>';

/* ---------- 3. AKSIYA (har qurilmaga 24 soat) VA ISH VAQTI ---------- */
let PROMO = null;
(function setupPromo() {
  const P = S.promo; if (!P || !P.enabled) return;
  const k = S.storageKey + ":promo-start", now = Date.now();
  let start = Number(store.get(k));
  if (!start || start > now) { start = now; store.set(k, start); }
  const end = start + P.hours * 3600e3;
  if (now < end) PROMO = { percent: P.percent, end };
})();
const promoActive = () => PROMO && Date.now() < PROMO.end;
function remaining() {
  const ms = Math.max(0, (PROMO ? PROMO.end : 0) - Date.now()), s = Math.floor(ms / 1000);
  const p = (n) => String(n).padStart(2, "0");
  return [p(Math.floor(s / 3600)), p(Math.floor(s / 60) % 60), p(s % 60)];
}
function workStatus() {
  const w = S.work, now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Tashkent" }));
  const on = w.days.includes(now.getDay()) && now.getHours() >= w.start && now.getHours() < w.end;
  return { on, text: on ? T.workingNow : T.workingLater.replace("{time}", w.start + ":00") };
}

/* ---------- 4. HEADER VA MENYULAR ---------- */
function megaItem(o) { return `<a class="mega-item" href="${esc(o.href)}">${tile(o)}<span class="mt"><b>${esc(o.title)}</b><span>${esc(o.text)}</span></span></a>`; }
const MENUS = [
  { id: "mega-services", label: T.nav.services, items: SERVICES.map((s) => ({ icon: s.icon, c: s.c, title: s.name, text: s.menuText, href: s.page })) },
  { id: "mega-ind", label: T.nav.industries, items: INDUSTRIES.map((i) => ({ icon: i.icon, c: i.c, title: i.name, text: i.text, href: i.link })) },
  { id: "mega-about", label: T.nav.about, items: T.aboutMenu }
];
function headerHTML() {
  const st = workStatus();
  const navBtn = (m) => `<li><button type="button" aria-expanded="false" aria-controls="${m.id}" data-mega="${m.id}">${esc(m.label)}<span class="chev">${icon("chev")}</span></button></li>`;
  return `
  <header class="site-header" id="header">
    <div class="container header-in">
      <a class="logo" href="index.html" aria-label="${esc(S.brandName)} — ${esc(T.nav.home)}">${LOGO}<span>${esc(S.brandName)}</span></a>
      <nav aria-label="Asosiy menyu"><ul class="nav">
        ${navBtn(MENUS[0])}${navBtn(MENUS[1])}
        <li><a href="index.html#portfolio">${esc(T.nav.portfolio)}</a></li>
        ${navBtn(MENUS[2])}
      </ul></nav>
      <div class="h-contact"><a href="tel:${esc(S.phoneHref)}">${esc(S.phone)}</a><span class="status${st.on ? " on" : ""}"><i></i>${esc(st.text)}</span></div>
      <a class="btn btn-primary header-cta" href="#kontakt">${esc(T.cta.lead)}</a>
      <button type="button" class="burger" id="burger" aria-expanded="false" aria-controls="mnav" aria-label="${esc(T.cta.menu)}">${icon("menu")}</button>
    </div>
    ${MENUS.map((m) => `<div class="mega" id="${m.id}"><div class="container mega-grid">${m.items.map(megaItem).join("")}</div></div>`).join("")}
  </header>
  <div class="mnav" id="mnav" hidden><div class="container">
    ${MENUS.map((m) => `<details><summary>${esc(m.label)}${icon("chev")}</summary>${m.items.map(megaItem).join("")}</details>`).join("")}
    <a class="m-link" href="index.html#portfolio">${esc(T.nav.portfolio)}${icon("arrow")}</a>
    <div class="m-actions">
      <a class="btn btn-line" href="tel:${esc(S.phoneHref)}">${icon("phone")}${esc(S.phone)}</a>
      <a class="btn btn-primary" href="#kontakt">${esc(T.cta.lead)}</a>
    </div>
  </div></div>
  <div class="dim" id="dim"></div>`;
}
function promoHTML() {
  if (!promoActive()) return "";
  return `<div class="promo" id="promo"><div class="promo-in"><span class="pct">${icon("percent")}</span><span class="promo-l">${esc(pctText(T.promo))}</span><span class="promo-s">${esc(pctText("Bugun {percent}% chegirma:"))}</span>
    <span class="timer js-timer" aria-label="Qolgan vaqt"><b>00</b><i>:</i><b>00</b><i>:</i><b>00</b></span></div></div>`;
}

/* ---------- 5. HERO VA KALKULYATOR ---------- */
function heroHTML() {
  const crumbs = PAGE_ID === "home" ? "" : `<nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="index.html">${esc(T.nav.home)}</a></li><li aria-current="page">${esc(PAGE.crumb)}</li></ol></nav>`;
  const pts = PAGE.points ? `<ul class="hero-points">${PAGE.points.map((p) => `<li>${icon("checkc")}<span>${esc(p)}</span></li>`).join("")}</ul>` : "";
  const trust = TRUST.slice(0, 4).map((x) => `<li>${icon(x.icon)}<span>${esc(x.text)}</span></li>`).join("");
  return `
  <section class="hero" aria-labelledby="h1">
    <div class="container">
      ${crumbs}
      <div class="hero-in">
        <div class="hero-tx">
          <span class="badge"><b>${esc(PAGE.badge[0])}</b>${esc(PAGE.badge[1])}</span>
          <h1 id="h1">${esc(PAGE.h1)}</h1>
          <p class="hero-lead">${esc(PAGE.lead)}</p>
          ${pts}
          <div class="hero-btns">
            <a class="btn btn-primary" href="#kontakt">${esc(T.cta.lead)}${icon("arrow")}</a>
            <a class="btn btn-line" href="tel:${esc(S.phoneHref)}">${icon("phone")}${esc(S.phone)}</a>
          </div>
        </div>
        <div id="calc"></div>
      </div>
      <ul class="hero-trust">${trust}</ul>
    </div>
  </section>`;
}

const CALC_KEY = S.storageKey + ":calc:" + PAGE_ID;
let calc = store.get(CALC_KEY) || { step: 0, a: {}, f: {} };
const calcSteps = PAGE.calc;
const calcTotal = calcSteps.length + 1;
function optsFor(s) {
  if (s.options === "INDUSTRIES") return INDUSTRIES.map((i) => ({ v: i.id, label: i.name })).concat([{ v: "boshqa", label: T.calc.other }]);
  if (s.dependsOn) return s.map[calc.a[s.dependsOn]] || s.map._default;
  return s.options;
}
function calcSum() {
  let sum = PAGE.calcBase || 0;
  calcSteps.forEach((s) => { const o = optsFor(s).find((x) => x.v === calc.a[s.name]); if (o && o.price) sum += o.price; });
  return sum;
}
function calcAnswers() {
  return calcSteps.map((s) => { const o = optsFor(s).find((x) => x.v === calc.a[s.name]); return o ? `${s.q} ${o.label}` : ""; }).filter(Boolean).join(" | ");
}
const saveCalc = () => store.set(CALC_KEY, calc);
const discChip = () => promoActive() ? `<div class="chip-disc"><span class="pct">${icon("percent")}</span>${esc(pctText(T.discountChip))}</div>` : `<div class="spacer"></div>`;
const consentHTML = (id) => `<label class="check"><input type="checkbox" name="consent" aria-describedby="${id}-cerr"><span>${esc(T.form.consentPre)}<a href="#" data-open="privacy-dlg">${esc(T.form.consentLink)}</a>${esc(T.form.consentPost)}</span></label><span class="err" id="${id}-cerr"></span>`;
const telHTML = (id) => `<div class="tel"><span class="pre">${FLAG_UZ}+998</span><input id="${id}-phone" name="phone" type="tel" inputmode="numeric" autocomplete="tel-national" placeholder="${esc(T.form.phonePh)}" aria-describedby="${id}-perr"></div><span class="err" id="${id}-perr"></span>`;

function renderCalc(focus) {
  const box = $("#calc"); if (!box) return;
  const i = Math.min(Math.max(0, calc.step | 0), calcTotal - 1); calc.step = i;
  let body;
  if (i < calcSteps.length) {
    const s = calcSteps[i];
    body = `<fieldset><legend tabindex="-1">${esc(s.q)}</legend><div class="opts">${optsFor(s).map((o) => `
      <label class="opt"><input type="radio" name="q" value="${esc(o.v)}"${calc.a[s.name] === o.v ? " checked" : ""}><span class="mk" aria-hidden="true"></span><span>${esc(o.label)}</span></label>`).join("")}</div></fieldset>`;
  } else {
    const sum = calcSum();
    const est = sum ? `<div class="est"><span>${esc(T.calc.estimate)}</span><span>${promoActive() ? `<s>${fmt(sum)}</s><b>${fmt(sum * (1 - PROMO.percent / 100))} ${CUR}dan</b>` : `<b>${fmt(sum)} ${CUR}dan</b>`}</span></div>` : "";
    body = `<fieldset><legend tabindex="-1">${esc(T.calc.contactQ)}</legend><p class="calc-note">${esc(T.calc.contactNote)}</p>${est}
      <div class="fields">
        <div class="field"><label class="sr-only" for="k-name">${esc(T.form.name)}</label><input class="input" id="k-name" name="name" autocomplete="name" placeholder="${esc(T.form.name)}" aria-describedby="k-nerr"><span class="err" id="k-nerr"></span></div>
        <div class="field"><label class="sr-only" for="k-phone">${esc(T.form.phone)}</label>${telHTML("k")}</div>
      </div>
      <div class="hp" aria-hidden="true"><label for="k-web">${esc(T.form.honeypot)}</label><input id="k-web" name="website" tabindex="-1" autocomplete="off"></div>
      ${consentHTML("k")}</fieldset>`;
  }
  const last = i === calcTotal - 1;
  box.innerHTML = `<form class="calc" id="calc-form" novalidate>
    <div class="calc-head"><h2>${esc(T.calc.title)}</h2><span class="step-pill">${esc(T.calc.step.replace("{n}", i + 1).replace("{total}", calcTotal))}</span></div>
    <div class="calc-seg" aria-hidden="true">${Array.from({ length: calcTotal }, (_, n) => `<i class="${n < i ? "done" : n === i ? "cur" : ""}"></i>`).join("")}</div>
    ${body}
    <p class="step-err" role="alert"></p>
    <div class="calc-foot">${discChip()}<div class="btns">
      ${i > 0 ? `<button type="button" class="btn btn-line btn-sq" data-back aria-label="${esc(T.calc.back)}">${icon("back")}</button>` : ""}
      <button type="submit" class="btn btn-primary">${esc(last ? T.calc.submit : T.calc.next)}${icon("arrow")}</button>
    </div></div>
    <div class="form-msg" role="status" aria-live="polite"></div>
  </form>`;
  const form = $("#calc-form");
  if (last) {
    ["name", "phone"].forEach((n) => { if (calc.f[n]) form.elements[n].value = calc.f[n]; });
    form.elements.consent.checked = !!calc.f.consent;
    setupPhone(form.elements.phone);
    form.addEventListener("input", (e) => {
      if (e.target.name === "website") return;
      calc.f = { name: form.elements.name.value, phone: form.elements.phone.value, consent: form.elements.consent.checked }; saveCalc();
      clearErr(e.target);
    });
  }
  form.addEventListener("change", (e) => {
    if (e.target.name !== "q") return;
    const s = calcSteps[calc.step];
    calc.a[s.name] = e.target.value;
    calcSteps.forEach((d) => { if (d.dependsOn === s.name && !optsFor(d).some((o) => o.v === calc.a[d.name])) delete calc.a[d.name]; });
    saveCalc();
    setTimeout(() => { calc.step++; saveCalc(); renderCalc(true); }, 220);
  });
  const back = $("[data-back]", form);
  if (back) back.addEventListener("click", () => { calc.step--; saveCalc(); renderCalc(true); });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!last) {
      const s = calcSteps[calc.step];
      if (!calc.a[s.name]) { $(".step-err", form).textContent = T.form.errChoose; return; }
      calc.step++; saveCalc(); renderCalc(true); return;
    }
    if (!validate(form, "k")) return;
    const sum = calcSum();
    const payload = { ...basePayload(form, "kalkulyator: " + PAGE_ID), answers: calcAnswers(), estimate: sum ? fmt(sum) + " " + CUR + "dan" : "" };
    submitFlow(form, $("button[type=submit]", form), payload, () => {
      calc = { step: 0, a: {}, f: {} }; store.del(CALC_KEY);
      const msg = $(".form-msg", form).outerHTML;
      $("#calc").innerHTML = `<div class="calc"><div class="calc-head"><h2>${esc(T.calc.title)}</h2></div>${msg}<button type="button" class="btn btn-line" style="margin-top:16px" id="calc-again">${icon("back")}Qaytadan hisoblash</button></div>`;
      $("#calc-again").addEventListener("click", () => renderCalc(true));
    });
  });
  if (focus) { const lg = $("legend", form); if (lg) lg.focus({ preventScroll: true }); }
}


/* ---------- Bot sahifasi: telefon va panel maketlari (faqat bezak) ---------- */
const ROBOT = `<svg class="wb-bot" viewBox="0 0 220 200" aria-hidden="true"><ellipse cx="110" cy="192" rx="70" ry="8" fill="#0B5CF0" opacity=".12"/><rect x="62" y="132" width="96" height="58" rx="26" fill="#fff"/><path d="M84 160h52v18a8 8 0 0 1-8 8H92a8 8 0 0 1-8-8z" fill="#0090FF"/><rect x="22" y="58" width="22" height="48" rx="11" fill="#0B5CF0"/><rect x="176" y="58" width="22" height="48" rx="11" fill="#0B5CF0"/><rect x="34" y="20" width="152" height="118" rx="52" fill="#fff"/><rect x="52" y="44" width="116" height="74" rx="34" fill="#071A4A"/><path d="M78 86q12-16 24 0M118 86q12-16 24 0" stroke="#5CC8FF" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="110" cy="14" r="8" fill="#0090FF"/><rect x="107" y="16" width="6" height="10" fill="#C4DDFF"/></svg>`;
const phHead = (name, sub) => `<div class="tg-top"><span class="tg-back">‹</span><span class="tg-nm"><b>${name}</b><small>${sub}</small></span><span class="tg-av"></span></div>`;
function phoneMock(k) {
  const scr = {
    book: phHead("Klinika | Qabulga yozilish", "bot") + `<div class="tg-chat"><span class="tg-me">/start</span>
      <div class="tg-in">Tekshiring, hammasi to‘g‘rimi?<br><br>🦷 Tish tozalash<br>👩‍⚕️ Shifokor: Karimova N.<br>📅 Chorshanba, 10:00<br>⏱ Taxminan 60 daqiqa<br>💰 350 000 so‘m</div>
      <div class="tg-in">Tayyor! Siz yozildingiz ✅<br>Yozuv raqami: A-1004<br><br>Bir kun oldin va 2 soat oldin eslatamiz.</div>
      <div class="tg-kb"><span>📋 Yozuvlarim</span><span>🔁 Ko‘chirish</span></div></div>`,
    shop: `<div class="ms-top"><span>‹ Orqaga</span><b>Gullar do‘koni<small>mini-ilova</small></b><span>⋯</span></div><div class="ms-body">
      <div class="ms-row"><span>Atirgul guldastasi × 1</span><b>320 000</b></div><div class="ms-row"><span>Yetkazib berish</span><b>25 000</b></div>
      <div class="ms-tot"><span>Jami</span><b>345 000 so‘m</b></div><small class="ms-l">To‘lov usuli</small>
      <div class="ms-pay"><span class="on c-click">Click ✓</span><span class="c-payme">Payme</span><span class="c-uzum">Uzum</span></div>
      <div class="ms-btn">To‘lash · 345 000</div><small class="ms-l">Uzcard yoki Humo kartasi — buyurtmadan keyin darhol.</small></div>`,
    mini: `<div class="ms-top"><span>Yopish</span><b>Milliy taomlar<small>mini-ilova</small></b><span>⋯</span></div><div class="ms-body">
      <div class="mi-cats"><span class="on">Hitlar</span><span>Osh</span><span>Salatlar</span></div>
      <div class="mi-grid">${[["Osh", "45 000", "#F59E0B,#B45309"], ["Lag‘mon", "38 000", "#F97316,#C2410C"], ["Somsa", "12 000", "#EAB308,#A16207"], ["Manti", "32 000", "#FB7185,#BE123C"]].map(([n, p, g]) => `<div class="mi-c"><i style="background:linear-gradient(135deg,${g})"></i><b>${p} so‘m</b><span>${n}</span><em>+</em></div>`).join("")}</div>
      <div class="ms-btn">Savat · 2 ta · 83 000</div></div>`,
    send: phHead("Vector | Arizalar", "bot") + `<div class="tg-chat">
      <div class="tg-in">🆕 <b>Yangi ariza</b><br>Ism: Dilnoza<br>Tel: +998 90 *** 45 67<br>Xizmat: Ingliz tili kursi<br><br>✅ Google Sheets’ga yozildi</div>
      <div class="tg-in">📣 Tarqatish yuborildi<br>Kimga: 1 120 mijoz<br>O‘qidi: 812 · Yozildi: 46</div>
      <div class="tg-kb"><span>📊 Hisobot</span><span>📣 Yangi xabar</span></div></div>`
  }[k];
  return `<div class="ph"><div class="ph-scr${k === "book" || k === "send" ? " tg" : ""}"><div class="ph-st"><span>10:25</span><i></i><span>LTE ▮</span></div>${scr}</div></div>`;
}
const pill = (t, c) => `<em class="pl pl-${c}">${t}</em>`;
const PANEL_SCREENS = [
  () => `<div class="lp-h"><b>Dashbord</b><small>Bot so‘nggi 30 kunda qanday ishladi</small></div>
    <div class="lp-stats">${[["Tashriflar", "3 420", "+18%"], ["Yangi mijozlar", "612", "+24%"], ["Arizalar", "184", "+11%"], ["Bot orqali to‘lov", "9,8 mln", "+31%"]].map(([a, b, c]) => `<div><small>${a}</small><b>${b}</b><em>${c}</em></div>`).join("")}</div>
    <div class="lp-row"><div class="lp-card"><small>Kunlik tashriflar</small><div class="lp-bars">${[40, 55, 48, 62, 58, 70, 66, 82, 74, 90, 85, 96].map((h) => `<i style="height:${h}%"></i>`).join("")}</div></div>
      <div class="lp-card"><small>Qayerdan kelishadi</small>${[["Instagram", 45], ["QR-kod", 26], ["Sayt", 19], ["Telegram qidiruv", 10]].map(([a, p]) => `<div class="lp-src"><span>${a}</span><b>${p}%</b><i><u style="width:${p * 2}%"></u></i></div>`).join("")}</div></div>
    <div class="lp-card"><small>Yangi arizalar</small>${[["Dilnoza A.", "Tozalash · shanba, 12:30", pill("Yangi", "b")], ["Sardor K.", "Konsultatsiya · Payme", pill("To‘landi", "g")], ["Malika R.", "Davolash", pill("Javob kutmoqda", "o")]].map(([a, b, c]) => `<div class="lp-li"><span class="av">${a[0]}</span><span><b>${a}</b><small>${b}</small></span>${c}</div>`).join("")}</div>`,
  () => `<div class="lp-h"><b>Mijozlar</b><small>4 860 kishi botga yozgan · bu oy 612 ta yangi</small></div>
    <div class="lp-row r2"><div class="lp-card lp-tbl">${[["Dilnoza Abdullayeva", "Instagram", "1 000 000", pill("Yangi ariza", "b")], ["Sardor Karimov", "QR-kod", "100 000", pill("To‘landi", "g")], ["Malika Rahimova", "Sayt", "3 350 000", pill("Javob kutmoqda", "o")], ["Jasur Toshmatov", "Instagram", "—", pill("Yangi ariza", "b")], ["Gulnoza Hamidova", "Telegram", "2 100 000", pill("Yozildi", "g")], ["Bobur Aliyev", "QR-kod", "6 400 000", pill("Ko‘chirildi", "s")]].map(([a, b, c, d]) => `<div class="lp-tr"><span class="av">${a[0]}</span><b>${a}</b><span>${b}</span><span>${c}</span>${d}</div>`).join("")}</div>
      <div class="lp-card"><div class="lp-li"><span class="av">D</span><span><b>Dilnoza Abdullayeva</b><small>Instagram’dan, avgust</small></span></div>
        <div class="lp-mini"><div><small>To‘lagan</small><b>1 000 000</b></div><div><small>Tashrif</small><b>2</b></div></div><div class="lp-btn">✈ Telegram’da yozish</div>
        <small class="lp-l">Tarix</small><div class="lp-hist"><span>Tozalashga yozildi · bugun</span><span>Botda savol berdi · bugun</span><span>Click orqali to‘ladi · 2 kun oldin</span></div></div></div>`,
  () => `<div class="lp-h"><b>Xabarnomalar</b><small>Kerakli guruhga xabar va kim o‘qib yozilgani haqida hisobot</small></div>
    <div class="lp-row r2"><div class="lp-card lp-tbl">${[["«Shanba kuni bo‘sh joylar»", pill("Bugun 18:00", "s"), "412", "—"], ["«Tozalashga −20%»", pill("Yuborildi", "g"), "2 140", "71%"], ["«Ko‘rikdan o‘tish vaqti»", pill("Yuborildi", "g"), "1 120", "64%"], ["«Bepul konsultatsiya»", pill("Yuborildi", "g"), "860", "78%"], ["«Qora juma: −30%»", pill("Qoralama", "s"), "386", "—"]].map(([a, b, c, d]) => `<div class="lp-tr"><b>${a}</b>${b}<span>${c}</span><span>${d}</span></div>`).join("")}
        <small class="lp-l">Tayyor mijoz guruhlari</small><div class="lp-mini"><div><small>6 oydan beri kelmagan</small><b>2 140</b></div><div><small>Yozgan, lekin yozilmagan</small><b>412</b></div><div><small>Doimiy mijozlar</small><b>640</b></div></div></div>
      <div class="lp-card"><b>«Tozalashga −20%»</b><small class="lp-l">12-oktabr, 10:00</small>${[["Yuborildi", "2 140", 100], ["O‘qidi", "1 519", 71], ["Bosdi", "412", 19], ["Yozildi va keldi", "38", 4]].map(([a, b, p]) => `<div class="lp-src"><span>${a}</span><b>${b}</b><i><u style="width:${p}%"></u></i></div>`).join("")}<div class="lp-sum"><small>Tarqatish keltirdi</small><b>10,6 mln so‘m</b></div></div></div>`,
  () => `<div class="lp-h"><b>Xizmatlar va narxlar</b><small>O‘zingiz o‘zgartirasiz — mijoz botda darhol ko‘radi</small></div>
    <div class="lp-row r2"><div class="lp-card lp-tbl">${[["Professional tozalash", "350 000", "60 daq", 1], ["Karies davolash", "450 000 dan", "60 daq", 1], ["Shifokor konsultatsiyasi", "100 000", "20 daq", 1], ["Oqartirish", "1 200 000", "90 daq", 1], ["Implantatsiya", "4 500 000 dan", "2 tashrif", 1], ["Breket", "6 000 000 dan", "rejaga ko‘ra", 0]].map(([a, b, c, on]) => `<div class="lp-tr"><b>${a}</b><span>${b} so‘m</span><span>${c}</span><i class="tgl${on ? " on" : ""}"></i></div>`).join("")}
        <small class="lp-l">Ish vaqti</small><div class="lp-mini"><div><small>Du–Ju</small><b>09:00–20:00</b></div><div><small>Shanba</small><b>09:00–16:00</b></div><div><small>Yakshanba</small><b>Dam olish</b></div></div></div>
      <div class="lp-card"><b>Professional tozalash</b><div class="lp-img"></div><small class="lp-l">Narx</small><div class="lp-inp">350 000 <small>so‘m</small></div><small class="lp-l">Mijoz botda shunday ko‘radi</small><div class="lp-prev"><b>Professional tozalash</b><span>350 000 so‘m · 60 daqiqa</span><div><em>Yozilish</em><em>To‘lash</em></div></div></div></div>`
];
function setupCases() {
  const box = $(".cs"); if (!box) return;
  const more = $("[data-cs-more]", box);
  if (more) more.addEventListener("click", () => { $$("[data-cs-hide]", box).forEach((c) => { c.hidden = false; c.classList.add("in"); }); more.remove(); });
  const leads = $$("[data-cs-lead]", box);
  if (leads.length < 2 || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver((en) => en.forEach((x) => { if (x.isIntersecting) { const k = x.target.dataset.csI; leads.forEach((l) => l.classList.toggle("on", l.dataset.csLead === k)); } }), { rootMargin: "-45% 0px -45% 0px" });
  $$("[data-cs-i]", box).forEach((c) => io.observe(c));
}
function setupPanel() {
  const box = $("[data-pn]"); if (!box) return;
  const tabs = $$("[data-pn-t]", box), views = $$("[data-pn-v]", box);
  let n = 0, iv;
  const show = (k) => { n = k; tabs.forEach((t, i) => { t.classList.toggle("on", i === k); t.setAttribute("aria-selected", String(i === k)); }); views.forEach((v, i) => v.classList.toggle("on", i === k)); };
  const auto = () => { clearInterval(iv); if (!matchMedia("(prefers-reduced-motion: reduce)").matches) iv = setInterval(() => show((n + 1) % tabs.length), 7000); };
  tabs.forEach((t, i) => t.addEventListener("click", () => { show(i); auto(); }));
  auto();
}

/* ---------- 6. BO‘LIMLAR ---------- */
const head = (title, text, subHtml) => `<div class="sec-head reveal"><h2>${esc(title)}</h2>${subHtml ? `<p>${subHtml}</p>` : text ? `<p>${esc(text)}</p>` : ""}</div>`;
function placeholderImg(hue = 215) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='hsl(${hue},85%,58%)'/><stop offset='1' stop-color='hsl(${hue + 25},80%,38%)'/></linearGradient></defs><rect width='800' height='500' fill='url(#g)'/><rect x='70' y='60' width='660' height='400' rx='18' fill='#fff' opacity='.16'/><rect x='70' y='60' width='660' height='40' rx='18' fill='#fff' opacity='.22'/><circle cx='100' cy='80' r='6' fill='#fff' opacity='.7'/><circle cx='120' cy='80' r='6' fill='#fff' opacity='.5'/><rect x='110' y='140' width='150' height='280' rx='12' fill='#fff' opacity='.2'/><rect x='290' y='150' width='300' height='26' rx='8' fill='#fff' opacity='.92'/><rect x='290' y='196' width='390' height='12' rx='6' fill='#fff' opacity='.5'/><rect x='290' y='220' width='330' height='12' rx='6' fill='#fff' opacity='.5'/><rect x='290' y='262' width='120' height='90' rx='12' fill='#fff' opacity='.85'/><rect x='426' y='262' width='120' height='90' rx='12' fill='#fff' opacity='.55'/><rect x='562' y='262' width='120' height='90' rx='12' fill='#fff' opacity='.35'/></svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}
const SECTIONS = {
  facts: () => ({ id: "biz-haqimizda", html: head(T.sections.facts) + `<div class="fx">${FACTS.map((f, n) => `
      <article class="fx-i reveal${n === 0 ? " fx-hl" : ""}">
        <div class="fx-n">${esc(f.num)}${f.unit ? `<small>${esc(f.unit)}</small>` : ""}</div>
        <h3>${esc(f.label)}</h3>
        <p>${esc(f.text)}</p>
      </article>`).join("")}</div>` }),
  services: () => ({ id: "xizmatlar", html: head(T.sections.services, T.sections.servicesText) + `<div class="svc-grid">${SERVICES.map((s) => `
      <a class="svc2 reveal" href="${esc(s.page)}">
        <span class="svc2-top">${tile(s, false, true)}<span class="svc2-price">${money(s.price)} ${CUR}dan</span><span class="circ">${icon("arrow")}</span></span>
        <h3>${esc(s.name)}</h3><p>${esc(s.text || "")}</p>
        <span class="chips">${(s.tags || []).map((t) => `<span>${esc(t)}</span>`).join("")}</span>
      </a>`).join("")}</div>` }),
  problems: () => ({ html: head(PAGE.problems.title, T.sections.problemsSub) + `<div class="pb-stack">${PAGE.problems.items.map((p, n) => `
      <article class="pb-card" style="--i:${n}"><div class="pb-h"><h3>${esc(p.title)}</h3><span class="pb-x" aria-hidden="true">${icon("x")}</span></div><p>${esc(p.text)}</p></article>`).join("")}</div>` }),
  system: () => ({ html: head(SYSTEM.title, SYSTEM.text) + `<div class="sys">${SYSTEM.items.map((x, n) => `
      <article class="sys-i reveal"><div class="sys-art" aria-hidden="true"><span class="sys-ring"></span><span class="sys-ic">${icon(x.icon)}</span><span class="sys-n">0${n + 1}</span></div><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></article>`).join("")}</div>` }),
  tags: () => ({ html: head(PAGE.tags.title) + `<div class="tg">${PAGE.tags.items.map((t) => {
      const [name, d] = Array.isArray(t) ? t : [t, ""];
      return d ? `<details class="tg-i reveal"><summary><span class="tg-ic">${icon("checkc")}</span><b>${esc(name)}</b><span class="tg-ch">${icon("chev")}</span></summary><p>${esc(d)}</p></details>`
        : `<div class="tg-i reveal"><div class="tg-s"><span class="tg-ic">${icon("checkc")}</span><b>${esc(name)}</b></div></div>`;
    }).join("")}</div>` }),
  midcta: () => ({ html: `<div class="cta-band reveal">
      <div class="cta-band-tx"><h2>${esc(T.sections.midTitle)}</h2><p>${esc(T.sections.midText)}</p>
        <div class="cta-btns"><a class="btn btn-outline-w" href="#kontakt">${esc(T.cta.lead)}${icon("arrow")}</a>
        <a class="cta-chip" href="tel:${esc(S.phoneHref)}">${esc(promoActive() ? pctText(T.sections.callChip) : T.sections.callTitle + ": " + S.phone)}</a></div></div>
      <div class="cta-band-art" aria-hidden="true"><span class="spark s1"></span><span class="spark s2"></span><span class="spark s3"></span>${LOGO}</div>
    </div>` }),
  pricing: () => {
    const P = PAGE.pricing;
    return { id: "narxlar", html: head(P.title, T.sections.pricingSub) + `<div class="prs">${P.tiers.map((t) => `
      <article class="pr reveal${t.popular ? " pop" : ""}">
        <div class="pr-main">
          <div class="pr-top"><h3>${esc(t.name)}</h3>${t.popular ? `<span class="tag-pop">${esc(T.sections.popular)}</span>` : ""}</div>
          ${t.desc ? `<p class="pr-desc">${esc(t.desc)}</p>` : ""}
          <ul class="pr-chips">${t.features.slice(0, 3).map((f) => `<li>${icon("check")}${esc(f)}</li>`).join("")}</ul>
          <details class="pr-more"><summary>${esc(T.sections.includes)}<span class="tg-ch">${icon("chev")}</span></summary>
            <div class="pr-body"><ul class="pr-list">${t.features.map((f) => `<li>${icon("checkc")}${esc(f)}</li>`).join("")}</ul>
            <div class="pr-note">${icon("shield")}<span>${esc(T.sections.pricingNote)}</span></div></div></details>
        </div>
        <div class="pr-side">
          <div class="pr-price">${fmt(t.price)} <span>${CUR}dan</span></div>
          ${t.priceTo ? `<small class="pr-to">${fmt(t.priceTo)} ${CUR}gacha</small>` : ""}
          <span class="pr-time">${icon("clock")}${esc(t.time)}</span>
          <button type="button" class="btn ${t.popular ? "btn-primary" : "btn-line"}" data-order="${esc(t.name)}">${esc(T.cta.order)}</button>
        </div>
      </article>`).join("")}</div>
      ${P.excludes ? `<div class="pr-ex reveal"><h3>${esc(T.sections.excludes)}</h3><ul>${P.excludes.map((x) => `<li>${icon("x")}${esc(x)}</li>`).join("")}</ul></div>` : ""}` };
  },
  benefits: () => {
    const B = PAGE.benefits || BENEFITS.items, hl = (t) => esc(t).replace(/\{([^}]+)\}/g, "<em>$1</em>");
    return { html: head(PAGE.benefitsTitle || BENEFITS.title) + `<div class="bn2">${B.map((b, n) => `
      <div class="bn2-i reveal"><span class="bn2-n" aria-hidden="true">${String(n + 1).padStart(2, "0")}</span><span class="bn2-ic">${icon(b.icon)}</span><h3>${hl(b.title)}</h3><p>${esc(b.text)}</p></div>`).join("")}</div>` };
  },
  kinds: () => ({ html: head(PAGE.kindsTitle) + `<div class="kd">${PAGE.kinds.map((k) => `
      <article class="kd-i reveal"><div class="kd-tx"><h3>${esc(k.title)}</h3><p>${esc(k.text)}</p></div><div class="kd-ph" aria-hidden="true">${phoneMock(k.mock)}</div></article>`).join("")}</div>` }),
  whybot: () => ({ html: head(PAGE.whyTitle) + `<div class="wb">
      <article class="wb-i wb-big reveal"><span class="wb-ic">${icon("clock")}</span><div class="wb-num">24/7</div><h3>Mijozlarni tunu kun qabul qiladi</h3><p>Mijoz istalgan vaqtda buyurtma beradi, xizmatga yoziladi yoki savoliga javob oladi — menejer javobini kutmasdan.</p>${ROBOT}</article>
      <article class="wb-i reveal"><span class="wb-ic">${icon("telegram")}</span><div class="wb-num sm">1 bosish</div><h3>Ilova yuklash shart emas</h3><p>Mijozlaringiz allaqachon Telegram’da — bot bir bosishda ochiladi.</p></article>
      <article class="wb-i reveal"><span class="wb-ic">${icon("card")}</span><h3>To‘lov to‘g‘ridan-to‘g‘ri chatda</h3><p>Mijoz ikki bosishda to‘laydi — pul darhol hisobingizga tushadi.</p><div class="wb-chips"><span class="c-click">Click</span><span class="c-payme">Payme</span><span class="c-uzum">Uzum</span></div></article>
      <article class="wb-i reveal"><span class="wb-ic">${icon("layers")}</span><h3>CRM bilan integratsiya</h3><p>Arizalar va to‘lovlar CRM yoki Google Sheets’ga o‘zi tushadi — menejer uchun tayyor.</p><a class="wb-link" href="crm.html">Jarayoningiz uchun shaxsiy CRM ${icon("arrow")}</a></article>
      <article class="wb-i reveal"><span class="wb-ic">${icon("bell")}</span><h3>Jarayonlarni avtomatlashtirish</h3><p>Bot yozilishlarni tasdiqlaydi, tashrif haqida eslatadi, buyurtma holatini aytadi va mijozlarga xabar tarqatadi.</p></article>
    </div>` }),
  panel: () => ({ id: "panel", html: head(PAGE.panelTitle) + `<div class="pn" data-pn>
      <div class="pn-tabs" role="tablist">${PAGE.panel.map((t, n) => `<button type="button" role="tab" class="pn-t${n ? "" : " on"}" aria-selected="${n ? "false" : "true"}" data-pn-t="${n}"><b>${icon(t.icon)}${esc(t.tab)}</b><span>${esc(t.sub)}</span><i><u></u></i></button>`).join("")}</div>
      <div class="pn-stage">${PAGE.panel.map((t, n) => `<div class="pn-v${n ? "" : " on"}" data-pn-v="${n}">
        ${t.notes.map((x, k) => `<div class="pn-note pn-note${k}" aria-hidden="${k > 3}"><b>${esc(x[0])}</b><span>${esc(x[1])}</span></div>`).join("")}
        <div class="lp" aria-label="${esc(t.tab)} — admin panel ko‘rinishi" role="img"><div class="lp-scr"><div class="lp-side"><div class="lp-logo">${LOGO}<span>Bot paneli<small>● Bot onlayn</small></span></div>
          ${["Dashbord", "Arizalar", "Mijozlar", "To‘lovlar", "Xabarnomalar", "Xizmatlar va narxlar", "Sozlamalar"].map((m) => `<span class="${m === t.tab ? "on" : ""}">${esc(m)}</span>`).join("")}</div>
          <div class="lp-main">${PANEL_SCREENS[n]()}</div></div><div class="lp-base"></div></div>
      </div>`).join("")}</div></div>` }),
  cases: () => {
    const items = PORTFOLIO.filter((p) => p.kinds.includes(PAGE_ID));
    if (!items.length) return null;
    const L = PAGE.casesLeads || [T.sections.portfolioText], sub = esc(T.sections.portfolioSub).replace(/\{([^}]+)\}/g, "<u>$1</u>");
    return { id: "portfolio", html: head(PAGE.casesTitle || T.sections.portfolio, null, sub) + `<div class="cs">
      <div class="cs-l"><div class="cs-st">${L.map((t, n) => `<p class="cs-lead${n ? "" : " on"}" data-cs-lead="${n}">${esc(t)}</p>`).join("")}
        <a class="btn btn-line cs-more" href="index.html#portfolio">Barcha ishlar ${icon("arrow")}</a></div></div>
      <div class="cs-list">${items.map((p, n) => `
        <article class="cs-i reveal" data-cs-i="${Math.min(L.length - 1, Math.floor(n * L.length / items.length))}">
          <div class="cs-tx"><span class="cs-ic">${icon(p.icon || "mobile")}</span><h3>${esc(p.name)}</h3><span class="cs-tag">${esc(p.tag)}</span><p>${esc(p.text)}</p>
            ${p.stats ? `<dl class="cs-stats">${p.stats.map(([a, b]) => `<div><dt>${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join("")}</dl>` : ""}
            <a class="btn btn-dark cs-btn" href="${p.url ? esc(p.url) : "#kontakt"}"${p.url ? ' target="_blank" rel="noopener"' : ` data-demo="${esc(p.name)}"`}>${icon("mobile")}${p.url ? "Ochish" : esc(T.sections.demo)}</a></div>
          <div class="cs-img"><img loading="lazy" decoding="async" width="800" height="500" src="${p.img ? esc(p.img) : placeholderImg(p.hue)}" alt="${esc(p.name)} — ekran ko‘rinishi"></div>
        </article>`).join("")}</div></div>` };
  },
  botfolio: () => {
    const items = [...PORTFOLIO.filter((p) => p.kinds.includes("bot")), ...(typeof BOT_WORKS !== "undefined" ? BOT_WORKS : [])];
    if (!items.length) return null;
    return { id: "portfolio", html: head(PAGE.portfolioTitle || T.sections.portfolio, T.sections.portfolioText) + `<div class="bf">${items.map((p) => `
      <article class="bf-i reveal"><span class="bf-av">${p.img ? `<img src="${esc(p.img)}" alt="" loading="lazy">` : icon(p.icon || "bot")}</span>
        <h3>${esc(p.name)}</h3><span class="bf-tag">${esc(p.tag)}</span><p>${esc(p.text)}</p>
        ${p.url ? `<a class="bf-a" href="${esc(p.url)}" target="_blank" rel="noopener">${icon("telegram")}${esc(p.url.replace(/^https?:\/\/t\.me\//, "@"))}</a>` : `<a class="bf-a" href="#kontakt" data-demo="${esc(p.name)}">${icon("telegram")}${esc(T.sections.demo)}</a>`}</article>`).join("")}</div>` };
  },
  compare: () => ({ id: "kafolatlar", html: head(T.sections.compare) + `<div class="vs">
      ${[["them", T.sections.compareThem, 1, "xc"], ["us", T.sections.compareUs, 2, "checkc"]].map(([k, h, i, ic]) => `
      <div class="vs-col vs-${k} reveal"><div class="vs-h">${k === "us" ? LOGO : ""}<b>${esc(h)}</b></div>
        ${COMPARE.map((r) => `<div class="vs-r"><small>${esc(r[0])}</small><p>${icon(ic)}<span>${esc(r[i])}</span></p></div>`).join("")}</div>`).join("")}
    </div>` }),
  process: () => ({ id: "bosqichlar", html: `<div class="pc">
      <div class="pc-l reveal"><h2>${esc(PAGE.processTitle || T.sections.process)}</h2><p>${esc(T.sections.processText)}</p>
        <div class="pc-nav"><button type="button" class="pc-b" data-pc="-1" aria-label="Oldingi bosqich">${icon("back")}</button><button type="button" class="pc-b" data-pc="1" aria-label="Keyingi bosqich">${icon("arrow")}</button></div></div>
      <ol class="pc-track" tabindex="0" aria-label="${esc(T.sections.process)}">${PAGE.process.map((p, n) => `
        <li class="pc-c"><span class="pc-n">${String(n + 1).padStart(2, "0")}</span><h3>${esc(p[0])}</h3><p>${esc(p[1])}</p>
        ${p[2] ? `<div class="pc-get"><small>${esc(T.sections.youGet)}</small><b>${esc(p[2])}</b></div>` : ""}</li>`).join("")}</ol>
    </div>` }),
  portfolio: () => {
    const items = PORTFOLIO.filter((p) => p.kinds.includes(PAGE_ID)).slice(0, 8);
    if (!items.length) return null;
    const sub = esc(T.sections.portfolioSub).replace(/\{([^}]+)\}/g, "<u>$1</u>");
    return { id: "portfolio", html: head(T.sections.portfolio, null, sub) + `<div class="pf-grid">${items.map((p) => `
      <a class="pf2 reveal" href="${p.url ? esc(p.url) : "#kontakt"}"${p.url ? ' target="_blank" rel="noopener"' : ` data-demo="${esc(p.name)}"`}>
        <img loading="lazy" decoding="async" width="800" height="500" src="${p.img ? esc(p.img) : placeholderImg(p.hue)}" alt="${esc(p.name)} — ${esc(p.tag)}, ekran ko‘rinishi">
        <span class="pf2-cap"><b>${esc(p.name)}</b><span>${esc(p.tag)} — ${esc(p.text)}</span></span>
      </a>`).join("")}</div>
      <div class="center-btn reveal"><a class="btn btn-ghost" href="#kontakt">${esc(T.sections.demo)}${icon("arrow")}</a></div>` };
  },
  industries: () => ({ id: "sohalar", html: head(T.sections.industries, T.sections.industriesText) + `<div class="ind2">
      <div class="ind-show reveal" aria-hidden="true">
        ${INDUSTRIES.map((i, n) => `<div class="ind-slide${n ? "" : " on"}" style="background:radial-gradient(120% 80% at 80% 10%,${i.c[0]},${i.c[1]})">${icon(i.icon)}${i.photo ? `<img src="${esc(i.photo)}" alt="" decoding="async">` : ""}<b>${esc(i.name)}</b></div>`).join("")}
        <div class="ind-bars">${INDUSTRIES.map(() => "<i><b></b></i>").join("")}</div>
      </div>
      <div class="ind-list">${INDUSTRIES.map((i) => `<a class="ind2-i reveal" href="${esc(i.link)}"><b>${esc(i.name)}</b><span>${esc(i.text)}</span>${icon("arrow")}</a>`).join("")}</div>
    </div>` }),
  why: () => {
    const W = (n) => WHY[n] || { title: "", text: "" };
    const top = (w, ic, c) => `${tile({ icon: ic, c }, true)}<h3>${esc(w.title)}</h3><p>${esc(w.text)}</p>`;
    // a — dasturchi bilan to‘g‘ridan-to‘g‘ri (chat ko‘rinishi bilan)
    const chat = `<div class="w-chat" aria-hidden="true">
        <div class="w-chat-h"><span class="w-ava">${LOGO}</span><span><b>${esc(S.brandName)}</b><small><i></i>dasturchi · onlayn</small></span></div>
        <p class="w-msg in">Assalomu alaykum! Saytga yangi bo‘lim qo‘shsa bo‘ladimi?</p>
        <p class="w-msg out">Albatta. Bugun kechgacha qo‘shib, sizga ko‘rsataman ✓✓</p>
        <p class="w-msg in">Rahmat, juda tez bo‘ldi 👍</p></div>`;
    const a = `<article class="w-card w-a reveal"><div class="w-tx">${top(W(0), "user", ["#5B8CFF", "#2E5BFF"])}</div>${chat}</article>`;
    // b — kafolat
    const b = `<article class="w-card w-b reveal"><span class="w-big">5<small>yil</small></span><h3>${esc(W(1).title)}</h3><p>${esc(W(1).text)}</p>${icon("shield").replace("<svg", '<svg class="w-bg-ico"')}</article>`;
    // c — 3 oy bepul yordam (oylar bo‘yicha)
    const c = `<article class="w-card w-c reveal"><span class="w-big blue">3<small>oy</small></span><h3>${esc(W(3).title)}</h3><p>${esc(W(3).text)}</p>
      <div class="w-months" aria-hidden="true">${["1-oy", "2-oy", "3-oy"].map((m) => `<span>${icon("check")}${m}</span>`).join("")}<span class="free">0 so‘m</span></div></article>`;
    // d — SEO (qidiruv natijasi ko‘rinishi)
    const d = `<article class="w-card w-d reveal">${top(W(2), "trend", ["#FBBF24", "#D97706"])}
      <div class="w-serp" aria-hidden="true"><div class="w-search">${icon("search")}sayt yaratish Marg‘ilon</div>
      <div class="w-res"><span class="w-pos">1</span><span><small>vectorstudiya.uz</small><b>Sayt yaratish — ${esc(S.brandName)}</b></span></div></div></article>`;
    // e — hammasi sizniki
    const e = `<article class="w-card w-e reveal">${top(W(4), "key", ["#C084FC", "#9333EA"])}
      <ul class="w-keys" aria-hidden="true">${["Domen", "Kod", "Server", "Admin panel"].map((k) => `<li>${icon("checkc")}${k}</li>`).join("")}</ul></article>`;
    return { id: "afzalliklar", html: head(T.sections.trust, T.sections.whySub) + `<div class="why3">${a}${b}${c}${d}${e}</div>` };
  },
  faq: () => ({ id: "savollar", html: head(T.sections.faq) + `<div class="faq">${PAGE.faq.map((q, n) => `<details class="reveal"${n === 0 ? " open" : ""}><summary>${esc(q[0])}<span class="pm">${icon("plus")}</span></summary><p>${esc(q[1])}</p></details>`).join("")}</div>` }),
  other: () => ({ html: head(T.sections.other) + `<div class="other">${SERVICES.filter((s) => s.id !== PAGE.service).map((s) => `<a class="card reveal" href="${esc(s.page)}">${tile(s, true)}<span>${esc(s.name)}</span><span class="link-arrow">${icon("arrow")}</span></a>`).join("")}</div>` })
};

/* ---------- 7. KONTAKT ---------- */
function contactHTML() {
  const icoBtns = [S.whatsapp && ["whatsapp", S.whatsapp, "WhatsApp"], S.telegram && ["telegram", S.telegram, "Telegram"], ["phone", "tel:" + S.phoneHref, T.cta.call]].filter(Boolean);
  return `<section class="contact2" id="kontakt" aria-labelledby="c-title"><div class="container contact">
    <div class="c-left reveal">
      <div><h2 id="c-title">${esc(PAGE.contactTitle)}</h2><p class="lead">${esc(T.sections.contactPromise)}</p></div>
      <div class="c-bottom">
        <p class="c-lines"><a href="tel:${esc(S.phoneHref)}">${esc(S.phone)}</a>${S.telegram ? `<span class="sep" aria-hidden="true"></span><a class="muted" href="${esc(S.telegram)}" target="_blank" rel="noopener">${esc(S.telegramHandle)}</a>` : ""}${S.email ? `<span class="sep" aria-hidden="true"></span><a class="muted" href="mailto:${esc(S.email)}">${esc(S.email)}</a>` : ""}</p>
        <p class="c-meta">${esc(S.work.text)}${S.address ? " · " + esc(S.address) : ""}</p>
        <div class="c-icons">${icoBtns.map(([ic, h, l]) => `<a href="${esc(h)}"${h.startsWith("http") ? ' target="_blank" rel="noopener"' : ""} aria-label="${esc(l)}">${icon(ic)}</a>`).join("")}</div>
      </div>
    </div>
    <form class="c-form reveal" id="contact-form" novalidate>
      <div class="field"><label class="sr-only" for="c-name">${esc(T.form.name)}</label><input class="input" id="c-name" name="name" autocomplete="name" placeholder="${esc(T.form.name)}" aria-describedby="c-nerr"><span class="err" id="c-nerr"></span></div>
      <div class="field"><label class="sr-only" for="c-phone">${esc(T.form.phone)}</label>${telHTML("c")}</div>
      <div class="field"><label class="sr-only" for="c-msg">${esc(T.form.message)}</label><textarea class="input" id="c-msg" name="message" rows="4" placeholder="${esc(T.form.messagePh)}"></textarea></div>
      <div class="hp" aria-hidden="true"><label for="c-web">${esc(T.form.honeypot)}</label><input id="c-web" name="website" tabindex="-1" autocomplete="off"></div>
      ${consentHTML("c")}
      <button type="submit" class="btn btn-primary">${esc(T.form.submit)}</button>
      <div class="form-msg" role="status" aria-live="polite"></div>
    </form>
  </div></section>`;
}

/* ---------- 8. FOOTER, SUZUVCHI TUGMA, OYNALAR ---------- */
function footerHTML() {
  const soc = [...Object.entries(S.social || {}), S.whatsapp && ["whatsapp", S.whatsapp], S.telegram && ["telegram", S.telegram]].filter(Boolean);
  return `<footer class="site-footer"><div class="container">
    <div class="f-grid">
      <div class="f-brand"><a class="logo" href="index.html">${LOGO}<span>${esc(S.brandName)}</span></a><p>${esc(T.footer.about)}</p>
        ${soc.length ? `<p class="f-soc">${soc.map(([k, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener" aria-label="${esc(k)}">${icon(k)}</a>`).join("")}</p>` : ""}</div>
      <div><h3>${esc(T.footer.services)}</h3><ul>${SERVICES.map((s) => `<li><a href="${esc(s.page)}">${esc(s.name)}</a></li>`).join("")}</ul></div>
      <div><h3>${esc(T.footer.industries)}</h3><ul>${INDUSTRIES.map((i) => `<li><a href="${esc(i.link)}">${esc(i.name)}</a></li>`).join("")}</ul></div>
      <div><h3>${esc(T.sections.company)}</h3><ul>${T.aboutMenu.map((m) => `<li><a href="${esc(m.href)}">${esc(m.title)}</a></li>`).join("")}</ul>
        <h3 class="mt">${esc(T.nav.portfolio)}</h3><ul><li><a href="index.html#portfolio">${esc(T.sections.portfolio)}</a></li></ul></div>
      <div><h3>${esc(T.footer.contacts)}</h3>
        <p class="f-small">${esc(T.sections.office)}</p><p><a class="f-big" href="tel:${esc(S.phoneHref)}">${esc(S.phone)}</a></p>
        ${S.address ? `<p class="f-addr">${esc(S.address)}</p>` : ""}
        ${S.telegram ? `<p class="f-small">Telegram</p><p><a class="f-big" href="${esc(S.telegram)}" target="_blank" rel="noopener">${esc(S.telegramHandle)}</a></p>` : ""}
        ${S.email ? `<p class="f-small">Pochta</p><p><a class="f-big" href="mailto:${esc(S.email)}">${esc(S.email)}</a></p>` : ""}
        <p class="f-small">${esc(S.work.text)}</p></div>
    </div>
    <div class="f-bottom">
      <a class="logo f-mark" href="index.html">${LOGO}<span><b>${esc(S.brandName)}</b><small>IT-studiya, Marg‘ilon</small></span></a>
      <div class="f-legal-wrap">${S.requisites ? `<p>${esc(S.requisites)}</p>` : ""}
        <p>© ${new Date().getFullYear()} ${esc(S.brandName)}. ${esc(T.footer.rights)}
        <button type="button" data-open="privacy-dlg">${esc(T.footer.privacy)}</button><button type="button" data-open="terms-dlg">${esc(T.footer.terms)}</button></p></div>
    </div>
  </div></footer>
  <div class="fab"><div class="fab-list" id="fab-list" hidden>
      ${S.telegram ? `<a class="tg" href="${esc(S.telegram)}" target="_blank" rel="noopener">${icon("telegram")}Telegram</a>` : ""}
      ${S.whatsapp ? `<a class="tg" href="${esc(S.whatsapp)}" target="_blank" rel="noopener">${icon("whatsapp")}WhatsApp</a>` : ""}
      <a class="ph" href="tel:${esc(S.phoneHref)}">${icon("phone")}${esc(T.cta.call)}</a>
    </div>
    <button type="button" class="fab-main" id="fab" aria-expanded="false" aria-controls="fab-list" aria-label="Biz bilan bog‘lanish">${icon("bubble")}</button></div>
  <dialog id="order-dlg" aria-labelledby="o-h"><div class="dlg-head"><h2 id="o-h">${esc(T.cta.lead)}</h2><button class="x" type="button" data-close aria-label="${esc(T.cta.close)}">${icon("x")}</button></div>
    <form class="dlg-body o-form" id="order-form" novalidate>
      <p class="o-tier" id="o-tier"></p>
      <div class="field"><label class="sr-only" for="o-name">${esc(T.form.name)}</label><input class="input" id="o-name" name="name" autocomplete="name" placeholder="${esc(T.form.name)}" aria-describedby="o-nerr"><span class="err" id="o-nerr"></span></div>
      <div class="field"><label class="sr-only" for="o-phone">${esc(T.form.phone)}</label>${telHTML("o")}</div>
      <div class="hp" aria-hidden="true"><label for="o-web">${esc(T.form.honeypot)}</label><input id="o-web" name="website" tabindex="-1" autocomplete="off"></div>
      ${consentHTML("o")}
      <button type="submit" class="btn btn-primary">${esc(T.form.submit)}</button>
      <div class="form-msg" role="status" aria-live="polite"></div>
    </form></dialog>
  ${["privacy", "terms"].map((k) => `<dialog id="${k}-dlg" aria-labelledby="${k}-h"><div class="dlg-head"><h2 id="${k}-h">${esc(T.legal[k + "Title"])}</h2><button class="x" type="button" data-close aria-label="${esc(T.cta.close)}">${icon("x")}</button></div>
    <div class="dlg-body">${T.legal[k].map((p) => `<p>${esc(p.replace("{telegram}", S.telegramHandle || S.telegram).replace("{hours}", S.promo.hours))}</p>`).join("")}</div></dialog>`).join("")}`;
}

/* ---------- 9. FORMALAR: telefon, validatsiya, yuborish ---------- */
function setupPhone(input) {
  input.addEventListener("input", () => {
    let d = input.value.replace(/\D/g, "");
    if (d.length > 9 && d.startsWith("998")) d = d.slice(3);
    d = d.slice(0, 9);
    input.value = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean).join(" ");
  });
}
function setErr(el, id, msg) { el.setAttribute("aria-invalid", msg ? "true" : "false"); const b = document.getElementById(id); if (b) b.textContent = msg || ""; }
function clearErr(el) { if (el.getAttribute("aria-invalid") === "true") { el.setAttribute("aria-invalid", "false"); const id = el.getAttribute("aria-describedby"); if (id) document.getElementById(id).textContent = ""; } }
function validate(form, p) {
  const n = form.elements.name, ph = form.elements.phone, c = form.elements.consent;
  let first = null;
  const chk = (el, id, ok, msg) => { setErr(el, id, ok ? "" : msg); if (!ok && !first) first = el; };
  chk(n, p + "-nerr", n.value.trim().length >= 2, T.form.errName);
  chk(ph, p + "-perr", ph.value.replace(/\D/g, "").length === 9, T.form.errPhone);
  chk(c, p + "-cerr", c.checked, T.form.errConsent);
  if (first) first.focus();
  return !first;
}
const basePayload = (form, kind) => ({
  form: kind,
  name: form.elements.name.value.trim(),
  phone: "+998 " + form.elements.phone.value.trim(),
  website: form.elements.website.value,
  discount: promoActive() ? `${PROMO.percent}%` : "",
  page: location.href,
  time: new Date().toISOString()
});
function leadText(p) {
  return ["Assalomu alaykum! Saytdan ariza:", "Ism: " + p.name, "Tel: " + p.phone,
    p.message && "Vazifa: " + p.message, p.answers && "Tanlov: " + p.answers,
    p.estimate && "Taxminiy narx: " + p.estimate, p.discount && "Chegirma: " + p.discount].filter(Boolean).join("\n");
}
async function sendLead(payload) {
  if (payload.website) return "ok";                         // honeypot — bot
  delete payload.website;
  if (S.formEndpoint) {                                     // 1) Google Apps Script (eng xavfsiz)
    await fetch(S.formEndpoint, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload) });
    return "ok";
  }
  const B = S.telegramBot || {};
  if (B.token && B.chatId) {                                // 2) To‘g‘ridan-to‘g‘ri Telegram botga
    await fetch(`https://api.telegram.org/bot${B.token}/sendMessage`, { method: "POST", mode: "no-cors", body: new URLSearchParams({ chat_id: B.chatId, text: "🆕 " + leadText(payload).replace("Assalomu alaykum! Saytdan ariza:", "Yangi ariza (" + payload.form + ")") }) });
    return "ok";
  }
  throw new Error("Forma ulanmagan: SOZLAMALAR.telegramBot yoki formEndpoint bo‘sh");
}
async function submitFlow(form, btn, payload, onDone) {
  const msg = $(".form-msg", form), label = btn.innerHTML;
  msg.className = "form-msg"; msg.textContent = "";
  btn.disabled = true; btn.setAttribute("aria-busy", "true"); btn.textContent = T.form.sending;
  try {
    const res = await sendLead(payload);
    msg.classList.add("ok");
    msg.textContent = T.form.success;
    btn.disabled = false; btn.removeAttribute("aria-busy"); btn.innerHTML = label;
    onDone();
  } catch (e) {
    msg.classList.add("bad"); msg.textContent = T.form.error.replace("{phone}", S.phone);
    btn.disabled = false; btn.removeAttribute("aria-busy"); btn.innerHTML = label;
  }
}
function setupContact() {
  const form = $("#contact-form"), key = S.storageKey + ":contact";
  setupPhone(form.elements.phone);
  const d = store.get(key);
  if (d) { ["name", "phone", "message"].forEach((n) => { if (d[n]) form.elements[n].value = d[n]; }); form.elements.consent.checked = !!d.consent; }
  form.addEventListener("input", (e) => {
    if (e.target.name === "website") return;
    store.set(key, { name: form.elements.name.value, phone: form.elements.phone.value, message: form.elements.message.value, consent: form.elements.consent.checked });
    clearErr(e.target);
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate(form, "c")) return;
    const payload = { ...basePayload(form, "kontakt: " + PAGE_ID), message: form.elements.message.value.trim() };
    submitFlow(form, $("button[type=submit]", form), payload, () => { form.reset(); store.del(key); });
  });
}

function setupOrder() {
  const dlg = $("#order-dlg"), form = $("#order-form");
  if (!dlg) return;
  let tier = "";
  setupPhone(form.elements.phone);
  form.addEventListener("input", (e) => clearErr(e.target));
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-order]"); if (!b) return;
    e.preventDefault();
    tier = b.dataset.order;
    $("#o-tier").textContent = `${PAGE.crumb || ""} · ${tier}`;
    $(".form-msg", form).className = "form-msg"; $(".form-msg", form).textContent = "";
    form.hidden = false; $("button[type=submit]", form).hidden = false;
    dlg.showModal ? dlg.showModal() : dlg.setAttribute("open", "");
    setTimeout(() => form.elements.name.focus(), 50);
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate(form, "o")) return;
    const payload = { ...basePayload(form, "tarif: " + PAGE_ID), message: `Tarif: ${tier} (${PAGE.crumb || ""})` };
    submitFlow(form, $("button[type=submit]", form), payload, () => {
      const m = $(".form-msg", form).textContent;
      form.reset(); $(".form-msg", form).textContent = m; $(".form-msg", form).className = "form-msg ok";
      setTimeout(() => dlg.open && dlg.close(), 3500);
    });
  });
}
function setupProcess() {
  const tr = $(".pc-track"); if (!tr) return;
  $$("[data-pc]").forEach((b) => b.addEventListener("click", () => {
    const c = $(".pc-c", tr); const w = c ? c.getBoundingClientRect().width + 20 : 320;
    tr.scrollBy({ left: w * Number(b.dataset.pc), behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }));
}

/* ---------- 10. INTERAKTIVLIK ---------- */
function setupHeader() {
  const header = $("#header"), dim = $("#dim");
  let megaOn = false;
  const onScroll = () => { const y = window.scrollY > 10; header.classList.toggle("scrolled", y); header.classList.toggle("top", !y && !megaOn && $("#mnav").hidden); };
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  let openId = null, hoverT;
  const close = () => { if (!openId) return; $("#" + openId).classList.remove("open"); $(`[data-mega="${openId}"]`).setAttribute("aria-expanded", "false"); dim.classList.remove("on"); openId = null; megaOn = false; onScroll(); };
  const open = (id) => { if (openId === id) return; close(); openId = id; $("#" + id).classList.add("open"); $(`[data-mega="${id}"]`).setAttribute("aria-expanded", "true"); dim.classList.add("on"); megaOn = true; onScroll(); };
  $$("[data-mega]").forEach((b) => {
    b.addEventListener("click", () => (openId === b.dataset.mega ? close() : open(b.dataset.mega)));
    if (matchMedia("(hover:hover) and (pointer:fine)").matches) b.parentElement.addEventListener("mouseenter", () => { clearTimeout(hoverT); hoverT = setTimeout(() => open(b.dataset.mega), 90); });
  });
  if (matchMedia("(hover:hover) and (pointer:fine)").matches) {
    header.addEventListener("mouseleave", () => { clearTimeout(hoverT); hoverT = setTimeout(close, 180); });
    header.addEventListener("mouseenter", () => clearTimeout(hoverT));
    $$(".nav > li > a, .logo, .h-contact, .header-cta").forEach((el) => el.addEventListener("mouseenter", () => { clearTimeout(hoverT); hoverT = setTimeout(close, 120); }));
  }
  dim.addEventListener("click", close);
  $$(".mega a").forEach((a) => a.addEventListener("click", close));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && openId) { const b = $(`[data-mega="${openId}"]`); close(); b.focus(); } });

  const burger = $("#burger"), mnav = $("#mnav");
  const setM = (on) => { mnav.hidden = !on; burger.setAttribute("aria-expanded", String(on)); burger.innerHTML = icon(on ? "x" : "menu"); burger.setAttribute("aria-label", on ? T.cta.close : T.cta.menu); document.body.style.overflow = on ? "hidden" : ""; onScroll(); };
  burger.addEventListener("click", () => setM(mnav.hidden));
  $$("a", mnav).forEach((a) => a.addEventListener("click", () => setM(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !mnav.hidden) { setM(false); burger.focus(); } });
}
function setupTimers() {
  if (!PROMO) return;
  const tick = () => {
    if (!promoActive()) { const p = $("#promo"); if (p) p.hidden = true; $$(".offer").forEach((o) => o.classList.add("no-promo")); $$(".chip-disc").forEach((c) => c.remove()); return clearInterval(iv); }
    const r = remaining();
    $$(".js-timer").forEach((t) => $$("b", t).forEach((b, n) => (b.textContent = r[n])));
    $$(".js-timer-text").forEach((t) => (t.textContent = r.join(":")));
  };
  const iv = setInterval(tick, 1000); tick();
}
function setupMisc() {
  // FAB
  const fab = $("#fab"), list = $("#fab-list");
  fab.addEventListener("click", () => { const on = list.hidden; list.hidden = !on; fab.setAttribute("aria-expanded", String(on)); });
  // Oynalar
  document.addEventListener("click", (e) => {
    const o = e.target.closest("[data-open]");
    if (o) { e.preventDefault(); const d = document.getElementById(o.dataset.open); d.showModal ? d.showModal() : d.setAttribute("open", ""); }
    const c = e.target.closest("[data-close]"); if (c) c.closest("dialog").close();
    // Tarif yoki demo tanlansa — kontakt formasiga yozib qo‘yamiz
    const t = e.target.closest("[data-tier],[data-demo]");
    if (t) {
      e.preventDefault();
      const ta = $("#c-msg");
      ta.value = t.dataset.tier ? `Tarif: ${t.dataset.tier} (${PAGE.crumb || ""})` : `Demo ko‘rmoqchiman: ${t.dataset.demo}`;
      ta.dispatchEvent(new Event("input", { bubbles: true }));
      $("#kontakt").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      setTimeout(() => $("#c-name").focus({ preventScroll: true }), 500);
    }
  });
  $$("dialog").forEach((d) => d.addEventListener("click", (e) => { if (e.target === d) d.close(); }));
}
function setupAcc() {
  $$(".acc").forEach((acc) => {
    const items = $$(".acc-i", acc);
    const act = (it) => items.forEach((x) => { const on = x === it; x.classList.toggle("on", on); $(".acc-t", x).setAttribute("aria-expanded", String(on)); });
    items.forEach((it) => {
      $(".acc-t", it).addEventListener("click", () => act(it));
      if (matchMedia("(hover:hover) and (pointer:fine)").matches) it.addEventListener("mouseenter", () => act(it));
    });
  });
}
function setupSlides() {
  const box = $(".ind-show"); if (!box) return;
  const slides = $$(".ind-slide", box), bars = $$(".ind-bars i", box);
  // Rasm yuklanmasa (internet yo‘q yoki bloklangan) — rangli fon va ikonka qoladi
  $$("img", box).forEach((img) => { const drop = () => img.remove(); if (img.complete && !img.naturalWidth) drop(); else img.addEventListener("error", drop); });
  let n = 0;
  const show = () => { slides.forEach((s, k) => s.classList.toggle("on", k === n)); bars.forEach((b, k) => { b.className = k < n ? "done" : k === n ? "cur" : ""; }); };
  show();
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  setInterval(() => { n = (n + 1) % slides.length; show(); }, 3500);
}
function setupReveal() {
  const els = $$(".reveal");
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return els.forEach((el) => el.classList.add("in"));
  const io = new IntersectionObserver((en) => en.forEach((x) => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { rootMargin: "0px 0px -6% 0px", threshold: 0.06 });
  els.forEach((el, i) => { el.style.transitionDelay = (i % 4) * 60 + "ms"; io.observe(el); });
}

/* ---------- 11. ISHGA TUSHIRISH ---------- */
(function init() {
  if (PAGE.title) document.title = PAGE.title;
  const secs = PAGE.sections.map((k) => SECTIONS[k] && SECTIONS[k]()).filter(Boolean);
  const html = `<a class="skip" href="#main">Asosiy kontentga o‘tish</a>${promoHTML()}${headerHTML()}
    <main id="main">${heroHTML()}<div class="sheet">
      ${secs.map((s, n) => `<section class="sec${n % 2 ? " sec-soft" : ""}"${s.id ? ` id="${s.id}"` : ""}><div class="container">${s.html}</div></section>`).join("")}
      ${contactHTML()}
    </div></main>${footerHTML()}`;
  document.body.insertAdjacentHTML("afterbegin", html);
  renderCalc(false);
  setupHeader(); setupTimers(); setupContact(); setupMisc(); setupAcc(); setupSlides(); setupOrder(); setupProcess(); setupPanel(); setupCases(); setupReveal();
})();
