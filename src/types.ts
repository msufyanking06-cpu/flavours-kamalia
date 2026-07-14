export type FoodCategory = 'specialties' | 'burgers' | 'traditional' | 'refreshers' | 'desserts';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // in PKR
  category: FoodCategory;
  image: string;
  rating?: number;
  isSpicy?: boolean;
  isVegetarian?: boolean;
  estimatedPrepTime: number; // in minutes
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Table {
  id: string;
  number: number;
  capacity: number;
  area: 'Lounge' | 'Window Booths' | 'Family Hall' | 'Outdoor Deck';
  isReserved?: boolean;
}

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  tableId: string;
  area: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface Review {
  id: string;
  authorName: string;
  rating: number;
  date: string;
  comment: string;
  isLocalGuide?: boolean;
  reviewsCount?: number;
  photosCount?: number;
  ownerResponse?: string;
  avatarColor: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customerName: string;
  phone: string;
  address: string;
  type: 'delivery' | 'takeaway';
  paymentMethod: 'card_simulator' | 'cash_on_delivery';
  status: 'Placed' | 'Kitchen Preparing' | 'Out for Delivery' | 'Delivered';
  createdAt: string;
}
