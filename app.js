/* ============================================================
   غرفة التحرير — Moomken Media Center trainee tracker
   One course (Creative Copywriter Course), any number of trainees.
   Each trainee's progress lives in its own file inside one private
   GitHub Gist; the mentor sees every trainee and approves their work.
   No build step, no backend.
   ============================================================ */
(function () {
'use strict';

/* ============================================================
   1 · CONTENT
   ============================================================ */
var MANAGER_PIN = '2001';
var MANAGER_NAME = 'أيمن سالم أبوخطوة';
var MANAGER_TITLE = 'مدير المركز الإعلامي';
var WEEKS = 8;

var OD_ROOT = '/personal/a_abukhutwah_moomken_org';
var OD_FOLDER = OD_ROOT + '/Documents/Trainee Kit';
var OD_HOST = 'https://moomken-my.sharepoint.com';
function odView(f) { return OD_HOST + OD_ROOT + '/_layouts/15/onedrive.aspx?parent=' + encodeURIComponent(OD_FOLDER) + '&id=' + encodeURIComponent(OD_FOLDER + '/' + f); }
function odDown(f) { return OD_HOST + OD_ROOT + '/_layouts/15/download.aspx?SourceUrl=' + encodeURIComponent(OD_FOLDER + '/' + f); }

var KIND = { lesson: 'درس', practice: 'تمرين', project: 'تسليم', review: 'مراجعة', mission: 'خطوة', milestone: 'محطة', write: 'كتابة' };

/* weeks are counted from the day each trainee starts */
var SECTIONS = [
  { id: 'P', n: 0, pre: true, name: 'قبل أن تبدأ', en: 'Orientation', weeks: [1, 1],
    desc: 'ثلاث خطوات صغيرة قبل الدرس الأول: تعرّفٌ على الدورة، هدفٌ مكتوب، وموعدان ثابتان في الأسبوع. الكتابة عادةٌ قبل أن تكون موهبة.',
    tasks: [
      { id: 'o1', k: 'mission', w: 1, t: 'أتعرّف على خريطة الدورة في هذه الصفحة، وأحمّل دفتر التمارين (Workbook) من «حقيبة الدورة»' },
      { id: 'o2', k: 'write',   w: 1, t: 'أكتب هدفي من الدورة في سطرين: ماذا أريد أن أكتب بعد ثمانية أسابيع؟', sub: 1 },
      { id: 'o3', k: 'mission', w: 1, t: 'أحدّد موعدين ثابتين في الأسبوع للدورة — وأبلغ المشرف بهما' }
    ] },
  { id: 'S1', n: 1, name: 'الكتابة الإعلامية', en: 'Section 1 · Copywriting', weeks: [1, 2],
    desc: 'ما هي الكتابة الإعلامية اليوم؟ مواقع، وسوشيال ميديا، وتطبيقات، وحملات توعية. نتعرّف على أنواعها، ونكتشف النبرة، ونتعلّم عملية إبداعية من مرحلتين: أطلِق الأفكار… ثم روّضها.',
    tasks: [
      { id: 'a1', k: 'lesson',   w: 1, t: 'الدرس 1 · Story Time — تعرّفٌ على المدرّبة تاشا وبداية قصتي مع الكتابة' },
      { id: 'a2', k: 'practice', w: 1, t: 'تمرين «مخاوف وشكوك»: أكتب أكبر 3 مخاوف لديّ في الكتابة… ثم حلًّا عمليًا لكلٍّ منها', sub: 1 },
      { id: 'a3', k: 'lesson',   w: 1, t: 'الدرس 2 · Copywriting 101 — أنواع الكتابة الإعلامية الأكثر طلبًا' },
      { id: 'a4', k: 'practice', w: 1, t: 'تمرين «عامّ أم متخصّص؟»: صفحة عن اهتماماتي، وأيّ أنواع الكتابة يناسبني أكثر', sub: 1 },
      { id: 'a5', k: 'lesson',   w: 2, t: 'الدرس 3 · Tone & Techniques — النبرة والأساليب' },
      { id: 'a6', k: 'practice', w: 2, m: 1, t: 'تمرين «تدقيق نبرة الصوت»: أطبّق قالب Tone of Voice على صفحات ممكن — من نحن حين نكتب؟', sub: 1 },
      { id: 'a7', k: 'lesson',   w: 2, t: 'الدرس 4 · Creative Process — العملية الإبداعية: أطلِق ثم روّض' },
      { id: 'a8', k: 'review',   w: 2, t: 'جلسة ملاحظات مع المشرف على تمارين القسم الأول' }
    ] },
  { id: 'S2', n: 2, name: 'الموجز', en: 'Section 2 · Copy Brief', weeks: [3, 4],
    desc: 'عميلٌ افتراضي يطلق تطبيقًا، وثلاثة موجزات حقيقية: إعلان سوشيال ميديا، ورسالة بريد تسويقية، وعنوان رئيسي لصفحة الموقع — ثم أساسيات الظهور في محركات البحث. وفي النهاية نطبّق كل ذلك على منشور حقيقي من ممكن.',
    tasks: [
      { id: 'b1', k: 'lesson',   w: 3, t: 'الدرس 1 · Social Media Ad Copy — كتابة إعلان السوشيال ميديا' },
      { id: 'b2', k: 'practice', w: 3, t: 'الموجز 1: عنوان وكابشن لإعلان إنستغرام يمهّد لإطلاق التطبيق', sub: 1 },
      { id: 'b3', k: 'lesson',   w: 3, t: 'الدرس 2 · Digital Marketing Email — رسالة البريد التسويقية' },
      { id: 'b4', k: 'practice', w: 3, t: 'الموجز 2: سطر العنوان، ونص المعاينة، ومتن الرسالة', sub: 1 },
      { id: 'b5', k: 'lesson',   w: 4, t: 'الدرس 3 · Homepage Hero Headline — عنوان الصفحة الرئيسية' },
      { id: 'b6', k: 'practice', w: 4, t: 'الموجز 3: عنوان رئيسي وعنوان فرعي لصفحة الموقع', sub: 1 },
      { id: 'b7', k: 'lesson',   w: 4, t: 'الدرس 4 · SEO Basics — أساسيات تحسين الظهور في البحث' },
      { id: 'b8', k: 'project',  w: 4, t: 'التسليم: ملف «Copy Brief» كاملًا بالموجزات الثلاثة', sub: 1 },
      { id: 'b9', k: 'practice', w: 4, m: 1, t: 'تطبيق على ممكن: أعيد كتابة منشور حقيقي من منشورات ممكن بما تعلّمته — قبل وبعد', sub: 1 },
      { id: 'b10', k: 'review',  w: 4, t: 'جلسة نقد على الموجزات مع المشرف' }
    ] },
  { id: 'S3', n: 3, name: 'ملف الأعمال', en: 'Section 3 · Portfolio', weeks: [5, 6],
    desc: 'كل ما كتبته حتى الآن يصبح ملف أعمال: ما الذي يجعل ملفًا ما مقنعًا؟ كيف أكتب نبذتي التعريفية؟ وكيف أحكي قصة كل قطعة — المشكلة، ثم الفكرة، ثم النتيجة.',
    tasks: [
      { id: 'c1', k: 'lesson',   w: 5, t: 'الدرس 1 · What Goes Into a Copy Portfolio — ماذا يحتوي ملف الأعمال؟' },
      { id: 'c2', k: 'practice', w: 5, t: 'تمرين «الشكل والإحساس»: أجمع 3 ملفات أعمال تعجبني وأكتب ما يميّز كلًّا منها', sub: 1 },
      { id: 'c3', k: 'lesson',   w: 5, t: 'الدرس 2 · How to Pitch Yourself — كيف أقدّم نفسي' },
      { id: 'c4', k: 'practice', w: 5, t: 'تمرين «عنّي»: نبذتي التعريفية — نسخة عربية، ونسخة إنجليزية قصيرة', sub: 1 },
      { id: 'c5', k: 'lesson',   w: 6, t: 'الدرس 3 · Body-Building — أوصاف المشاريع وقالب الملف' },
      { id: 'c6', k: 'project',  w: 6, m: 1, t: 'ملف أعمالي الأول: 3 إلى 5 قطع (من موجزات الدورة ومن عملي في ممكن) مع قصة كل قطعة', sub: 1 },
      { id: 'c7', k: 'review',   w: 6, t: 'جلسة نقد على ملف الأعمال مع المشرف' }
    ] },
  { id: 'S4', n: 4, name: 'العمل الحر', en: 'Section 4 · Freelancing', weeks: [7, 8],
    desc: 'الجانب العملي من المهنة: كيف أجد العمل، وكيف أتواصل مع العملاء، وكيف أسعّر، وأكتب نطاق العمل والعقد، وأتعامل باحتراف. ثم العرض الختامي أمام فريق المركز الإعلامي.',
    tasks: [
      { id: 'd1', k: 'lesson',   w: 7, t: 'الدرس 1 · Freelance Fundamentals — أساسيات العمل الحر' },
      { id: 'd2', k: 'lesson',   w: 7, t: 'الدرس 2 · How to Pitch Clients and Get Jobs — التواصل مع العملاء' },
      { id: 'd3', k: 'practice', w: 7, t: 'رسالة تواصل (Pitch) لعميل حقيقي أو متخيَّل باستخدام قالب الدرس', sub: 1 },
      { id: 'd4', k: 'lesson',   w: 7, t: 'الدرس 3 · What’s Your Rate? — كيف أسعّر عملي' },
      { id: 'd5', k: 'lesson',   w: 8, t: 'الدرس 4 · Contracts and Boundaries — نطاق العمل والعقود والفواتير' },
      { id: 'd6', k: 'lesson',   w: 8, t: 'الدرس 5 · Dealing with Clients — التعامل مع العملاء' },
      { id: 'd7', k: 'milestone', w: 8, m: 1, t: 'العرض الختامي: أقدّم ملف أعمالي أمام فريق المركز الإعلامي (10 دقائق)' },
      { id: 'd8', k: 'write',    w: 8, t: 'صفحة الختام: ماذا تغيّر في كتابتي منذ اليوم الأول؟', sub: 1 }
    ] }
];

var KIT = [
  { f: '01-Creative-Copywriter-Workbook.pdf', t: 'دفتر تمارين الدورة', en: 'Creative Copywriter Workbook', type: 'PDF', size: '15.8 MB', main: 1, tag: 'الأهم',
    d: 'الكتاب المرافق للدروس: تمارين كل قسم، والقوالب، ومساحات للكتابة. يُحمَّل مرة واحدة ويُستخدم في كل درس.' },
  { f: '02-Passive-Voice-Cheat-Sheet.png', t: 'ورقة المبني للمجهول', en: 'Passive Voice Cheat Sheet', type: 'PNG', size: '0.2 MB', tag: 'مرجع سريع',
    d: 'مرجع سريع لتجنّب المبني للمجهول والجمل الضعيفة — يُعلَّق قرب المكتب.' },
  { f: '03-روابط-موارد-الدورة.txt', t: 'روابط موارد الدورة', en: 'Course Resources', type: 'TXT', size: '1 KB', tag: 'روابط',
    d: 'جدول موارد الدورة، والقوالب، والعروض المرفقة بالدروس — كلها في ملف واحد.' },
  { f: '04-الكتابة-لمنصات-الإعلام-الرقمي.pdf', t: 'الكتابة لمنصات الإعلام الرقمي', en: 'Al Jazeera Media Institute', type: 'PDF', size: '4.6 MB', tag: 'قراءة مرافقة',
    d: 'دليل عربي من معهد الجزيرة للإعلام: كيف تختلف الكتابة لكل منصة رقمية — رفيق القسم الثاني.' },
  { f: '05-أدوات-كتابة-القصة.pdf', t: 'أدوات كتابة القصة', en: 'Al Jazeera Media Institute', type: 'PDF', size: '1.9 MB', tag: 'قراءة مرافقة',
    d: 'صندوق أدوات السرد: البداية، والشخصية، والتفاصيل، والإيقاع — لكل نصّ يحتاج قصة.' }
];

/* the editing desk: rough drafts in the background, the clean line under the lens */
var DRAFTS = [
  ['نحن <s>نقدّم لكم</s> أفضل <s>الخدمات المميّزة</s> للجميع <s>دائمًا</s> <span class="ins">٫ لمن تحديدًا؟</span>', 'قل الشيء الواحد… <b>بأوضح طريقة.</b>'],
  ['<s>اضغط هنا</s> <s>لمعرفة المزيد عن</s> الحملة <span class="ins">لماذا يهتمّ القارئ؟</span>', 'ابدأ بسؤال القارئ، <b>لا بما تريد قوله.</b>'],
  ['<s>في الحقيقة</s> <s>من المهم أن نذكر أنّ</s> المعلومة <s>الخاطئة</s> تنتشر', 'الشائعة تركض… <b>والحقيقة تحتاج من يحملها.</b>'],
  ['<s>Click here</s> to <s>learn more about our</s> amazing <s>new</s> app', 'Say less. <b>Mean more.</b>'],
  ['عنوان: <s>مقالة عن</s> <s>أهمية</s> القراءة <s>للأطفال والكبار</s>', '<b>خمس دقائق</b> من القراءة… تكفي ليبدأ يومٌ مختلف.'],
  ['<s>نحن سعداء جدًا</s> أن نعلن <s>لكم</s> عن <s>إطلاق</s> <span class="ins">اختصر</span>', 'شيءٌ جديد يبدأ اليوم — <b>وأنت أوّل من يعرف.</b>'],
  ['Subject: <s>Newsletter #12</s> <s>October update</s> <s>Hi all</s>', 'Subject: <b>You will want to open this one.</b>'],
  ['<s>منشور توعوي</s> <s>حول</s> <s>موضوع</s> السلامة <s>المرورية</s>', 'حزام الأمان <b>ثانيتان</b>… والعمر كلّه.'],
  ['We are <s>a leading</s> <s>innovative</s> <s>synergy-driven</s> brand', 'We help <b>young Libyans</b> tell their own stories.'],
  ['<s>كل شيء</s> <s>ممكن</s> <s>إذا</s> <span class="ins">صدّقنا؟</span>', '<span class="ok">كل شيء ممكن</span> — حين نكتب بصدق.'],
  ['<s>يُرجى العلم</s> <s>بأنه</s> <s>سيتم</s> إقامة <s>ورشة</s>', 'تعال بفكرة… <b>واخرج بحملة.</b>'],
  ['<s>Our product</s> is <s>very very</s> good <s>and nice</s>', 'Good copy <b>sounds like a person.</b>']
];

var EDITS = ['جميل', 'طويل', 'يُقرأ', 'يُقنِع'];

/* ============================================================
   2 · STATE + SYNC
   ============================================================ */
var LS_CFG = 'traineeTracker.cfg', LS_DOC = 'traineeTracker.doc', LS_DOCS = 'traineeTracker.docs';
var FILE_RE = /^trainee-[a-z0-9-]+\.json$/;

var S = {
  role: null, gistId: '', token: '', file: '', view: '',
  doc: null,        /* the trainee currently on screen */
  docs: {},         /* mentor: every trainee file */
  sync: 'local', lastSync: null, open: {}, justDone: {}
};
function blankDoc() { return { name: '', gender: 'm', startAt: 0, statuses: {}, links: {}, ts: {}, updatedAt: 0 }; }

function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

function loadLocal() {
  try { var c = JSON.parse(lsGet(LS_CFG) || '{}');
    S.role = c.role || null; S.gistId = c.gistId || ''; S.token = c.token || ''; S.file = c.file || ''; S.view = c.view || '';
  } catch (e) {}
  try { S.doc = Object.assign(blankDoc(), JSON.parse(lsGet(LS_DOC) || '{}')); } catch (e) { S.doc = blankDoc(); }
  try { S.docs = JSON.parse(lsGet(LS_DOCS) || '{}') || {}; } catch (e) { S.docs = {}; }
  if (S.role === 'manager') S.doc = S.docs[S.view] ? norm(S.docs[S.view]) : null;
}
function saveCfg() {
  lsSet(LS_CFG, JSON.stringify({ role: S.role, gistId: (S.gistId || '').trim(), token: (S.token || '').trim(), file: (S.file || '').trim(), view: S.view }));
}
function saveLocal() {
  if (S.role === 'manager') lsSet(LS_DOCS, JSON.stringify(S.docs));
  else if (S.doc) lsSet(LS_DOC, JSON.stringify(S.doc));
}
function norm(d) { return Object.assign(blankDoc(), d || {}); }
function newFileId() { return 'trainee-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 6) + '.json'; }

/* per-task merge: whichever side touched a task last wins that task */
function merge(a, b) {
  a = norm(a); b = norm(b);
  var out = norm(a.updatedAt >= b.updatedAt ? a : b);
  out.statuses = {}; out.links = {}; out.ts = {};
  var ids = {};
  Object.keys(a.ts).concat(Object.keys(b.ts), Object.keys(a.statuses), Object.keys(b.statuses)).forEach(function (k) { ids[k] = 1; });
  Object.keys(ids).forEach(function (id) {
    var src = (a.ts[id] || 0) >= (b.ts[id] || 0) ? a : b;
    if (src.statuses[id]) out.statuses[id] = src.statuses[id];
    if (src.links[id]) out.links[id] = src.links[id];
    if (src.ts[id]) out.ts[id] = src.ts[id];
  });
  out.startAt = Math.min(a.startAt || Infinity, b.startAt || Infinity); if (!isFinite(out.startAt)) out.startAt = 0;
  out.updatedAt = Math.max(a.updatedAt, b.updatedAt);
  return out;
}
function same(a, b) { return JSON.stringify(a) === JSON.stringify(b); }

var pushTimer = null, pushPending = false;
function setSync(st) { S.sync = st; paintSync(); }
function headers(write) {
  var h = { Accept: 'application/vnd.github+json' };
  if (S.token) h.Authorization = 'Bearer ' + S.token.trim();
  if (write) h['Content-Type'] = 'application/json';
  return h;
}
function fetchGist() {
  return fetch('https://api.github.com/gists/' + S.gistId.trim(), { headers: headers(), cache: 'no-store' })
    .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); });
}
function readFile(f) {
  if (!f) return Promise.resolve(null);
  if (f.truncated && f.raw_url) return fetch(f.raw_url, { cache: 'no-store' }).then(function (r) { return r.json(); });
  try { return Promise.resolve(JSON.parse(f.content || '{}')); } catch (e) { return Promise.resolve(null); }
}

