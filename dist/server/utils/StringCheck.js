"use strict";
exports.__esModule = true;
exports.StringParser = exports.StringCheck = void 0;
var StringCheck = function (text) {
    return typeof text === 'string' || text instanceof String;
};
exports.StringCheck = StringCheck;
var StringParser = function (text) {
    if (!text || !exports.StringCheck(text)) {
        throw new Error("Incorrect or missing string " + text);
    }
    return text;
};
exports.StringParser = StringParser;
