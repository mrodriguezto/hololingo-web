export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'user';
  issuer: string;
  score: number;
  createdAt: string;
  updatedAt: string;
}
