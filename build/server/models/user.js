/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import uniqueValidator from 'mongoose-unique-validator';
import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    passwordHash: { type: String },
    userType: { type: String, required: true }
}, {
    toJSON: {
        transform: (_document, returnedObject) => {
            delete returnedObject._id;
            delete returnedObject.__v;
            delete returnedObject.passwordHash;
        }
    },
    toObject: {
        versionKey: false,
    }
});
UserSchema.plugin(uniqueValidator);
const User = mongoose.model("User", UserSchema);
export default User;
