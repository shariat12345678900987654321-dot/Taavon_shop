import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { formatToman, toPersianDigits } from '../utils/formatters';
import { 
  Plus, 
  Minus, 
  ShoppingCart, 
  CreditCard, 
  Sparkles, 
  Flame, 
  RotateCcw,
  Edit,
  Eye
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit }) => {
  const { 
    cart, 
    addToCart, 
    updateCartQuantity, 
    isAdmin, 
    restockProduct, 
    setActiveProductDetail 
  } = useStore();

  const [isRestockMenuOpen, setIsRestockMenuOpen] = useState(false);
  const [customStockAdd, setCustomStockAdd] = useState(10);
  const [quickPrice, setQuickPrice] = useState(product.price);

  const cartItem = cart.find((item) => item.product.id === product.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = product.stock <= 0;

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleQuickRestock = (amount: number) => {
    restockProduct(product.id, amount, undefined, true);
    setIsRestockMenuOpen(false);
  };

  const handleSavePriceAndStock = (e: React.FormEvent) => {
    e.preventDefault();
    restockProduct(product.id, Number(customStockAdd), Number(quickPrice), true);
    setIsRestockMenuOpen(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 hover:border-emerald-500/50 shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden group">
      {/* Product Image and Badges */}
      <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden cursor-pointer" onClick={() => setActiveProductDetail(product)}>
        <img
          src={product.imageUrl}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 items-end pointer-events-none">
          {product.isRestocked && (
            <span className="bg-red-600 text-white text-[11px] font-black px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-white" />
              <span>شارژ مجدد</span>
            </span>
          )}

          {product.hasKalabarg && (
            <span className="bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
              <CreditCard className="w-3 h-3" />
              <span>کالابرگ فعال</span>
            </span>
          )}

          {product.isDailyFresh && (
            <span className="bg-amber-400 text-stone-900 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-stone-900" />
              <span>تولید روز 👌</span>
            </span>
          )}
        </div>

        {discountPercent > 0 && (
          <div className="absolute bottom-2.5 right-2.5 bg-rose-600 text-white text-[11px] font-black px-2 py-0.5 rounded-md shadow-xs">
            {toPersianDigits(discountPercent)}٪ تخفیف
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveProductDetail(product);
          }}
          className="absolute bottom-2.5 left-2.5 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-lg backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity"
          title="مشاهده جزئیات کالا"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Product Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium mb-1">
            <span>{product.category}</span>
            <span className="text-emerald-700 font-semibold">{product.qualityGrade || 'درجه یک'}</span>
          </div>

          <h3 
            onClick={() => setActiveProductDetail(product)}
            className="font-bold text-stone-900 text-sm leading-snug line-clamp-2 hover:text-emerald-700 cursor-pointer transition-colors"
          >
            {product.name}
          </h3>

          <p className="text-[12px] text-stone-500 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing and Unit */}
        <div className="pt-2 border-t border-stone-100">
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] text-stone-500 font-medium">واحد: {product.unit}</span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through">
                {formatToman(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between mt-0.5">
            <span className="text-xs text-stone-600 font-medium">قیمت تعاونی:</span>
            <span className="text-base sm:text-lg font-black text-emerald-800">
              {formatToman(product.price)}
            </span>
          </div>

          {/* Stock remaining badge */}
          <div className="mt-1 flex items-center justify-between text-[11px]">
            {isOutOfStock ? (
              <span className="text-red-600 font-bold">اتمام موجودی</span>
            ) : product.stock < 10 ? (
              <span className="text-amber-700 font-semibold">
                فقط {toPersianDigits(product.stock)} {product.unit} باقی مانده
              </span>
            ) : (
              <span className="text-stone-500">
                موجودی انبار: {toPersianDigits(product.stock)} {product.unit}
              </span>
            )}
          </div>
        </div>

        {/* Customer Shopping Action Controls */}
        <div className="pt-1">
          {isOutOfStock ? (
            <button
              disabled
              className="w-full py-2 bg-stone-100 text-stone-400 text-xs font-bold rounded-xl cursor-not-allowed"
            >
              به زودی شارژ می‌شود
            </button>
          ) : cartQuantity === 0 ? (
            <button
              onClick={() => addToCart(product, 1)}
              className="w-full py-2.5 px-3 bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>افزودن به سبد خرید</span>
            </button>
          ) : (
            <div className="flex items-center justify-between bg-emerald-50 border border-emerald-300 rounded-xl p-1">
              <button
                onClick={() => updateCartQuantity(product.id, cartQuantity + 1)}
                disabled={cartQuantity >= product.stock}
                className="w-8 h-8 rounded-lg bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="افزایش تعداد"
              >
                <Plus className="w-4 h-4" />
              </button>

              <div className="text-center font-black text-emerald-950 text-sm">
                <span>{toPersianDigits(cartQuantity)}</span>
                <span className="text-[10px] text-emerald-700 mr-1 font-normal">{product.unit}</span>
              </div>

              <button
                onClick={() => updateCartQuantity(product.id, cartQuantity - 1)}
                className="w-8 h-8 rounded-lg bg-white border border-stone-300 hover:bg-red-50 hover:text-red-700 hover:border-red-300 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
                title="کاهش تعداد"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* ADMIN SPECIAL CONTROLS (Only visible when Mr. Haghdoust is logged in!) */}
        {isAdmin && (
          <div className="mt-2 pt-2 border-t border-dashed border-amber-300 bg-amber-50/70 -mx-4 -mb-4 p-3 space-y-2 rounded-b-2xl">
            <div className="flex items-center justify-between text-[11px] text-amber-900 font-black">
              <span>مدیریت حقدوست:</span>
              <button
                onClick={() => setIsRestockMenuOpen(!isRestockMenuOpen)}
                className="text-emerald-800 underline hover:text-emerald-950 font-bold"
              >
                {isRestockMenuOpen ? 'بستن شارژ' : '⚡ شارژ مجدد این کالا'}
              </button>
            </div>

            {/* Quick Restock Buttons */}
            <div className="flex items-center gap-1.5 text-xs">
              <button
                onClick={() => handleQuickRestock(10)}
                className="flex-1 py-1 px-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-[11px] font-bold transition-colors cursor-pointer"
                title="۱۰ واحد به موجودی اضافه کن و برچسب شارژ مجدد بزن"
              >
                +۱۰ شارژ
              </button>
              <button
                onClick={() => handleQuickRestock(50)}
                className="flex-1 py-1 px-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-[11px] font-bold transition-colors cursor-pointer"
                title="۵۰ واحد به موجودی اضافه کن"
              >
                +۵۰ شارژ
              </button>
              {onEdit && (
                <button
                  onClick={() => onEdit(product)}
                  className="p-1 bg-white border border-amber-400 text-amber-900 hover:bg-amber-100 rounded transition-colors"
                  title="ویرایش کامل کالا"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Expanded Restock Form */}
            {isRestockMenuOpen && (
              <form onSubmit={handleSavePriceAndStock} className="pt-2 space-y-2 text-xs border-t border-amber-200">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-stone-700 mb-0.5">افزودن موجودی:</label>
                    <input
                      type="number"
                      min="1"
                      value={customStockAdd}
                      onChange={(e) => setCustomStockAdd(Number(e.target.value))}
                      className="w-full px-2 py-1 bg-white border border-stone-300 rounded text-center text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-stone-700 mb-0.5">قیمت جدید (تومان):</label>
                    <input
                      type="number"
                      value={quickPrice}
                      onChange={(e) => setQuickPrice(Number(e.target.value))}
                      className="w-full px-2 py-1 bg-white border border-stone-300 rounded text-center text-xs"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-1.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-black rounded text-xs flex items-center justify-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>ثبت شارژ مجدد و بروزرسانی قیمت</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
