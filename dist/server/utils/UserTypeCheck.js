"use strict";
exports.__esModule = true;
exports.UserTypeCheck = exports.StringCheck = void 0;
var StringCheck = function (text) {
    return typeof text === 'string' || text instanceof String;
};
exports.StringCheck = StringCheck;
var UserTypeCheck = function (text) {
    if (!text || !exports.StringCheck(text)) {
        throw new Error("Incorrect or missing string " + text);
    }
    if (text === 'Admin' || text === 'User') {
        return true;
    }
    return false;
};
exports.UserTypeCheck = UserTypeCheck;