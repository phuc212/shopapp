import { Supplier } from './supplier';
import { User } from './user';

export interface ImportBill {
  id: number;
  total: number;
  supplier: Supplier;
  user: User;
  createDate: Date;
}

export interface ImportBillPagination {
  content: [];
  totalElements: number;
}

export interface ImportBillError {
  supplierId: string;
  userId: string;
  importBillDetailDTOs: string;
  createdDate: string;
}

export interface CustomResultImportBillAndProduct {
  id: number;
  name: string;
  quantity: number;
  total: number;
  price: number;
  createdDate: Date;
  supplierName: string;
}
