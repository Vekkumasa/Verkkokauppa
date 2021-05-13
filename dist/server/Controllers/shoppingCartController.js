"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var uuid_1 = require("uuid");
var product_1 = __importDefault(require("../models/product"));
var shoppingCart_1 = __importDefault(require("../models/shoppingCart"));
var GetAllCarts = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, shoppingCart_1["default"].find({})];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var getCart = function (cartId) { return __awaiter(void 0, void 0, void 0, function () {
    var cart, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                cart = void 0;
                if (!cartId) return [3 /*break*/, 2];
                return [4 /*yield*/, shoppingCart_1["default"].findById(cartId)];
            case 1:
                cart = _a.sent();
                _a.label = 2;
            case 2:
                if (!cart) {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/, cart];
            case 3:
                e_1 = _a.sent();
                return [2 /*return*/, null];
            case 4: return [2 /*return*/];
        }
    });
}); };
var listOfProducts = function (products) { return __awaiter(void 0, void 0, void 0, function () {
    var lista;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.all(products.map(function (item) { return __awaiter(void 0, void 0, void 0, function () {
                    var product;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, product_1["default"].findById(item.id)];
                            case 1:
                                product = _a.sent();
                                if (product) {
                                    return [2 /*return*/, {
                                            productId: product._id,
                                            name: item.name,
                                            quantity: item.quantity,
                                            price: item.price
                                        }];
                                }
                                return [2 /*return*/];
                        }
                    });
                }); }))];
            case 1:
                lista = _a.sent();
                return [2 /*return*/, lista];
        }
    });
}); };
var createNewShoppingCart = function (products, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var totalPrice, list, cart;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                totalPrice = products.reduce(function (prev, cur) { return prev + cur.price * cur.quantity; }, 0);
                return [4 /*yield*/, listOfProducts(products)];
            case 1:
                list = _a.sent();
                cart = new shoppingCart_1["default"]({
                    id: uuid_1.v4(),
                    products: list,
                    user: userId,
                    active: true,
                    totalPrice: totalPrice
                });
                return [4 /*yield*/, cart.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, cart];
        }
    });
}); };
var DecreaseProductQuantity = function (cartProduct) { return __awaiter(void 0, void 0, void 0, function () {
    var product_2, cart, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                product_2 = cartProduct.product;
                return [4 /*yield*/, getCart(cartProduct.cartId)];
            case 1:
                cart = _a.sent();
                if (!cart || !product_2)
                    return [2 /*return*/, null];
                cart.products.map(function (p) {
                    if (p.productId === product_2.id) {
                        p.quantity -= 1;
                    }
                });
                cart.totalPrice -= product_2.price;
                return [4 /*yield*/, cart.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, cart];
            case 3:
                e_2 = _a.sent();
                return [2 /*return*/, null];
            case 4: return [2 /*return*/];
        }
    });
}); };
var IncreaseProductQuantity = function (cartProduct) { return __awaiter(void 0, void 0, void 0, function () {
    var product_3, cart, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                product_3 = cartProduct.product;
                return [4 /*yield*/, getCart(cartProduct.cartId)];
            case 1:
                cart = _a.sent();
                if (!cart || !product_3)
                    return [2 /*return*/, null];
                console.log('product,', product_3);
                cart.products.map(function (p) {
                    if (p.productId === product_3.id) {
                        p.quantity += 1;
                    }
                });
                console.log(cart);
                cart.totalPrice += product_3.price;
                return [4 /*yield*/, cart.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, cart];
            case 3:
                e_3 = _a.sent();
                return [2 /*return*/, null];
            case 4: return [2 /*return*/];
        }
    });
}); };
var RemoveProductFromCart = function (cartProduct) { return __awaiter(void 0, void 0, void 0, function () {
    var product_4, cart, totalPriceOfRemovedObjects_1, lista, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                product_4 = cartProduct.product;
                return [4 /*yield*/, getCart(cartProduct.cartId)];
            case 1:
                cart = _a.sent();
                if (!cart || !product_4 || !cart.id)
                    return [2 /*return*/, null];
                totalPriceOfRemovedObjects_1 = 0;
                lista = cart.products.filter(function (p) {
                    if (p.productId === product_4.id) {
                        totalPriceOfRemovedObjects_1 = product_4.price * product_4.quantity;
                    }
                    return p.productId !== product_4.id;
                });
                cart.products = lista;
                cart.totalPrice -= totalPriceOfRemovedObjects_1;
                return [4 /*yield*/, cart.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, cart];
            case 3:
                e_4 = _a.sent();
                console.log(e_4);
                return [2 /*return*/, null];
            case 4: return [2 /*return*/];
        }
    });
}); };
var AddNewProductToCart = function (cartProduct) { return __awaiter(void 0, void 0, void 0, function () {
    var product, cart, lista, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                product = cartProduct.product;
                return [4 /*yield*/, getCart(cartProduct.cartId)];
            case 1:
                cart = _a.sent();
                if (!cart || !product || !cart.id)
                    return [2 /*return*/, null];
                lista = cart.products.concat({ productId: product.id, name: product.name, price: product.price, quantity: 1 });
                cart.products = lista;
                cart.totalPrice += product.price;
                return [4 /*yield*/, cart.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, cart];
            case 3:
                e_5 = _a.sent();
                console.log(e_5);
                return [2 /*return*/, null];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports["default"] = {
    GetAllCarts: GetAllCarts,
    AddNewProductToCart: AddNewProductToCart,
    DecreaseProductQuantity: DecreaseProductQuantity,
    IncreaseProductQuantity: IncreaseProductQuantity,
    createNewShoppingCart: createNewShoppingCart,
    RemoveProductFromCart: RemoveProductFromCart
};