function pull(manual) {
  if (!S.gistId) { if (manual) setSync('local'); return Promise.resolve(); }
  setSync('syncing');
  return fetchGist().then(function (g) {
    var files = g.files || {};
    if (S.role === 'manager') {
      var names = Object.keys(files).filter(function (n) { return FILE_RE.test(n); });
      return Promise.all(names.map(function (n) { return readFile(files[n]); })).then(function (arr) {
        var docs = {};
        names.forEach(function (n, i) { if (arr[i]) docs[n] = merge(S.docs[n] || {}, arr[i]); });
        S.docs = docs;
        if (!S.docs[S.view]) S.view = Object.keys(S.docs).sort(function (x, y) { return (S.docs[y].updatedAt || 0) - (S.docs[x].updatedAt || 0); })[0] || '';
        S.doc = S.view ? S.docs[S.view] : null;
        saveCfg(); saveLocal(); render();
        S.lastSync = new Date(); setSync('ok');
      });
    }
    if (!S.file) { S.lastSync = new Date(); setSync('ok'); return; }
    return readFile(files[S.file]).then(function (remote) {
      var merged = merge(S.doc, remote || {});
      var changed = !same(merged, S.doc);
      S.doc = merged; saveLocal();
      if (changed) render();
      if (!remote || !same(norm(remote), merged)) schedulePush();
      S.lastSync = new Date(); setSync('ok');
    });
  }).catch(function () { setSync('error'); });
}
function schedulePush() {
  pushPending = true;
  if (pushTimer) clearTimeout(pushTimer);
  pushTimer = setTimeout(push, 1500);
}
function push() {
  pushPending = false;
  var file = S.role === 'manager' ? S.view : S.file;
  if (!S.gistId || !S.token || !file || !S.doc) return;
  setSync('syncing');
  /* read → merge → write, so a mentor approval and a trainee update never overwrite each other */
  fetchGist().then(function (g) { return readFile((g.files || {})[file]); }).then(function (remote) {
    var merged = merge(S.doc, remote || {});
    S.doc = merged; if (S.role === 'manager') S.docs[file] = merged; saveLocal();
    var body = { files: {} };
    body.files[file] = { content: JSON.stringify(merged, null, 2) };
    return fetch('https://api.github.com/gists/' + S.gistId.trim(), { method: 'PATCH', headers: headers(true), body: JSON.stringify(body) });
  }).then(function (r) {
    if (!r.ok) throw new Error('HTTP ' + r.status);
    S.lastSync = new Date(); setSync('ok'); render();
  }).catch(function () { setSync('error'); });
}
function touch() {
  S.doc.updatedAt = Date.now();
  if (S.role === 'manager' && S.view) S.docs[S.view] = S.doc;
  saveLocal(); render(); schedulePush();
}
function setStatus(id, st) {
  if (!S.doc) return;
  S.doc.statuses[id] = st; S.doc.ts[id] = Date.now();
  if (st === 'done') S.justDone[id] = 1;
  if (!S.doc.startAt) S.doc.startAt = Date.now();
  touch();
}
function setLink(id, url) { if (url) S.doc.links[id] = url; else delete S.doc.links[id]; S.doc.ts[id] = Date.now(); touch(); }

