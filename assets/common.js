// ===== بيانات عامة مشتركة =====
const TEACHER = {
    name: "محمد أحمد",
    title: "الماجيكو فى الرياضيات",
    whatsapp: "201145482121",
    grade: "الصف الأول الإعدادى - الفصل الدراسى الأول"
};

const BRANCHES = {
    numbers: {
        file: "numbers.html", name: "الأعداد والعمليات عليها", icon: "fa-calculator",
        color: "from-blue-600 to-indigo-700", unit: "الوحدة الأولى",
        groups: [
            { name: "النسبة المئوية والنسبة والتناسب", lessons: ["1-1", "1-2"] },
            { name: "مجموعات الأعداد", lessons: ["1-3"] },
            { name: "العمليات على الأعداد", lessons: ["1-4", "1-5"] }
        ]
    },
    algebra: {
        file: "algebra.html", name: "الجبر", icon: "fa-square-root-variable",
        color: "from-purple-600 to-fuchsia-700", unit: "الوحدة الثانية",
        groups: [{ name: "التعبيرات الجبرية والمعادلات", lessons: ["2-1", "2-2"] }]
    },
    statistics: {
        file: "statistics.html", name: "الإحصاء", icon: "fa-chart-pie",
        color: "from-emerald-600 to-teal-700", unit: "الوحدة الثالثة",
        groups: [{ name: "الإحصاء", lessons: ["3-1", "3-2", "3-3"] }]
    },
    geometry: {
        file: "geometry.html", name: "الهندسة والقياس", icon: "fa-shapes",
        color: "from-orange-500 to-red-600", unit: "الوحدة الرابعة",
        groups: [{ name: "الهندسة والقياس", lessons: ["4-1", "4-2", "4-3", "4-4", "4-5", "4-6"] }]
    }
};

const LESSONS = {
    "1-1": { title: "التناسب", branch: "numbers" },
    "1-2": { title: "تطبيقات النسبة والتناسب", branch: "numbers" },
    "1-3": { title: "المجموعات والعمليات عليها", branch: "numbers" },
    "1-4": { title: "العمليات على الأعداد الصحيحة", branch: "numbers" },
    "1-5": { title: "العمليات على الأعداد النسبية", branch: "numbers" },
    "2-1": { title: "التعبيرات والصيغ الرياضية", branch: "algebra" },
    "2-2": { title: "المعادلة الخطية", branch: "algebra" },
    "3-1": { title: "تنظيم البيانات", branch: "statistics" },
    "3-2": { title: "الوسط الحسابى", branch: "statistics" },
    "3-3": { title: "القطاعات الدائرية", branch: "statistics" },
    "4-1": { title: "أنواع الزوايا والعلاقات بين الزوايا", branch: "geometry" },
    "4-2": { title: "التوازى", branch: "geometry" },
    "4-3": { title: "المثلث", branch: "geometry" },
    "4-4": { title: "الأشكال الرباعية", branch: "geometry" },
    "4-5": { title: "المضلعات", branch: "geometry" },
    "4-6": { title: "الإحداثيات", branch: "geometry" }
};

// ===== تنسيق النصوص الرياضية =====
// $...$  => تعبير رياضى يُعرض من اليسار لليمين
// {a/b}  => كسر مكتوب بشكل رأسى (بسط فوق مقام)
function escapeHtml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function fracify(s) {
    return s.replace(/\{([^{}\/]+)\/([^{}]+)\}/g, '<span class="frac"><span class="num">$1</span><span class="den">$2</span></span>');
}
// كل جزء محسوب (كسر، تعبير، رمز) يُستبدل مؤقتًا برمز داخلى حتى لا يتأثر
// بعملية عزل الأرقام والرموز داخل الجمل العربية
const TK_OPEN = "", TK_CLOSE = "";
const MATH_RUN = /[0-9A-Za-z(−\-+|∠][0-9A-Za-z.,:×÷+\-−=<>≤≥≠\/()°%′″²³₁₂ \t∩∪∈∉⊂⊄φ|∠{}̄]*[0-9A-Za-z)°%′″²³₁₂φ|}̄]|[0-9A-Za-z]/g;
function fmt(raw) {
    const store = [];
    const tok = html => { store.push(html); return TK_OPEN + (store.length - 1) + TK_CLOSE; };
    let s = String(raw);
    const hasArabic = /[؀-ۿ]/.test(s.replace(/\$[^$]*\$/g, ""));
    s = escapeHtml(s).replace(/&(amp|lt|gt);/g, m => tok(m));
    s = s.replace(/\$([^$]+)\$/g, (m, inner) => tok('<span class="m" dir="ltr">' + fracify(inner) + '</span>'));
    s = s.replace(/\{([^{}\/]+)\/([^{}]+)\}/g, (m, a, b) => tok('<span class="frac"><span class="num">' + a + '</span><span class="den">' + b + '</span></span>'));
    s = s.replace(/ray\(([A-Z]{1,3})\)/g, (m, a) => tok('<span class="geo ray" dir="ltr">' + a + '</span>'))
         .replace(/line\(([A-Z]{1,3})\)/g, (m, a) => tok('<span class="geo gline" dir="ltr">' + a + '</span>'));
    if (hasArabic) s = s.replace(MATH_RUN, m => '<span class="m" dir="ltr">' + m + '</span>');
    else s = '<span class="m" dir="ltr">' + s + '</span>';
    const re = new RegExp(TK_OPEN + "(\\d+)" + TK_CLOSE, "g");
    for (let i = 0; i < 4 && re.test(s); i++) { re.lastIndex = 0; s = s.replace(re, (m, n) => store[+n]); }
    return s;
}
function plain(raw) { // نص الإجابة داخل رسائل التغذية الراجعة
    return fmt(raw);
}
