export interface User {
  id: string;
  email: string;
  fullname: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}
