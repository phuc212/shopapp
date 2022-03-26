import { Productcategory } from './productcategory';
import { Supplier } from './supplier';
import { User } from './user';

export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  entryPrice: number;
  quantity: number;
  price: number;
  importDate: Date;
  productCategoryId: number;
  supplierId: number;
  userId: number;
}

export interface ProductPag {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  quantity: number;
  price: number;
  productCategory: Productcategory;
  checked: boolean;
}

export interface ProductPagination {
  content: [];
  totalElements: number;
}
