"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var multer_1 = __importDefault(require("multer"));
var path_1 = require("path");
var storage = multer_1["default"].diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, path_1.resolve(__dirname + '../../../Uploads'));
    },
    filename: function (_req, file, cb) {
        var uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});
var upload = multer_1["default"]({ storage: storage });
exports["default"] = upload;
