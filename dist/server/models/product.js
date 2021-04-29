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
    image: { type: String }
}, {
    toJSON: {
        transform: function (_document, returnedObject) {
            var _a;
            returnedObject.id = (_a = returnedObject._id) === null || _a === void 0 ? void 0 : _a.toString();
            delete returnedObject._id;
            delete returnedObject.__v;
        }
    },
    toObject: {
        transform: function (_document, returnedObject) {
            var _a;
            returnedObject.id = (_a = returnedObject._id) === null || _a === void 0 ? void 0 : _a.toString();
            delete returnedObject._id;
            delete returnedObject.__v;
        }
    }
});
var Product = mongoose_1["default"].model("Product", ProductSchema);
exports["default"] = Product;
