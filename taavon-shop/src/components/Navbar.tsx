import React, { useState } from 'react';
import { ShoppingBag, Search, Phone, ShieldCheck, LogIn, LogOut, MapPin, X, ExternalLink, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatToman, toPersianDigits } from '../utils/formatters';

export const Navbar: React.FC = () => {
  const {
    cartTotalCount,
    cartTotalPrice,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    isAdmin,
    setIsAdminModalOpen,
    logoutAdmin,
    setIsStoreInfoOpen,
  } = useStore();

  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [loginError, setLoginError] = useState(false);
  const { loginAdmin } = useStore();

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(adminPin);
    if (success) {
      setShowLoginPrompt(false);
      setAdminPin('');
      setLoginError(false);
      setIsAdminModalOpen(true);
    } else {
      setLoginError(true);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Top emergency & information bar */}
      <div className="bg-emerald-800 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-flex items-center gap-1 bg-emerald-700/80 px-2 py-0.5 rounded text-[11px] text-emerald-100 font-bold">
              💥 کالابرگ فعال
            </span>
            <span className="hidden sm:inline">کاشمر: فلکه قوژد، نبش سلمان فارسی ۳۴</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <a
              href="https://eitaa.com/tavvnhaghdost313H"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-amber-300 transition-colors"
            >
              <span>کانال ایتا: tavvnhaghdost313H@</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="tel:09351506418"
              className="flex items-center gap-1 hover:text-amber-300 transition-colors font-bold"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>مدیریت: {toPersianDigits('09351506418')}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          {/* Logo & Store Identity */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsStoreInfoOpen(true)}
              className="flex items-center gap-2.5 text-right group cursor-pointer focus:outline-hidden"
              title="مشاهده اطلاعات و آدرس فروشگاه"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center font-black text-xl shadow-md group-hover:scale-105 transition-transform">
                ت
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="font-extrabold text-stone-900 text-lg sm:text-xl tracking-tight leading-tight">
                    فروشگاه تعاون
                  </h1>
                  <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-1.5 py-0.5 rounded-sm">
                    حقدوست
                  </span>
                </div>
                <p className="text-[12px] text-stone-500 font-medium">
                  خرید مستقیم و حذف واسطه‌ها • کاشمر
                </p>
              </div>
            </button>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجوی کلوچه خرمایی، برنج، روغن ۵ کیلویی، ماست..."
              className="w-full pl-10 pr-10 py-2 text-sm bg-stone-100 border border-stone-200 rounded-full focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-hidden transition-all text-stone-800 placeholder-stone-400"
            />
            <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-3" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3.5 top-2.5 text-stone-400 hover:text-stone-600 p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Store Location Button */}
            <button
              onClick={() => setIsStoreInfoOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>آدرس و اطلاعات</span>
            </button>

            {/* Admin Management Status / Button */}
            {isAdmin ? (
              <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-300 rounded-lg p-1">
                <button
                  onClick={() => setIsAdminModalOpen(true)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-700 text-white hover:bg-emerald-800 text-xs font-bold rounded-md shadow-xs transition-colors cursor-pointer"
                  title="باز کردن پنل شارژ اجناس و مدیریت سفارشات"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span className="hidden sm:inline">پنل مدیریت حقدوست</span>
                  <span className="sm:hidden">مدیر</span>
                </button>
                <button
                  onClick={logoutAdmin}
                  className="p-1.5 text-stone-500 hover:text-red-600 rounded-md transition-colors"
                  title="خروج از حالت مدیریت"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginPrompt(true)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-all cursor-pointer shadow-2xs"
                title="ورود مدیریت فروشگاه (جناب آقای حقدوست) جهت شارژ محصولات"
              >
                <LogIn className="w-4 h-4 text-emerald-700" />
                <span className="hidden sm:inline">ورود مدیریت</span>
                <span className="sm:hidden">ورود</span>
              </button>
            )}

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-xl shadow-sm transition-all cursor-pointer active:scale-95"
            >
              <ShoppingBag className="w-5 h-5" />
              <div className="text-right hidden sm:block">
                <div className="text-[11px] leading-tight text-emerald-100">سبد خرید</div>
                <div className="text-xs font-extrabold leading-tight">
                  {cartTotalCount > 0 ? formatToman(cartTotalPrice) : 'خالی'}
                </div>
              </div>
              {cartTotalCount > 0 && (
                <span className="bg-amber-400 text-stone-900 text-xs font-black w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {toPersianDigits(cartTotalCount)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-2.5 md:hidden relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجوی کلوچه، برنج، روغن، ماست..."
            className="w-full pl-9 pr-10 py-2 text-xs bg-stone-100 border border-stone-200 rounded-full focus:bg-white focus:border-emerald-500 focus:outline-hidden text-stone-800"
          />
          <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-2.5" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-3 top-2 text-stone-400 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Admin Login Modal Prompt */}
      {showLoginPrompt && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl border border-stone-200 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-sm">ورود مدیریت (آقای حقدوست)</h3>
                  <p className="text-[11px] text-stone-500">جهت شارژ موجودی و مدیریت اقلام</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowLoginPrompt(false);
                  setLoginError(false);
                }}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdminSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  شماره موبایل مدیریت یا رمز عبور
                </label>
                <input
                  type="password"
                  value={adminPin}
                  onChange={(e) => {
                    setAdminPin(e.target.value);
                    setLoginError(false);
                  }}
                  autoFocus
                  placeholder="09351506418 یا رمز ورود"
                  className="w-full px-3 py-2 text-center text-sm tracking-wider border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-hidden"
                />
                <p className="text-[11px] text-stone-500 mt-1.5 leading-relaxed bg-stone-50 p-2 rounded border border-stone-100">
                  راهنمای مدیر: می‌توانید با شماره تماس <strong>09351506418</strong> یا رمز پیش‌فرض <strong>1234</strong> وارد شوید.
                </p>
                {loginError && (
                  <p className="text-xs text-red-600 font-medium mt-1">
                    رمز یا شماره وارد شده اشتباه است.
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  ورود به پنل شارژ
                </button>
                <button
                  type="button"
                  onClick={() => {
                    // Quick demo login convenience
                    loginAdmin('09351506418');
                    setShowLoginPrompt(false);
                    setIsAdminModalOpen(true);
                  }}
                  className="py-2.5 px-3 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                  title="ورود سریع تستی مدیر"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>ورود سریع</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
