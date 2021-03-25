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
//import mongoose from 'mongoose';
var cors_1 = __importDefault(require("cors"));
var ProductList = __importStar(require("./server/Products/ProductList"));
var StringCheck_1 = __importDefault(require("./server/utils/StringCheck"));
//import UserSchema from './server/models/user';
var connect_1 = __importDefault(require("./server/connect"));
var UserController = __importStar(require("./server/Controllers/userController"));
dotenv.config({ path: __dirname + '/.env' });
var _a = dotenv.config({ debug: true }), parsed = _a.parsed, error = _a.error;
// was there an error?
console.error('error:', error);
// what was parsed?
console.log('parsed', parsed);
console.log('port', process.env.PORT);
// compare to process.env
console.dir(process.env);
var url = process.env.MONGODB_URI;
var app = express_1["default"]();
app.use(express_1["default"].static('build'));
if (StringCheck_1["default"](url)) {
    connect_1["default"](url);
}
/*
const User = UserSchema;

const user = new User({
  email: 'admin@admin.fi',
  firstName: 'admin',
  lastName: 'adminen',
  userName: 'admin',
  passwordHash: 'admin',
  userType: 'admin',
});

void user.save().then((response: any) => {
  console.log('user saved!');
  console.log(response);
  void mongoose.connection.close();
});
*/
app.use(cors_1["default"]());
app.get('/api/ping', function (_req, res) {
    console.log('someone pinged here');
    res.send('pong');
});
app.get('/api/products', function (_req, res) {
    res.json(ProductList);
});
app.get('/api/health', function (_req, res) {
    res.send('ok');
});
app.get("/users", UserController.allUsers);
var PORT = process.env.PORT;
app.listen(PORT, function () {
    console.log("Server running on port " + PORT);
});
