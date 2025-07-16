export interface User {
  id: string;
  email: string;
  fullname: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserRegister {
  email: string;
  fullname: string;
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}
