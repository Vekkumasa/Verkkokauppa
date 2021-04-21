/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import uniqueValidator from 'mongoose-unique-validator';
import mongoose from "mongoose";

export interface UserInterface extends mongoose.Document {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  passwordHash: string;
  userType: string;
}

const UserSchema: mongoose.Schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true, unique: true},
  passwordHash: { type: String },
  userType: { type: String, required: true }
},
{
  toJSON: {
    transform: (_document, returnedObject) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
      delete returnedObject.passwordHash;
    }
  },
  toObject: {
    transform: (_document, returnedObject) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  }
}
);

UserSchema.plugin(uniqueValidator);

const User = mongoose.model<UserInterface>("User", UserSchema);
export default User;