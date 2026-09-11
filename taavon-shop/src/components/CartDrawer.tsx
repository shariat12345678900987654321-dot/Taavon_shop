import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatToman, toPersianDigits } from '../utils/formatters';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  CreditCard, 
  Truck, 
  Store, 
  Banknote, 
  CheckCircle,
  AlertCircle,
  Phone
} from 'lucide-react';
import { DeliveryMethod, PaymentMethod } from '../types';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart,
    cartTotalPrice, 
    cartTotalCount,
    cartKalabargTotal,
    submitOrder 
  } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('delivery');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('kalabarg');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  if (!isCartOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (cart.length === 0) {
      setFormError('سبد خرید شما خالی است.');
      return;
    }

    if (!customerName.trim()) {
      setFormError('لطفاً نام و نام خانوادگی خود را وارد کنید.');
      return;
    }

    if (!customerPhone.trim() || customerPhone.trim().length < 10) {
      setFormError('لطفاً یک شماره موبایل معتبر (مثلاً 0915xxxxxxx) وارد کنید.');
      return;
    }

    if (deliveryMethod === 'delivery' && !address.trim()) {
      setFormError('لطفاً آدرس دقیق خود در کاشمر را وارد کنید.');
      return;
    }

    setIsSubmitting(true);

    try {
      submitOrder({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        deliveryMethod,
        address: deliveryMethod === 'delivery' ? address.trim() : 'تحویل حضوری در فروشگاه تعاون (فلکه قوژد، نبش سلمان فارسی ۳۴)',
        paymentMethod,
        notes: notes.trim(),
      });
    } catch {
      setFormError('خطایی در ثبت سفارش رخ داد. لطفاً مجدداً تلاش نمایید.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm sm:text-base">سبد خرید شما</h2>
              <p className="text-[11px] text-stone-300">
                {cartTotalCount > 0 ? `${toPersianDigits(cartTotalCount)} قلم کالا آماده سفارش` : 'هنوز کالایی انتخاب نشده'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-[11px] text-stone-300 hover:text-red-400 p-1.5 transition-colors"
                title="خالی کردن سبد"
              >
                خالی کردن
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 divide-y divide-stone-100">
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-stone-600 text-sm font-bold">سبد خرید شما خالی است</p>
              <p className="text-xs text-stone-400 max-w-xs mx-auto leading-relaxed">
                می‌توانید از محصولات تازه مانند کلوچه خرمایی، برنج ۱۰ کیلویی و روغن ۵ کیلویی به سبد خرید خود اضافه کنید.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 py-2 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                مشاهده محصولات فروشگاه
              </button>
            </div>
          ) : (
            <>
              {/* Items list */}
              <div className="space-y-3 pb-3">
                {cart.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 p-2.5 bg-stone-50 rounded-2xl border border-stone-200/70"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover shrink-0 bg-stone-200"
                    />

                    <div className="flex-1 min-w-0 text-right">
                      <div className="flex items-center gap-1">
                        <h4 className="font-bold text-xs text-stone-900 truncate">
                          {product.name}
                        </h4>
                      </div>

                      <div className="text-[11px] text-stone-500 mt-0.5">
                        هر {product.unit}: {formatToman(product.price)}
                      </div>

                      <div className="text-xs font-black text-emerald-800 mt-1">
                        جمع: {formatToman(product.price * quantity)}
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-lg p-0.5 shadow-2xs">
                        <button
                          onClick={() => updateCartQuantity(product.id, quantity + 1)}
                          disabled={quantity >= product.stock}
                          className="w-6 h-6 rounded bg-emerald-700 hover:bg-emerald-800 disabled:opacity-30 text-white flex items-center justify-center text-xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-black w-6 text-center text-stone-900">
                          {toPersianDigits(quantity)}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(product.id, quantity - 1)}
                          className="w-6 h-6 rounded bg-stone-100 hover:bg-red-50 hover:text-red-700 text-stone-700 flex items-center justify-center text-xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-[11px] text-stone-400 hover:text-red-600 flex items-center gap-0.5 pt-0.5"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>حذف</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Kalabarg Highlight Box */}
              {cartKalabargTotal > 0 && (
                <div className="pt-3">
                  <div className="p-3.5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-300 rounded-2xl flex items-start gap-2.5">
                    <CreditCard className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <div className="text-xs text-right space-y-1">
                      <div className="font-extrabold text-emerald-950">
                        مبلغ قابل پرداخت با کالابرگ الکترونیکی:
                      </div>
                      <div className="text-sm font-black text-emerald-800">
                        {formatToman(cartKalabargTotal)}
                      </div>
                      <p className="text-[11px] text-emerald-900/80 leading-relaxed">
                        می‌توانید برای این بخش از سفارشتان از اعتبار طرح فجرانه و یارانه خود در دستگاه پوز فروشگاه استفاده نمایید.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Checkout Form */}
              <form onSubmit={handleSubmit} className="pt-4 space-y-4 text-right">
                <h3 className="font-extrabold text-stone-900 text-xs sm:text-sm">
                  مشخصات تحویل و ثبت سفارش:
                </h3>

                {formError && (
                  <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-1.5 font-bold">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      نام و نام خانوادگی *
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="مثال: علی رضایی"
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      شماره تماس همراه *
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="0915XXXXXXX"
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden text-left dir-ltr"
                    />
                  </div>
                </div>

                {/* Delivery Method Selector */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    نحوه دریافت سفارش:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('delivery')}
                      className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                        deliveryMethod === 'delivery'
                          ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-200'
                          : 'bg-white border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold text-xs text-stone-900">
                        <Truck className="w-4 h-4 text-emerald-700" />
                        <span>تحویل درب منزل</span>
                      </div>
                      <div className="text-[10px] text-stone-500 mt-0.5">پیک سریع در شهر کاشمر</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('pickup')}
                      className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                        deliveryMethod === 'pickup'
                          ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-200'
                          : 'bg-white border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold text-xs text-stone-900">
                        <Store className="w-4 h-4 text-emerald-700" />
                        <span>تحویل حضوری</span>
                      </div>
                      <div className="text-[10px] text-stone-500 mt-0.5">فلکه قوژد، نبش سلمان ۳۴</div>
                    </button>
                  </div>
                </div>

                {deliveryMethod === 'delivery' && (
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      آدرس دقیق در کاشمر *
                    </label>
                    <textarea
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="خیابان، کوچه، پلاک، طبقه یا واحد..."
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>
                )}

                {/* Payment Method Selector */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    نحوه پرداخت:
                  </label>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 p-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="kalabarg"
                        checked={paymentMethod === 'kalabarg'}
                        onChange={() => setPaymentMethod('kalabarg')}
                        className="text-emerald-700 focus:ring-emerald-500"
                      />
                      <CreditCard className="w-4 h-4 text-emerald-700" />
                      <div className="text-right flex-1">
                        <span className="text-xs font-bold text-stone-900">
                          پرداخت با کالابرگ الکترونیکی (کارتخوان سیار یا حضوری)
                        </span>
                        <div className="text-[10px] text-emerald-700">ویژه اقلام مشمول طرح یارانه فجرانه</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-2 p-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash_on_delivery"
                        checked={paymentMethod === 'cash_on_delivery'}
                        onChange={() => setPaymentMethod('cash_on_delivery')}
                        className="text-emerald-700 focus:ring-emerald-500"
                      />
                      <Banknote className="w-4 h-4 text-amber-600" />
                      <div className="text-right flex-1">
                        <span className="text-xs font-bold text-stone-900">
                          پرداخت نقدی یا کارتخوان هنگام دریافت سفارش
                        </span>
                      </div>
                    </label>

                    <label className="flex items-center gap-2 p-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card_transfer"
                        checked={paymentMethod === 'card_transfer'}
                        onChange={() => setPaymentMethod('card_transfer')}
                        className="text-emerald-700 focus:ring-emerald-500"
                      />
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      <div className="text-right flex-1">
                        <span className="text-xs font-bold text-stone-900">
                          کارت‌به‌کارت به شماره حساب مدیریت حقدوست
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    توضیحات یا زمان دلخواه تحویل (اختیاری):
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="مثلاً: لطفاً عصر بین ساعت ۵ تا ۷ ارسال شود"
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                {/* Order Summary Bottom Sticky */}
                <div className="pt-3 border-t border-stone-200 space-y-2">
                  <div className="flex items-center justify-between text-xs text-stone-600">
                    <span>مجموع قیمت اقلام ({toPersianDigits(cartTotalCount)} قلم):</span>
                    <span className="font-bold text-stone-900">{formatToman(cartTotalPrice)}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm font-black text-stone-900 pt-1">
                    <span>مبلغ قابل پرداخت نهایی:</span>
                    <span className="text-emerald-800 text-lg">{formatToman(cartTotalPrice)}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 disabled:opacity-50 text-white font-black text-sm rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>{isSubmitting ? 'در حال ثبت...' : 'ثبت نهایی سفارش در فروشگاه تعاون'}</span>
                  </button>

                  <p className="text-[11px] text-center text-stone-400">
                    پس از ثبت، فاکتور صادر شده و بلافاصله با شما تماس گرفته می‌شود.
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
