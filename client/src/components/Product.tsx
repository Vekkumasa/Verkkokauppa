import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Delete from '@material-ui/icons/DeleteForever';

import { useAppSelector, AppDispatch, useAppDispatch } from '../store/rootReducer';
import productService from '../services/productService';
import { removeProduct } from '../store/Product/actionCreators';
import { setNotification, hideNotification } from '../store/Notification/actionCreators';
import { increaseQuantity } from '../store/ShoppingCart/actionCreators';
import shoppingCartService from '../services/shoppingCartService';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginRight: 20
  },
  media: {
    height: 160,
  },
});

const Product: React.FC<{ product: Product }> = ({ product }): JSX.Element => {
  const classes = useStyles();
  const dispatch: AppDispatch = useAppDispatch();

  const user: Credentials | null = useAppSelector(
    state => state.userReducer.user
  );
  const cartId = useAppSelector(state => state.shoppingCartReducer.cartId);
  const shoppingCart = useAppSelector(state => state.shoppingCartReducer.cart);

  console.log('cartId:', cartId, 'ShoppingCart:', shoppingCart);
  const deleteProduct = () => {
    void productService.deleteProduct(product);
    dispatch(removeProduct(product));
    const text = "Removed " + product.name;
    const type: NotificationType = 'info';
    dispatch(setNotification(text, type));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
  };

  const handleShoppingCart = () => {
    
    const isProductAlreadyInCart = shoppingCart.some(p => p.id === product.id);
    let shoppingCartProduct: ShoppingCartProduct | undefined = shoppingCart.find(p => p.id === product.id);

    if (shoppingCartProduct === undefined) {
      shoppingCartProduct = {...product, quantity: 1};
    }

    if (isProductAlreadyInCart) {
      console.log("Product already in cart, increasing quantity"); 
      shoppingCartProduct.quantity += 1;
      updateShoppingCartProductQuantity(shoppingCartProduct);
    } else {
      console.log("Adding new product to cart");    
      addProductToShoppingCart(shoppingCartProduct);
    }
  };

  const addProductToShoppingCart = (shoppingCartProduct: ShoppingCartProduct) => {
    let response;
    if (user === null) {
      response = shoppingCartService.addProductToShoppingCart({ product: shoppingCartProduct, userId: '', cartId});
    } else {
      response = shoppingCartService.addProductToShoppingCart({ product: shoppingCartProduct, userId: user.id, cartId});
    }
    void response.then((res) => {
      console.log('product.tsx addProductToShoppingCart', res);
      dispatch(increaseQuantity(product, res.id));
    });
  };

  const updateShoppingCartProductQuantity = (shoppingCartProduct: ShoppingCartProduct) => {
    let response;
    if (user === null) {
      response = shoppingCartService.updateProductQuantity({ product: shoppingCartProduct, userId: '', cartId});
    } else {
      response = shoppingCartService.updateProductQuantity({ product: shoppingCartProduct, userId: user.id, cartId});
    }
    void response.then((res) => {
      console.log('product.tsx increaseShoppingCartProductQuantity', res);
      dispatch(increaseQuantity(product, res.id));
    });
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
      <CardMedia
          className={classes.media}
          image={product.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name} <br/> {product.price}€ 
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => handleShoppingCart()}>
          Lisää ostoskoriin
        </Button>
        {user !== null && user.userType === 'Admin' ?         
          <IconButton onClick={() => deleteProduct()}>
            <Delete />
          </IconButton>
        :
          null
        }
      </CardActions>
    </Card>
  );
};

export default Product;