/* =====================================================================
   VECTOR STUDIO — SAYT SOZLAMALARI VA MATNLARI
   Saytdagi deyarli hamma narsa shu faylda. Dizayn: assets/vector.css,
   ishlash mantiqi: assets/app.js (odatda tegish shart emas).
   Faqat ommaviy ma’lumotlar! Bot tokeni yoki parollarni bu yerga YOZMANG.
   ===================================================================== */

/* ---------- 1. SOZLAMALAR ---------- */
const SOZLAMALAR = {
  brandName: "Vector Studio",
  phone: "+998 90 832-44-36",
  phoneHref: "+998908324436",
  email: "",                                   // keyin qo‘shiladi
  telegram: "https://t.me/mot075",
  telegramHandle: "@mot075",
  whatsapp: "",                                // hozircha yo‘q
  address: "Farg‘ona viloyati, Marg‘ilon shahri, Vatan MFY, Terak Tagi ko‘chasi, 39-uy",
  // Ish vaqti (Toshkent vaqti). days: 1=Du ... 6=Sha, 0=Ya
  work: { days: [1, 2, 3, 4, 5, 6], start: 9, end: 19, text: "Du–Sha, 9:00–19:00" },
  requisites: "",                              // YaTT/MChJ ochilgach yoziladi
  social: {},                                  // { instagram: "https://...", youtube: "https://..." }
  // Google Apps Script "Web app" manzili (…/exec). Bo‘sh bo‘lsa — ariza
  // Telegram orqali yuboriladi (mijozga tayyor matn bilan @mot075 ochiladi).
  formEndpoint: "",
  // TELEGRAM BOT ORQALI TO‘G‘RIDAN-TO‘G‘RI (formEndpoint bo‘sh bo‘lsa ishlaydi).
  // DIQQAT: token sayt kodida ochiq turadi — buning uchun FAQAT arizalar uchun alohida
  // yangi bot oching (@BotFather), asosiy botingiz tokenini bu yerga qo‘ymang.
  // chatId — arizalar keladigan chat (siz yoki guruh). Bot bilan avval /start bosing.
  telegramBot: { token: "", chatId: "" },
  // Aksiya: har bir qurilmaga birinchi kirgan paytidan boshlab 24 soat
  promo: { enabled: true, hours: 24, percent: 10 },
  storageKey: "vector-studio"
};

/* ---------- 2. UMUMIY MATNLAR (rus tiliga tarjima uchun shu obyekt) ---------- */
const TEXTS = {
  promo: "Bugun buyurtma qilsangiz, istalgan xizmatga {percent}% chegirma — taklif tugashiga",
  heroOffer: "Bugun buyurtma berganingizda {percent}% chegirma, amal qilish muddati",
  discountChip: "Saytdan ariza qoldirganda {percent}% chegirma",
  workingNow: "Hozir ishlayapmiz",
  workingLater: "{time} dan bog‘lanamiz",
  nav: { services: "Xizmatlar", industries: "Sohalar", portfolio: "Portfolio", about: "Biz haqimizda", home: "Bosh sahifa" },
  aboutMenu: [
    { icon: "user", c: ["#5B8CFF", "#2E5BFF"], title: "Biz haqimizda", text: "Kimmiz va qanday ishlaymiz", href: "index.html#biz-haqimizda" },
    { icon: "shield", c: ["#34D399", "#059669"], title: "Kafolatlar", text: "5 yil kafolat va 50/50 to‘lov", href: "index.html#kafolatlar" },
    { icon: "tag", c: ["#FBBF24", "#F59E0B"], title: "Narxlar", text: "Xizmatlar va boshlang‘ich narxlar", href: "index.html#xizmatlar" },
    { icon: "help", c: ["#A78BFA", "#7C3AED"], title: "Savol-javob", text: "Ko‘p beriladigan savollar", href: "#savollar" },
    { icon: "mail", c: ["#38BDF8", "#0284C7"], title: "Kontaktlar", text: "Telefon, Telegram va manzil", href: "#kontakt" }
  ],
  cta: { lead: "Ariza qoldirish", calc: "Narxni hisoblash", order: "Buyurtma berish", more: "Batafsil", menu: "Menyu", close: "Yopish", call: "Qo‘ng‘iroq qilish", writeTg: "Telegram’da yozish", all: "Barchasi" },
  calc: { title: "Narxni hisoblash", step: "Qadam {n}/{total}", next: "Keyingisi", back: "Orqaga", submit: "Yuborish", contactQ: "Kontaktlaringizni qoldiring", contactNote: "Ish vaqtida qo‘ng‘iroq qilib, aniq narxni aytamiz.", estimate: "Taxminiy narx", other: "Boshqa", unsure: "Hali bilmayman" },
  form: {
    name: "Ismingiz", phone: "Telefon raqam", phonePh: "00 000 00 00",
    message: "Vazifani qisqacha yozing", messagePh: "Nima qilish kerak? Muddat va byudjet bo‘lsa yozing",
    consentPre: "", consentLink: "Shaxsiy ma’lumotlarni qayta ishlashga", consentPost: " roziligimni tasdiqlayman",
    submit: "Yuborish", sending: "Yuborilmoqda…",
    success: "Rahmat! Arizangiz qabul qilindi. Tez orada sizga qo‘ng‘iroq qilamiz.",
    tgReady: "Arizangiz tayyor! Telegram’da yuboring — matn nusxalandi, chatga qo‘yib yuborsangiz bo‘ldi.",
    tgButton: "Telegram’da yuborish",
    error: "Yuborishda xatolik. Qayta urinib ko‘ring yoki qo‘ng‘iroq qiling: {phone}",
    errName: "Ismingizni kiriting (kamida 2 ta harf).",
    errPhone: "Raqam noto‘g‘ri. Namuna: 90 123 45 67",
    errConsent: "Davom etish uchun rozilik belgisini qo‘ying.",
    errChoose: "Variantlardan birini tanlang.",
    honeypot: "Bu maydonni to‘ldirmang"
  },
  sections: {
    facts: "Avval biz haqimizdagi faktlar",
    portfolioSub: "{2018}-yildan beri {7} ta tizim va dastur ishlab chiqdik",
    callChip: "Hozir qo‘ng‘iroq qiling — loyihaga {percent}% chegirma sovg‘a qilamiz.",
    whySub: "Biz bilan ishlashning beshta sababi.",
    company: "Kompaniya",
    office: "Marg‘ilondagi ofis",
    services: "Xizmatlarimiz",
    servicesText: "",
    portfolio: "Qilingan ishlar",
    portfolioText: "O‘zimiz ishlab chiqqan tizimlar — so‘rasangiz, jonli demo ko‘rsatamiz.",
    demo: "Demo so‘rash",
    open: "Ochish",
    industries: "Istalgan soha uchun yechim yaratamiz",
    industriesText: "Har bir sohaning ish jarayonini tushunamiz va tayyor yechimlardan boshlaymiz.",
    trust: "Bizga ishonishingiz mumkin",
    compare: "Oddiy studiya va Vector Studio",
    compareThem: "Ko‘p studiya va frilanserlarda",
    compareUs: "Vector Studio’da",
    process: "Qanday ishlaymiz",
    faq: "Ko‘p beriladigan savollar",
    other: "Boshqa xizmatlar",
    popular: "Ommabop",
    time: "Muddat",
    includes: "Narxga kiradi",
    excludes: "Narxga kirmaydi",
    pricingNote: "Ishga tushirgandan keyin 3 oy texnik yordam bepul. To‘lov 2 bosqichda: 50% oldindan, 50% ish topshirilgandan keyin.",
    midTitle: "Loyihangizni muhokama qilishga tayyormisiz?",
    midText: "Vazifangizni tinglaymiz va eng tejamkor yechimni taklif qilamiz.",
    callTitle: "Hoziroq qo‘ng‘iroq qiling",
    callText: "va {percent}% chegirmani oling",
    callTextNoPromo: "Bepul maslahat — majburiyatsiz",
    contactPromise: "Bepul 30 daqiqalik suhbat: murakkablik, muddat va byudjetni aytamiz — majburiyatsiz.",
    contactsTitle: "Bog‘lanish"
  },
  footer: {
    about: "Biznes uchun saytlar, mobil ilovalar, Telegram botlar va CRM tizimlari. G‘oyadan ishga tushirishgacha — belgilangan narx va 5 yil kafolat bilan.",
    services: "Xizmatlar", industries: "Sohalar", company: "Kompaniya", contacts: "Kontaktlar",
    privacy: "Maxfiylik siyosati", terms: "Foydalanish shartlari", rights: "Barcha huquqlar himoyalangan."
  },
  legal: {
    privacyTitle: "Maxfiylik siyosati",
    privacy: [
      "Sayt orqali yuborilgan ism, telefon raqami va xabar faqat siz bilan bog‘lanish va so‘rovingizni ko‘rib chiqish uchun ishlatiladi.",
      "Ma’lumotlar uchinchi shaxslarga sotilmaydi va berilmaydi, qonunda nazarda tutilgan hollar bundan mustasno.",
      "Ma’lumotlar O‘zbekiston Respublikasining “Shaxsga doir ma’lumotlar to‘g‘risida”gi Qonuni talablariga muvofiq saqlanadi.",
      "Ma’lumotlaringizni o‘chirish uchun Telegram orqali yozing: {telegram}."
    ],
    termsTitle: "Foydalanish shartlari",
    terms: [
      "Saytdagi narxlar ommaviy oferta emas va ma’lumot uchun berilgan. Yakuniy narx yozma kelishuvda belgilanadi.",
      "Kalkulyator natijasi taxminiy hisoblanadi.",
      "Aksiya chegirmasi saytga birinchi kirgan paytdan boshlab {hours} soat ichida qoldirilgan arizalarga amal qiladi.",
      "Sayt materiallaridan ruxsatsiz tijorat maqsadida foydalanish taqiqlanadi."
    ]
  }
};

