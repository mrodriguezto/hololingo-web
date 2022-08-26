export interface INewUser {
  name: string;
  email: string;
  role: 'admin' | 'user';
  password?: string;
  score: number;
}
export interface IUser extends INewUser {
  _id: string;
  issuer: string;
  createdAt: string;
  updatedAt: string;
}
