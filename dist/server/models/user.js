"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
var mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
var mongoose_1 = __importDefault(require("mongoose"));
var UserSchema = new mongoose_1["default"].Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    passwordHash: { type: String },
    userType: { type: String, required: true }
}, {
    toJSON: {
        transform: function (_document, returnedObject) {
            delete returnedObject._id;
            delete returnedObject.__v;
            delete returnedObject.passwordHash;
        }
    },
    toObject: {
        versionKey: false
    }
});
UserSchema.plugin(mongoose_unique_validator_1["default"]);
var User = mongoose_1["default"].model("User", UserSchema);
exports["default"] = User;