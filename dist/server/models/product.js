"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
var mongoose_1 = __importDefault(require("mongoose"));
var ProductSchema = new mongoose_1["default"].Schema({
    name: { type: String, required: true, unique: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String }
}, {
    toJSON: {
        transform: function (_document, returnedObject) {
            delete returnedObject._id;
            delete returnedObject.__v;
        }
    },
    toObject: {
        versionKey: false
    }
});
var User = mongoose_1["default"].model("Product", ProductSchema);
exports["default"] = User;
