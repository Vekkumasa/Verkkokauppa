import React from 'react';
import { useAppSelector } from '../store/rootReducer';
import { makeStyles, useTheme  } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Delete from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: 400,
    marginBottom: 15
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  image: {
    width: 150,
  },
}));

const ShoppingCart: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();

  const products: Product[] = useAppSelector(
    state => state.shoppingCartReducer.cart
  );

  const user: Credentials | null = useAppSelector(
    state => state.userReducer.user
  );

  const removeFromShoppingCart = () => {
    console.log('todo');
  };

  console.log('shopping cart', products);
  return (
    <div>
      {products.map(product => {
        return (
          <Card key={product.id} className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  {product.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {product.description}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {product.price}
                </Typography>
              </CardContent>
            </div>
            <CardMedia
              className={classes.image}
              image={product.image}
            />
          </Card>
        );
      })}
    </div>
  );
};

export default ShoppingCart;