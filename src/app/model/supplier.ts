export interface Supplier {
  id: number;
  supplierName: string;
  phoneNumber: string;
  email: string;
  address: string;
  createdDate: string;
  modifiedDate: string;
}

export interface SupplierPagination {
  content: [];
  totalElements: number;
}

export interface ExceptionResponse {
  message: string;
  code: string;
}
