import uniqueValidator from 'mongoose-unique-validator';
import mongoose from "mongoose";
import { ShoppingCartInterface } from '../models/shoppingCart';

export interface UserInterface extends mongoose.Document {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password?: string;
  userType: string;
  shoppingCart: ShoppingCartInterface[];
  _id?: string;
  avatar?: string;
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
    avatar: { type: String },
    shoppingCart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShoppingCart'
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
      returnedObject.id = returnedObject._id?.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
      delete returnedObject.password;
    }
  },
}
);

UserSchema.plugin(uniqueValidator);

const User = mongoose.model<UserInterface>("User", UserSchema);
export default User;