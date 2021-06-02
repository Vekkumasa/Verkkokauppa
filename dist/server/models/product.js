"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var ProductSchema = new mongoose_1["default"].Schema({
    name: { type: String, required: true, unique: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    ratings: [{ type: Number }],
    tags: [{ type: String }],
    image: {
        data: Buffer,
        contentType: String
    }
}, {
    toJSON: {
        transform: function (_document, returnedObject) {
            delete returnedObject.__v;
        }
    }
});
var Product = mongoose_1["default"].model("Product", ProductSchema);
exports["default"] = Product;
