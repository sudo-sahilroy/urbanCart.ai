import { Product } from './product.model';

export interface OrderItem {
  id: number;
  product: Product;
  price: number;
  quantity: number;
}

export interface Order {
  id: number;
  totalAmount: number;
  createdAt: string;
  items: OrderItem[];
}
