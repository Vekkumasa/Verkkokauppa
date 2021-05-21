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
import { setNotification } from '../store/Notification/actionCreators';
import { increaseQuantity, addNewProductToShoppingCart, createNewShoppingCart } from '../store/ShoppingCart/actionCreators';
import shoppingCartService from '../services/shoppingCartService';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles({
  root: {
    width: 170,
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

type Props = {
  product: Product
};

const Product  = ({ product }: Props): JSX.Element => {
  const classes = useStyles();
  const dispatch: AppDispatch = useAppDispatch();

  const user: Credentials | undefined = useAppSelector(
    state => state.userReducer.user
  );
  const cartId = useAppSelector(state => state.shoppingCartReducer.cartId);
  const shoppingCart = useAppSelector(state => state.shoppingCartReducer.cart);

  const deleteProduct = () => {
    // Todo: Tarkistus että tuote todella on poistettu kannasta ennen frontista deletointia ?
    productService.deleteProduct(product).catch(e => console.log(e));
    dispatch(removeProduct(product));
    dispatch(setNotification("Removed " + product.name, 'info'));
  };

  const handleShoppingCart = () => {
    const isProductAlreadyInCart = shoppingCart.some(p => p._id === product._id);
    console.log('shopping cart: ', shoppingCart);
    
    let shoppingCartProduct: ShoppingCartProduct | undefined = shoppingCart.find(p => p._id === product._id);

    if (!shoppingCartProduct) {   
      shoppingCartProduct = {...product, quantity: 1};
    }
    console.log('cart id (Product.tsx)', cartId);
    if (isProductAlreadyInCart) {
      updateShoppingCartProductQuantity(shoppingCartProduct);
    } else {  
      addProductToShoppingCart(shoppingCartProduct);
    }
  };

  const addProductToShoppingCart = (shoppingCartProduct: ShoppingCartProduct) => {  
    if (!user) {
      dispatch(addNewProductToShoppingCart(shoppingCartProduct, cartId));
    } else {
      if (!cartId) {
        console.log('cart id unknown');
        dispatch(addNewProductToShoppingCart(shoppingCartProduct, cartId));
        const newProduct = [ shoppingCartProduct ];
        void shoppingCartService.createNewShoppingCart({ products: newProduct, user: user.id, id: ''})
          .then((response) => {
            dispatch(createNewShoppingCart(response.id));
          }).catch(e => console.log(e));
      } else {
        const response = shoppingCartService.addProductToShoppingCart({ product: shoppingCartProduct, userId: user.id, cartId});
        response.then(() => {
          dispatch(addNewProductToShoppingCart(shoppingCartProduct, cartId));
            }).catch(e => console.log(e));
      }
      
    }
  };

  const updateShoppingCartProductQuantity = (shoppingCartProduct: ShoppingCartProduct) => {
    if (!user) {
      dispatch(increaseQuantity(shoppingCartProduct, cartId));
    } else {
      void shoppingCartService.increaseProductQuantity({ product: shoppingCartProduct, userId: user.id, cartId: cartId })
        .then((response) => {
          console.log(response);
          dispatch(increaseQuantity(shoppingCartProduct, cartId));
        });
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
        {user?.userType === 'Admin' && (
          <IconButton onClick={() => deleteProduct()}>
            <Tooltip title="Remove product from database">
              <Delete />
            </Tooltip>
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export { Product };