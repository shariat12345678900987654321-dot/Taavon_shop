import React, { useState, useMemo } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AdminModal } from './components/AdminModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { StoreInfoModal } from './components/StoreInfoModal';
import { Footer } from './components/Footer';
import { Product } from './types';
import { 
  Sparkles, 
  Flame, 
  CreditCard, 
  Truck, 
  Search, 
  SlidersHorizontal, 
  RotateCcw,
  CheckCircle2,
  Phone,
  ShieldCheck
} from 'lucide-react';
import { toPersianDigits } from './utils/formatters';

const StoreContent: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    onlyKalabarg,
    setOnlyKalabarg,
    onlyRestocked,
    setOnlyRestocked,
    isAdmin,
    setIsAdminModalOpen,
  } = useStore();

  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'stock'>('default');

  // Filter & Search Logic
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (selectedCategory !== 'همه') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Restocked filter
    if (onlyRestocked) {
      list = list.filter((p) => p.isRestocked);
    }

    // Kalabarg filter
    if (onlyKalabarg) {
      list = list.filter((p) => p.hasKalabarg);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.qualityGrade && p.qualityGrade.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'stock') {
      list.sort((a, b) => b.stock - a.stock);
    }

    return list;
  }, [products, selectedCategory, onlyRestocked, onlyKalabarg, searchQuery, sortBy]);

  const hasActiveFilters =
    selectedCategory !== 'همه' || onlyRestocked || onlyKalabarg || searchQuery.trim() !== '';

  const clearAllFilters = () => {
    setSelectedCategory('همه');
    setOnlyRestocked(false);
    setOnlyKalabarg(false);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col selection:bg-emerald-200 selection:text-emerald-950">
      {/* Top Navbar */}
      <Navbar />

      {/* Hero Banner with Store Identity & Announcements */}
      <HeroBanner />

      {/* Category Navigation Pills */}
      <CategoryFilter />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 space-y-6">
        {/* Section Header & Active Filter Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200/80">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                {selectedCategory === 'همه' ? 'همه محصولات فروشگاه تعاون' : selectedCategory}
              </h2>
              {onlyRestocked && (
                <span className="bg-red-600 text-white text-xs font-black px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-white" />
                  <span>فقط شارژ مجدد</span>
                </span>
              )}
              {onlyKalabarg && (
                <span className="bg-emerald-700 text-white text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>کالابرگ فعال</span>
                </span>
              )}
            </div>
            <p className="text-xs text-stone-500 mt-1">
              نمایش {toPersianDigits(filteredProducts.length)} کالا با نرخ منصفانه تعاونی
            </p>
          </div>

          {/* Sort & Filter Controls */}
          <div className="flex items-center gap-2 text-xs">
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-1 px-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-700 font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>حذف فیلترها</span>
              </button>
            )}

            <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-xl px-2.5 py-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
              <span className="text-stone-500 font-medium">مرتب‌سازی:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-bold text-stone-800 focus:outline-hidden cursor-pointer"
              >
                <option value="default">پیش‌فرض (جدیدترین)</option>
                <option value="price-asc">ارزان‌ترین</option>
                <option value="price-desc">گران‌ترین</option>
                <option value="stock">بیشترین موجودی</option>
              </select>
            </div>

            {isAdmin && (
              <button
                onClick={() => setIsAdminModalOpen(true)}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-black rounded-xl shadow-xs transition-colors flex items-center gap-1"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>شارژ اجناس</span>
              </button>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center space-y-4 bg-white rounded-3xl border border-stone-200 p-8 shadow-2xs">
            <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-stone-800">کالایی با این مشخصات یافت نشد!</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
              لطفاً فیلترها یا عبارت جستجو را تغییر دهید یا به بخش «همه محصولات» بازگردید.
            </p>
            <button
              onClick={clearAllFilters}
              className="py-2 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              مشاهده تمام اجناس مغازه
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={() => setIsAdminModalOpen(true)}
              />
            ))}
          </div>
        )}

        {/* Information & Trust Feature Banner */}
        <section className="mt-12 bg-gradient-to-r from-emerald-900 to-stone-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-3 relative z-10 text-right">
            <span className="bg-amber-400 text-stone-950 text-xs font-black px-2.5 py-1 rounded-md inline-block">
              خرید مطمئن و ارزان در کاشمر
            </span>
            <h3 className="text-xl sm:text-2xl font-black leading-snug">
              چرا خرید از فروشگاه تعاون (حقدوست) به‌صرفه‌تر است؟
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              ما واسطه‌ها را حذف کرده‌ایم و کالاها را مستقیماً از کارخانجات و واردکنندگان اصلی در حجم بالا و به صورت نقدی خریداری می‌کنیم. سود فروشگاه به حداقل رسیده تا خواربار، برنج، روغن، ماست و شیرینی با ارزان‌ترین نرخ ممکن به دست خانواده‌های کاشمری برسد.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
              <div className="flex items-center gap-2 text-xs text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>کالابرگ الکترونیکی فعال</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>تحویل سریع در سراسر کاشمر</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>پاسخگویی مستقیم آقای حقدوست</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <ProductDetailModal />
      <AdminModal />
      <OrderSuccessModal />
      <StoreInfoModal />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <StoreContent />
    </StoreProvider>
  );
}