/* ---------- 3. ISHONCH BANDLARI (hero ostidagi lenta) ---------- */
const TRUST = [
  { icon: "file", text: "Yozma kelishuv asosida ishlaymiz" },
  { icon: "shield", text: "5 yillik kafolat" },
  { icon: "tag", text: "Kelishilgan qat’iy narx" },
  { icon: "headset", text: "3 oy bepul qo‘llab-quvvatlash" },
  { icon: "layers", text: "2 bosqichli to‘lov: 50/50" }
];

/* ---------- 4. FAKTLAR (faqat haqiqiy raqamlar) ---------- */
const FACTS = [
  { title: "2018-yildan beri IT sohasida", text: "8 yildan ortiq amaliy dasturlash tajribasi. Saytlar, botlar, ilovalar va biznes tizimlarini o‘zimiz ishlab chiqamiz." },
  { title: "1000+ o‘quvchiga IT o‘rgatilgan", text: "Vector platformasi va o‘quv markazida dasturlashni o‘rgatganmiz. Jamoamiz — eng yaxshi shogirdlar." },
  { title: "7 ta tayyor tizim va dastur", text: "O‘quv markaz CRM, klinika dasturi, bog‘cha Mini App, do‘kon va sartaroshlar uchun ilovalar — hammasi o‘zimizniki." },
  { title: "5 yillik kafolat", text: "Har bir loyihaga yozma kafolat. Bizning aybimiz bilan chiqqan xatolar 5 yil davomida bepul tuzatiladi." }
]

/* ---------- 4b. NEGA BIZ (bosh sahifadagi "Bizga ishonsa bo‘ladi") ---------- */
const WHY = [
  { icon: "user", c: ["#5B8CFF", "#2E5BFF"], title: "To‘g‘ridan-to‘g‘ri dasturchi bilan", text: "Menejerlar zanjiri yo‘q — loyihani kim qilsa, siz o‘sha bilan gaplashasiz." },
  { icon: "shield", c: ["#34D399", "#059669"], title: "Natija uchun javobgarlik", text: "5 yillik kafolat va muddatlar yozma kelishuvda. Xatolar bizning hisobimizdan tuzatiladi." },
  { icon: "trend", c: ["#FBBF24", "#D97706"], title: "Asosiy SEO narxga kiradi", text: "Meta teglar, sitemap va analitika ishga tushirishda sozlanadi." },
  { icon: "headset", c: ["#38BDF8", "#0284C7"], title: "3 oy bepul yordam", text: "Ishga tushirgandan keyin 3 oy davomida texnik yordam bepul." },
  { icon: "key", c: ["#C084FC", "#9333EA"], title: "Hammasi sizniki", text: "Matn, narx va rasmlarni o‘zingiz tahrirlaysiz. Domen, kod va akkauntlar sizga topshiriladi." }
];

