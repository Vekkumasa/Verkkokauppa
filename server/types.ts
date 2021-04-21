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