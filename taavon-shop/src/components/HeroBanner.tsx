import React from 'react';
import { 
  Sparkles, 
  CreditCard, 
  Truck, 
  CheckCircle2, 
  PhoneCall, 
  ExternalLink, 
  MapPin, 
  Flame, 
  Store
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { toPersianDigits } from '../utils/formatters';

export const HeroBanner: React.FC = () => {
  const {
    onlyRestocked,
    setOnlyRestocked,
    onlyKalabarg,
    setOnlyKalabarg,
    announcements,
    setIsStoreInfoOpen,
  } = useStore();

  const currentAnnouncement = announcements[0] || {
    title: '💥 شارژ مجدد کلوچه خرمایی 💥',
    content: 'بار درجه یک و تازه، تولید روز 👌 قیمت هر کیلو ۱۹۵ هزار تومان - کالا برگ فعال می‌باشد',
    tag: 'شارژ مجدد',
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-900 to-stone-900 text-white pt-6 pb-8 px-4 border-b border-emerald-950/60 shadow-inner">
      {/* Background ambient pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Dynamic Top Announcement Marquee */}
        <div className="mb-5 bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 border border-amber-400/40 rounded-xl p-3 backdrop-blur-xs flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-2.5 text-right w-full sm:w-auto">
            <span className="bg-amber-400 text-stone-950 font-black text-[11px] px-2.5 py-1 rounded-md shrink-0 flex items-center gap-1 shadow-2xs">
              <Flame className="w-3.5 h-3.5 fill-amber-950" />
              {currentAnnouncement.tag}
            </span>
            <div className="text-xs sm:text-sm font-bold text-amber-200 line-clamp-1">
              {currentAnnouncement.title}
              <span className="font-normal text-amber-100/90 mr-2 text-xs hidden md:inline">
                {currentAnnouncement.content}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0 text-xs">
            <button
              onClick={() => {
                setOnlyRestocked(true);
                setOnlyKalabarg(false);
              }}
              className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              مشاهده محصولات شارژ شده
            </button>
          </div>
        </div>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column: Brand & Manifesto */}
          <div className="lg:col-span-7 text-right space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-emerald-200 text-xs font-semibold">
              <Store className="w-3.5 h-3.5 text-emerald-400" />
              <span>فروشگاه بزرگ تعاون • کاشمر (با مدیریت حقدوست)</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug sm:leading-tight text-white">
              خرید مستقیم و حذف واسطه‌ها،
              <br />
              <span className="text-amber-400">کالا به قیمت کاملاً منصفانه</span>
            </h2>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-2xl bg-black/20 p-3.5 rounded-xl border border-white/5">
              با خرید مستقیم، خرید نقدی در حجم بالا و پایین آوردن حاشیه سود، سعی داریم انواع مواد غذایی، برنج باسماتی پاکستان، روغن‌های ۵ کیلویی، لبنیات سون و کلوچه خرمایی تازه تولید روز با بهترین کیفیت و ارزان‌ترین قیمت به دست شما همشهریان عزیز کاشمری برسد.
            </p>

            {/* Badges & Trust Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg p-2.5 backdrop-blur-xs">
                <CreditCard className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="text-right">
                  <div className="text-[11px] font-bold text-white">کالابرگ الکترونیکی</div>
                  <div className="text-[10px] text-emerald-300">طرح فجرانه و یارانه فعال</div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg p-2.5 backdrop-blur-xs">
                <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-right">
                  <div className="text-[11px] font-bold text-white">کیفیت تضمینی</div>
                  <div className="text-[10px] text-emerald-300">بار درجه یک و تولید روز</div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg p-2.5 backdrop-blur-xs col-span-2 sm:col-span-1">
                <Truck className="w-5 h-5 text-teal-400 shrink-0" />
                <div className="text-right">
                  <div className="text-[11px] font-bold text-white">ارسال سریع در کاشمر</div>
                  <div className="text-[10px] text-teal-300">درب منزل یا تحویل حضوری</div>
                </div>
              </div>
            </div>

            {/* Quick Action Links */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://eitaa.com/tavvnhaghdost313H"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-xs sm:text-sm rounded-xl transition-all shadow-md active:scale-95"
              >
                <span>کانال رسمی ایتا فروشگاه</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href="tel:09351506418"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/15 hover:bg-white/25 border border-white/20 text-white font-bold text-xs sm:text-sm rounded-xl transition-all"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>تماس با مدیر: {toPersianDigits('09351506418')}</span>
              </a>

              <button
                onClick={() => setIsStoreInfoOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs text-stone-300 hover:text-white transition-colors"
              >
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>مشاهده آدرس فروشگاه</span>
              </button>
            </div>
          </div>

          {/* Right Column: Physical Store Card & Location Preview */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-b from-stone-800/90 to-stone-900/90 border border-emerald-500/30 rounded-2xl p-5 shadow-xl backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-700/60">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-lg">
                    ت
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">فروشگاه تعاون (حقدوست)</h3>
                    <p className="text-[11px] text-amber-300">تجربه حس خریدی خوب</p>
                  </div>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold px-2 py-0.5 rounded-full">
                  کاشمر
                </span>
              </div>

              {/* Special Featured Highlight - Kolouche Khormayi */}
              <div className="bg-emerald-950/70 border border-emerald-500/40 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="bg-red-600 text-white text-[11px] font-black px-2 py-0.5 rounded-md animate-pulse">
                    💥 شارژ مجدد 💥
                  </span>
                  <span className="text-amber-300 text-xs font-bold">تولید روز 👌</span>
                </div>
                <h4 className="font-extrabold text-white text-sm">
                  کلوچه خرمایی تازه شاه شکر
                </h4>
                <p className="text-[11px] text-stone-300 leading-normal">
                  شیرینی آردی درجه یک و تازه با مغز خرمای دشتستان، بار درجه یک و خوش‌خوراک
                </p>
                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-stone-300">قیمت تعاونی هر کیلو:</span>
                  <span className="text-amber-400 font-extrabold text-sm">۱۹۵,۰۰۰ تومان</span>
                </div>
              </div>

              {/* Address detail */}
              <div className="text-xs text-stone-300 space-y-1.5 pt-1">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>آدرس:</strong> کاشمر، فلکه قوژد، نبش سلمان فارسی ۳۴
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>امکان خرید حضوری و سفارش تلفنی و اینترنتی</span>
                </div>
              </div>

              {/* Quick Filters Toggles */}
              <div className="pt-2 flex items-center gap-2 border-t border-stone-700/60">
                <button
                  onClick={() => {
                    setOnlyRestocked(!onlyRestocked);
                  }}
                  className={`flex-1 py-2 px-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    onlyRestocked
                      ? 'bg-amber-400 text-stone-950 border-amber-300'
                      : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
                  }`}
                >
                  {onlyRestocked ? '✓ نمایش شارژ مجدد' : '💥 فقط شارژ مجدد'}
                </button>

                <button
                  onClick={() => {
                    setOnlyKalabarg(!onlyKalabarg);
                  }}
                  className={`flex-1 py-2 px-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    onlyKalabarg
                      ? 'bg-emerald-600 text-white border-emerald-400'
                      : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
                  }`}
                >
                  {onlyKalabarg ? '✓ کالابرگ فعال' : '💳 فیلتر کالابرگ'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
