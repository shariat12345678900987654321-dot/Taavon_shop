import React from 'react';
import { 
  Store, 
  MapPin, 
  Phone, 
  ExternalLink, 
  CreditCard, 
  Clock, 
  ShieldCheck, 
  Heart 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { toPersianDigits } from '../utils/formatters';

export const Footer: React.FC = () => {
  const { setIsAdminModalOpen, isAdmin, setIsStoreInfoOpen } = useStore();

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 pt-10 pb-6 mt-16 text-right">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-stone-800">
        {/* Column 1: Store Intro */}
        <div className="md:col-span-5 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-xl">
              ت
            </div>
            <div>
              <h3 className="text-white font-black text-lg">فروشگاه تعاون</h3>
              <p className="text-xs text-amber-400 font-bold">مدیریت: حقدوست</p>
            </div>
          </div>

          <p className="text-xs text-stone-400 leading-relaxed max-w-md">
            با خرید مستقیم و حذف واسطه‌ها، خرید نقدی در حجم بالا، و پایین آوردن درصد سود فروشگاه، سعی داریم کالا با بالاترین کیفیت و قیمت منصفانه و تعاونی به دست همشهریان گرامی در کاشمر برسد.
          </p>

          <div className="flex items-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold px-2.5 py-1 rounded-md">
              <CreditCard className="w-3.5 h-3.5" />
              <span>کالابرگ الکترونیکی فعال</span>
            </span>
            <span className="inline-flex items-center gap-1 bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-bold px-2.5 py-1 rounded-md">
              <span>تضمین بار تازه و تولید روز</span>
            </span>
          </div>
        </div>

        {/* Column 2: Quick Links & Categories */}
        <div className="md:col-span-3 space-y-3 text-xs">
          <h4 className="font-extrabold text-white text-sm">اقلام پرفروش و ویژه</h4>
          <ul className="space-y-2 text-stone-400">
            <li className="hover:text-emerald-400 transition-colors">
              💥 کلوچه خرمایی تازه شاه شکر (تولید روز)
            </li>
            <li className="hover:text-emerald-400 transition-colors">
              🍚 برنج ۱۰ کیلویی سوپر باسماتی پاکستان
            </li>
            <li className="hover:text-emerald-400 transition-colors">
              🛢️ روغن خوراکی مصرفی ۵ کیلویی خانوار
            </li>
            <li className="hover:text-emerald-400 transition-colors">
              🥛 ماست سون پرچرب کاله ۲ کیلوگرمی
            </li>
            <li className="hover:text-emerald-400 transition-colors">
              🍝 اسپاگتی و ماکارونی زر و تک ماکارون
            </li>
          </ul>
        </div>

        {/* Column 3: Contact & Address */}
        <div className="md:col-span-4 space-y-3 text-xs">
          <h4 className="font-extrabold text-white text-sm">آدرس و تماس با فروشگاه</h4>

          <div className="space-y-2 text-stone-400">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>کاشمر : فلکه قوژد، نبش سلمان فارسی ۳۴، فروشگاه تعاون (حقدوست)</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <a href="tel:09351506418" className="hover:text-white dir-ltr font-bold text-stone-200">
                {toPersianDigits('09351506418')}
              </a>
              <span>(مدیریت)</span>
              <span>•</span>
              <a href="tel:09158304737" className="hover:text-white dir-ltr font-bold text-stone-200">
                {toPersianDigits('09158304737')}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>ساعات کار: همه‌روزه ۸:۰۰ صبح الی ۲۳:۰۰ شب (یکسره)</span>
            </div>

            <div className="pt-2">
              <a
                href="https://eitaa.com/tavvnhaghdost313H"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg transition-colors"
              >
                <span>عضویت در کانال ایتا فروشگاه تعاون</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright & Admin Link */}
      <div className="max-w-7xl mx-auto px-4 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
        <div>
          تمامی حقوق برای فروشگاه تعاون کاشمر (با مدیریت حقدوست) محفوظ است.
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAdminModalOpen(true)}
            className="hover:text-stone-300 underline text-[11px] cursor-pointer"
          >
            {isAdmin ? 'ورود به پنل شارژ اجناس (مدیر)' : 'ورود مدیریت فروشگاه'}
          </button>
          <span>•</span>
          <button
            onClick={() => setIsStoreInfoOpen(true)}
            className="hover:text-stone-300 text-[11px] cursor-pointer"
          >
            اطلاعات فروشگاه
          </button>
        </div>
      </div>
    </footer>
  );
};
