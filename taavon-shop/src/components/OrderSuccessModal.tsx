import React from 'react';
import { useStore } from '../context/StoreContext';
import { formatToman, toPersianDigits } from '../utils/formatters';
import { CheckCircle2, X, Phone, ExternalLink, Printer, Share2, MapPin, CreditCard } from 'lucide-react';

export const OrderSuccessModal: React.FC = () => {
  const { lastSubmittedOrder } = useStore();

  if (!lastSubmittedOrder) return null;

  const handlePrint = () => {
    window.print();
  };

  const eitaaShareText = encodeURIComponent(
    `سلام جناب آقای حقدوست\nسفارش جدید در فروشگاه تعاون ثبت شد.\nکد سفارش: ${lastSubmittedOrder.orderNumber}\nنام: ${lastSubmittedOrder.customerName}\nمبلغ: ${lastSubmittedOrder.totalAmount} تومان\nتلفن: ${lastSubmittedOrder.customerPhone}`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-emerald-200 text-right animate-in fade-in zoom-in-95 duration-200">
        {/* Success Header */}
        <div className="bg-gradient-to-r from-emerald-700 to-teal-800 text-white p-6 text-center space-y-2">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto text-white backdrop-blur-xs">
            <CheckCircle2 className="w-9 h-9 text-emerald-200" />
          </div>
          <h2 className="text-xl font-black">سفارش شما با موفقیت ثبت گردید</h2>
          <p className="text-xs text-emerald-100">
            فروشگاه تعاون (حقدوست) • کاشمر
          </p>
          <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-bold text-white mt-1">
            کد رهگیری سفارش: {lastSubmittedOrder.orderNumber}
          </div>
        </div>

        {/* Invoice Body */}
        <div className="p-5 space-y-4 text-xs">
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3.5 space-y-2">
            <div className="flex justify-between text-stone-600">
              <span>تحویل گیرنده:</span>
              <span className="font-bold text-stone-900">{lastSubmittedOrder.customerName}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>شماره همراه:</span>
              <span className="font-bold text-stone-900 dir-ltr">{lastSubmittedOrder.customerPhone}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>شیوه تحویل:</span>
              <span className="font-bold text-emerald-800">
                {lastSubmittedOrder.deliveryMethod === 'delivery'
                  ? 'ارسال با پیک درب منزل در کاشمر'
                  : 'تحویل حضوری در فروشگاه (فلکه قوژد)'}
              </span>
            </div>
            {lastSubmittedOrder.address && (
              <div className="text-stone-600 pt-1 border-t border-stone-200/60">
                <span>آدرس: </span>
                <span className="text-stone-800 font-medium">{lastSubmittedOrder.address}</span>
              </div>
            )}
          </div>

          {/* Items Summary */}
          <div className="space-y-1.5">
            <div className="font-bold text-stone-800">اقلام فاکتور:</div>
            <div className="bg-stone-50 rounded-xl p-3 divide-y divide-stone-200/60">
              {lastSubmittedOrder.items.map((item, i) => (
                <div key={i} className="py-1.5 flex justify-between">
                  <span className="text-stone-700">
                    {item.productName} ({toPersianDigits(item.quantity)} {item.unit})
                  </span>
                  <span className="font-black text-stone-900">
                    {formatToman(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 space-y-1.5 text-xs text-emerald-950">
            {lastSubmittedOrder.kalabargEligibleAmount > 0 && (
              <div className="flex justify-between text-emerald-800 font-semibold">
                <span>مبلغ مشمول طرح کالابرگ:</span>
                <span>{formatToman(lastSubmittedOrder.kalabargEligibleAmount)}</span>
              </div>
            )}
            <div className="flex justify-between font-black text-sm text-emerald-950 pt-1 border-t border-emerald-200">
              <span>مبلغ کل سفارش:</span>
              <span className="text-emerald-800 text-base">{formatToman(lastSubmittedOrder.totalAmount)}</span>
            </div>
          </div>

          {/* Follow up options */}
          <div className="space-y-2 pt-2">
            <a
              href={`https://eitaa.com/tavvnhaghdost313H`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-black rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>ارسال مشخصات فاکتور به کانال ایتا فروشگاه</span>
            </a>

            <a
              href="tel:09351506418"
              className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-700" />
              <span>تماس فوری با آقای حقدوست ({toPersianDigits('09351506418')})</span>
            </a>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-stone-200">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 text-stone-500 hover:text-stone-800 p-1"
            >
              <Printer className="w-4 h-4" />
              <span>چاپ فاکتور</span>
            </button>

            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl transition-colors"
            >
              بازگشت به فروشگاه
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
