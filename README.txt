VECTOR STUDIO SAYTI — O‘RNATISH QO‘LLANMASI
==========================================

FAYLLAR
  index.html  — bosh sahifa
  sayt.html   — Saytlar ishlab chiqish
  ilova.html  — Mobil ilovalar
  bot.html    — Telegram botlar
  crm.html    — CRM tizimlar
  assets/config.js  — BARCHA matnlar, narxlar, kontaktlar (faqat shu faylni tahrirlang)
  assets/app.js     — sayt mantiqi (tegish shart emas)
  assets/vector.css — dizayn (rang: :root dagi --brand va --hero)

TEKSHIRIB OLING (config.js)
  - Tariflar (PAGES → pricing): narx, muddat va tarkib — qoralama, o‘zingizga moslang.
  - Portfolio: img maydoniga skrinshot yo‘lini yozing, masalan "assets/img/crm.webp".
  - Email, WhatsApp, ijtimoiy tarmoqlar, rekvizitlar paydo bo‘lishi bilan SOZLAMALAR ga yozing.

1) GITHUB PAGES'GA YUKLASH
  1. github.com da yangi ommaviy repozitoriy yarating (masalan: vector-studio).
  2. Add file → Upload files: barcha fayllarni assets papkasi bilan birga yuklang → Commit.
  3. Settings → Pages → Source: Deploy from a branch, Branch: main, / (root) → Save.
  4. 1–2 daqiqadan keyin sayt manzili shu yerda chiqadi.
  5. O‘z domeningiz bo‘lsa: Settings → Pages → Custom domain. DNS'da CNAME yozuvini
     username.github.io ga yo‘naltiring, "Enforce HTTPS" ni yoqing.
  6. HTML fayllardagi canonical va og:url manzillarini haqiqiy domenga almashtiring.

2) ARIZALAR AVTOMATIK KELISHI (Google Sheets + Telegram)
  Hozir formaEndpoint bo‘sh: mijoz arizani "Telegram'da yuborish" tugmasi orqali
  @mot075 ga o‘zi yuboradi. Avtomatik qilish uchun:

  1. Google Sheets oching → Kengaytmalar → Apps Script. Quyidagini joylang:

     function doPost(e) {
       const d = JSON.parse(e.postData.contents);
       const sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
       if (sh.getLastRow() === 0) sh.appendRow(['Vaqt','Forma','Ism','Telefon','Vazifa','Tanlov','Taxminiy narx','Chegirma','Sahifa']);
       sh.appendRow([new Date(), d.form, d.name, d.phone, d.message || '', d.answers || '', d.estimate || '', d.discount || '', d.page || '']);
       const p = PropertiesService.getScriptProperties();
       const token = p.getProperty('TG_TOKEN'), chat = p.getProperty('TG_CHAT_ID');
       if (token && chat) {
         const text = 'Yangi ariza (' + d.form + ')\nIsm: ' + d.name + '\nTel: ' + d.phone +
           (d.message ? '\nVazifa: ' + d.message : '') + (d.answers ? '\nTanlov: ' + d.answers : '') +
           (d.estimate ? '\nTaxminiy: ' + d.estimate : '') + (d.discount ? '\nChegirma: ' + d.discount : '');
         UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
           method: 'post', contentType: 'application/json',
           payload: JSON.stringify({ chat_id: chat, text: text })
         });
       }
       return ContentService.createTextOutput('{"ok":true}').setMimeType(ContentService.MimeType.JSON);
     }

  2. Telegram uchun (ixtiyoriy): @BotFather'da bot yarating, tokenni oling.
     Botga /start yozing, chat ID ni @userinfobot orqali bilib oling.
     Apps Script → Loyiha sozlamalari → Script properties: TG_TOKEN va TG_CHAT_ID.
  3. Joylashtirish → Yangi joylashtirish → Veb-ilova. Bajarish: Men. Ruxsat: Hamma.
  4. Berilgan …/exec manzilini assets/config.js dagi formEndpoint ga qo‘ying.
  Bot tokeni faqat Apps Script'da turadi — saytda hech qanday maxfiy kalit yo‘q.
