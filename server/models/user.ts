import uniqueValidator from 'mongoose-unique-validator';
import mongoose from "mongoose";
import { ProductInterface } from './product';

export interface UserInterface extends mongoose.Document {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password?: string;
  userType: string;
  shoppingCart: ProductInterface[];
  _id?: string;
}

const UserSchema: mongoose.Schema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true},
    password: { type: String },
    userType: { type: String, required: true },
    shoppingCart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShoppingCart'
      }
    ]
  },
  {
  toJSON: {
    transform: (_document, returnedObject: UserInterface) => {
      returnedObject.id = returnedObject._id?.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
      delete returnedObject.password;
    }
  },
  toObject: {
    transform: (_document, returnedObject: UserInterface) => {
      returnedObject.id = returnedObject._id?.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  }
}
);

UserSchema.plugin(uniqueValidator);

const User = mongoose.model<UserInterface>("User", UserSchema);
export default User;