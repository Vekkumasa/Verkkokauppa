/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import mongoose, { Schema } from "mongoose";
const ProductSchema = new Schema({
    name: { type: String, required: true, unique: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String }
}, {
    toJSON: {
        transform: (_document, returnedObject) => {
            delete returnedObject._id;
            delete returnedObject.__v;
        }
    },
    toObject: {
        versionKey: false,
    }
});
const User = mongoose.model("Product", ProductSchema);
export default User;
