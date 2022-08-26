export interface INewUser {
  name: string;
  email: string;
  role: 'admin' | 'user';
  password?: string;
}
export interface IUser extends INewUser {
  _id: string;
  issuer: string;
  score: number;
  createdAt: string;
  updatedAt: string;
}

export interface IExtendedUser extends IUser {
  id: number;
}
