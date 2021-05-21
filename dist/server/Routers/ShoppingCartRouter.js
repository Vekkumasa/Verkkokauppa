"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var ShoppingCartController_1 = __importDefault(require("../Controllers/ShoppingCartController"));
var router = express_1["default"].Router();
router.get('/:id', function (req, res) {
    var usersShoppingCart = ShoppingCartController_1["default"].findUsersShoppingCart(req.params.id);
    void usersShoppingCart.then(function (response) {
        res.status(200).json(response);
    });
});
router.post('/', function (req, res) {
    var _a = req.body, products = _a.products, user = _a.user;
    var newCart = ShoppingCartController_1["default"].createNewShoppingCart(products, user);
    void newCart.then(function (response) {
        return res.status(201).json(response);
    });
});
router.post('/:id/addProduct', function (req, res) {
    console.log('add product body', req.body);
    var cartProduct = ShoppingCartController_1["default"].addNewProductToCart(req.body);
    void cartProduct.then(function (response) {
        if (response === null) {
            res.status(400).json({ error: 'Something unexpected happened' });
        }
        else {
            res.status(201).json(response);
        }
    });
});
router.put('/:id/remove', function (req, res) {
    var cartProduct = ShoppingCartController_1["default"].removeProductFromCart(req.body);
    void cartProduct.then(function (response) {
        if (response === null) {
            res.status(400).json({ error: 'Something unexpected happened' });
        }
        else {
            res.status(201).json(response);
        }
    });
});
router.put('/:id/increase', function (req, res) {
    var cartProduct = ShoppingCartController_1["default"].increaseProductQuantity(req.body);
    void cartProduct.then(function (response) {
        if (response === null) {
            res.status(400).json({ error: 'Something unexpected happened' });
        }
        else {
            res.status(201).json(response);
        }
    });
});
router.put('/:id/decrease', function (req, res) {
    var cartProduct = ShoppingCartController_1["default"].decreaseProductQuantity(req.body);
    void cartProduct.then(function (response) {
        if (response === null) {
            res.status(400).json({ error: 'Something unexpected happened' });
        }
        else {
            res.status(201).json(response);
        }
    });
});
router.put('/:id/activity', function (req, res) {
    var data = req.body.data;
    var shoppingCart = ShoppingCartController_1["default"].setActivity(req.params.id, data);
    void shoppingCart.then(function (response) {
        if (!response) {
            res.status(400).json({ error: 'Something unexpected happened' });
        }
        else {
            res.status(200).json(response);
        }
    });
});
router.put('/:id/completed', function (req, res) {
    var shoppingCart = ShoppingCartController_1["default"].setCompleted(req.params.id);
    void shoppingCart.then(function (response) {
        if (!response) {
            res.status(400).json({ error: 'Something unexpected happened' });
        }
        else {
            res.status(200).json(response);
        }
    });
});
router["delete"]('/:id', function (req, res) {
    var cart = ShoppingCartController_1["default"].removeShoppingCart(req.params.id);
    void cart.then(function (response) {
        res.status(200).json(response);
    });
});
exports["default"] = router;
