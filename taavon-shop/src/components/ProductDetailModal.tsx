import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatToman, toPersianDigits } from '../utils/formatters';
import { 
  X, 
  ShoppingCart, 
  CreditCard, 
  Sparkles, 
  Flame, 
  Check, 
  ShieldAlert, 
  Plus, 
  Minus,
  Store,
  Phone
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { 
    activeProductDetail, 
    setActiveProductDetail, 
    addToCart, 
    cart, 
    updateCartQuantity,
    setIsCartOpen 
  } = useStore();

  const [quantity, setQuantity] = useState(1);

  if (!activeProductDetail) return null;

  const product = activeProductDetail;
  const cartItem = cart.find((item) => item.product.id === product.id);
  const cartQty = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setActiveProductDetail(null);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-stone-600 text-xs font-semibold">
            <Store className="w-4 h-4 text-emerald-700" />
            <span>فروشگاه تعاون کاشمر (حقدوست)</span>
            <span>•</span>
            <span className="text-emerald-800">{product.category}</span>
          </div>

          <button
            onClick={() => setActiveProductDetail(null)}
            className="w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image & Badges */}
          <div className="space-y-3">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
              <img
                src={product.imageUrl}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                {product.isRestocked && (
                  <span className="bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1 animate-pulse">
                    <Flame className="w-4 h-4 fill-white" />
                    <span>شارژ مجدد کالا</span>
                  </span>
                )}
                {product.hasKalabarg && (
                  <span className="bg-emerald-700 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1">
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>کالابرگ فعال</span>
                  </span>
                )}
              </div>
            </div>

            {/* Quality notice */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 space-y-1">
              <div className="font-bold flex items-center gap-1 text-emerald-800">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ضمانت اصالت و تازگی بار:</span>
              </div>
              <p className="text-[11px] leading-relaxed text-emerald-950">
                خرید مستقیم و نقدی با حذف واسطه، نگهداری در شرایط دمایی استاندارد و تضمین رضایت مشتری توسط مدیریت فروشگاه تعاون (حقدوست).
              </p>
            </div>
          </div>

          {/* Details & Purchase Controls */}
          <div className="flex flex-col justify-between space-y-4 text-right">
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-stone-900 leading-snug">
                {product.name}
              </h2>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="bg-stone-100 text-stone-700 px-2.5 py-1 rounded-md font-semibold">
                  واحد عرضه: {product.unit}
                </span>
                <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md font-bold">
                  {product.qualityGrade || 'درجه یک ممتاز'}
                </span>
                {product.isDailyFresh && (
                  <span className="bg-amber-100 text-amber-900 px-2.5 py-1 rounded-md font-bold">
                    تولید روز 👌
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pt-1">
                {product.description}
              </p>

              {/* Price Box */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span>قیمت ویژه فروشگاه تعاون:</span>
                  {product.originalPrice && (
                    <span className="line-through text-stone-400">
                      {formatToman(product.originalPrice)}
                    </span>
                  )}
                </div>

                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-bold text-stone-700">قیمت هر {product.unit}:</span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-800">
                    {formatToman(product.price)}
                  </span>
                </div>

                {product.hasKalabarg && (
                  <div className="pt-2 border-t border-stone-200/80 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>امکان تسویه با اعتبار کالابرگ الکترونیکی فجرانه</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions & Quantity Selector */}
            <div className="space-y-3 pt-2">
              {isOutOfStock ? (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-center text-red-700 text-xs font-bold flex items-center justify-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" />
                  <span>این محصول فعلاً ناموجود است و به زودی توسط مدیریت شارژ خواهد شد.</span>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between bg-stone-100 p-2 rounded-xl">
                    <span className="text-xs font-bold text-stone-700">انتخاب مقدار سفارش:</span>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                        disabled={quantity >= product.stock}
                        className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center hover:bg-emerald-800 disabled:opacity-40 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>

                      <div className="font-extrabold text-stone-900 text-sm min-w-14 text-center">
                        {toPersianDigits(quantity)} {product.unit}
                      </div>

                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        className="w-8 h-8 rounded-lg bg-white border border-stone-300 text-stone-700 flex items-center justify-center hover:bg-stone-200 disabled:opacity-40 cursor-pointer"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Calculated total preview */}
                  <div className="flex items-center justify-between text-xs font-medium text-stone-600 px-1">
                    <span>مبلغ کل برای {toPersianDigits(quantity)} {product.unit}:</span>
                    <span className="font-extrabold text-emerald-800 text-sm">
                      {formatToman(product.price * quantity)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleAddToCart}
                      className="py-3 px-3 bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>{cartQty > 0 ? 'افزایش در سبد' : 'افزودن به سبد'}</span>
                    </button>

                    <button
                      onClick={handleBuyNow}
                      className="py-3 px-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-black rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
                    >
                      <span>تکمیل و تسویه خرید</span>
                    </button>
                  </div>
                </>
              )}

              {/* Fast question link */}
              <div className="pt-2 text-center">
                <a
                  href="tel:09351506418"
                  className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-emerald-700"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>سوالی در مورد این کالا دارید؟ تماس با آقای حقدوست ({toPersianDigits('09351506418')})</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
