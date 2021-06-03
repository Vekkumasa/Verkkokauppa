"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var ShoppingCartSchema = new mongoose_1["default"].Schema({
    totalPrice: { type: Number, required: true },
    products: [
        {
            productId: String,
            name: String,
            image: {
                data: Buffer,
                contentType: String
            },
            quantity: Number,
            price: Number
        }
    ],
    user: { type: mongoose_1["default"].Schema.Types.ObjectId, ref: 'User' },
    active: { type: Boolean, required: true },
    completed: { type: Boolean, required: true },
    completionDate: { type: Date }
}, {
    toJSON: {
        transform: function (_document, returnedObject) {
            var _a;
            returnedObject.id = (_a = returnedObject._id) === null || _a === void 0 ? void 0 : _a.toString();
            delete returnedObject._id;
            delete returnedObject.__v;
        }
    }
});
var ShoppingCart = mongoose_1["default"].model("ShoppingCart", ShoppingCartSchema);
exports["default"] = ShoppingCart;
