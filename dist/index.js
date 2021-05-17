"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv = __importStar(require("dotenv"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var LogInRouter_1 = __importDefault(require("./server/Routers/LogInRouter"));
var ProductRouter_1 = __importDefault(require("./server/Routers/ProductRouter"));
var UserRouter_1 = __importDefault(require("./server/Routers/UserRouter"));
var ShoppingCartRouter_1 = __importDefault(require("./server/Routers/ShoppingCartRouter"));
var StringCheck_1 = require("./server/utils/StringCheck");
var connect_1 = __importDefault(require("./server/connect"));
var path_1 = require("path");
if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: path_1.resolve(__dirname, '../.env') });
}
else {
    dotenv.config({ path: path_1.resolve(__dirname, '.env') });
}
var url = process.env.MONGODB_URI;
var app = express_1["default"]();
app.use(cors_1["default"]());
app.use(express_1["default"].static('build'));
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded());
if (StringCheck_1.StringCheck(url)) {
    connect_1["default"](url);
}
app.use('/api/login', LogInRouter_1["default"]);
app.use('/api/products', ProductRouter_1["default"]);
app.use('/api/users', UserRouter_1["default"]);
app.use('/api/shoppingCart', ShoppingCartRouter_1["default"]);
app.get('/api/ping', function (_req, res) {
    console.log('someone pinged here');
    res.send('pong');
});
app.get('/api/health', function (_req, res) {
    res.send('ok');
});
var PORT = process.env.PORT;
app.listen(PORT, function () {
    console.log("Server running on port " + PORT);
});
