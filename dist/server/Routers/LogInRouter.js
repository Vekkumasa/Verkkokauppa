"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var LogInController_1 = __importDefault(require("../Controllers/LogInController"));
var router = express_1["default"].Router();
router.post('/', function (req, res) {
    var _a = req.body, username = _a.username, password = _a.password, platformInfo = _a.platformInfo;
    var loggedIn = LogInController_1["default"].logIn(username, password, platformInfo);
    void loggedIn.then(function (response) {
        res.status(201).send(response);
    });
});
exports["default"] = router;
