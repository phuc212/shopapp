import { Product } from './product';

export interface BillDetail {
  id: number;
  name: string;
  quantity: number;
  price: number;
  product: Product;
}
