export interface IUser {
  id?: string;
  avatar?: string | null;
  name: string;
  email?: string;
  isVerefied?: string;
  createdAt?: string;
  password?: string;
  role: 'USER' | 'ADMIN';

  courses: any[];
  rates: any[];
}

export interface IUserCreate {
  name: string;
  email: string;
  password: string;
}

export interface IUserLogIn {
  email: string;
  password: string;
}
