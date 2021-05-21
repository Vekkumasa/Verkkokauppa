"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
exports["default"] = (function (url) {
    var connect = function () {
        mongoose_1["default"]
            .connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
            .then(function () {
            return console.log("Successfully connected to " + url);
        })["catch"](function (error) {
            console.log("Error connecting to database: ", error);
            return process.exit(1);
        });
    };
    connect();
    mongoose_1["default"].connection.on("disconnected", connect);
});