/* ---------- 5. XIZMATLAR (narxlar so‘mda) ---------- */
const SERVICES = [
  { id: "sayt", page: "sayt.html", icon: "globe", c: ["#5B8CFF", "#2E5BFF"], name: "Saytlar ishlab chiqish", menuText: "Vizitka, landing, korporativ sayt va do‘konlar", price: 1500000, priceTo: 15000000, text: "Tez yuklanadigan va Google’da topiladigan vizitka, landing, korporativ saytlar va do‘konlar.", tags: ["Landinglar", "Korporativ saytlar", "Kataloglar", "Internet-do‘konlar"], points: ["Individual dizayn", "Admin panel", "Google’da topiladigan (SEO)"] },
  { id: "ilova", page: "ilova.html", icon: "mobile", c: ["#C084FC", "#9333EA"], name: "Mobil ilovalar", menuText: "Android va iPhone uchun ilovalar", price: 3000000, priceTo: 12000000, text: "Android va iPhone uchun ilovalar yoki do‘konsiz o‘rnatiladigan web-ilovalar.", tags: ["iOS", "Android", "Web-ilova (PWA)", "Admin panel"], points: ["Android + iOS", "Admin panel", "Push-bildirishnomalar"] },
  { id: "bot", page: "bot.html", icon: "bot", c: ["#38BDF8", "#0284C7"], name: "Telegram botlar", menuText: "Ariza, savdo, to‘lov va Mini App", price: 500000, priceTo: 3500000, text: "Ariza, yozilish, savdo va to‘lov uchun Telegram botlar va Mini App’lar.", tags: ["Yozilish", "Sotuvlar", "To‘lov", "Mini App"], points: ["Telegram Mini App", "Click / Payme to‘lov", "Admin statistika"] },
  { id: "crm", page: "crm.html", icon: "crm", c: ["#34D399", "#059669"], name: "CRM tizimlar", menuText: "Mijozlar, to‘lovlar va xodimlar bitta tizimda", price: 3000000, priceTo: 20000000, text: "Kompaniyangiz jarayonlariga mos CRM — oylik obunasiz, kod va baza sizniki.", tags: ["Mijozlar", "To‘lov va qarzdorlik", "Ombor", "Telegram bot"], points: ["Obuna to‘lovisiz", "Kod va baza sizniki", "Telegram bot bilan"] }
];

/* ---------- 6. SOHALAR (link — qaysi xizmat sahifasiga olib boradi) ----------
   photo — sohalar bannerida chiqadigan rasm (Unsplash, bepul litsenziya). O‘z rasmingizni
   qo‘ymoqchi bo‘lsangiz: "assets/img/talim.jpg" kabi yozing. */
const INDUSTRIES = [
  { id: "talim", photo: "https://images.unsplash.com/photo-1758270704925-fa59d93119c1?auto=format&fit=crop&w=900&q=70", icon: "edu", c: ["#60A5FA", "#2563EB"], name: "Ta’lim", text: "O‘quv markaz CRM va onlayn kurslar", link: "crm.html" },
  { id: "bogcha", photo: "https://images.unsplash.com/photo-1761682753542-421c80ae8be2?auto=format&fit=crop&w=900&q=70", icon: "smile", c: ["#F9A8D4", "#DB2777"], name: "Bog‘chalar", text: "Bolalar, ota-onalar va to‘lovlar", link: "bot.html" },
  { id: "tibbiyot", photo: "https://images.unsplash.com/photo-1643660527071-52e37cf7c7ea?auto=format&fit=crop&w=900&q=70", icon: "health", c: ["#F87171", "#DC2626"], name: "Tibbiyot", text: "Klinika dasturi va qabulga yozilish", link: "crm.html" },
  { id: "savdo", photo: "https://images.unsplash.com/photo-1423847043837-fb9c6f1064c7?auto=format&fit=crop&w=900&q=70", icon: "cart", c: ["#C084FC", "#9333EA"], name: "Savdo va do‘konlar", text: "Ombor, kassa va internet-do‘kon", link: "sayt.html" },
  { id: "gozallik", photo: "https://images.unsplash.com/photo-1672642150228-3fcd5826ec26?auto=format&fit=crop&w=900&q=70", icon: "scissors", c: ["#FBBF24", "#D97706"], name: "Go‘zallik va sartarosh", text: "Yozilish, kassa va mijozlar", link: "bot.html" },
  { id: "restoran", photo: "https://images.unsplash.com/photo-1750124662229-47a8e16b8f14?auto=format&fit=crop&w=900&q=70", icon: "food", c: ["#FB923C", "#EA580C"], name: "Restoran va kafe", text: "Menyu, buyurtma va yetkazish boti", link: "bot.html" },
  { id: "qurilish", photo: "https://images.unsplash.com/photo-1626885930974-4b69aa21bbf9?auto=format&fit=crop&w=900&q=70", icon: "build", c: ["#94A3B8", "#475569"], name: "Qurilish", text: "Obyektlar katalogi va arizalar", link: "sayt.html" },
  { id: "xizmat", photo: "https://images.unsplash.com/photo-1727893304219-063d142ce6f3?auto=format&fit=crop&w=900&q=70", icon: "briefcase", c: ["#2DD4BF", "#0D9488"], name: "Xizmat ko‘rsatish", text: "Onlayn yozilish va eslatmalar", link: "bot.html" }
];

/* ---------- 7. PORTFOLIO (kinds — qaysi sahifalarda chiqadi) ----------
   img: "assets/img/loyiha.webp" — skrinshot qo‘shsangiz, placeholder o‘rniga chiqadi
   url: jonli havola bo‘lsa yozing, bo‘lmasa "Demo so‘rash" tugmasi chiqadi */
