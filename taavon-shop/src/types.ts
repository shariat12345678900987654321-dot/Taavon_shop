export type Category = 
  | 'همه'
  | 'شیرینی و تنقلات'
  | 'روغن و چربی‌ها'
  | 'برنج و حبوبات'
  | 'لبنیات تازه'
  | 'ماکارونی و پاستا'
  | 'نوشیدنی'
  | 'شوینده و بهداشتی'
  | 'کنسرو و چاشنی';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number; // in Tomans
  originalPrice?: number;
  unit: string;
  stock: number;
  imageUrl: string;
  description: string;
  isRestocked: boolean; // 💥 شارژ مجدد 💥
  hasKalabarg: boolean; // 💥 کالابرگ فعال 💥
  isDailyFresh?: boolean; // تولید روز 👌
  qualityGrade?: string; // بار درجه یک
  minQuantity?: number;
  stepQuantity?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type DeliveryMethod = 'delivery' | 'pickup';
export type PaymentMethod = 'kalabarg' | 'cash_on_delivery' | 'card_transfer';
export type OrderStatus = 'pending' | 'confirmed' | 'packing' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  deliveryMethod: DeliveryMethod;
  address?: string;
  paymentMethod: PaymentMethod;
  items: {
    productId: string;
    productName: string;
    unit: string;
    price: number;
    quantity: number;
    imageUrl: string;
    hasKalabarg: boolean;
  }[];
  totalAmount: number;
  kalabargEligibleAmount: number;
  status: OrderStatus;
  createdAt: string;
  notes?: string;
}

export interface StoreAnnouncement {
  id: string;
  title: string;
  content: string;
  tag: string;
  date: string;
}