/* ============================================================
   3 · DERIVED
   ============================================================ */
var DAY = 864e5;
var MONTHS_AR = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
function fmtLong(d) { return d.getDate() + ' ' + MONTHS_AR[d.getMonth()]; }
function fmtNum(d) { return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear(); }
function startOf(doc) { var s = doc && doc.startAt ? new Date(doc.startAt) : new Date(); s.setHours(0, 0, 0, 0); return s; }
function weekStart(doc, w) { return new Date(startOf(doc).getTime() + (w - 1) * 7 * DAY); }
function weekEnd(doc, w) { return new Date(startOf(doc).getTime() + ((w - 1) * 7 + 6) * DAY); }
function weekOf(doc) {
  if (!doc || !doc.startAt) return 1;
  return Math.max(1, Math.floor((Date.now() - startOf(doc).getTime()) / (7 * DAY)) + 1);
}
function stat(doc, t) { return (doc && doc.statuses[t.id]) || 'todo'; }
function isLesson(t) { return t.k === 'lesson'; }

function computed(doc) {
  var out = { secs: [], done: 0, pending: 0, total: 0, lessons: 0, lessonsDone: 0, work: 0, workDone: 0 };
  SECTIONS.forEach(function (sec) {
    var d = 0, p = 0;
    sec.tasks.forEach(function (t) {
      var st = stat(doc, t);
      out.total++; if (st === 'done') { d++; out.done++; } if (st === 'pending') { p++; out.pending++; }
      if (isLesson(t)) { out.lessons++; if (st === 'done') out.lessonsDone++; }
      else if (t.k !== 'review' && t.k !== 'mission') { out.work++; if (st === 'done') out.workDone++; }
    });
    out.secs.push({ sec: sec, done: d, pending: p, total: sec.tasks.length, pct: Math.round(d / sec.tasks.length * 100), complete: d === sec.tasks.length });
  });
  out.pct = out.total ? Math.round(out.done / out.total * 100) : 0;
  var idx = out.secs.findIndex(function (x) { return !x.complete; });
  out.currentIdx = idx === -1 ? out.secs.length - 1 : idx;
  out.allDone = idx === -1;
  var last = 0; if (doc) Object.keys(doc.ts).forEach(function (k) { if (doc.statuses[k] === 'done') last = Math.max(last, doc.ts[k]); });
  out.finishedAt = last;
  return out;
}

