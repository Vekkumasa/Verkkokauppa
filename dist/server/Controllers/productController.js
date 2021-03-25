"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.allProducts = void 0;
var product_1 = __importDefault(require("../models/product"));
var allProducts = function (_req, res) {
    var products = product_1["default"].find(function (err, products) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(products);
        }
    });
    console.log(products);
};
exports.allProducts = allProducts;
