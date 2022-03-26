export interface User {
  id: number;
  password: string;
  fullName: string;
  dayOfBirth: Date;
  address: string;
  gender: string;
  phoneNumber: string;
  email: string;
}

export interface UserPagination {
  content: [];
  totalElements: number;
}
