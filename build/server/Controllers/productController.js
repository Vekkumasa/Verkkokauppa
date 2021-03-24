import Product from "../models/product";
export const allProducts = (_req, res) => {
    const products = Product.find((err, products) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(products);
        }
    });
    console.log(products);
};