/* Arabic gender for the trainee on screen */
function g(m, f) { return S.doc && S.doc.gender === 'f' ? f : m; }

/* ============================================================
   4 · RENDER
   ============================================================ */
var $ = function (s) { return document.querySelector(s); };
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); }
function txt(s) { return esc(s).replace(/[A-Za-z][0-9A-Za-z .,'’–·()\-:+&;?]*[0-9A-Za-z)?]/g, function (m) { return '<bdi dir="ltr">' + m + '</bdi>'; }); }
function safeUrl(u) { u = String(u || '').trim(); return /^https?:\/\//i.test(u) ? u : ''; }

var prevComplete = null;
function render() {
  var C = computed(S.doc);
  var now = C.secs.filter(function (x) { return x.complete; }).map(function (x) { return x.sec.id; });
  if (prevComplete && prevComplete.key === (S.role + S.view)) {
    now.forEach(function (id) { if (prevComplete.ids.indexOf(id) === -1) { var sec = SECTIONS.filter(function (s) { return s.id === id; })[0]; setTimeout(function () { celebrate(sec, C); }, 250); } });
  }
  prevComplete = { key: S.role + S.view, ids: now };
  renderGreet(C); renderMeter(C); renderMap(C); renderWeek(C); renderManager(C); renderChapters(C); renderCert(C);
  paintSync();
  var hint = $('.hint'); if (hint) hint.lastChild.textContent = ' ' + (S.role === 'manager' ? 'حرّك المؤشّر فوق المسوّدات في الخلفية… وشاهدها تتحوّل إلى نصّ نظيف' : g('حرّك المؤشّر فوق المسوّدات في الخلفية… وشاهدها تتحوّل إلى نصّ نظيف', 'حرّكي المؤشّر فوق المسوّدات في الخلفية… وشاهديها تتحوّل إلى نصّ نظيف'));
  S.justDone = {};
}

function paintSync() {
  var map = {
    local:   { c: '#8a96a8', t: 'حفظ محلي فقط — «إعدادات الحفظ» تفعّل المزامنة بين الأجهزة' },
    idle:    { c: '#C98A1B', t: 'جاهز للمزامنة' },
    syncing: { c: '#C98A1B', t: 'جارٍ المزامنة…' },
    ok:      { c: '#3E8E5A', t: 'متزامن' + (S.lastSync ? ' · آخر مزامنة ' + S.lastSync.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : '') },
    error:   { c: '#C0392B', t: 'تعذّرت المزامنة — راجع الـ Gist ID والتوكن' }
  };
  var m = map[S.sync] || map.local;
  var d = $('#syncDot'); if (d) { d.style.background = m.c; d.classList.toggle('pulse', S.sync === 'syncing'); }
  var t = $('#syncTxt'); if (t) t.textContent = m.t;
  var rb = $('#roleBadge');
  if (rb) rb.textContent = S.role === 'manager' ? 'المشرف' : S.role === 'trainee' ? (S.doc && S.doc.name ? S.doc.name : g('متدرّب', 'متدرّبة')) : '—';
}

function renderGreet(C) {
  var el = $('#greet'); if (!el) return;
  if (S.role === 'manager') {
    var names = Object.keys(S.docs);
    if (!names.length) { el.innerHTML = '<span class="meta">لا يوجد متدرّبون بعد — يظهر كل متدرّب هنا بعد أول مزامنة من جهازه.</span>'; return; }
    el.innerHTML = '<span class="meta">عرض تقدّم:</span><select id="viewSel">' + names.map(function (n) {
      return '<option value="' + esc(n) + '"' + (n === S.view ? ' selected' : '') + '>' + esc(S.docs[n].name || n) + '</option>';
    }).join('') + '</select><span class="meta">' + names.length + ' متدرّب/ة في البرنامج</span>';
    $('#viewSel').addEventListener('change', function (e) { selectTrainee(e.target.value); });
    return;
  }
  if (S.role !== 'trainee' || !S.doc) { el.innerHTML = ''; return; }
  var w = weekOf(S.doc);
  el.innerHTML = '<span class="hello">أهلًا، ' + esc(S.doc.name || g('زميلنا', 'زميلتنا')) + '</span>' +
    '<span class="meta">' + (S.doc.startAt ? 'الأسبوع ' + Math.min(w, WEEKS) + ' من ' + WEEKS + ' · ' + g('بدأتَ', 'بدأتِ') + ' في ' + fmtLong(new Date(S.doc.startAt)) : g('تبدأ رحلتك مع أول مهمة تُنجزها', 'تبدأ رحلتكِ مع أول مهمة تُنجزينها')) + '</span>';
}
function selectTrainee(file) {
  S.view = file; S.doc = S.docs[file] ? norm(S.docs[file]) : null; S.open = {}; saveCfg(); render();
}

function renderMeter(C) {
  var el = $('#heroMeter'); if (!el) return;
  var R = 88, L = 2 * Math.PI * R, off = L * (1 - C.pct / 100);
  el.innerHTML = '<div class="ring"><svg viewBox="0 0 200 200"><circle class="trk" cx="100" cy="100" r="' + R + '"/>' +
    '<circle class="val" cx="100" cy="100" r="' + R + '" stroke-dasharray="' + L.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '"/>' +
    '<circle class="val2" cx="100" cy="100" r="70"/></svg>' +
    '<div class="ring-mid"><div><b>' + C.pct + '%</b><span>' + (C.allDone ? 'اكتملت الدورة' : 'من الدورة معتمد') + '</span></div></div></div>' +
    '<div class="ring-stats"><span class="rs">دروس<b>' + C.lessonsDone + '/' + C.lessons + '</b></span>' +
    '<span class="rs">تمارين وتسليمات<b>' + C.workDone + '/' + C.work + '</b></span>' +
    '<span class="rs">قيد المراجعة<b>' + C.pending + '</b></span></div>';
}

function circ(pct, r) { var L = 2 * Math.PI * r; return 'stroke-dasharray="' + L.toFixed(1) + '" stroke-dashoffset="' + (L * (1 - pct / 100)).toFixed(1) + '"'; }
function renderMap(C) {
  var el = $('#map'); if (!el) return;
  el.innerHTML = C.secs.map(function (x, i) {
    var cur = !C.allDone && i === C.currentIdx;
    var wk = x.sec.weeks[0] === x.sec.weeks[1] ? 'الأسبوع ' + x.sec.weeks[0] : 'الأسبوعان ' + x.sec.weeks[0] + '–' + x.sec.weeks[1];
    return '<button class="stop' + (x.complete ? ' done' : '') + (cur ? ' current' : '') + '" data-jump="' + x.sec.id + '">' +
      (cur && S.doc ? '<span class="you">' + (S.role === 'manager' ? 'هنا الآن' : g('أنتَ هنا', 'أنتِ هنا')) + '</span>' : '') +
      '<span class="stop-c"><svg viewBox="0 0 96 96"><circle class="t" cx="48" cy="48" r="44"/><circle class="v" cx="48" cy="48" r="44" ' + circ(x.pct, 44) + '/></svg>' +
      '<span class="stop-n">' + (x.complete ? '✓' : x.sec.pre ? '0' : x.sec.n) + '</span></span>' +
      '<span class="stop-name">' + esc(x.sec.name) + '</span><span class="stop-en">' + esc(x.sec.en.replace(/^Section \d · /, '')) + '</span>' +
      '<span class="stop-wk">' + wk + ' · ' + x.done + '/' + x.total + '</span></button>';
  }).join('');
  el.querySelectorAll('[data-jump]').forEach(function (n) { n.addEventListener('click', function () { openSection(n.getAttribute('data-jump')); }); });
}

function pageIcon(st) {
  if (st === 'done') return '<svg class="t-ico" viewBox="0 0 30 30"><circle cx="15" cy="15" r="13" fill="#3E8E5A"/><path d="M9.5 15.5l3.6 3.6 7.4-8" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  if (st === 'pending') return '<svg class="t-ico" viewBox="0 0 30 30"><circle cx="15" cy="15" r="13" fill="#FBF0DA" stroke="#C98A1B" stroke-width="1.6"/><path d="M15 8v7l4 3" stroke="#C98A1B" stroke-width="2.2" fill="none" stroke-linecap="round"/></svg>';
  return '<svg class="t-ico" viewBox="0 0 30 30"><circle cx="15" cy="15" r="12" fill="#fff" stroke="#B9CBDA" stroke-width="1.6"/></svg>';
}

function renderWeek(C) {
  var el = $('#weekCard'); if (!el) return;
  if (!S.doc) { el.innerHTML = '<div class="wk-cal"><div class="w1">WEEK</div><div class="w2">1</div><div class="w3">من ' + WEEKS + '</div></div><div><div class="wk-head"><h3>ثمانية أسابيع، أربعة أقسام</h3></div><p class="wk-empty">يُحسب الأسبوع لكل متدرّب من يوم بدايته. ' + (S.role === 'manager' ? 'اختر متدرّبًا لعرض أسبوعه الحالي.' : 'اختر دورك من «تبديل» للبدء.') + '</p></div>'; return; }
  var wk = weekOf(S.doc), w = Math.min(wk, WEEKS);
  var tasks = [], late = [];
  SECTIONS.forEach(function (sec) { sec.tasks.forEach(function (t) {
    if (t.w === w) tasks.push({ t: t, sec: sec });
    else if (t.w < w && stat(S.doc, t) === 'todo') late.push({ t: t, sec: sec });
  }); });
  var li = function (x) { var st = stat(S.doc, x.t); return '<li class="' + st + '" data-jump="' + x.sec.id + '">' + pageIcon(st) + '<span>' + txt(x.t.t) + '</span></li>'; };
  var head = wk > WEEKS ? (C.allDone ? 'اكتملت الدورة — مبروك ✦' : 'انتهت الأسابيع الثمانية — بقيت خطوات قليلة') : 'مهام هذا الأسبوع';
  el.innerHTML = '<div class="wk-cal"><div class="w1">WEEK</div><div class="w2">' + w + '</div><div class="w3">من ' + WEEKS + '</div></div>' +
    '<div><div class="wk-head"><h3>' + head + '</h3><span class="rng">' + fmtLong(weekStart(S.doc, w)) + ' — ' + fmtLong(weekEnd(S.doc, w)) + '</span></div>' +
    (tasks.length ? '<ul class="wk-list">' + tasks.map(li).join('') + '</ul>' : '') +
    (late.length ? '<div class="wk-head" style="margin-top:12px"><h3 style="font-size:16px;color:var(--orange-600)">من الأسابيع الماضية (' + late.length + ')</h3></div><ul class="wk-list">' + late.slice(0, 4).map(li).join('') + '</ul>' : '') +
    '</div>';
  el.querySelectorAll('[data-jump]').forEach(function (n) { n.addEventListener('click', function () { openSection(n.getAttribute('data-jump')); }); });
}
function openSection(id) {
  S.open[id] = true; render();
  var c = document.getElementById('sec-' + id); if (c) c.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderManager(C) {
  var sec = $('#mgrSec'), el = $('#mgrPanel'); if (!sec || !el) return;
  if (S.role !== 'manager') { sec.classList.add('hidden'); return; }
  sec.classList.remove('hidden');
  var names = Object.keys(S.docs).sort(function (a, b) { return (S.docs[b].updatedAt || 0) - (S.docs[a].updatedAt || 0); });
  var rows = names.map(function (n) {
    var d = norm(S.docs[n]), c = computed(d), last = d.updatedAt ? fmtLong(new Date(d.updatedAt)) : '—';
    return '<tr class="' + (n === S.view ? 'sel' : '') + '"><td>' + esc(d.name || n) + '</td><td>' + (d.startAt ? Math.min(weekOf(d), WEEKS) + '/' + WEEKS : '—') + '</td>' +
      '<td><div class="mbar"><i style="width:' + c.pct + '%"></i></div></td><td dir="ltr" style="text-align:right">' + c.pct + '%</td>' +
      '<td><span class="pill' + (c.pending ? '' : ' zero') + '">' + c.pending + '</span></td><td>' + last + '</td>' +
      '<td><button class="btn btn-ghost-d btn-xs" data-view="' + esc(n) + '">' + (n === S.view ? 'معروض' : 'عرض') + '</button></td></tr>';
  }).join('');
  var pend = [];
  if (S.doc) SECTIONS.forEach(function (s) { s.tasks.forEach(function (t) { if (stat(S.doc, t) === 'pending') pend.push({ s: s, t: t }); }); });
  var list = pend.length ? pend.map(function (p) {
    var l = safeUrl(S.doc.links[p.t.id]);
    return '<div class="mgr-item"><span class="mi-txt">' + txt(p.t.t) + '<span class="mi-lvl">' + esc(p.s.name) + ' · الأسبوع ' + p.t.w + '</span></span>' +
      (l ? '<a class="mi-link" href="' + esc(l) + '" target="_blank" rel="noopener">📎 فتح العمل</a>' : '') +
      '<button class="btn btn-green btn-xs" data-task="' + p.t.id + '" data-to="done">اعتماد ✓</button>' +
      '<button class="btn btn-ghost-d btn-xs" data-task="' + p.t.id + '" data-to="todo">إرجاع</button></div>';
  }).join('') : '<div class="mgr-empty">لا شيء قيد المراجعة لهذا المتدرّب ✦</div>';
  el.innerHTML = '<h3>مكتب المشرف</h3><p class="mgr-lead">' + (names.length ? names.length + ' متدرّب/ة في البرنامج — كل متدرّب يظهر هنا تلقائيًا بعد أول مزامنة من جهازه.' : 'لا يوجد متدرّبون بعد. شارك رابط الصفحة مع المتدرّب مع الـ Gist ID والتوكن، وسيظهر هنا بعد أول مزامنة.') + '</p>' +
    (names.length ? '<div class="roster-wrap"><table class="roster"><thead><tr><th>المتدرّب</th><th>الأسبوع</th><th>التقدّم</th><th></th><th>للمراجعة</th><th>آخر نشاط</th><th></th></tr></thead><tbody>' + rows + '</tbody></table></div>' : '') +
    (S.doc ? '<div class="mgr-sub">بانتظار مراجعتك — ' + esc(S.doc.name || '') + '</div><div class="mgr-list">' + list + '</div>' : '');
  el.querySelectorAll('[data-view]').forEach(function (b) { b.addEventListener('click', function () { selectTrainee(b.getAttribute('data-view')); }); });
  bindTaskButtons(el);
}

function renderChapters(C) {
  var el = $('#chapters'); if (!el) return;
  el.innerHTML = C.secs.map(function (x, i) {
    var sec = x.sec, cur = !C.allDone && i === C.currentIdx;
    var open = S.open[sec.id] !== undefined ? S.open[sec.id] : cur;
    var dates = S.doc && S.doc.startAt ? fmtLong(weekStart(S.doc, sec.weeks[0])) + ' – ' + fmtLong(weekEnd(S.doc, sec.weeks[1])) : '';
    var wk = sec.weeks[0] === sec.weeks[1] ? 'الأسبوع ' + sec.weeks[0] : 'الأسبوعان ' + sec.weeks[0] + ' و' + sec.weeks[1];
    var tasks = sec.tasks.map(function (t) {
      var st = stat(S.doc, t), link = S.doc ? S.doc.links[t.id] : '', acts = '';
      if (S.role === 'trainee' && S.doc) {
        if (st === 'todo') acts = btn('orange', 'أنجزتُها', t.id, 'pending');
        else if (st === 'pending') acts = btn('ghost', 'تراجع', t.id, 'todo');
      } else if (S.role === 'manager' && S.doc) {
        if (st === 'pending') acts = btn('green', 'اعتماد ✓', t.id, 'done') + btn('ghost', 'إرجاع', t.id, 'todo');
        else if (st === 'todo') acts = btn('ghost', 'اعتماد مباشر', t.id, 'done');
        else acts = btn('ghost', 'إلغاء الاعتماد', t.id, 'pending');
      }
      var sub = '';
      if (t.sub && S.role === 'trainee' && st !== 'done') {
        sub = '<button class="t-attach" data-attach="' + t.id + '">📎 ' + (link ? 'تعديل الرابط' : 'إرفاق رابط العمل') + '</button>' +
          '<div class="t-sub" id="sub-' + t.id + '"><input type="url" dir="ltr" placeholder="https://docs.google.com/…" data-linkin="' + t.id + '" value="' + esc(link || '') + '">' +
          '<button class="btn btn-navy btn-xs" data-linksave="' + t.id + '">حفظ الرابط</button></div>';
      }
      return '<div class="task k-' + t.k + (t.m ? ' m' : '') + ' ' + st + (S.justDone[t.id] ? ' just' : '') + '">' + pageIcon(st) +
        '<div class="t-main"><div class="t-txt">' + txt(t.t) + '</div><div class="t-tags">' +
        '<span class="tag k">' + KIND[t.k] + '</span>' + (t.m ? '<span class="tag mm">تطبيق على ممكن</span>' : '') +
        '<span class="tag wk">W' + t.w + '</span>' +
        (safeUrl(link) ? '<a class="t-link" href="' + esc(safeUrl(link)) + '" target="_blank" rel="noopener">📎 العمل المرفق</a>' : '') +
        '</div>' + sub + '</div>' +
        '<div class="t-act"><span class="stamp st-' + st + '">' + (st === 'done' ? 'معتمد' : st === 'pending' ? 'قيد المراجعة' : 'لم يبدأ') + '</span>' + acts + '</div></div>';
    }).join('');
    return '<article class="ch rv' + (x.complete ? ' done' : '') + (cur ? ' current' : '') + (open ? ' open' : '') + '" id="sec-' + sec.id + '">' +
      '<header class="ch-head" data-toggle="' + sec.id + '">' +
        '<div class="ch-num"><div><small>' + (sec.pre ? 'البداية' : 'القسم') + '</small><b>' + (sec.pre ? '0' : sec.n) + '</b></div></div>' +
        '<div class="ch-titles"><div class="ch-en">' + esc(sec.en) + '</div><h3>' + esc(sec.name) + '</h3><div class="ch-meta">' + wk + (dates ? ' · ' + dates : '') + '</div></div>' +
        '<div class="ch-prog"><div class="row"><span dir="ltr">' + x.done + ' / ' + x.total + '</span><span dir="ltr">' + x.pct + '%</span></div><div class="ch-bar"><i style="width:' + x.pct + '%"></i></div></div>' +
        '<button class="ch-toggle" aria-label="فتح أو طي القسم">⌄</button>' +
      '</header><div class="ch-body"><div class="ch-inner"><p class="ch-desc">' + esc(sec.desc) + '</p><div class="tasks">' + tasks + '</div></div></div></article>';
  }).join('');

  el.querySelectorAll('[data-toggle]').forEach(function (h) {
    h.addEventListener('click', function () {
      var id = h.getAttribute('data-toggle'), card = document.getElementById('sec-' + id);
      var o = !card.classList.contains('open'); S.open[id] = o; card.classList.toggle('open', o);
    });
  });
  bindTaskButtons(el);
  el.querySelectorAll('[data-attach]').forEach(function (b) {
    b.addEventListener('click', function () { var box = document.getElementById('sub-' + b.getAttribute('data-attach')); if (box) { box.classList.toggle('on'); var i = box.querySelector('input'); if (i && box.classList.contains('on')) i.focus(); } });
  });
  el.querySelectorAll('[data-linksave]').forEach(function (b) {
    b.addEventListener('click', function () {
      var id = b.getAttribute('data-linksave'), inp = el.querySelector('[data-linkin="' + id + '"]'), u = safeUrl(inp && inp.value);
      if (inp && inp.value && !u) { toast('الرابط يجب أن يبدأ بـ https://'); return; }
      setLink(id, u); toast(u ? 'حُفظ الرابط 📎 — سيراه المشرف' : 'حُذف الرابط');
    });
  });
  observeReveals();
}
function btn(kind, label, id, to) { return '<button class="btn btn-' + kind + ' btn-sm" data-task="' + id + '" data-to="' + to + '">' + label + '</button>'; }
function bindTaskButtons(root) {
  root.querySelectorAll('[data-task]').forEach(function (b) {
    b.addEventListener('click', function (e) {
      ripple(b, e);
      var to = b.getAttribute('data-to');
      if (to === 'done') burst(b, 22);
      else if (to === 'pending' && S.role === 'trainee') { burst(b, 10); toast(g('أحسنت! المهمة الآن قيد المراجعة — بانتظار اعتماد المشرف', 'أحسنتِ! المهمة الآن قيد المراجعة — بانتظار اعتماد المشرف')); }
      setStatus(b.getAttribute('data-task'), to);
    });
  });
}

function renderKit() {
  var el = $('#kit'); if (!el) return;
  el.innerHTML = KIT.map(function (k) {
    return '<div class="kc rv' + (k.main ? ' main' : '') + '"><span class="kc-tag">' + esc(k.tag) + '</span>' +
      '<div class="kc-doc"><span>' + k.type + '</span></div>' +
      '<div style="display:flex;flex-direction:column;gap:8px;flex:1;min-width:0">' +
        '<div><div class="kc-t">' + esc(k.t) + '</div><div class="kc-meta" dir="ltr" style="text-align:right">' + esc(k.en) + ' · ' + k.type + ' · ' + k.size + '</div></div>' +
        '<div class="kc-d">' + esc(k.d) + '</div>' +
        '<div class="kc-acts"><a class="btn ' + (k.main ? 'btn-orange' : 'btn-navy') + ' btn-sm" href="' + esc(odDown(k.f)) + '" target="_blank" rel="noopener">⬇ تحميل</a>' +
        '<a class="btn ' + (k.main ? 'btn-ghost-d' : 'btn-ghost') + ' btn-sm" href="' + esc(odView(k.f)) + '" target="_blank" rel="noopener">فتح</a></div>' +
      '</div></div>';
  }).join('');
}

function certHTML(C, forPrint) {
  var d = S.doc, name = d && d.name ? d.name : (S.role === 'manager' ? 'اسم المتدرّب' : 'اسمك هنا');
  var verb = d && d.gender === 'f' ? 'قد أتمّت بنجاح' : 'قد أتمّ بنجاح';
  var date = C.allDone && C.finishedAt ? fmtNum(new Date(C.finishedAt)) : '—';
  var code = (S.role === 'manager' ? S.view : S.file || '').replace(/^trainee-|\.json$/g, '').toUpperCase() || '——';
  return '<div class="cert' + (C.allDone || forPrint ? '' : ' locked') + '"><span class="c-dot"></span>' +
    '<img src="assets/logo-cyan.png" alt="ممكن">' +
    '<div class="c-k">Moomken Media Center · Certificate of Completion</div>' +
    '<div class="c-h">شهادة إتمام</div>' +
    '<div class="c-p">يشهد المركز الإعلامي في منظمة ممكن للتوعية والإعلام بأنّ</div>' +
    '<div class="c-name">' + esc(name) + '</div>' +
    '<div class="c-p">' + verb + ' برنامج تدريب الكتابة الإعلامية</div>' +
    '<div class="c-course">Creative Copywriter Course — ilovecreatives</div>' +
    '<div class="c-p">ثمانية أسابيع من التطبيق العملي، وملف أعمال، وعرضٌ ختامي أمام فريق المركز الإعلامي.</div>' +
    '<div class="c-foot"><div><b>' + MANAGER_NAME + '</b>' + MANAGER_TITLE + '</div><div style="text-align:left"><b dir="ltr">' + date + '</b><span dir="ltr">MMC-TR · ' + esc(code) + '</span></div></div>' +
    (C.allDone || forPrint ? '' : '<div class="cert-lock"><span>🔒 تُفتح عند اعتماد آخر مهمة</span></div>') + '</div>';
}
function renderCert(C) {
  var el = $('#certWrap'); if (!el) return;
  el.innerHTML = certHTML(C) +
    '<div class="cert-side"><h3>' + (C.allDone ? 'مبروك — الشهادة جاهزة ✦' : 'في نهاية الطريق… شهادة باسم' + (S.role === 'manager' ? ' المتدرّب' : g('ك', 'كِ'))) + '</h3>' +
    '<p>' + (C.allDone ? 'اكتملت الأقسام الأربعة واعتُمدت كل المهام. الشهادة تُطبع بحجم A4 مباشرة من هنا.' : 'تُفتح الشهادة تلقائيًا حين يعتمد المشرف آخر مهمة في الدورة، وتحمل الاسم وتاريخ الإتمام.') + '</p>' +
    '<div class="cert-meter"><i style="width:' + C.pct + '%"></i></div><div class="cert-sub">' + C.done + ' من ' + C.total + ' مهمة معتمدة</div>' +
    '<button class="btn ' + (C.allDone ? 'btn-orange' : 'btn-ghost') + '" id="btnPrint"' + (C.allDone ? '' : ' disabled style="cursor:not-allowed;opacity:.6"') + '>🖨 طباعة الشهادة</button></div>';
  var pb = $('#btnPrint');
  if (pb && C.allDone) pb.addEventListener('click', function () { $('#printCert').innerHTML = certHTML(C, true); setTimeout(function () { window.print(); }, 150); });
}

/* ============================================================
   5 · THE EDITING DESK (hero)
   ============================================================ */
function buildDrafts() {
  var rough = $('#draftRough'), clean = $('#draftClean'); if (!rough || !clean) return;
  var r = '', c = '';
  for (var i = 0; i < 18; i++) {
    /* each line strings three drafts together so the desk is full edge to edge */
    var sh = ((i * 137) % 220) - 60, op = (0.75 + (i % 3) * 0.12).toFixed(2), rr = [], cc = [];
    for (var k = 0; k < 3; k++) { var p = DRAFTS[(i * 5 + k * 7) % DRAFTS.length]; rr.push(p[0]); cc.push(p[1]); }
    r += '<span class="dl" style="--sh:' + sh + 'px;--op:' + op + '">' + rr.join('<i class="sep">·</i>') + '</span>';
    c += '<span class="dl" style="--sh:' + sh + 'px;--op:1">' + cc.join('<i class="sep">·</i>') + '</span>';
  }
  rough.innerHTML = r; clean.innerHTML = c;
  var drafts = document.querySelector('.drafts');
  var lens = document.createElement('div'); lens.className = 'lens'; drafts.appendChild(lens);
  /* the rough draft is hidden exactly where the clean copy shows through */
  rough.style.webkitMaskImage = rough.style.maskImage = 'radial-gradient(circle var(--rr) at var(--mx) var(--my), transparent 0, transparent 45%, #000 100%)';

  var hero = $('#hero'), mx = 0, my = 0, tx = 0, ty = 0, hovering = false, t0 = performance.now(), visible = true;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function place(x, y) { drafts.style.setProperty('--mx', x.toFixed(1) + 'px'); drafts.style.setProperty('--my', y.toFixed(1) + 'px'); }
  hero.addEventListener('pointermove', function (e) {
    var b = drafts.getBoundingClientRect(); tx = e.clientX - b.left; ty = e.clientY - b.top;
    if (!hovering) { mx = tx; my = ty; } hovering = true; hero.classList.add('lensing');
  });
  hero.addEventListener('pointerleave', function () { hovering = false; });
  if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }).observe(hero);
  (function loop(now) {
    if (visible && !document.hidden) {
      var b = drafts.getBoundingClientRect();
      if (!hovering) { /* the lens wanders by itself, slowly, over the drafts */
        var k = (now - t0) / 1000;
        tx = b.width * (0.38 + 0.3 * Math.sin(k * 0.21)); ty = b.height * (0.5 + 0.34 * Math.sin(k * 0.33 + 1.2));
        hero.classList.add('lensing');
      }
      mx += (tx - mx) * (reduce ? 1 : 0.14); my += (ty - my) * (reduce ? 1 : 0.14);
      place(mx, my);
    }
    requestAnimationFrame(loop);
  })(t0);
}

/* the headline edits itself: draft words get struck through until the right one stays */
function startEdits() {
  var w = $('#editWord'); if (!w) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { w.textContent = EDITS[EDITS.length - 1]; w.classList.add('final'); return; }
  var i = 0;
  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function type(word) { w.textContent = ''; w.className = 'edit-word'; var j = 0; return new Promise(function (res) { (function tick() { if (j <= word.length) { w.textContent = word.slice(0, j++); setTimeout(tick, 90); } else res(); })(); }); }
  function erase() { return new Promise(function (res) { (function tick() { var s = w.textContent; if (s.length) { w.textContent = s.slice(0, -1); setTimeout(tick, 40); } else res(); })(); }); }
  (function cycle() {
    var word = EDITS[i % EDITS.length], last = i % EDITS.length === EDITS.length - 1; i++;
    type(word).then(function () { return wait(last ? 300 : 700); }).then(function () {
      if (last) { w.classList.add('final'); return wait(6500).then(function () { w.classList.remove('final'); return erase(); }); }
      w.classList.add('struck'); return wait(900).then(erase);
    }).then(function () { return wait(250); }).then(cycle);
  })();
}

/* ============================================================
   6 · DELIGHT
   ============================================================ */
var cvs = document.getElementById('confetti'), ctx = cvs.getContext('2d'), parts = [], rafId = null;
var COLORS = ['#DF643A', '#73ABDC', '#3AC0EB', '#13253B', '#D0E7F1'];
function sizeCanvas() { cvs.width = innerWidth; cvs.height = innerHeight; }
addEventListener('resize', sizeCanvas); sizeCanvas();
function burst(el, n) { var r = el.getBoundingClientRect(); spawn(r.left + r.width / 2, r.top + r.height / 2, n || 20, 1); }
function rain(n) { for (var i = 0; i < n; i++) spawn(Math.random() * innerWidth, -20 - Math.random() * innerHeight * .4, 1, .55); }
function spawn(x, y, n, p) {
  for (var i = 0; i < n; i++) parts.push({ x: x, y: y, vx: (Math.random() - .5) * 10 * p, vy: (Math.random() * -8 - 3) * p, g: .25 + Math.random() * .15, s: 3 + Math.random() * 6, ring: Math.random() < .35, col: COLORS[(Math.random() * COLORS.length) | 0] });
  if (!rafId) rafId = requestAnimationFrame(step);
}
function step() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  for (var i = parts.length - 1; i >= 0; i--) {
    var q = parts[i]; q.vy += q.g; q.vx *= .99; q.x += q.vx; q.y += q.vy;
    if (q.y > cvs.height + 30) { parts.splice(i, 1); continue; }
    ctx.beginPath(); ctx.arc(q.x, q.y, q.s, 0, 6.283);
    if (q.ring) { ctx.strokeStyle = q.col; ctx.lineWidth = 2; ctx.stroke(); } else { ctx.fillStyle = q.col; ctx.fill(); }
  }
  if (parts.length) rafId = requestAnimationFrame(step); else { rafId = null; ctx.clearRect(0, 0, cvs.width, cvs.height); }
}
function toast(msg) {
  var box = $('#toasts'); if (!box) return;
  var t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; box.appendChild(t);
  setTimeout(function () { t.classList.add('leave'); setTimeout(function () { t.remove(); }, 350); }, 4000);
}
function ripple(b, e) {
  var r = b.getBoundingClientRect(), s = document.createElement('span'), d = Math.max(r.width, r.height);
  s.className = 'ripple'; s.style.width = s.style.height = d + 'px';
  s.style.left = (e.clientX - r.left - d / 2) + 'px'; s.style.top = (e.clientY - r.top - d / 2) + 'px';
  b.appendChild(s); setTimeout(function () { s.remove(); }, 600);
}
function celebrate(sec, C) {
  rain(110);
  var last = C.allDone, v = document.createElement('div'); v.className = 'cele';
  var who = S.role === 'manager' ? (S.doc && S.doc.name ? S.doc.name : 'المتدرّب') : '';
  v.innerHTML = '<div class="cele-card"><div class="cele-c">' + (last ? '✓' : sec.pre ? '0' : sec.n) + '</div>' +
    '<h2>' + (last ? 'اكتملت الدورة! ✦' : 'اكتمل «' + esc(sec.name) + '»') + '</h2>' +
    '<p>' + (last ? (who ? 'أتمّ ' + esc(who) + ' الأقسام الأربعة — والشهادة جاهزة للطباعة.' : g('أتممتَ', 'أتممتِ') + ' الأقسام الأربعة واعتُمدت كل المهام — الشهادة جاهزة باسم' + g('ك', 'كِ') + '.') : (who ? esc(who) + ' — قسمٌ جديد اكتمل.' : 'قسمٌ آخر معتمد. ' + g('القسم التالي ينتظرك', 'القسم التالي ينتظركِ') + '.')) + '</p>' +
    '<button class="btn btn-orange" id="celeClose">' + (last ? 'إلى الشهادة' : 'متابعة') + '</button></div>';
  document.body.appendChild(v);
  function close() { v.remove(); if (last) { var c = $('#certSec'); if (c) c.scrollIntoView({ behavior: 'smooth' }); } }
  v.querySelector('#celeClose').addEventListener('click', close);
  v.addEventListener('click', function (e) { if (e.target === v) close(); });
}
var io = null;
function observeReveals() {
  if (!('IntersectionObserver' in window)) { document.querySelectorAll('.rv').forEach(function (n) { n.classList.add('in'); }); return; }
  if (!io) io = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }); }, { threshold: .06 });
  document.querySelectorAll('.rv:not(.in)').forEach(function (n) { io.observe(n); });
}

