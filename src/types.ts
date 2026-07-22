export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'shoes' | 'watches' | 'perfumes' | 'bags' | 'apparel' | 'accessories';
  subtitle?: string;
  badge?: string;
  details?: string[];
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: { name: string; hex: string };
}

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
}
