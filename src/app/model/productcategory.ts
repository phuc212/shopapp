export interface Productcategory {
  id: number;
  name: string;
  description: string;
  createdDate: Date;
  modifiedDate: Date;
}

export interface ResponseProductCategory {
  content: [];
  totalElements: number;
}
