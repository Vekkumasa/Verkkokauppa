export type Product = {
    _id: string,
    name: string,
    price: number,
    stock: number,
    description?: string,
    image?: string
};

export type User = {
  _id: string,
  email: string,
  firstName: string,
  lastName: string,
  userName: string,
  passwordHash: string,
  userType: string
};

export type UserType = 'Admin' | 'User';

export type Credentials = {
  token: string,
  userName: string,
  firstName: string,
  lastName: string,
  userType: UserType
};