import React, { useState } from "react";
import {
  BookOpen,
  GraduationCap,
  MessageCircle,
  ClipboardCheck,
  PenLine,
  CalendarCheck,
  ChevronRight,
  Star,
  Menu,
  X,
  Check,
  Clock,
  Award,
  Heart,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

// ---------- 联系方式 ----------
const CONTACT = {
  email: "mkea51658@gmail.com",
  wechatId: "fksyo-jp",
  wechatQR: "",
};

// ---------- 数据 ----------
const courses = [
  {
    id: "beginner",
    icon: BookOpen,
    title: "零基础入门课",
    tag: "适合第一次学日语",
    desc: "从五十音、基础发音、简单会话开始，帮助学习者建立日语学习基础。",
    points: ["五十音与发音", "基础词汇与句型", "入门会话练习", "学习计划建议"],
    theme: "rose",
    kana: "あいうえお",
    audience: "完全没接触过日语、想从零开始系统学习的人；想了解日语和中文的区别，建立正确发音习惯的初学者。",
    duration: "建议每周 2-3 小时，3-6 个月可达到 N5 水平。",
    outline: [
      "第 1-2 周：平假名、片假名（五十音）",
      "第 3-4 周：基础发音规则、长音促音、声调",
      "第 5-8 周：基础语法、自我介绍、问候用语",
      "第 9-12 周：日常生活场景对话、数字时间表达",
      "之后：稳步扩充词汇与句型，过渡到 N5 水平",
    ],
  },
  {
    id: "jlpt",
    icon: ClipboardCheck,
    title: "JLPT 能力考训练",
    tag: "N5 / N4 / N3 / N2",
    desc: "针对能力考试进行词汇、语法、阅读、听力和题海训练，适合想在中国备考的学习者。",
    points: ["阶段测试", "题海训练", "错题整理", "考前冲刺"],
    theme: "red",
    kana: "合格",
    audience: "准备参加 JLPT N5 到 N2 能力考的学习者；想要短时间内提升应试能力、获得证书的人。",
    duration: "考前 3-6 个月开始系统训练，每周 3-4 小时；考前 1 个月可增加到每周 5 小时以上。",
    outline: [
      "阶段一：水平诊断，确定备考目标级别",
      "阶段二：分模块训练（词汇、语法、阅读、听力）",
      "阶段三：真题与模拟题训练，错题整理",
      "阶段四：考前冲刺，限时模考",
      "考后：根据考试反馈规划下一阶段学习",
    ],
  },
  {
    id: "study-japan",
    icon: GraduationCap,
    title: "日本留学准备课",
    tag: "留学前准备",
    desc: "面向计划赴日留学的人群，学习入学、生活、打工、沟通等常见场景表达。",
    points: ["学校沟通", "生活场景日语", "面试与自我介绍", "赴日前学习规划"],
    theme: "amber",
    kana: "留学",
    audience: "计划赴日就读语言学校、大学、大学院或专门学校的人;想提前适应日本生活、了解打工沟通的留学预备生。",
    duration: "出国前 6 个月开始为佳，每周 2-3 小时，重点放在场景表达和文化习惯上。",
    outline: [
      "学校相关：申请咨询、入学手续、与学校事务局沟通",
      "生活场景：租房、办手机卡、银行、医院、便利店",
      "打工场景：面接（面试）、自我介绍、与店长同事沟通",
      "文化与礼仪：日本社交礼节、敬语基础",
      "赴日学习规划：到日本后如何继续提升",
    ],
  },
  {
    id: "conversation",
    icon: MessageCircle,
    title: "日语会话课",
    tag: "提高开口表达",
    desc: "适合学过日语但不敢开口、表达不自然的人，通过场景练习提升口语反应。",
    points: ["日常会话", "发音纠正", "表达自然化", "一问一答训练"],
    theme: "orange",
    kana: "会話",
    audience: "学过一段时间日语但不敢开口的人；表达不自然、容易「翻译腔」的学习者；希望提升对话反应速度的人。",
    duration: "每周 1-2 次，每次 50 分钟；持续 3 个月以上效果明显。",
    outline: [
      "诊断：找出表达不自然的常见原因（语序、助词、词汇选择）",
      "场景训练：餐厅、问路、就医、职场等真实场景模拟",
      "发音纠正：针对中国学习者常见的发音问题（清浊音、长音）",
      "一问一答快反应训练，提高对话流畅度",
      "纠错与复盘：录音回听，找出表达偏差",
    ],
  },
  {
    id: "custom",
    icon: PenLine,
    title: "定制课程",
    tag: "按目标安排内容",
    desc: "根据学习者的水平、目标、时间和弱项，定制学习内容和练习方式。",
    points: ["水平诊断", "目标拆解", "专属课程安排", "阶段反馈"],
    theme: "stone",
    kana: "学习",
    audience: "有特殊学习需求、不适合标准课程的人；比如想专攻商务日语、医学日语、动漫文化、敬语等特定领域的学习者。",
    duration: "按目标安排，灵活调整。常见为每周 1-2 次，每次 50-90 分钟。",
    outline: [
      "水平诊断：通过对话或测试了解当前水平",
      "目标拆解：把大目标分解成可执行的小阶段",
      "课程安排：根据弱项与目标定制内容比例",
      "阶段反馈：每月回顾进度，必要时调整方向",
      "灵活组合：可以和会话课、JLPT 训练交叉进行",
    ],
  },
];

// 主题色配置
const themeStyles = {
  rose: {
    bg: "from-rose-100 via-rose-50 to-amber-50",
    icon: "text-rose-700 bg-white/80",
    accent: "text-rose-700/30",
  },
  red: {
    bg: "from-red-100 via-rose-50 to-amber-50",
    icon: "text-red-700 bg-white/80",
    accent: "text-red-700/30",
  },
  amber: {
    bg: "from-amber-100 via-amber-50 to-rose-50",
    icon: "text-amber-800 bg-white/80",
    accent: "text-amber-700/30",
  },
  orange: {
    bg: "from-orange-100 via-amber-50 to-rose-50",
    icon: "text-orange-700 bg-white/80",
    accent: "text-orange-700/30",
  },
  stone: {
    bg: "from-stone-200 via-stone-100 to-amber-50",
    icon: "text-stone-700 bg-white/80",
    accent: "text-stone-700/30",
  },
};

const levelOptions = [
  { value: "zero", label: "零基础" },
  { value: "n5", label: "N5 左右" },
  { value: "n4", label: "N4 左右" },
  { value: "n3", label: "N3 左右" },
  { value: "n2", label: "N2 及以上" },
];

const goalOptions = [
  { value: "beginner", label: "从零开始" },
  { value: "jlpt", label: "能力考试" },
  { value: "study-japan", label: "日本留学" },
  { value: "conversation", label: "会话提升" },
  { value: "custom", label: "定制学习" },
];

const hoursOptions = [
  { value: "1", label: "每周 1 小时以内" },
  { value: "2", label: "每周 2-3 小时" },
  { value: "4", label: "每周 4 小时以上" },
];

// ---------- 通用样式工具 ----------
const baseInput =
  "w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-900 placeholder-stone-400 focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-100 transition";

// ---------- 主视觉 SVG（富士山 + 樱花 + 太阳）----------
function HeroVisual() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      aria-label="日本风景插画"
    >
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef3f2" />
          <stop offset="55%" stopColor="#fde8e8" />
          <stop offset="100%" stopColor="#fbcfce" />
        </linearGradient>
        <linearGradient id="hero-mountain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#57534e" />
          <stop offset="100%" stopColor="#292524" />
        </linearGradient>
      </defs>

      {/* 天空 */}
      <rect width="400" height="300" fill="url(#hero-sky)" />

      {/* 太阳（日之丸）*/}
      <circle cx="320" cy="78" r="44" fill="#b91c1c" opacity="0.9" />
      <circle cx="320" cy="78" r="44" fill="none" stroke="#b91c1c" strokeWidth="1" opacity="0.3" />

      {/* 远山 */}
      <path
        d="M0,215 Q70,185 140,205 Q220,225 300,200 Q360,185 400,200 L400,300 L0,300 Z"
        fill="#7c2d12"
        opacity="0.18"
      />

      {/* 富士山主体 */}
      <path d="M70,255 L200,85 L330,255 Z" fill="url(#hero-mountain)" />

      {/* 雪顶 */}
      <path
        d="M165,142 L200,85 L235,142 L224,150 L213,142 L200,152 L188,142 L177,150 Z"
        fill="#fafaf9"
      />

      {/* 樱花花瓣（散落装饰）*/}
      <g fill="#fda4af">
        <circle cx="40" cy="55" r="3.5" />
        <circle cx="68" cy="85" r="2.8" />
        <circle cx="105" cy="62" r="2.2" />
        <circle cx="48" cy="125" r="2.5" />
        <circle cx="25" cy="180" r="3" />
        <circle cx="365" cy="55" r="2.5" />
        <circle cx="378" cy="150" r="3.2" />
        <circle cx="355" cy="195" r="2" />
      </g>
      <g fill="#fb7185" opacity="0.7">
        <circle cx="55" cy="95" r="2" />
        <circle cx="90" cy="40" r="1.8" />
        <circle cx="380" cy="100" r="2" />
      </g>

      {/* 地面 */}
      <rect y="255" width="400" height="45" fill="#78350f" opacity="0.22" />

      {/* 装饰文字 */}
      <text
        x="35"
        y="280"
        fontFamily="serif"
        fontSize="14"
        fill="#fef3f2"
        opacity="0.8"
        style={{ letterSpacing: "0.2em" }}
      >
        日本語の世界へ
      </text>
    </svg>
  );
}

