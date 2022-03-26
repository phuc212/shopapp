import { Product } from './product';

export interface ImportBillDetail {
  id: number;
  quantity: number;
  price: number;
  productId: number;
  product: Product;
}

export interface ImportBillDetailPagination {
  content: [];
  totalElements: number;
}
