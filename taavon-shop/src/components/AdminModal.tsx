import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, Category, OrderStatus } from '../types';
import { formatToman, toPersianDigits } from '../utils/formatters';
import { 
  X, 
  Plus, 
  RotateCcw, 
  Package, 
  ShoppingBag, 
  Megaphone, 
  Trash2, 
  Edit, 
  Check, 
  Upload, 
  Phone, 
  Flame, 
  CreditCard, 
  Sparkles,
  RefreshCw,
  LogOut
} from 'lucide-react';

const CATEGORIES: Category[] = [
  'شیرینی و تنقلات',
  'برنج و حبوبات',
  'روغن و چربی‌ها',
  'لبنیات تازه',
  'ماکارونی و پاستا',
  'نوشیدنی',
  'شوینده و بهداشتی',
  'کنسرو و چاشنی',
];

export const AdminModal: React.FC = () => {
  const {
    isAdminModalOpen,
    setIsAdminModalOpen,
    products,
    orders,
    announcements,
    restockProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    updateAnnouncement,
    logoutAdmin,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'restock' | 'addProduct' | 'orders' | 'notice'>('restock');

  // Restock form state for individual items
  const [restockQty, setRestockQty] = useState<{ [id: string]: number }>({});
  const [restockPrice, setRestockPrice] = useState<{ [id: string]: number }>({});
  const [restockFeedback, setRestockFeedback] = useState<{ [id: string]: string }>({});

  // Add/Edit Product form state
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('شیرینی و تنقلات');
  const [price, setPrice] = useState<number>(100000);
  const [originalPrice, setOriginalPrice] = useState<number>(120000);
  const [unit, setUnit] = useState('کیلوگرم');
  const [stock, setStock] = useState<number>(50);
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=800&q=80');
  const [description, setDescription] = useState('');
  const [isRestocked, setIsRestocked] = useState(true);
  const [hasKalabarg, setHasKalabarg] = useState(true);
  const [isDailyFresh, setIsDailyFresh] = useState(true);
  const [qualityGrade, setQualityGrade] = useState('بار درجه یک و تازه');

  // Notice state
  const [noticeTitle, setNoticeTitle] = useState(announcements[0]?.title || '');
  const [noticeContent, setNoticeContent] = useState(announcements[0]?.content || '');

  if (!isAdminModalOpen) return null;

  const handleApplyRestock = (productId: string) => {
    const qty = restockQty[productId] || 10;
    const newPrice = restockPrice[productId];
    restockProduct(productId, qty, newPrice, true);

    setRestockFeedback((prev) => ({
      ...prev,
      [productId]: `با موفقیت ${toPersianDigits(qty)} واحد شارژ شد!`,
    }));

    setTimeout(() => {
      setRestockFeedback((prev) => {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      });
    }, 3000);
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    if (editingProductId) {
      const existing = products.find((p) => p.id === editingProductId);
      if (existing) {
        updateProduct({
          ...existing,
          name,
          category,
          price,
          originalPrice: originalPrice > price ? originalPrice : undefined,
          unit,
          stock,
          imageUrl: imageUrl || existing.imageUrl,
          description,
          isRestocked,
          hasKalabarg,
          isDailyFresh,
          qualityGrade,
        });
      }
      setEditingProductId(null);
    } else {
      addProduct({
        name,
        category,
        price,
        originalPrice: originalPrice > price ? originalPrice : undefined,
        unit,
        stock,
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
        description,
        isRestocked,
        hasKalabarg,
        isDailyFresh,
        qualityGrade,
      });
    }

    // Reset fields
    setName('');
    setDescription('');
    setActiveTab('restock');
  };

  const startEditProduct = (p: Product) => {
    setEditingProductId(p.id);
    setName(p.name);
    setCategory(p.category);
    setPrice(p.price);
    setOriginalPrice(p.originalPrice || Math.round(p.price * 1.15));
    setUnit(p.unit);
    setStock(p.stock);
    setImageUrl(p.imageUrl);
    setDescription(p.description);
    setIsRestocked(p.isRestocked);
    setHasKalabarg(p.hasKalabarg);
    setIsDailyFresh(!!p.isDailyFresh);
    setQualityGrade(p.qualityGrade || 'درجه یک');
    setActiveTab('addProduct');
  };

  const handleSaveNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (announcements[0]) {
      updateAnnouncement({
        ...announcements[0],
        title: noticeTitle,
        content: noticeContent,
      });
      alert('پیام بالای سایت با موفقیت بروزرسانی شد.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200 text-right">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-800 to-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-stone-900 flex items-center justify-center font-black text-xl shadow-xs">
              ت
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-black text-base sm:text-lg text-white">
                  پنل مدیریت فروشگاه تعاون (آقای حقدوست)
                </h2>
                <span className="bg-emerald-600/80 text-emerald-100 text-[11px] font-bold px-2 py-0.5 rounded-full">
                  کاشمر
                </span>
              </div>
              <p className="text-xs text-stone-300">
                شارژ موجودی بار جدید، ثبت کالاهای تازه، و پیگیری سفارشات مشتریان
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                logoutAdmin();
                setIsAdminModalOpen(false);
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-red-600/80 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>خروج مدیریت</span>
            </button>

            <button
              onClick={() => setIsAdminModalOpen(false)}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-stone-100 border-b border-stone-200 px-4 pt-3 flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('restock')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-bold text-xs sm:text-sm transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'restock'
                ? 'bg-white text-emerald-800 border-emerald-700 shadow-2xs'
                : 'text-stone-600 border-transparent hover:text-stone-900'
            }`}
          >
            <RotateCcw className="w-4 h-4 text-amber-500" />
            <span>💥 شارژ سریع موجودی کالاها ({toPersianDigits(products.length)})</span>
          </button>

          <button
            onClick={() => {
              setEditingProductId(null);
              setName('');
              setActiveTab('addProduct');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-bold text-xs sm:text-sm transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'addProduct'
                ? 'bg-white text-emerald-800 border-emerald-700 shadow-2xs'
                : 'text-stone-600 border-transparent hover:text-stone-900'
            }`}
          >
            <Plus className="w-4 h-4 text-emerald-600" />
            <span>{editingProductId ? 'ویرایش کالا' : 'افزودن محصول جدید'}</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-bold text-xs sm:text-sm transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-white text-emerald-800 border-emerald-700 shadow-2xs'
                : 'text-stone-600 border-transparent hover:text-stone-900'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-teal-600" />
            <span>سفارشات مشتریان ({toPersianDigits(orders.length)})</span>
          </button>

          <button
            onClick={() => setActiveTab('notice')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-bold text-xs sm:text-sm transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'notice'
                ? 'bg-white text-emerald-800 border-emerald-700 shadow-2xs'
                : 'text-stone-600 border-transparent hover:text-stone-900'
            }`}
          >
            <Megaphone className="w-4 h-4 text-amber-600" />
            <span>پیام بالای سایت و ایتا</span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* TAB 1: RESTOCK PRODUCTS */}
          {activeTab === 'restock' && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="font-black text-amber-950 text-sm flex items-center gap-1.5">
                    <Flame className="w-4 h-4 fill-amber-500 text-amber-600" />
                    <span>شارژ مجدد اجناس مغازه (مدیریت حقدوست):</span>
                  </h3>
                  <p className="text-xs text-amber-900/80 leading-relaxed">
                    هر باری که وارد فروشگاه می‌شود (مثلاً کلوچه خرمایی تازه، برنج پاکستانی رویال یا روغن ۵ کیلویی) می‌توانید با کلیک روی دکمه‌های زیر، موجودی را افزایش دهید و قیمت را به روزرسانی کنید.
                  </p>
                </div>

                <div className="shrink-0">
                  <span className="bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-2xs">
                    مشتریان فقط دسترسی خرید دارند
                  </span>
                </div>
              </div>

              {/* Products Table/Grid for Restock */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((p) => {
                  const currentAdd = restockQty[p.id] || 10;
                  const currentPrice = restockPrice[p.id] !== undefined ? restockPrice[p.id] : p.price;
                  const feedback = restockFeedback[p.id];

                  return (
                    <div
                      key={p.id}
                      className="bg-white border border-stone-200 rounded-2xl p-4 shadow-xs hover:border-emerald-400 transition-all flex flex-col justify-between space-y-3"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 rounded-xl object-cover bg-stone-100 shrink-0 border border-stone-200"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="font-bold text-xs sm:text-sm text-stone-900 truncate">
                              {p.name}
                            </h4>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                            <span>دسته: {p.category}</span>
                            <span>•</span>
                            <span className="font-bold text-emerald-800">
                              موجودی فعلی: {toPersianDigits(p.stock)} {p.unit}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-stone-600">قیمت فعلی:</span>
                            <span className="text-xs font-black text-stone-900">
                              {formatToman(p.price)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Restock Actions */}
                      <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 space-y-2.5">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <label className="block text-[11px] font-bold text-stone-600 mb-1">
                              افزایش موجودی:
                            </label>
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                min="1"
                                value={currentAdd}
                                onChange={(e) =>
                                  setRestockQty((prev) => ({
                                    ...prev,
                                    [p.id]: Number(e.target.value),
                                  }))
                                }
                                className="w-full px-2 py-1 bg-white border border-stone-300 rounded-lg text-center text-xs font-bold"
                              />
                              <span className="text-[10px] text-stone-500">{p.unit}</span>
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-stone-600 mb-1">
                              قیمت جدید (تومان):
                            </label>
                            <input
                              type="number"
                              value={currentPrice}
                              onChange={(e) =>
                                setRestockPrice((prev) => ({
                                  ...prev,
                                  [p.id]: Number(e.target.value),
                                }))
                              }
                              className="w-full px-2 py-1 bg-white border border-stone-300 rounded-lg text-center text-xs font-bold"
                            />
                          </div>
                        </div>

                        {/* Quick stock preset pills */}
                        <div className="flex items-center gap-1 text-[11px]">
                          <span className="text-stone-400 text-[10px]">افزودن سریع:</span>
                          <button
                            type="button"
                            onClick={() => {
                              setRestockQty((prev) => ({ ...prev, [p.id]: 10 }));
                              restockProduct(p.id, 10, currentPrice, true);
                            }}
                            className="px-2 py-0.5 bg-stone-200 hover:bg-emerald-100 hover:text-emerald-800 rounded font-semibold transition-colors"
                          >
                            +۱۰
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setRestockQty((prev) => ({ ...prev, [p.id]: 25 }));
                              restockProduct(p.id, 25, currentPrice, true);
                            }}
                            className="px-2 py-0.5 bg-stone-200 hover:bg-emerald-100 hover:text-emerald-800 rounded font-semibold transition-colors"
                          >
                            +۲۵
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setRestockQty((prev) => ({ ...prev, [p.id]: 50 }));
                              restockProduct(p.id, 50, currentPrice, true);
                            }}
                            className="px-2 py-0.5 bg-stone-200 hover:bg-emerald-100 hover:text-emerald-800 rounded font-semibold transition-colors"
                          >
                            +۵۰
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setRestockQty((prev) => ({ ...prev, [p.id]: 100 }));
                              restockProduct(p.id, 100, currentPrice, true);
                            }}
                            className="px-2 py-0.5 bg-stone-200 hover:bg-emerald-100 hover:text-emerald-800 rounded font-semibold transition-colors"
                          >
                            +۱۰۰
                          </button>
                        </div>

                        {feedback && (
                          <div className="text-[11px] text-emerald-700 bg-emerald-100 p-1.5 rounded-lg text-center font-bold">
                            {feedback}
                          </div>
                        )}

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => handleApplyRestock(p.id)}
                            className="flex-1 py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>ثبت شارژ مجدد و برچسب ویژه 💥</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => startEditProduct(p)}
                            className="p-2 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-xl transition-colors"
                            title="ویرایش کامل مشخصات"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: ADD / EDIT PRODUCT */}
          {activeTab === 'addProduct' && (
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <h3 className="font-extrabold text-stone-900 text-sm sm:text-base">
                  {editingProductId ? 'ویرایش اطلاعات کالا' : 'افزودن محصول جدید به مغازه'}
                </h3>
                {editingProductId && (
                  <button
                    onClick={() => {
                      setEditingProductId(null);
                      setName('');
                    }}
                    className="text-xs text-stone-500 hover:text-stone-800"
                  >
                    انصراف از ویرایش
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-stone-700 mb-1">نام کالا *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="مثال: کلوچه خرمایی تازه شاه شکر"
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">دسته‌بندی</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as Category)}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-white"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      واحد عرضه (مثلاً کیلوگرم، کیسه ۱۰ کیلویی، حلب ۵ کیلویی)
                    </label>
                    <input
                      type="text"
                      required
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      placeholder="کیلوگرم، بسته، حلب ۵ کیلویی..."
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      قیمت منصفانه تعاونی (تومان) *
                    </label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      قیمت بازار یا روی جلد (جهت نمایش تخفیف)
                    </label>
                    <input
                      type="number"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      موجودی اولیه در انبار
                    </label>
                    <input
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      درجه کیفی کالا
                    </label>
                    <input
                      type="text"
                      value={qualityGrade}
                      onChange={(e) => setQualityGrade(e.target.value)}
                      placeholder="بار درجه یک، صادراتی، اعلا..."
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      تصویر محصول (آپلود عکس یا آدرس اینترنتی)
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="relative w-16 h-16 rounded-xl bg-stone-100 border border-stone-200 overflow-hidden shrink-0">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt="پیش‌نمایش"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Package className="w-6 h-6 text-stone-400 m-auto mt-5" />
                        )}
                      </div>

                      <div className="flex-1 space-y-1.5">
                        <input
                          type="text"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          placeholder="آدرس اینترنتی عکس..."
                          className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg focus:outline-hidden dir-ltr text-left"
                        />
                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-semibold cursor-pointer transition-colors">
                          <Upload className="w-3.5 h-3.5" />
                          <span>انتخاب و آپلود عکس از دستگاه</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageFileUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      توضیحات و مشخصات کالا
                    </label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="توضیح درباره اصالت، تولید روز، طعم و نحوه مصرف..."
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Badges Toggles */}
                <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                  <div className="text-xs font-bold text-stone-700">برچسب‌ها و امتیازات:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <label className="flex items-center gap-2 p-2 bg-white rounded-xl border border-stone-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isRestocked}
                        onChange={(e) => setIsRestocked(e.target.checked)}
                        className="rounded text-red-600 focus:ring-red-500"
                      />
                      <span className="text-xs font-bold text-stone-800">💥 شارژ مجدد</span>
                    </label>

                    <label className="flex items-center gap-2 p-2 bg-white rounded-xl border border-stone-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasKalabarg}
                        onChange={(e) => setHasKalabarg(e.target.checked)}
                        className="rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-xs font-bold text-stone-800">💳 کالابرگ فعال</span>
                    </label>

                    <label className="flex items-center gap-2 p-2 bg-white rounded-xl border border-stone-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isDailyFresh}
                        onChange={(e) => setIsDailyFresh(e.target.checked)}
                        className="rounded text-amber-600 focus:ring-amber-500"
                      />
                      <span className="text-xs font-bold text-stone-800">👌 بار تولید روز</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>{editingProductId ? 'ذخیره تغییرات محصول' : 'ثبت و انتشار کالا در فروشگاه'}</span>
                  </button>

                  {editingProductId && (
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('آیا از حذف این کالا اطمینان دارید؟')) {
                          deleteProduct(editingProductId);
                          setEditingProductId(null);
                          setActiveTab('restock');
                        }
                      }}
                      className="py-3 px-4 bg-red-100 hover:bg-red-200 text-red-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>حذف کالا</span>
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: CUSTOMER ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-stone-900 text-sm">
                    سفارشات ثبت شده توسط همشهریان کاشمری
                  </h3>
                  <p className="text-xs text-stone-500">
                    وضعیت سفارش را پس از بسته‌بندی یا ارسال تغییر دهید.
                  </p>
                </div>
                <span className="text-xs font-bold text-stone-600">
                  کل سفارشات: {toPersianDigits(orders.length)}
                </span>
              </div>

              {orders.length === 0 ? (
                <div className="py-12 text-center text-stone-400 space-y-2">
                  <ShoppingBag className="w-12 h-12 mx-auto text-stone-300" />
                  <p className="font-bold text-sm">هنوز سفارشی ثبت نشده است</p>
                  <p className="text-xs">سفارشاتی که مشتریان ثبت کنند در این بخش نمایش داده می‌شوند.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-white border border-stone-200 rounded-2xl p-4 shadow-xs space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-stone-100">
                        <div className="flex items-center gap-2">
                          <span className="bg-stone-900 text-white text-xs font-black px-2 py-0.5 rounded-md">
                            کد سفارش: {ord.orderNumber}
                          </span>
                          <span className="text-xs text-stone-500">{ord.createdAt}</span>
                        </div>

                        {/* Status badge & selector */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-stone-600">وضعیت:</span>
                          <select
                            value={ord.status}
                            onChange={(e) =>
                              updateOrderStatus(ord.id, e.target.value as OrderStatus)
                            }
                            className={`px-2.5 py-1 text-xs font-bold rounded-lg border focus:outline-hidden ${
                              ord.status === 'delivered'
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                : ord.status === 'packing'
                                ? 'bg-amber-100 text-amber-900 border-amber-300'
                                : ord.status === 'confirmed'
                                ? 'bg-blue-100 text-blue-800 border-blue-300'
                                : 'bg-stone-100 text-stone-800 border-stone-300'
                            }`}
                          >
                            <option value="pending">در انتظار بررسی</option>
                            <option value="confirmed">تایید شد</option>
                            <option value="packing">در حال بسته‌بندی</option>
                            <option value="delivered">تحویل داده شد / ارسال شد</option>
                            <option value="cancelled">لغو سفارش</option>
                          </select>
                        </div>
                      </div>

                      {/* Customer info */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs bg-stone-50 p-3 rounded-xl">
                        <div>
                          <span className="text-stone-500">نام مشتری: </span>
                          <span className="font-bold text-stone-900">{ord.customerName}</span>
                        </div>

                        <div>
                          <span className="text-stone-500">شماره تماس: </span>
                          <a
                            href={`tel:${ord.customerPhone}`}
                            className="font-bold text-emerald-700 hover:underline inline-flex items-center gap-1 dir-ltr"
                          >
                            <Phone className="w-3 h-3" />
                            <span>{ord.customerPhone}</span>
                          </a>
                        </div>

                        <div>
                          <span className="text-stone-500">روش تحویل: </span>
                          <span className="font-bold text-stone-900">
                            {ord.deliveryMethod === 'delivery' ? '🚚 تحویل درب منزل در کاشمر' : '🏬 تحویل حضوری در مغازه'}
                          </span>
                        </div>

                        {ord.address && (
                          <div className="sm:col-span-3 pt-1 text-stone-700">
                            <span className="text-stone-500">آدرس: </span>
                            <span>{ord.address}</span>
                          </div>
                        )}

                        {ord.notes && (
                          <div className="sm:col-span-3 text-stone-600 bg-white p-2 rounded border border-stone-200/60">
                            <span className="text-stone-500 font-bold">یادداشت مشتری: </span>
                            <span>{ord.notes}</span>
                          </div>
                        )}
                      </div>

                      {/* Items ordered */}
                      <div className="space-y-1.5 pt-1">
                        <div className="text-xs font-bold text-stone-700">اقلام خریداری شده:</div>
                        <div className="divide-y divide-stone-100 bg-stone-50 rounded-xl px-3 py-1">
                          {ord.items.map((item, idx) => (
                            <div key={idx} className="py-1.5 flex items-center justify-between text-xs">
                              <span className="font-medium text-stone-800">
                                {item.productName} ({toPersianDigits(item.quantity)} {item.unit})
                              </span>
                              <span className="font-black text-emerald-800">
                                {formatToman(item.price * item.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Payment and Total */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-stone-500">روش پرداخت:</span>
                          <span className="font-bold text-stone-800">
                            {ord.paymentMethod === 'kalabarg'
                              ? '💳 کالابرگ الکترونیکی فجرانه'
                              : ord.paymentMethod === 'cash_on_delivery'
                              ? '💵 نقدی یا کارتخوان در محل'
                              : '💳 کارت‌به‌کارت'}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-stone-600 font-bold">مبلغ کل فاکتور:</span>
                          <span className="font-black text-emerald-800 text-sm">
                            {formatToman(ord.totalAmount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: STORE NOTICE / ANNOUNCEMENT */}
          {activeTab === 'notice' && (
            <div className="max-w-xl mx-auto space-y-4">
              <div>
                <h3 className="font-extrabold text-stone-900 text-sm sm:text-base">
                  تنظیم پیام اطلاعیه بالای سایت
                </h3>
                <p className="text-xs text-stone-500">
                  این پیام در نوار بالای سایت و برای همه مشتریان نمایش داده می‌شود (مشابه پیام شارژ مجدد کلوچه خرمایی).
                </p>
              </div>

              <form onSubmit={handleSaveNotice} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    عنوان پیام ویژه
                  </label>
                  <input
                    type="text"
                    value={noticeTitle}
                    onChange={(e) => setNoticeTitle(e.target.value)}
                    placeholder="💥 شارژ مجدد کلوچه خرمایی 💥"
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    متن کامل توضیحات
                  </label>
                  <textarea
                    rows={3}
                    value={noticeContent}
                    onChange={(e) => setNoticeContent(e.target.value)}
                    placeholder="بار درجه یک و تازه، تولید روز 👌 قیمت هر کیلو ۱۹۵ هزار تومان - کالا برگ فعال می‌باشد..."
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden leading-relaxed"
                  />
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
                  <div className="font-bold text-stone-700">لینک کانال ایتا و شماره‌های ثبت شده:</div>
                  <div className="text-stone-600">ایتا: https://eitaa.com/tavvnhaghdost313H</div>
                  <div className="text-stone-600">تلفن‌ها: 09351506418 و 09158304737</div>
                  <div className="text-stone-600">آدرس: کاشمر، فلکه قوژد، نبش سلمان فارسی ۳۴</div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                >
                  بروزرسانی اطلاعیه بالای سایت
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