const PORTFOLIO = [
  { name: "O‘quv markaz CRM", tag: "CRM tizimi", text: "O‘quvchilar, guruhlar, davomat, to‘lovlar va qarzdorlar — markaz boshqaruvi bitta tizimda.", url: "", img: "assets/img/crm.jpg", kinds: ["home", "crm", "sayt"] },
  { name: "Klinika boshqaruv dasturi", tag: "Kompyuter dasturi", text: "Stomatologiya va kichik klinikalar uchun qabul jadvali, bemorlar bazasi va kassa.", url: "", img: "assets/img/klinika.jpg", kinds: ["home", "crm", "ilova"] },
  { name: "Bog‘cha Mini App", tag: "Telegram Mini App", text: "Rahbar, tarbiyachi va ota-ona uchun — davomat, to‘lov va kunlik menyu Telegram ichida.", url: "", img: "assets/img/bogcha.jpg", kinds: ["home", "bot"] },
  { name: "Kiyim do‘koni ilovasi", tag: "Web-ilova", text: "Kunlik savdo, ombor qoldig‘i va mijozlar — Android va iPhone’da ishlaydi.", url: "", img: "assets/img/kiyim.jpg", kinds: ["home", "ilova", "crm", "sayt"] },
  { name: "Usta Kassa", tag: "Sartaroshlar uchun", text: "Usta uchun kunlik tushum, naqd/karta, nasiya va mijozlar hisobi.", url: "", img: "assets/img/usta.jpg", kinds: ["home", "bot", "ilova"] },
  { name: "Vector ta’lim platformasi", tag: "Veb-platforma", text: "IT kurslar, reyting va coin do‘koni bilan onlayn o‘quv platformasi.", url: "", img: "assets/img/vector.jpg", kinds: ["home", "sayt", "ilova"] },
  { name: "O‘quv guruh Mini App", tag: "Telegram Mini App", text: "Ustoz va o‘quvchi uchun davomat, baholar va uy vazifalari Telegram ichida.", url: "", img: "assets/img/guruh.jpg", kinds: ["home", "bot"] },
  { name: "Oldi-Berdi", tag: "Mobil ilova", text: "Qarz berish va olishni yozib boradigan ilova — eslatmalar bilan.", url: "", img: "assets/img/qarz.jpg", kinds: ["home", "ilova", "sayt"] }
]

/* ---------- 8. TAQQOSLASH JADVALI ---------- */
const COMPARE = [
  ["Narx", "Ish davomida oshib borishi mumkin", "Ish boshlanishidan oldin kelishiladi va o‘zgarmaydi"],
  ["To‘lov", "Ko‘pincha 70–100% oldindan", "50% oldindan, 50% — ish topshirilgandan keyin"],
  ["Kafolat", "Og‘zaki yoki yo‘q", "5 yil — yozma kelishuvda"],
  ["Ishga tushirgandan keyin", "Har bir tuzatish pullik", "3 oy texnik yordam bepul"],
  ["Kod, domen, akkauntlar", "Ko‘pincha ijrochi nomida qoladi", "Hammasi mijozga topshiriladi"],
  ["Muloqot", "Menejer orqali, javob kechikadi", "To‘g‘ridan-to‘g‘ri dasturchi bilan"]
];

/* ---------- 9. UMUMIY SAVOL-JAVOBLAR ---------- */
const FAQ_COMMON = [
  ["Qanday boshlaymiz?", "Ariza qoldirasiz yoki Telegram’da yozasiz. 30 daqiqalik bepul suhbatda vazifani aniqlaymiz, keyin narx va muddatni yozma beramiz."],
  ["To‘lov qanday?", "2 bosqichda: 50% oldindan — ish boshlanadi, qolgan 50% — ish to‘liq bitib, siz qabul qilganingizdan keyin."],
  ["Kafolat nimani o‘z ichiga oladi?", "5 yil davomida bizning aybimiz bilan chiqqan xatolarni bepul tuzatamiz. Yangi funksiyalar alohida kelishiladi."],
  ["Kod va akkauntlar kimniki bo‘ladi?", "Sizniki. Ish tugagach kod, domen, server va barcha kirish ma’lumotlari topshiriladi."],
  ["Marg‘ilondan tashqarida ham ishlaysizmi?", "Ha. Butun O‘zbekiston bo‘ylab onlayn ishlaymiz: suhbat Telegram yoki video qo‘ng‘iroq orqali."],
  ["Ishga tushirgandan keyin nima bo‘ladi?", "3 oy texnik yordam bepul. Keyin xohlasangiz, oylik qo‘llab-quvvatlash kelishiladi."]
];

/* ---------- 10. SAHIFALAR ----------
   Har bir sahifa: hero, kalkulyator savollari va bo‘limlar ketma-ketligi.
   Tarif narxlari, muddatlar va tarkibi — QORALAMA, o‘zingizga moslang. */