// ---------- 课程卡视觉区 ----------
function CourseVisual({ course, size = "default" }) {
  const Icon = course.icon;
  const theme = themeStyles[course.theme] || themeStyles.stone;
  const iconSize = size === "large" ? "w-16 h-16" : "w-12 h-12";
  const kanaSize = size === "large" ? "text-5xl" : "text-4xl";

  return (
    <div
      className={`relative w-full h-full bg-gradient-to-br ${theme.bg} overflow-hidden flex items-center justify-center`}
    >
      {/* 背景大字 */}
      <div
        className={`absolute font-serif ${kanaSize} font-bold ${theme.accent} select-none`}
        style={{ right: "-0.1em", bottom: "-0.15em" }}
      >
        {course.kana}
      </div>

      {/* 装饰樱花 */}
      <svg
        className="absolute inset-0 w-full h-full opacity-60"
        viewBox="0 0 200 120"
        preserveAspectRatio="none"
      >
        <g fill="currentColor" className="text-rose-300">
          <circle cx="20" cy="18" r="2" />
          <circle cx="38" cy="32" r="1.5" />
          <circle cx="170" cy="22" r="2.2" />
          <circle cx="182" cy="48" r="1.8" />
          <circle cx="155" cy="95" r="1.5" />
          <circle cx="25" cy="100" r="1.8" />
        </g>
      </svg>

      {/* 中央图标 */}
      <div
        className={`relative ${iconSize} rounded-2xl ${theme.icon} flex items-center justify-center shadow-sm backdrop-blur z-10`}
      >
        <Icon className={size === "large" ? "w-8 h-8" : "w-6 h-6"} />
      </div>
    </div>
  );
}