/* ============================================================
   7 · WIRING
   ============================================================ */
function showPicker(show) { var v = $('#rolePicker'); if (v) v.classList.toggle('hidden', !show); }
function fillSetup() {
  $('#inGist').value = S.gistId; $('#inToken').value = S.token; $('#inFile').value = S.file || '';
  $('#fileField').classList.toggle('hidden', S.role !== 'trainee');
  $('#setupNote').textContent = S.role === 'manager'
    ? 'أدخل الـ Gist ID والتوكن مرة واحدة على جهازك — فيظهر كل المتدرّبين في «مكتب المشرف».'
    : 'أدخل القيمتين كما وصلتا من المشرف، ثم «حفظ وربط». على جهاز ثانٍ: انسخ «رمز ملفّك» من هنا إلى الجهاز الآخر ليظهر تقدّمك نفسه.';
}

function init() {
  loadLocal();
  buildDrafts(); startEdits(); renderKit();
  if (S.gistId) S.sync = 'idle';
  fillSetup();
  showPicker(!S.role);

  var pendingGender = 'm';
  document.querySelectorAll('[data-role]').forEach(function (b) {
    b.addEventListener('click', function () {
      var r = b.getAttribute('data-role');
      $('#pinRow').classList.add('hidden'); $('#nameRow').classList.add('hidden');
      if (r === 'manager') { $('#pinRow').classList.remove('hidden'); $('#pinInput').focus(); return; }
      pendingGender = r;
      var cur = lsGet(LS_DOC) ? JSON.parse(lsGet(LS_DOC)).name : '';
      $('#nameInput').value = cur || '';
      $('#nameRow').classList.remove('hidden'); $('#nameInput').focus();
    });
  });
  function goTrainee() {
    var name = ($('#nameInput').value || '').trim();
    if (name.length < 2) { $('#nameInput').focus(); return; }
    S.role = 'trainee';
    try { S.doc = Object.assign(blankDoc(), JSON.parse(lsGet(LS_DOC) || '{}')); } catch (e) { S.doc = blankDoc(); }
    S.doc.name = name; S.doc.gender = pendingGender; S.doc.updatedAt = Date.now();
    if (!S.file) S.file = newFileId();
    saveCfg(); saveLocal(); fillSetup(); showPicker(false); render(); schedulePush();
    burst($('#nameGo'), 26);
    toast(g('أهلًا ' + name + ' — غرفة التحرير جاهزة', 'أهلًا ' + name + ' — غرفة التحرير جاهزة'));
    if (!S.gistId) setTimeout(function () { $('#setupPanel').classList.remove('hidden'); }, 900);
  }
  $('#nameGo').addEventListener('click', goTrainee);
  $('#nameInput').addEventListener('keydown', function (e) { if (e.key === 'Enter') goTrainee(); });
  function tryPin() {
    if (($('#pinInput').value || '').trim() !== MANAGER_PIN) { $('#pinErr').classList.remove('hidden'); $('#pinInput').select(); return; }
    $('#pinErr').classList.add('hidden');
    S.role = 'manager';
    try { S.docs = JSON.parse(lsGet(LS_DOCS) || '{}') || {}; } catch (e) { S.docs = {}; }
    S.doc = S.docs[S.view] ? norm(S.docs[S.view]) : null;
    saveCfg(); fillSetup(); showPicker(false); render(); pull();
  }
  $('#pinGo').addEventListener('click', tryPin);
  $('#pinInput').addEventListener('keydown', function (e) { if (e.key === 'Enter') tryPin(); });

  $('#btnSwitchRole').addEventListener('click', function () { showPicker(true); });
  $('#btnSyncNow').addEventListener('click', function () { pull(true); });
  $('#btnSetup').addEventListener('click', function () { fillSetup(); $('#setupPanel').classList.toggle('hidden'); });
  $('#btnSaveSetup').addEventListener('click', function () {
    S.gistId = $('#inGist').value.trim(); S.token = $('#inToken').value.trim();
    if (S.role === 'trainee') { var f = $('#inFile').value.trim(); if (f && FILE_RE.test(f)) S.file = f; else if (f) { toast('رمز الملف غير صحيح — يبدأ بـ trainee- وينتهي بـ .json'); return; } }
    saveCfg(); $('#setupPanel').classList.add('hidden');
    S.sync = S.gistId ? 'idle' : 'local'; toast('تم الحفظ — جارٍ الاتصال…'); pull(true);
  });

  render(); observeReveals();
  if (S.gistId) pull();
  setInterval(function () { if (S.gistId && !pushPending) pull(); }, 60000);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
