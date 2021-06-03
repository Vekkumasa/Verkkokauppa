"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var nodemailer_1 = __importDefault(require("nodemailer"));
var main = function (message) {
    var transport = nodemailer_1["default"].createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAILPW
        }
    });
    transport.sendMail(message, function (err, info) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(info);
        }
    });
};
exports["default"] = main;
