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
  return `<div class="promo" id="promo"><div class="promo-in"><span class="pct">${icon("percent")}</span><span>${esc(pctText(T.promo))}</span>
    <span class="timer js-timer" aria-label="Qolgan vaqt"><b>00</b><i>:</i><b>00</b><i>:</i><b>00</b></span></div></div>`;
}

/* ---------- 5. HERO VA KALKULYATOR ---------- */
function heroHTML() {
  const crumbs = PAGE_ID === "home" ? "" : `<nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="index.html">${esc(T.nav.home)}</a></li><li aria-current="page">${esc(PAGE.crumb)}</li></ol></nav>`;
  const pts = PAGE.points ? `<ul class="hero-points">${PAGE.points.map((p) => `<li>${icon("checkc")}<span>${esc(p)}</span></li>`).join("")}</ul>` : "";
  const ticker = TRUST.map((x) => `<span>${icon(x.icon)}${esc(x.text)}</span>`).join("");
  return `
  <section class="hero" aria-labelledby="h1">
    <div class="container">
      ${crumbs}
      <div class="hero-in">
        <div>
          <span class="badge"><b>${esc(PAGE.badge[0])}</b>${esc(PAGE.badge[1])}</span>
          <h1 id="h1">${esc(PAGE.h1)}</h1>
          <p class="hero-lead">${esc(PAGE.lead)}</p>
          ${pts}
          <div class="offer${promoActive() ? "" : " no-promo"}">
            <a class="btn btn-white" href="#kontakt">${esc(T.cta.lead)}</a>
            <p>${esc(pctText(T.heroOffer))}&nbsp;<span class="timer-inline js-timer-text">00:00:00</span></p>
          </div>
        </div>
        <div id="calc"></div>
      </div>
      <div class="trust-tick" aria-label="Kafolatlar"><div class="trust-track">${ticker}${TRUST.map((x) => `<span aria-hidden="true">${icon(x.icon)}${esc(x.text)}</span>`).join("")}</div></div>
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

/* ---------- 6. BO‘LIMLAR ---------- */
const head = (title, text, subHtml) => `<div class="sec-head reveal"><h2>${esc(title)}</h2>${subHtml ? `<p>${subHtml}</p>` : text ? `<p>${esc(text)}</p>` : ""}</div>`;
function placeholderImg(hue = 215) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='hsl(${hue},85%,58%)'/><stop offset='1' stop-color='hsl(${hue + 25},80%,38%)'/></linearGradient></defs><rect width='800' height='500' fill='url(#g)'/><rect x='70' y='60' width='660' height='400' rx='18' fill='#fff' opacity='.16'/><rect x='70' y='60' width='660' height='40' rx='18' fill='#fff' opacity='.22'/><circle cx='100' cy='80' r='6' fill='#fff' opacity='.7'/><circle cx='120' cy='80' r='6' fill='#fff' opacity='.5'/><rect x='110' y='140' width='150' height='280' rx='12' fill='#fff' opacity='.2'/><rect x='290' y='150' width='300' height='26' rx='8' fill='#fff' opacity='.92'/><rect x='290' y='196' width='390' height='12' rx='6' fill='#fff' opacity='.5'/><rect x='290' y='220' width='330' height='12' rx='6' fill='#fff' opacity='.5'/><rect x='290' y='262' width='120' height='90' rx='12' fill='#fff' opacity='.85'/><rect x='426' y='262' width='120' height='90' rx='12' fill='#fff' opacity='.55'/><rect x='562' y='262' width='120' height='90' rx='12' fill='#fff' opacity='.35'/></svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}
const SECTIONS = {
  facts: () => ({ id: "biz-haqimizda", html: head(T.sections.facts) + `<div class="acc reveal">${FACTS.map((f, n) => `
      <article class="acc-i${n === 0 ? " on" : ""}">
        <button type="button" class="acc-t" aria-expanded="${n === 0}">${esc(f.title)}</button>
        <span class="acc-ok" aria-hidden="true">${icon("check")}</span>
        <p class="acc-x">${esc(f.text)}</p>
        <span class="acc-plus" aria-hidden="true">${icon("plus")}</span>
      </article>`).join("")}</div>` }),
  services: () => ({ id: "xizmatlar", html: head(T.sections.services, T.sections.servicesText) + `<div class="svc-grid">${SERVICES.map((s) => `
      <a class="svc2 reveal" href="${esc(s.page)}">
        <span class="svc2-top">${tile(s, false, true)}<span class="svc2-price">${money(s.price)} ${CUR}dan</span><span class="circ">${icon("arrow")}</span></span>
        <h3>${esc(s.name)}</h3><p>${esc(s.text || "")}</p>
        <span class="chips">${(s.tags || []).map((t) => `<span>${esc(t)}</span>`).join("")}</span>
      </a>`).join("")}</div>` }),
  problems: () => ({ html: head(PAGE.problems.title) + `<div class="grid">${PAGE.problems.items.map((p) => `<article class="card prob reveal"><span class="tile">${icon(p.icon)}</span><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></article>`).join("")}</div>` }),
  tags: () => ({ html: head(PAGE.tags.title) + `<div class="tags reveal">${PAGE.tags.items.map((t) => `<span>${icon("checkc")}${esc(t)}</span>`).join("")}</div>` }),
  midcta: () => ({ html: `<div class="cta-band reveal">
      <div class="cta-band-tx"><h2>${esc(T.sections.midTitle)}</h2><p>${esc(T.sections.midText)}</p>
        <div class="cta-btns"><a class="btn btn-outline-w" href="#kontakt">${esc(T.cta.lead)}${icon("arrow")}</a>
        <a class="cta-chip" href="tel:${esc(S.phoneHref)}">${esc(promoActive() ? pctText(T.sections.callChip) : T.sections.callTitle + ": " + S.phone)}</a></div></div>
      <div class="cta-band-art" aria-hidden="true"><span class="spark s1"></span><span class="spark s2"></span><span class="spark s3"></span>${LOGO}</div>
    </div>` }),
  pricing: () => {
    const P = PAGE.pricing;
    return { id: "narxlar", html: head(P.title) + `<div class="tiers">${P.tiers.map((t) => `
      <article class="card tier reveal${t.popular ? " pop" : ""}">${t.popular ? `<span class="tag-pop">${esc(T.sections.popular)}</span>` : ""}
        <h3>${esc(t.name)}</h3>
        <div class="t-price">${fmt(t.price)} ${CUR}dan${t.priceTo ? `<small>${fmt(t.priceTo)} ${CUR}gacha</small>` : ""}</div>
        <span class="t-time">${icon("clock")}${esc(t.time)}</span>
        <ul>${t.features.map((f) => `<li>${icon("check")}${esc(f)}</li>`).join("")}</ul>
        <button type="button" class="btn ${t.popular ? "btn-primary" : "btn-line"}" data-tier="${esc(t.name)}">${esc(T.cta.order)}</button>
      </article>`).join("")}</div>
      <div class="price-note reveal"><div>${esc(T.sections.pricingNote)}</div>
      ${P.excludes ? `<div><h3>${esc(T.sections.excludes)}</h3><ul>${P.excludes.map((x) => `<li>${icon("x")}${esc(x)}</li>`).join("")}</ul></div>` : ""}</div>` };
  },
  compare: () => ({ id: "kafolatlar", html: head(T.sections.compare) + `<div class="cmp-wrap reveal"><table class="cmp"><thead><tr><th scope="col"><span class="sr-only">Mezon</span></th><th scope="col">${esc(T.sections.compareThem)}</th><th scope="col" class="us">${esc(T.sections.compareUs)}</th></tr></thead><tbody>
      ${COMPARE.map((r) => `<tr><td>${esc(r[0])}</td><td class="them">${icon("xc")}${esc(r[1])}</td><td class="us">${icon("checkc")}${esc(r[2])}</td></tr>`).join("")}</tbody></table></div>` }),
  process: () => ({ html: head(T.sections.process) + `<ol class="steps" style="list-style:none;padding:0;margin:0">${PAGE.process.map((p) => `<li class="card stp reveal"><h3>${esc(p[0])}</h3><p>${esc(p[1])}</p></li>`).join("")}</ol>` }),
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
      <div class="w-res"><span class="w-pos">1</span><span><small>vectorstudio.uz</small><b>Sayt yaratish — ${esc(S.brandName)}</b></span></div></div></article>`;
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
  setupHeader(); setupTimers(); setupContact(); setupMisc(); setupAcc(); setupSlides(); setupReveal();
})();