// ---------- 返回首页按钮 ----------
function BackToHome({ setPage, goHome }) {
  const handleClick = () => {
    if (goHome) {
      goHome();
    } else {
      setPage("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-stone-300 hover:border-red-700 hover:text-red-700 hover:bg-red-50/50 text-sm text-stone-700 transition mb-6 group shadow-sm"
    >
      <ArrowLeft className="w-4 h-4 transition group-hover:-translate-x-0.5" />
      返回首页
    </button>
  );
}

// ---------- 页面底部返回首页按钮（更明显）----------
function BackToHomeBottom({ setPage, goHome }) {
  const handleBack = () => {
    if (goHome) {
      goHome();
    } else {
      setPage("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <div className="max-w-6xl mx-auto px-4 pb-12 mt-6">
      <div className="rounded-2xl bg-gradient-to-br from-stone-100 to-red-50 border border-stone-200 p-8 text-center">
        <div className="font-serif text-xl font-bold text-stone-900 mb-2">
          还没决定好？
        </div>
        <p className="text-sm text-stone-600 mb-5">
          可以回到首页再看看其他课程方向，或直接预约一节免费体验课。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleBack}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-stone-300 hover:border-red-700 hover:text-red-700 text-stone-900 rounded-full font-medium transition"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </button>
          <button
            onClick={() => {
              setPage("booking");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-700 hover:bg-red-800 text-white rounded-full font-medium transition"
          >
            预约免费体验课
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- Header ----------
function Header({ page, setPage, goHome }) {
  const [open, setOpen] = useState(false);
  const navItems = [
    { id: "courses", label: "课程方向" },
    { id: "diagnosis", label: "水平诊断" },
    { id: "booking", label: "预约体验课" },
    { id: "faq", label: "常见问题" },
  ];

  const go = (id) => {
    if (id === "home" && goHome) {
      goHome();
      setOpen(false);
      return;
    }
    setPage(id);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-50/90 backdrop-blur border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => go("home")}
          className="flex items-center gap-2 text-left"
        >
          <span className="leading-tight">
            <span className="block font-serif text-xl font-bold text-stone-900 tracking-wide">
              东瀛之鑫 <span className="text-red-700">日本语教室</span>
            </span>
            <span className="block text-[10px] text-stone-500 tracking-[0.3em] mt-0.5">
              TOUEI · NIHONGO · KYOUSHITSU
            </span>
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-7 text-sm text-stone-700">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={`hover:text-red-700 transition ${
                page === item.id ? "text-red-700 font-medium" : ""
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => go("booking")}
            className="hidden sm:inline-flex items-center px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white rounded-full text-sm font-medium transition shadow-sm"
          >
            立即预约
          </button>
          <button
            className="md:hidden p-2 -mr-2 text-stone-700"
            onClick={() => setOpen(!open)}
            aria-label="菜单"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 移动端下拉菜单 */}
      {open && (
        <div className="md:hidden border-t border-stone-200 bg-stone-50">
          <div className="max-w-6xl mx-auto px-4 py-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`w-full text-left py-3 border-b border-stone-100 last:border-0 ${
                  page === item.id ? "text-red-700 font-medium" : "text-stone-700"
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => go("booking")}
              className="w-full mt-2 mb-3 px-5 py-3 bg-red-700 text-white rounded-full font-medium"
            >
              立即预约
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

// ---------- Home ----------
function Home({ setPage, prefill, setPrefill, viewCourse }) {
  return (
    <main>
      {/* 主视觉区 */}
      <section className="relative overflow-hidden">
        <div className="absolute top-10 right-0 w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-50 -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-40 -z-10" />

        <div className="max-w-6xl mx-auto px-4 py-6 md:py-14 grid md:grid-cols-5 gap-4 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white border border-stone-200 px-4 py-2 text-sm text-stone-700 mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-red-700" />
              新学员可预约 <span className="font-semibold text-red-700">免费体验课</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight leading-[1.15] text-stone-900">
              想学日语，
              <br />
              先找到
              <span className="relative inline-block">
                <span className="relative z-10">适合自己</span>
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-red-200/70 -z-0" />
              </span>
              的课程
            </h1>
            <p className="mt-6 text-lg text-stone-600 leading-8">
              零基础、JLPT 能力考、日本留学、会话提升、定制学习——
              <br className="hidden md:block" />
              根据你当前的水平和目标，预约一对一辅导。
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setPage("booking")}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-red-700 hover:bg-red-800 text-white rounded-full font-medium transition shadow-sm"
              >
                预约免费体验课
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage("diagnosis")}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 rounded-full font-medium transition"
              >
                先做学习诊断
              </button>
            </div>
            <p className="mt-4 text-sm text-stone-500">
              提交后 24 小时内会与你联系，确认体验课时间。
            </p>
          </div>

          {/* 右侧：图片 + 课程速选卡叠加 */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-20 h-20 border-2 border-red-700 rounded-full opacity-20" />

            {/* 主视觉图片 */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl mb-5 aspect-[4/3] border border-stone-200">
              <HeroVisual />
            </div>

            {/* 课程速选卡 */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-stone-200">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="font-serif text-lg font-bold text-stone-900">
                    选一类你想学的方向
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    点击直接查看课程详情
                  </div>
                </div>
                <span className="font-serif text-3xl text-red-700/30">学</span>
              </div>
              <div className="space-y-2">
                {courses.map((course) => {
                  const Icon = course.icon;
                  return (
                    <button
                      key={course.id}
                      onClick={() => {
                        viewCourse(course.id);
                      }}
                      className="w-full text-left p-4 rounded-2xl border border-stone-200 hover:border-red-700 hover:bg-red-50/40 transition flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-stone-100 group-hover:bg-red-700 group-hover:text-white text-stone-700 flex items-center justify-center transition">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-medium text-stone-900">
                            {course.title}
                          </div>
                          <div className="text-xs text-stone-500">{course.tag}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-red-700 transition" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 为什么选择我们 */}
      <section className="bg-white border-y border-stone-200 py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="text-xs tracking-[0.3em] text-red-700 font-medium mb-2">
              POINTS
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-900">
              为什么选择这里
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Sparkles,
                title: "实用场景优先",
                desc: "课程不停留在背单词，更注重「能听懂、能开口」。从打招呼、问路、点餐到职场表达，按真实场景练习。",
              },
              {
                icon: Heart,
                title: "按目标安排课程",
                desc: "考试、留学、会话还是入门？先了解你的目标，再决定课程内容，不卖标准化套餐。",
              },
              {
                icon: Clock,
                title: "时间灵活",
                desc: "工作日晚上、周末均可。无论你在中国还是已经在日本，只要时差能对上都可以预约。",
              },
            ].map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="rounded-2xl border border-stone-200 p-6 bg-stone-50 hover:bg-white hover:shadow-sm transition"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-700/10 text-red-700 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-stone-900">
                    {p.title}
                  </h3>
                  <p className="text-stone-600 mt-2 leading-7 text-sm">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 课程预览 */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs tracking-[0.3em] text-red-700 font-medium mb-2">
                COURSES
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-900">
                课程方向
              </h2>
              <p className="text-stone-600 mt-2">
                从入门到考试、留学、会话和个性化训练。
              </p>
            </div>
            <button
              onClick={() => setPage("courses")}
              className="hidden sm:inline-flex items-center gap-1 text-sm text-red-700 hover:text-red-800 font-medium"
            >
              查看全部 <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {courses.slice(0, 3).map((course) => {
              return (
                <div
                  key={course.id}
                  className="rounded-2xl bg-white border border-stone-200 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition group cursor-pointer"
                  onClick={() => viewCourse(course.id)}
                >
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <CourseVisual course={course} />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold text-stone-900">
                      {course.title}
                    </h3>
                    <p className="text-sm text-stone-500 mt-1">{course.tag}</p>
                    <p className="text-stone-600 mt-3 leading-7 text-sm">
                      {course.desc}
                    </p>
                    <div className="mt-4 text-sm text-red-700 font-medium inline-flex items-center gap-1">
                      查看课程详情 <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 预约流程 */}
      <section className="bg-stone-100 py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="text-xs tracking-[0.3em] text-red-700 font-medium mb-2">
              PROCESS
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-900">
              预约流程
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              "选择学习方向",
              "填写预约信息",
              "确认体验课时间",
              "制定学习计划",
            ].map((step, idx) => (
              <div
                key={step}
                className="rounded-2xl bg-white p-6 text-center border border-stone-200"
              >
                <div className="mx-auto w-10 h-10 rounded-full bg-red-700 text-white flex items-center justify-center font-serif font-bold mb-4">
                  {idx + 1}
                </div>
                <div className="font-medium text-stone-900">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// ---------- CourseDetail：单个课程详情页 ----------
function CourseDetail({ courseId, setPage, setPrefill, prefill, goHome }) {
  const course = courses.find((c) => c.id === courseId);
  if (!course) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-12">
        <BackToHome setPage={setPage} goHome={goHome} />
        <p className="text-stone-600">没有找到这门课程。</p>
      </main>
    );
  }
  const Icon = course.icon;

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <BackToHome setPage={setPage} goHome={goHome} />

      <div className="text-xs tracking-[0.3em] text-red-700 font-medium mb-2">
        COURSE
      </div>
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-stone-900">
        {course.title}
      </h1>
      <p className="text-stone-500 mt-2">{course.tag}</p>

      {/* 大视觉图 */}
      <div className="rounded-3xl overflow-hidden border border-stone-200 mt-8 aspect-[16/7] shadow-sm">
        <CourseVisual course={course} size="large" />
      </div>

      {/* 课程介绍 */}
      <section className="mt-10 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            课程简介
          </h2>
          <p className="text-stone-700 mt-3 leading-8">{course.desc}</p>

          <h2 className="font-serif text-2xl font-bold text-stone-900 mt-8">
            学习要点
          </h2>
          <div className="flex flex-wrap gap-2 mt-3">
            {course.points.map((p) => (
              <span
                key={p}
                className="text-sm rounded-full bg-stone-100 text-stone-700 px-4 py-2"
              >
                {p}
              </span>
            ))}
          </div>

          <h2 className="font-serif text-2xl font-bold text-stone-900 mt-8">
            学习大纲
          </h2>
          <ol className="mt-3 space-y-3">
            {course.outline.map((step, idx) => (
              <li
                key={idx}
                className="flex gap-3 items-start bg-white rounded-2xl border border-stone-200 p-4"
              >
                <span className="w-7 h-7 rounded-full bg-red-700 text-white text-sm font-serif font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="text-stone-700 leading-7 pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* 右侧信息卡 */}
        <aside className="space-y-4">
          <div className="rounded-2xl border border-stone-200 bg-white p-5">
            <div className="flex items-center gap-2 text-stone-500 text-xs tracking-widest mb-2">
              <Heart className="w-3.5 h-3.5" />
              适合人群
            </div>
            <p className="text-stone-700 leading-7 text-sm">
              {course.audience}
            </p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-5">
            <div className="flex items-center gap-2 text-stone-500 text-xs tracking-widest mb-2">
              <Clock className="w-3.5 h-3.5" />
              学习时长建议
            </div>
            <p className="text-stone-700 leading-7 text-sm">
              {course.duration}
            </p>
          </div>
          <div className="rounded-2xl border border-red-200 bg-red-50/50 p-5">
            <div className="flex items-center gap-2 text-red-700 text-xs tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              新学员福利
            </div>
            <p className="text-stone-700 leading-7 text-sm">
              首次预约可享免费体验课一节，老师将根据你的目标制定专属学习计划。
            </p>
          </div>
        </aside>
      </section>

      {/* 行动按钮 */}
      <div className="mt-10 rounded-3xl bg-gradient-to-br from-stone-100 to-red-50 border border-stone-200 p-8 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white text-red-700 mb-4 shadow-sm">
          <Icon className="w-7 h-7" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-stone-900">
          准备好开始这门课了吗？
        </h3>
        <p className="text-stone-600 mt-2 text-sm">
          填写预约信息，老师将在 24 小时内与你联系
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => {
              setPrefill({ ...prefill, goal: course.id });
              setPage("booking");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-red-700 hover:bg-red-800 text-white rounded-full font-medium transition"
          >
            预约这门课
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setPage("diagnosis");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 rounded-full font-medium transition"
          >
            不确定，先做诊断
          </button>
        </div>
      </div>

      {/* 返回课程列表 */}
      <div className="mt-6 text-center">
        <button
          onClick={() => {
            setPage("courses");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-sm text-stone-600 hover:text-red-700 inline-flex items-center gap-1.5 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
          返回课程列表
        </button>
      </div>
    </main>
  );
}

// ---------- Courses ----------
function Courses({ setPage, prefill, setPrefill, viewCourse, goHome }) {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <BackToHome setPage={setPage} goHome={goHome} />
      <div className="text-xs tracking-[0.3em] text-red-700 font-medium mb-2">
        COURSES
      </div>
      <h1 className="font-serif text-4xl font-bold text-stone-900">课程方向</h1>
      <p className="text-stone-600 mt-3">
        选择与你当前目标最接近的课程，也可以通过学习诊断后再决定。
      </p>
      <div className="grid md:grid-cols-2 gap-5 mt-8">
        {courses.map((course) => {
          const isHighlighted = prefill.goal === course.id;
          return (
            <div
              key={course.id}
              className={`rounded-2xl bg-white border overflow-hidden transition cursor-pointer ${
                isHighlighted
                  ? "border-red-700 shadow-md ring-2 ring-red-100"
                  : "border-stone-200 hover:shadow-md hover:-translate-y-0.5"
              }`}
              onClick={() => viewCourse(course.id)}
            >
              <div className="aspect-[16/9] overflow-hidden relative">
                <CourseVisual course={course} size="large" />
                {isHighlighted && (
                  <span className="absolute top-3 right-3 text-xs px-2 py-1 bg-red-700 text-white rounded-full whitespace-nowrap shadow z-10">
                    已选择
                  </span>
                )}
              </div>
              <div className="p-6">
                <h2 className="font-serif text-2xl font-bold text-stone-900">
                  {course.title}
                </h2>
                <p className="text-sm text-stone-500 mt-1">{course.tag}</p>
                <p className="text-stone-600 mt-3 leading-7 text-sm">
                  {course.desc}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {course.points.map((p) => (
                    <span
                      key={p}
                      className="text-xs rounded-full bg-stone-100 text-stone-700 px-3 py-1.5"
                    >
                      {p}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      viewCourse(course.id);
                    }}
                    className="px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white rounded-full text-sm font-medium transition inline-flex items-center gap-1"
                  >
                    查看课程详情
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setPage("diagnosis");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="px-5 py-2.5 bg-white border border-stone-300 hover:bg-stone-50 text-stone-900 rounded-full text-sm font-medium transition"
                  >
                    不确定，先诊断
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

// ---------- Diagnosis ----------
function Diagnosis({ setPage, prefill, setPrefill, goHome }) {
  const [local, setLocal] = useState({
    level: prefill.level || "",
    goal: prefill.goal || "",
    hours: prefill.hours || "",
  });
  const [error, setError] = useState("");

  const submit = () => {
    if (!local.level || !local.goal || !local.hours) {
      setError("请完成全部三项选择");
      return;
    }
    setPrefill({ ...prefill, ...local });
    setPage("booking");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const SelectField = ({ label, value, options, onChange }) => (
    <div>
      <label className="text-sm font-medium text-stone-900">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${baseInput} mt-2 cursor-pointer ${
          value ? "text-stone-900" : "text-stone-400"
        }`}
      >
        <option value="" disabled hidden>
          请选择
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value} className="text-stone-900">
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <BackToHome setPage={setPage} goHome={goHome} />
      <div className="text-xs tracking-[0.3em] text-red-700 font-medium mb-2">
        DIAGNOSIS
      </div>
      <h1 className="font-serif text-4xl font-bold text-stone-900">学习诊断</h1>
      <p className="text-stone-600 mt-3">
        不确定适合哪门课时，可以先提交当前情况，再安排合适的课程方向。
      </p>
      <div className="rounded-2xl bg-white border border-stone-200 p-6 mt-8 grid gap-5 shadow-sm">
        <SelectField
          label="当前日语水平"
          value={local.level}
          options={levelOptions}
          onChange={(v) => {
            setLocal({ ...local, level: v });
            setError("");
          }}
        />
        <SelectField
          label="主要学习目标"
          value={local.goal}
          options={goalOptions}
          onChange={(v) => {
            setLocal({ ...local, goal: v });
            setError("");
          }}
        />
        <SelectField
          label="每周可学习时间"
          value={local.hours}
          options={hoursOptions}
          onChange={(v) => {
            setLocal({ ...local, hours: v });
            setError("");
          }}
        />
        {error && (
          <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            {error}
          </div>
        )}
        <button
          onClick={submit}
          className="px-7 py-4 bg-red-700 hover:bg-red-800 text-white rounded-full font-medium transition mt-2"
        >
          提交诊断并预约体验课
        </button>
        <p className="text-xs text-stone-500 text-center">
          诊断结果将自动带入预约页面
        </p>
      </div>
    </main>
  );
}

// ---------- Booking ----------
function Booking({ prefill, setPage, goHome }) {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    course: prefill.goal || "",
    time: "",
    question: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState({});

  const update = (key, value) => {
    setForm({ ...form, [key]: value });
    if (errors[key]) setErrors({ ...errors, [key]: "" });
  };

  // ============ Web3Forms Access Key ============
  const WEB3FORMS_KEY = "0c425024-a678-4404-ac25-c9a27df6a890";
  // ==============================================

  const handleSubmit = async () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "请填写称呼";
    if (!form.contact.trim()) newErrors.contact = "请填写联系方式";
    if (!form.course) newErrors.course = "请选择课程方向";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const courseTitle =
      courses.find((c) => c.id === form.course)?.title || form.course;
    const levelLabel =
      levelOptions.find((o) => o.value === prefill.level)?.label || "未填写";
    const hoursLabel =
      hoursOptions.find((o) => o.value === prefill.hours)?.label || "未填写";

    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `日语课预约 - ${form.name}（${courseTitle}）`,
          from_name: "东瀛之鑫日本语教室",
          称呼: form.name,
          联系方式: form.contact,
          课程方向: courseTitle,
          期望时间: form.time || "未填写",
          当前水平: levelLabel,
          每周时间: hoursLabel,
          想咨询的问题: form.question || "（未填写）",
          提交时间: new Date().toLocaleString("zh-CN"),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setSubmitError("提交失败，请稍后再试或直接联系老师微信。");
      }
    } catch {
      setSubmitError("网络错误，请稍后再试或直接联系老师微信。");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-12">
        <BackToHome setPage={setPage} goHome={goHome} />
        <div className="rounded-3xl bg-white border border-stone-200 p-10 text-center shadow-sm">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-700 text-white flex items-center justify-center mb-6">
            <Check className="w-8 h-8" strokeWidth={3} />
          </div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">
            预约已提交
          </h1>
          <p className="text-stone-600 mt-3 leading-7">
            感谢 <span className="font-medium text-stone-900">{form.name}</span>{" "}
            的预约。
            <br />
            老师将在 24 小时内通过你提供的联系方式与你确认体验课时间。
          </p>
          <div className="mt-8 text-left bg-stone-50 rounded-2xl p-5 border border-stone-200">
            <div className="text-xs tracking-widest text-stone-500 mb-3">
              你提交的信息
            </div>
            <dl className="text-sm space-y-2">
              <div className="flex justify-between gap-4">
                <dt className="text-stone-500">称呼</dt>
                <dd className="text-stone-900 font-medium">{form.name}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-stone-500">联系方式</dt>
                <dd className="text-stone-900 font-medium break-all">
                  {form.contact}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-stone-500">课程方向</dt>
                <dd className="text-stone-900 font-medium">
                  {courses.find((c) => c.id === form.course)?.title || "—"}
                </dd>
              </div>
              {form.time && (
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500">期望时间</dt>
                  <dd className="text-stone-900 font-medium">{form.time}</dd>
                </div>
              )}
            </dl>
          </div>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({
                name: "",
                contact: "",
                course: "",
                time: "",
                question: "",
              });
            }}
            className="mt-8 text-sm text-red-700 hover:text-red-800 font-medium"
          >
            提交另一份预约
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <BackToHome setPage={setPage} goHome={goHome} />
      <div className="text-xs tracking-[0.3em] text-red-700 font-medium mb-2">
        BOOKING
      </div>
      <h1 className="font-serif text-4xl font-bold text-stone-900">
        预约体验课
      </h1>
      <p className="text-stone-600 mt-3">
        请填写预约信息，提交后老师将在 24 小时内与你联系。
      </p>

      {(prefill.level || prefill.hours) && (
        <div className="mt-6 rounded-2xl bg-red-50 border border-red-200 px-5 py-4 text-sm text-stone-700">
          <span className="font-medium text-red-700">来自学习诊断：</span>
          {prefill.level && (
            <span className="ml-2">
              水平 ·{" "}
              {levelOptions.find((o) => o.value === prefill.level)?.label}
            </span>
          )}
          {prefill.hours && (
            <span className="ml-3">
              每周 ·{" "}
              {hoursOptions.find((o) => o.value === prefill.hours)?.label}
            </span>
          )}
        </div>
      )}

      <div className="rounded-2xl bg-white border border-stone-200 p-6 mt-6 grid gap-5 shadow-sm">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-stone-900">
              称呼 <span className="text-red-700">*</span>
            </label>
            <input
              className={`${baseInput} mt-2 ${
                errors.name ? "border-red-700" : ""
              }`}
              placeholder="例如：王同学"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
            {errors.name && (
              <div className="text-xs text-red-700 mt-1">{errors.name}</div>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-stone-900">
              联系方式 <span className="text-red-700">*</span>
            </label>
            <input
              className={`${baseInput} mt-2 ${
                errors.contact ? "border-red-700" : ""
              }`}
              placeholder="微信 / 手机 / 邮箱"
              value={form.contact}
              onChange={(e) => update("contact", e.target.value)}
            />
            {errors.contact && (
              <div className="text-xs text-red-700 mt-1">{errors.contact}</div>
            )}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-stone-900">
            想预约的课程方向 <span className="text-red-700">*</span>
          </label>
          <select
            className={`${baseInput} mt-2 cursor-pointer ${
              errors.course ? "border-red-700" : ""
            } ${form.course ? "text-stone-900" : "text-stone-400"}`}
            value={form.course}
            onChange={(e) => update("course", e.target.value)}
          >
            <option value="" disabled hidden>
              请选择课程
            </option>
            {courses.map((c) => (
              <option key={c.id} value={c.id} className="text-stone-900">
                {c.title}
              </option>
            ))}
          </select>
          {errors.course && (
            <div className="text-xs text-red-700 mt-1">{errors.course}</div>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-stone-900">
            希望体验课时间
          </label>
          <input
            className={`${baseInput} mt-2`}
            placeholder="例如：周六晚上 / 工作日 20 点后"
            value={form.time}
            onChange={(e) => update("time", e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-stone-900">
            想咨询的问题
          </label>
          <textarea
            className={`${baseInput} mt-2 min-h-[100px] resize-none`}
            placeholder="例如：想从零基础开始，多久能考 N4？"
            value={form.question}
            onChange={(e) => update("question", e.target.value)}
          />
        </div>

        {submitError && (
          <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            {submitError}
          </div>
        )}
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-red-700 hover:bg-red-800 disabled:bg-stone-400 text-white rounded-full font-medium transition mt-2"
        >
          <CalendarCheck className="w-4 h-4" />
          {submitting ? "提交中..." : "提交预约"}
        </button>
      </div>
    </main>
  );
}

// ---------- FAQ ----------
function FAQ({ setPage, goHome }) {
  const faqs = [
    [
      "零基础可以预约吗？",
      "可以。零基础课程会从五十音、发音和基础表达开始。",
    ],
    [
      "可以只做能力考刷题吗？",
      "可以。JLPT 训练可以按级别安排词汇、语法、阅读、听力和错题复盘。",
    ],
    [
      "课程可以定制吗？",
      "可以。根据水平、目标、考试时间或留学计划调整内容。",
    ],
    [
      "体验课主要做什么？",
      "确认水平、学习目标、时间安排，并建议适合的课程路线。",
    ],
    [
      "上课用什么软件？",
      "通常使用微信视频、腾讯会议或 Zoom，按学员习惯安排即可。",
    ],
    [
      "在日本也可以上课吗？",
      "可以。无论在中国还是在日本，只要时差能对上都可以预约。",
    ],
  ];
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <BackToHome setPage={setPage} goHome={goHome} />
      <div className="text-xs tracking-[0.3em] text-red-700 font-medium mb-2">
        FAQ
      </div>
      <h1 className="font-serif text-4xl font-bold text-stone-900">常见问题</h1>
      <div className="grid gap-3 mt-8">
        {faqs.map(([q, a], idx) => (
          <button
            key={q}
            onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
            className="text-left rounded-2xl bg-white border border-stone-200 p-5 hover:border-red-700 transition"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-medium text-stone-900">{q}</h2>
              <ChevronRight
                className={`w-4 h-4 text-stone-400 shrink-0 transition ${
                  openIdx === idx ? "rotate-90 text-red-700" : ""
                }`}
              />
            </div>
            {openIdx === idx && (
              <p className="text-stone-600 mt-3 leading-7 text-sm">{a}</p>
            )}
          </button>
        ))}
      </div>
    </main>
  );
}

// ---------- Footer ----------
function Footer({ setPage }) {
  const [qrOpen, setQrOpen] = useState(false);
  return (
    <footer className="border-t border-stone-200 bg-stone-100 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="font-serif text-lg font-bold text-stone-900">
              东瀛之鑫 <span className="text-red-700">日本语教室</span>
            </div>
            <p className="text-sm text-stone-600 mt-3 leading-6">
              针对中国学习者的日语一对一辅导，认真教学，按目标安排课程。
            </p>
          </div>
          <div>
            <div className="text-xs tracking-widest text-stone-500 mb-3">
              快速导航
            </div>
            <div className="flex flex-col gap-2 text-sm">
              {[
                { id: "courses", label: "课程方向" },
                { id: "diagnosis", label: "水平诊断" },
                { id: "booking", label: "预约体验课" },
                { id: "faq", label: "常见问题" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setPage(item.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-stone-700 hover:text-red-700 hover:underline underline-offset-4 text-left inline-flex items-center gap-1.5 group w-fit"
                >
                  <ChevronRight className="w-3 h-3 text-red-700 opacity-60 group-hover:translate-x-0.5 transition" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs tracking-widest text-stone-500 mb-3">
              联系方式
            </div>
            <div className="text-sm text-stone-700 space-y-3">
              <div>
                <div className="text-stone-500 text-xs mb-1">邮箱</div>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-stone-900 hover:text-red-700 hover:underline underline-offset-4 break-all"
                >
                  {CONTACT.email}
                </a>
              </div>
              <div>
                <div className="text-stone-500 text-xs mb-1">微信号</div>
                <div className="text-stone-900">{CONTACT.wechatId}</div>
              </div>
              
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-stone-200 text-xs text-stone-500 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
          <div>© 东瀛之鑫 日本语教室</div>
          <div>用心教，认真学</div>
        </div>
      </div>

      {/* 二维码放大模态框 */}
      {qrOpen && (
        <div
          className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setQrOpen(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="font-serif text-lg font-bold text-stone-900">
                扫码加微信
              </div>
              <button
                onClick={() => setQrOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center text-stone-500"
                aria-label="关闭"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-4 text-sm text-stone-600">
              微信号：
              <span className="text-stone-900 font-medium">
                {CONTACT.wechatId}
              </span>
            </div>
            <p className="mt-3 text-xs text-stone-500 leading-6">
              用微信扫一扫即可添加好友
              <br />
              （在手机上长按图片也可保存到相册）
            </p>
          </div>
        </div>
      )}
    </footer>
  );
}

// ---------- 主组件 ----------
export default function NihongoBookingPlatformLayout() {
  const [page, setPage] = useState("home");
  // 跨页面共享的诊断/选择状态
  const [prefill, setPrefill] = useState({
    level: "",
    goal: "",
    hours: "",
  });
  // 当前查看的课程详情 ID
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  // 一键回首页并清空所有输入状态
  const goHome = () => {
    setPage("home");
    setPrefill({ level: "", goal: "", hours: "" });
    setSelectedCourseId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 跳转到某门课的详情页
  const viewCourse = (courseId) => {
    setSelectedCourseId(courseId);
    setPage("courseDetail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      <Header page={page} setPage={setPage} goHome={goHome} />
      {page === "home" && (
        <Home
          setPage={setPage}
          prefill={prefill}
          setPrefill={setPrefill}
          viewCourse={viewCourse}
        />
      )}
      {page === "courses" && (
        <Courses
          setPage={setPage}
          prefill={prefill}
          setPrefill={setPrefill}
          viewCourse={viewCourse}
          goHome={goHome}
        />
      )}
      {page === "courseDetail" && (
        <CourseDetail
          courseId={selectedCourseId}
          setPage={setPage}
          prefill={prefill}
          setPrefill={setPrefill}
          goHome={goHome}
        />
      )}
      {page === "diagnosis" && (
        <Diagnosis
          setPage={setPage}
          prefill={prefill}
          setPrefill={setPrefill}
          goHome={goHome}
        />
      )}
      {page === "booking" && (
        <Booking prefill={prefill} setPage={setPage} goHome={goHome} />
      )}
      {page === "faq" && <FAQ setPage={setPage} goHome={goHome} />}
      {page !== "home" && <BackToHomeBottom setPage={setPage} goHome={goHome} />}
      <Footer setPage={setPage} />
    </div>
  );
}
