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
import { addProductToCart } from '../store/ShoppingCart/actionCreators';

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

  const addProductToShoppingCart = () => {
    dispatch(addProductToCart(product));
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
        <Button size="small" color="primary" onClick={() => addProductToShoppingCart()}>
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