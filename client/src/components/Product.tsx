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
import { increaseQuantity, addNewProductToShoppingCart } from '../store/ShoppingCart/actionCreators';
import shoppingCartService from '../services/shoppingCartService';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles({
  root: {
    maxWidth: 170,
    marginRight: 20
  },
  centerText: {
    textAlign: 'center',
  },
  media: {
    height: 160,
  },
  overflow: {
    maxWidth: 170,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
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

  const deleteProduct = () => {
    // Todo: Tarkistus että tuote todella on poistettu kannasta ennen frontista deletointia ?
    void productService.deleteProduct(product);
    dispatch(removeProduct(product));
    dispatch(setNotification("Removed " + product.name, 'info'));
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
      updateShoppingCartProductQuantity(shoppingCartProduct);
    } else {
      console.log("Adding new product to cart");    
      addProductToShoppingCart(shoppingCartProduct);
    }
  };

  const addProductToShoppingCart = (shoppingCartProduct: ShoppingCartProduct) => {  
    if (!user) {
      dispatch(addNewProductToShoppingCart(shoppingCartProduct, cartId));
    } else {
      const response = shoppingCartService.addProductToShoppingCart({ product: shoppingCartProduct, userId: user.id, cartId});
      void response.then((res) => {
        console.log('res', res);
        dispatch(addNewProductToShoppingCart(shoppingCartProduct, cartId));
      });
    }
  };

  const updateShoppingCartProductQuantity = (shoppingCartProduct: ShoppingCartProduct) => {
    if (!user) {
      dispatch(increaseQuantity(shoppingCartProduct, cartId));
    } 
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
      <CardMedia
          className={classes.media}
          image={product.image}
        />
        <CardContent>
          <Typography className={`${classes.overflow} ${classes.centerText}`} style={{ fontSize: 16 }} gutterBottom variant="h6" component="h2">
            {product.name} <br/> {product.price}€ 
          </Typography>
          <Typography className={`${classes.overflow} ${classes.centerText}`} variant="body2" color="textSecondary" component="p">
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
            <Tooltip title="Remove product from database">
              <Delete />
            </Tooltip>
          </IconButton>
        :
          null
        }
      </CardActions>
    </Card>
  );
};

export default Product;