const PAGES = {
  home: {
    title: "Vector Studio — saytlar, ilovalar, Telegram botlar va CRM | Marg‘ilon",
    badge: ["IT", "studiya — g‘oyadan ishga tushirishgacha"],
    h1: "Marg‘ilondagi IT-studiya: saytlar, ilovalar va CRM",
    lead: "Biznesingiz uchun sayt, mobil ilova, Telegram bot va CRM yaratamiz. Narx oldindan kelishiladi, 5 yillik kafolat, siz bilan to‘g‘ridan-to‘g‘ri dasturchi ishlaydi.",
    calc: [
      { name: "xizmat", q: "Qaysi xizmat kerak?", options: [
        { v: "sayt", label: "Sayt yaratish", price: 1500000 },
        { v: "ilova", label: "Mobil ilova", price: 3000000 },
        { v: "bot", label: "Telegram bot", price: 500000 },
        { v: "crm", label: "CRM tizim", price: 3000000 },
        { v: "bilmayman", label: "Hali bilmayman" }
      ] },
      { name: "turi", q: "Loyiha turi qanday?", dependsOn: "xizmat", map: {
        sayt: [{ v: "vizitka", label: "Vizitka sayt" }, { v: "landing", label: "Landing", price: 1000000 }, { v: "korporativ", label: "Korporativ sayt", price: 3500000 }, { v: "dokon", label: "Internet-do‘kon", price: 7500000 }, { v: "bilmayman", label: "Hali bilmayman" }],
        ilova: [{ v: "pwa", label: "Web-ilova (PWA)" }, { v: "biznes", label: "Biznes ilova", price: 3000000 }, { v: "dokon", label: "Do‘kon / yetkazib berish", price: 6000000 }, { v: "bilmayman", label: "Hali bilmayman" }],
        bot: [{ v: "oddiy", label: "Oddiy bot" }, { v: "ariza", label: "Ariza / yozilish boti", price: 700000 }, { v: "dokon", label: "Do‘kon boti", price: 1500000 }, { v: "miniapp", label: "Telegram Mini App", price: 2500000 }],
        crm: [{ v: "boshlangich", label: "1 bo‘lim (sotuv / mijozlar)" }, { v: "biznes", label: "Ombor, to‘lov, qarzdorlik", price: 5000000 }, { v: "kompaniya", label: "Butun kompaniya, filiallar", price: 12000000 }, { v: "bilmayman", label: "Hali bilmayman" }],
        _default: [{ v: "sayt", label: "Sayt" }, { v: "ilova", label: "Ilova" }, { v: "bot", label: "Bot" }, { v: "avtomat", label: "Ishni avtomatlashtirish" }]
      } },
      { name: "soha", q: "Biznesingiz qaysi sohada?", options: "INDUSTRIES" }
    ],
    sections: ["facts", "services", "portfolio", "industries", "midcta", "why", "compare", "faq"],
    faq: FAQ_COMMON,
    contactTitle: "Loyihani muhokama qilamiz"
  },

  sayt: {
    title: "Sayt yaratish xizmati — Vector Studio, Marg‘ilon",
    crumb: "Saytlar ishlab chiqish",
    service: "sayt",
    badge: ["WEB", "sayt yaratish xizmati"],
    h1: "Sayt yaratish xizmati O‘zbekistonda",
    lead: "Mijoz olib keladigan sayt: noldan dizayn, birinchi kundan SEO va 5 yillik kafolat. Narx ish boshlanishidan oldin kelishiladi.",
    points: ["Bepul suhbat va yozma smeta", "Mobilga mos va tez", "Admin panel — o‘zingiz tahrirlaysiz", "Domen va kod sizniki"],
    calc: [
      { name: "turi", q: "Qanday sayt kerak?", options: [
        { v: "vizitka", label: "Vizitka sayt", price: 1500000 }, { v: "landing", label: "Landing", price: 2500000 }, { v: "korporativ", label: "Korporativ sayt", price: 5000000 }, { v: "katalog", label: "Katalog sayt", price: 6500000 }, { v: "dokon", label: "Internet-do‘kon", price: 9000000 }, { v: "bilmayman", label: "Hali bilmayman" }
      ] },
      { name: "soha", q: "Biznesingiz qaysi sohada?", options: "INDUSTRIES" },
      { name: "holat", q: "Hozir saytingiz bormi?", options: [
        { v: "yoq", label: "Yo‘q — noldan qilamiz" }, { v: "yangi", label: "Bor — yangisi kerak" }, { v: "yaxshilash", label: "Bor — yaxshilash kerak" }
      ] }
    ],
    problems: { title: "Saytsiz mijozlarni yo‘qotasiz", items: [
      { icon: "search", title: "Qidiruvdan mijoz kelmaydi", text: "Odamlar xizmatni Google’dan qidiradi. Sayt bo‘lmasa, ular raqobatchiga boradi." },
      { icon: "insta", title: "Instagram saytni almashtirmaydi", text: "Sahifa bloklanishi mumkin, qidiruvda chiqmaydi va narx-katalogni qulay ko‘rsatmaydi." },
      { icon: "clock", title: "Eski sayt mijozni qochiradi", text: "Telefonda sekin ochiladigan yoki eskirgan sayt ishonchni pasaytiradi." },
      { icon: "handshake", title: "Hamkorlar kamroq ishonadi", text: "Jiddiy mijozlar va hamkorlar avval saytingizni tekshiradi." }
    ] },
    tags: { title: "Qanday saytlar qilamiz", items: ["Vizitka sayt", "Landing", "Korporativ sayt", "Katalog sayt", "Internet-do‘kon", "Ta’lim platformasi", "Shaxsiy kabinet", "Web-ilova (SPA)", "Startap MVP", "Redizayn", "Konstruktordan ko‘chirish", "SEO-optimizatsiya", "Qo‘llab-quvvatlash"] },
    pricing: { title: "Sayt yaratish narxi — 1,5 mln so‘mdan", tiers: [
      { name: "Vizitka sayt", price: 1500000, time: "5 ish kunidan", features: ["5 sahifagacha", "Individual dizayn", "Kontakt forma va xarita", "Mobilga moslashuv", "Asosiy SEO va analitika", "SSL sertifikat"] },
      { name: "Landing", price: 2500000, time: "7 ish kunidan", features: ["8 tagacha blok", "Arizalar Telegram’ga", "Kalkulyator yoki quiz", "Reklama piksellari", "Mobilga moslashuv", "Asosiy SEO"] },
      { name: "Korporativ sayt", price: 5000000, time: "14 ish kunidan", popular: true, features: ["10–30 sahifa", "O‘zbek va rus tilida", "Admin panel", "Blog va loyihalar", "CRM yoki bot bilan bog‘lash", "Asosiy SEO va analitika"] },
      { name: "Internet-do‘kon", price: 9000000, priceTo: 15000000, time: "21 ish kunidan", features: ["Katalog, filtr, savat", "Click / Payme to‘lov", "Buyurtmalar paneli", "Excel’dan mahsulot importi", "Promokodlar", "Telegram’ga buyurtma xabari"] }
    ], excludes: ["Domen va hosting to‘lovi (yiliga)", "Pullik reklama byudjeti", "Matn va rasmlarni noldan tayyorlash (alohida kelishiladi)"] },
    process: [
      ["Brif va smeta", "Bepul suhbat, vazifani aniqlaymiz. Narx va muddatni yozma beramiz."],
      ["Struktura va prototip", "Sahifalar xaritasi va prototip — siz tasdiqlaguningizcha."],
      ["Dizayn va dasturlash", "Sinov havolasida jarayonni ko‘rib, fikr bildirib borasiz."],
      ["Admin panel va kontent", "Matn va rasmlarni joylaymiz, panelda ishlashni o‘rgatamiz."],
      ["Test", "Telefon, planshet va kompyuterda tekshiramiz."],
      ["Ishga tushirish", "Domen, SSL, analitika. 3 oy bepul yordam boshlanadi."]
    ],
    sections: ["facts", "problems", "tags", "midcta", "pricing", "compare", "process", "portfolio", "faq", "industries", "other"],
    faq: [
      ["Sayt yaratish qancha turadi?", "Vizitka sayt 1,5 mln so‘mdan, internet-do‘kon 9 mln so‘mdan boshlanadi. Aniq narx sahifalar soni va funksiyalarga bog‘liq — bepul suhbatdan keyin yozma beramiz."],
      ["Qancha vaqtda tayyor bo‘ladi?", "Vizitka va landing — 1–2 hafta, korporativ sayt va do‘kon — 3–5 hafta. Muddat kelishuvda yoziladi."],
      ["SEO narxga kiradimi?", "Asosiy SEO kiradi: meta teglar, sitemap, tez yuklanish, Google Analytics va Search Console ulanishi."],
      ["Saytni o‘zim tahrirlay olamanmi?", "Ha. Admin panel orqali matn, narx va rasmlarni dasturchisiz o‘zgartirasiz, ishlashni o‘rgatamiz."],
      ["Dizayn yoqmasa-chi?", "Dizayn bosqichida siz tasdiqlaguningizcha tuzatamiz. Shundan keyingina dasturlashga o‘tamiz."]
    ].concat(FAQ_COMMON.slice(1, 4)),
    contactTitle: "Sayt buyurtma qilish"
  },

  ilova: {
    title: "Mobil ilova yaratish xizmati — Vector Studio",
    crumb: "Mobil ilovalar",
    service: "ilova",
    badge: ["APP", "mobil ilova yaratish"],
    h1: "Mobil ilova yaratish xizmati",
    lead: "Android va iPhone uchun ilova yoki do‘konsiz o‘rnatiladigan web-ilova. Narx oldindan kelishiladi, kod va akkauntlar sizniki, 5 yillik kafolat.",
    points: ["Bepul suhbat va yozma smeta", "Android va iOS — bitta kod bazasi", "Admin panel bilan", "Akkauntlar sizning nomingizda"],
    calc: [
      { name: "platforma", q: "Qaysi platformalar kerak?", options: [
        { v: "ikkalasi", label: "iOS va Android" }, { v: "android", label: "Faqat Android" }, { v: "ios", label: "Faqat iOS" }, { v: "pwa", label: "Web-ilova (do‘konsiz)" }, { v: "bilmayman", label: "Hali bilmayman" }
      ] },
      { name: "turi", q: "Ilova turi qanday?", options: [
        { v: "biznes", label: "Biznes / xodimlar uchun", price: 6000000 }, { v: "dokon", label: "Do‘kon", price: 9000000 }, { v: "yetkazish", label: "Yetkazib berish", price: 9000000 }, { v: "bron", label: "Yozilish / bron", price: 6000000 }, { v: "mvp", label: "Startap MVP", price: 3000000 }, { v: "boshqa", label: "Boshqa" }
      ] },
      { name: "holat", q: "Dizayn va texnik topshiriq bormi?", options: [
        { v: "tayyor", label: "Dizayn va TZ tayyor" }, { v: "tz", label: "TZ bor, dizayn kerak" }, { v: "goya", label: "Faqat g‘oya bor" }
      ] }
    ],
    problems: { title: "Ilovasiz mijozlar qaytib kelmaydi", items: [
      { icon: "search", title: "Mijoz har safar qayta qidiradi", text: "Telefonda ilovangiz bo‘lsa, mijoz bir bosishda buyurtma beradi." },
      { icon: "phone", title: "Buyurtmalar telefonda yo‘qoladi", text: "Qo‘ng‘iroq va xabarlar orqali kelgan buyurtmalar chalkashib ketadi." },
      { icon: "bell", title: "Mijozga eslatib bo‘lmaydi", text: "Push-xabar orqali aksiya va yangiliklarni bevosita yetkazasiz." },
      { icon: "star", title: "Sadoqat dasturi yo‘q", text: "Bonus va keshbek mijozni qayta-qayta qaytaradi." }
    ] },
    tags: { title: "Qanday ilovalar qilamiz", items: ["Internet-do‘kon", "Yetkazib berish", "Yozilish va bron", "Sadoqat dasturi", "Restoran ilovasi", "Ta’lim ilovasi", "Xodimlar uchun ilova", "Ombor va savdo hisobi", "Startap MVP", "Web-ilova (PWA)", "Dizayn ishlab chiqish", "Qo‘llab-quvvatlash"] },
    pricing: { title: "Ilova narxi — 3 mln so‘mdan", tiers: [
      { name: "Web-ilova / MVP", price: 3000000, time: "14 ish kunidan", features: ["5–7 ekran", "Telefonga o‘rnatiladi", "Oflayn rejim", "Telefon raqami orqali kirish", "Analitika", "Asosiy funksiyalar"] },
      { name: "Biznes ilova", price: 6000000, time: "21 ish kunidan", popular: true, features: ["Android + iOS", "Admin panel", "Rollar va shaxsiy kabinet", "Push-bildirishnomalar", "Excel’ga eksport", "O‘zbek va rus tilida"] },
      { name: "Do‘kon va yetkazish", price: 9000000, priceTo: 12000000, time: "30 ish kunidan", features: ["Katalog va savat", "Click / Payme to‘lov", "Kuryer ekrani", "Xarita va manzil", "Buyurtmalar paneli", "Do‘konlarga joylash"] }
    ], excludes: ["Google Play / App Store akkaunt to‘lovi", "Server (hosting) to‘lovi", "To‘lov tizimlari komissiyasi"] },
    process: [
      ["Brif va smeta", "Bitta onlayn suhbat, keyin qat’iy narx va muddat yozma."],
      ["Dizayn", "Ekranlar va bosiladigan prototip — siz tasdiqlaysiz."],
      ["Dasturlash", "Android va iOS uchun bitta kod. Har hafta jonli demo."],
      ["Test", "Haqiqiy telefonlarda sinab chiqamiz."],
      ["Joylash va yordam", "Do‘konlarga joylaymiz, 3 oy bepul yordam."]
    ],
    sections: ["facts", "problems", "tags", "midcta", "pricing", "compare", "process", "portfolio", "faq", "industries", "other"],
    faq: [
      ["Ilova qancha turadi?", "Web-ilova va MVP 3 mln so‘mdan, do‘kon va yetkazish ilovasi 9 mln so‘mdan. Aniq narx ekranlar va funksiyalar soniga bog‘liq."],
      ["Web-ilova bilan oddiy ilovaning farqi nima?", "Web-ilova do‘konsiz, havola orqali telefonga o‘rnatiladi va arzonroq. Oddiy ilova Google Play va App Store’da bo‘ladi."],
      ["Ilovani do‘konlarga kim joylaydi?", "Biz joylaymiz. Akkaunt sizning nomingizda ochiladi — ilova to‘liq sizniki bo‘ladi."],
      ["Jarayonni qanday kuzataman?", "Umumiy Telegram chat va haftalik demo orqali — har bosqichni o‘zingiz ko‘rasiz."]
    ].concat(FAQ_COMMON.slice(1, 4)),
    contactTitle: "Ilova buyurtma qilish"
  },

  bot: {
    title: "Telegram bot yaratish — Vector Studio, Marg‘ilon",
    crumb: "Telegram botlar",
    service: "bot",
    badge: ["BOT", "Telegram bot yaratish"],
    h1: "Telegram bot yaratish xizmati",
    lead: "Bot tunda ham ariza va yozilishlarni qabul qiladi, Click/Payme orqali sotadi va mijozlarga javob beradi. Narx oldindan kelishiladi, 5 yillik kafolat.",
    points: ["Oddiy bot — 500 ming so‘mdan", "Telegram Mini App", "Click / Payme to‘lov", "Bot tokeni va kod sizniki"],
    calc: [
      { name: "turi", q: "Qanday bot kerak?", options: [
        { v: "oddiy", label: "Oddiy bot (menyu, ariza)", price: 500000 }, { v: "ariza", label: "Yozilish / ariza boti", price: 1200000 }, { v: "dokon", label: "Do‘kon boti", price: 2000000 }, { v: "miniapp", label: "Telegram Mini App", price: 3000000 }, { v: "bilmayman", label: "Hali bilmayman" }
      ] },
      { name: "soha", q: "Biznesingiz qaysi sohada?", options: "INDUSTRIES" },
      { name: "tolov", q: "Bot ichida to‘lov kerakmi?", options: [
        { v: "ha", label: "Ha — Click / Payme" }, { v: "yoq", label: "Yo‘q, kerak emas" }, { v: "bilmayman", label: "Hali bilmayman" }
      ] }
    ],
    problems: { title: "Botsiz arizalar yo‘qoladi", items: [
      { icon: "moon", title: "Tunda kelgan ariza javobsiz", text: "Bot 24/7 ishlaydi: ariza qabul qiladi, yozadi va sizga xabar beradi." },
      { icon: "chat", title: "Admin bir xil savolga javob beradi", text: "Narx, manzil, ish vaqti — bot o‘zi javob beradi." },
      { icon: "card", title: "To‘lovni qo‘lda tekshirish", text: "Click/Payme orqali to‘lov bot ichida avtomatik tasdiqlanadi." },
      { icon: "users", title: "Mijozlar bazasi yo‘q", text: "Bot har bir mijozni saqlaydi — keyin xabar tarqatish mumkin." }
    ] },
    tags: { title: "Qanday botlar qilamiz", items: ["Ariza boti", "Qabulga yozilish", "Do‘kon boti", "Yetkazib berish", "Telegram Mini App", "O‘quv markaz boti", "Bog‘cha boti", "Sartaroshxona boti", "Xabar tarqatish", "Google Sheets bilan bog‘lash", "CRM bilan bog‘lash", "Admin panel"] },
    pricing: { title: "Telegram bot narxi — 500 ming so‘mdan", tiers: [
      { name: "Oddiy bot", price: 500000, time: "3 ish kunidan", features: ["Menyu va tugmalar", "Ariza qabul qilish", "Arizalar guruh yoki Sheets’ga", "O‘zbek va rus tilida"] },
      { name: "Yozilish boti", price: 1200000, time: "5 ish kunidan", features: ["Xizmat va vaqt tanlash", "Eslatma xabarlari", "Admin uchun jadval", "Mijozlar bazasi", "Xabar tarqatish"] },
      { name: "Do‘kon boti", price: 2000000, time: "10 ish kunidan", popular: true, features: ["Katalog va savat", "Click / Payme to‘lov", "Yetkazib berish manzili", "Buyurtmalar paneli", "Statistika"] },
      { name: "Telegram Mini App", price: 3000000, priceTo: 3500000, time: "15 ish kunidan", features: ["Ilovadek interfeys", "Shaxsiy kabinet", "Bonuslar", "Admin panel", "O‘rnatishsiz ishlaydi"] }
    ], excludes: ["Server (hosting) to‘lovi", "To‘lov tizimlari komissiyasi"] },
    process: [
      ["Brif va ssenariy", "Botning ish sxemasini chizamiz, narx va muddat yozma."],
      ["Prototip", "Test bot yoki Mini App ekranlari."],
      ["Dasturlash", "Har 3–5 kunda natijani ko‘rsatib boramiz."],
      ["To‘ldirish", "Katalog, matnlar va admin panelni sozlaymiz."],
      ["Test", "Barcha tugma va ssenariylarni tekshiramiz."],
      ["Ishga tushirish", "Server va tokenni topshiramiz, 3 oy bepul yordam."]
    ],
    sections: ["facts", "problems", "tags", "midcta", "pricing", "compare", "process", "portfolio", "faq", "industries", "other"],
    faq: [
      ["Telegram bot qancha turadi?", "Oddiy bot 500 ming so‘mdan, do‘kon boti 2 mln so‘mdan, Mini App 3 mln so‘mdan. Aniq narx ssenariyga bog‘liq."],
      ["Bot va Mini App farqi nima?", "Bot — tugma va xabarlar orqali ishlaydi. Mini App — Telegram ichida ochiladigan to‘liq ilova ko‘rinishidagi interfeys."],
      ["Bot ichida to‘lov qilsa bo‘ladimi?", "Ha, Click va Payme orqali. To‘lov tizimi bilan shartnoma sizning nomingizda bo‘ladi."],
      ["Server uchun qancha to‘layman?", "Oddiy botlar uchun server oyiga arzon. Aniq summani loyihaga qarab aytamiz."],
      ["Bot kimniki bo‘ladi?", "Sizniki: bot tokeni, server va kod topshiriladi."]
    ].concat(FAQ_COMMON.slice(1, 3)),
    contactTitle: "Telegram bot buyurtma qilish"
  },

  crm: {
    title: "CRM tizim yaratish — Vector Studio",
    crumb: "CRM tizimlar",
    service: "crm",
    badge: ["CRM", "biznesingiz uchun"],
    h1: "Biznesingiz uchun CRM yaratamiz",
    lead: "Shablonsiz, sizning qoidalaringiz bo‘yicha. Oylik obuna va har bir xodim uchun to‘lov yo‘q — tizim, kod va baza sizniki.",
    points: ["Ish jarayonini bepul tahlil qilamiz", "Prototip narxga kiradi", "Excel’dan ma’lumot ko‘chirish", "5 yillik kafolat"],
    calc: [
      { name: "xodim", q: "Tizimda nechta xodim ishlaydi?", options: [
        { v: "1-5", label: "1–5 xodim" }, { v: "6-20", label: "6–20 xodim", price: 2000000 }, { v: "21-50", label: "21–50 xodim", price: 5000000 }, { v: "50+", label: "50 dan ortiq", price: 9000000 }
      ] },
      { name: "soha", q: "Biznesingiz qaysi sohada?", options: "INDUSTRIES" },
      { name: "hozir", q: "Hozir hisobni nimada yuritasiz?", options: [
        { v: "excel", label: "Excel yoki daftar" }, { v: "tayyor", label: "amoCRM / Bitrix24" }, { v: "boshqa", label: "Boshqa dastur" }, { v: "hech", label: "Hech narsada" }
      ] }
    ],
    calcBase: 3000000,
    problems: { title: "Tayyor CRM ko‘pincha mos kelmaydi", items: [
      { icon: "file", title: "Mijozlar Excel va daftarda", text: "Ma’lumot yo‘qoladi, kim qachon qo‘ng‘iroq qilgani ko‘rinmaydi." },
      { icon: "card", title: "Qarzdorlikni kuzatish qiyin", text: "Kim qancha to‘lagani va qarzi bir qarashda ko‘rinmaydi." },
      { icon: "trend", title: "Obuna har yili qimmatlashadi", text: "Tayyor CRM’larda har bir xodim uchun oylik to‘lov." },
      { icon: "layers", title: "Jarayoningizga mos emas", text: "Shablon voronka sizning bosqichlaringizni hisobga olmaydi." }
    ] },
    tags: { title: "CRM ichida nima bo‘ladi", items: ["Mijozlar bazasi", "Bitimlar voronkasi", "To‘lov va qarzdorlik", "Ombor qoldig‘i", "Xodimlar va rollar", "Hisobotlar", "Telegram bot", "Click / Payme", "Excel’dan import", "SMS va eslatmalar", "Filiallar", "Hujjat shablonlari"] },
    pricing: { title: "CRM narxi — 3 mln so‘mdan, bir martalik", tiers: [
      { name: "Boshlang‘ich", price: 3000000, time: "10 ish kunidan", features: ["Bitta bo‘lim", "Mijozlar va arizalar", "To‘lovlar", "Oddiy hisobot", "Excel’dan import"] },
      { name: "Biznes", price: 8000000, time: "20 ish kunidan", popular: true, features: ["Ombor va qarzdorlik", "Rollar: rahbar, menejer, kassir", "Telegram bot", "Hujjat shablonlari", "Kengaytirilgan hisobotlar"] },
      { name: "Butun kompaniya", price: 15000000, priceTo: 20000000, time: "30 ish kunidan", features: ["Filiallar", "Ishlab chiqarish / yetkazish", "Telefondan ishlash", "Integratsiyalar (API)", "Xodimlarni o‘qitish"] }
    ], excludes: ["Server (hosting) to‘lovi", "SMS va telefoniya xizmatlari to‘lovi"] },
    process: [
      ["Bepul tahlil", "Ish jarayoningizni o‘rganamiz va bosqichlarni chizamiz."],
      ["Prototip", "Ekranlarni ko‘rsatamiz — siz tasdiqlaysiz."],
      ["Birinchi versiya", "Asosiy bo‘limlar ishga tushadi."],
      ["Ma’lumot ko‘chirish", "Excel yoki eski tizimdan bazani ko‘chiramiz."],
      ["O‘qitish", "Xodimlarga tizimda ishlashni o‘rgatamiz."],
      ["Yordam va rivojlantirish", "3 oy bepul yordam, keyin xohishga ko‘ra."]
    ],
    sections: ["facts", "problems", "tags", "midcta", "pricing", "compare", "process", "portfolio", "faq", "industries", "other"],
    faq: [
      ["CRM nima va menga kerakmi?", "CRM — mijozlar, sotuv va to‘lovlarni bir joyda yuritadigan tizim. Agar mijozlar Excel yoki daftarda bo‘lsa — kerak."],
      ["CRM qancha turadi?", "Boshlang‘ich versiya 3 mln so‘mdan, bir martalik to‘lov. Oylik obuna va har bir xodim uchun to‘lov yo‘q."],
      ["Kichik biznesga mos keladimi?", "Ha. 1–5 xodimli biznes uchun ham soddalashtirilgan versiya qilamiz."],
      ["Eski ma’lumotlarni ko‘chira olasizmi?", "Ha, Excel, Google Sheets yoki boshqa tizimdan."],
      ["Ma’lumotlar qayerda saqlanadi?", "Siz tanlagan serverda. Baza va kod sizga topshiriladi."]
    ].concat(FAQ_COMMON.slice(1, 3)),
    contactTitle: "CRM buyurtma qilish"
  }
};
