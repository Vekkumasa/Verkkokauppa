import uniqueValidator from 'mongoose-unique-validator';
import mongoose from "mongoose";
import { ShoppingCartInterface } from '../models/shoppingCart';
import { Product, Image } from '../types';

export interface UserInterface extends mongoose.Document {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password?: string;
  userType: string;
  shoppingCart: ShoppingCartInterface[];
  ratings: Product[];
  _id?: string;
  avatar?: Image;
  recentActivity: Date[];
  platformInfo: string[];
}

const UserSchema: mongoose.Schema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    userType: { type: String, required: true },
    avatar: {
      data: Buffer,
      contentType: String
    },
    shoppingCart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShoppingCart'
      }
    ],
    ratings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        rated: Boolean
      }
    ],
    recentActivity: [
      {
        type: Date,
        default: Date.now
      }
    ],
    platformInfo: [{ type: String }]
  },
  {
  toJSON: {
    transform: (_document, returnedObject: UserInterface) => {
      delete returnedObject.__v;
      delete returnedObject.password;
    }
  },
}
);

UserSchema.plugin(uniqueValidator);

const User = mongoose.model<UserInterface>("User", UserSchema);
export default User;