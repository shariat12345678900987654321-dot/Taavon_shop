import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  MapPin, 
  Phone, 
  ExternalLink, 
  CreditCard, 
  Clock, 
  ShieldCheck, 
  Store, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';

export const StoreInfoModal: React.FC = () => {
  const { isStoreInfoOpen, setIsStoreInfoOpen } = useStore();

  if (!isStoreInfoOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200 text-right animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-800 via-teal-800 to-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-stone-950 font-black text-2xl flex items-center justify-center shadow-md">
              ت
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-black text-lg text-white">فروشگاه بزرگ تعاون</h2>
                <span className="bg-amber-400 text-stone-950 font-extrabold text-[11px] px-2 py-0.5 rounded-md">
                  مدیریت حقدوست
                </span>
              </div>
              <p className="text-xs text-emerald-200 mt-0.5">
                تجربه حس خریدی خوب در کاشمر
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsStoreInfoOpen(false)}
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 text-stone-800 text-xs sm:text-sm">
          {/* Store Manifesto */}
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2">
            <div className="font-extrabold text-amber-950 flex items-center gap-1.5 text-xs sm:text-sm">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>مرام‌نامه و اهداف فروشگاه تعاون:</span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              «با خرید مستقیم و حذف واسطه‌ها، خرید نقدی در حجم بالا، و پایین آوردن درصد سود فروشگاه، سعی داریم کالا به قیمت واقعی و کاملاً منصفانه به دست شما همشهریان عزیز برسد.»
            </p>
            <div className="text-[11px] font-bold text-amber-800 text-left">
              — مدیریت فروشگاه: حقدوست
            </div>
          </div>

          {/* Location & Map Information */}
          <div className="space-y-3">
            <h3 className="font-black text-stone-900 text-sm flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>موقعیت مکانی و آدرس فروشگاه:</span>
            </h3>

            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-2">
              <div className="text-sm font-bold text-stone-900 leading-relaxed">
                کاشمر : فلکه قوژد، نبش سلمان فارسی ۳۴، فروشگاه تعاون (حقدوست)
              </div>
              <p className="text-xs text-stone-500">
                دسترسی آسان با جای پارک اختصاصی جلوی فروشگاه، ارسال فوری با پیک در تمامی نقاط کاشمر.
              </p>

              {/* Graphical Location Card */}
              <div className="mt-2 p-3 bg-white border border-stone-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full bg-emerald-600 animate-ping" />
                  <span className="font-bold text-stone-800">میدان قوژد • سلمان فارسی ۳۴</span>
                </div>
                <a
                  href="https://nshn.ir"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-emerald-700 font-bold hover:underline"
                >
                  مسیریابی در نشان / بلد
                </a>
              </div>
            </div>
          </div>

          {/* Contact Numbers & Channels */}
          <div className="space-y-3">
            <h3 className="font-black text-stone-900 text-sm flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-emerald-700" />
              <span>راه‌های ارتباطی و تماس با مدیریت:</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="tel:09351506418"
                className="p-3.5 bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 rounded-2xl transition-all flex items-center justify-between"
              >
                <div>
                  <div className="text-[11px] text-stone-500">شماره مستقیم مدیریت (حقدوست):</div>
                  <div className="text-sm font-black text-stone-900 dir-ltr text-right">
                    {toPersianDigits('09351506418')}
                  </div>
                </div>
                <Phone className="w-5 h-5 text-emerald-700" />
              </a>

              <a
                href="tel:09158304737"
                className="p-3.5 bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 rounded-2xl transition-all flex items-center justify-between"
              >
                <div>
                  <div className="text-[11px] text-stone-500">شماره فروشگاه و سفارشات:</div>
                  <div className="text-sm font-black text-stone-900 dir-ltr text-right">
                    {toPersianDigits('09158304737')}
                  </div>
                </div>
                <Phone className="w-5 h-5 text-teal-700" />
              </a>
            </div>

            {/* Eitaa channel button */}
            <a
              href="https://eitaa.com/tavvnhaghdost313H"
              target="_blank"
              rel="noreferrer"
              className="w-full p-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-black rounded-2xl shadow-sm transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <ExternalLink className="w-5 h-5" />
                <span>کانال رسمی ایتا: tavvnhaghdost313H@</span>
              </div>
              <span className="text-xs bg-stone-950/10 px-2 py-1 rounded-md font-bold">عضویت</span>
            </a>
          </div>

          {/* Kalabarg & Electronic Voucher */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2 text-xs">
            <div className="font-extrabold text-emerald-950 flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-emerald-700" />
              <span>اطلاعیه طرح کالابرگ الکترونیکی:</span>
            </div>
            <p className="text-emerald-900 leading-relaxed">
              دستگاه‌های کارتخوان فروشگاه تعاون به سامانه متمرکز کالابرگ الکترونیکی فجرانه متصل می‌باشند. شما عزیزان می‌توانید اقلام اساسی نظیر <strong>روغن ۵ کیلویی، برنج ۱۰ کیلویی پاکستانی، ماست سون، قند، ماکارونی و کلوچه خرمایی</strong> را با استفاده از یارانه خود خریداری فرمایید.
            </p>
          </div>

          {/* Working Hours */}
          <div className="flex items-center gap-2 text-xs text-stone-600 pt-1">
            <Clock className="w-4 h-4 text-stone-500" />
            <span>
              ساعات کاری: همه‌روزه از ۸:۰۰ صبح الی ۲۳:۰۰ شب (یکسره، حتی روزهای تعطیل)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
