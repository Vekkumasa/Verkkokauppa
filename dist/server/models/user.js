"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
var mongoose_1 = __importDefault(require("mongoose"));
var UserSchema = new mongoose_1["default"].Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, required: true },
    avatar: {
        data: Buffer,
        contentType: String
    },
    shoppingCart: [
        {
            type: mongoose_1["default"].Schema.Types.ObjectId,
            ref: 'ShoppingCart'
        }
    ],
    ratings: [
        {
            type: mongoose_1["default"].Schema.Types.ObjectId,
            ref: 'Product',
            rated: Boolean
        }
    ],
    recentActivity: [
        {
            type: Date,
            "default": Date.now
        }
    ],
    platformInfo: [{ type: String }]
}, {
    toJSON: {
        transform: function (_document, returnedObject) {
            delete returnedObject.__v;
            delete returnedObject.password;
        }
    }
});
UserSchema.plugin(mongoose_unique_validator_1["default"]);
var User = mongoose_1["default"].model("User", UserSchema);
exports["default"] = User;