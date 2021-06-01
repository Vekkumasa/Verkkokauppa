import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { 
  CardMedia,
  Card,
  Box,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Grid,
  Chip,
} from '@material-ui/core';
import { useAppSelector, AppDispatch, useAppDispatch } from '../store/rootReducer';
import { handleModal } from '../store/modal/actionCreators';
import Rating from '@material-ui/lab/Rating';
import { StarBorder, FiberManualRecord as CircleIcon, Edit } from '@material-ui/icons/';
import userService from '../services/userService';

import ModifyProductModal from '../modals/ModifyProductModal';
import { arrayBufferToBase64 } from '../utils/ArrayBufferToBase64';
import { roundToHalf } from '../utils/RoundToHalf';
import { setActiveProduct } from '../store/ActiveProduct/actionCreators';
import { logIn } from '../store/User/actionCreators';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  box: {
    marginLeft: 25,
    width: '100%',
    borderRadius: 15,
  },
  card: {
    maxWidth: 500,
    maxHeight: 350
  },
  image: {
    height: 350,
    width: 500,
  },
  availability: {
    height: 20,
    width: 20,
    marginLeft: 10
  },
  button: {
    padding: 25,
    width: '100%',
  },
  priceTag: {
    width: 150,
    borderRadius: 15,
    marginBottom: 30,
    backgroundColor: 'lightgrey'
  }, 
  chip: {
    padding: 15,
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 15,
    width: '80%'
  },
  ratedTag: {
    borderRadius: 10,
    color: 'darkgreen',
    height: 20,
    width: 60,
    textAlign: 'center',
    marginLeft: 10,
    padding: 3,
    transform: `rotate(-30deg)`,
  }
});

const ProductInfo = (): JSX.Element => {
  const classes = useStyles();
  const dispatch: AppDispatch = useAppDispatch();

  const product: Product | undefined = useAppSelector(
    state => state.activeProductReducer.product
  );

  const shoppingCart = useAppSelector(state => state.shoppingCartReducer.cart);
  
  const user = useAppSelector(state => state.userReducer.user);
  const userId = user? user._id : '';
  if (!product) return <div></div>;

  console.log(user, user?.ratings);
  console.log('product', product);

  const hasUserRatedTheProduct = user?.ratings?.some(p => p._id.toString() === product._id);

  const isProductInCart = shoppingCart.some(p => p._id === product._id);

  const productStock = () => {
    if (product.stock <= 0) {
      return <CircleIcon className={classes.availability} style={{ color: 'red'}} />;
    } else if (product.stock >= 1 && product.stock <= 5) {
      return <CircleIcon className={classes.availability} style={{ color: 'yellow'}} />;
    } else {
      return <CircleIcon className={classes.availability} style={{ color: 'green'}} />;
    }
  };

  const handleShoppingCart = () => {
    if (isProductInCart) {
      console.log('tuote on kärryssä');
      
    } else {
      console.log('tuote ei ole kärryssä');
    }
  };

  const productRating = () => {
    if (!product.ratings || product.ratings.length === 0) return 0;
    
    const sum = product.ratings.reduce((prev, cur) => prev + cur, 0);
    console.log('sum / length:', sum / product.ratings.length, 'rounded: ', roundToHalf(sum / product.ratings.length));
    return roundToHalf(sum / product.ratings.length);
  };

  const handleRating = (number: number | null) => {
    const value = number? number : 0;
    const response = userService.addRatingForProduct(userId, product._id, value);
    void response.then((res) => {
      if (res !== null) {
        const productWithNewRatings = res.ratings?.find(r => r._id.toString() === product._id);
        if (productWithNewRatings) {
          void dispatch(setActiveProduct(productWithNewRatings));
          void dispatch(logIn(res));
        }
      }
    });
  };

  const loremIpsum = () => {
    return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  };

  const priceTag = () => {
    return (
      <Box border={1} justifyContent="center" className={classes.priceTag}>
        <Chip
          size="small"
          label={product.price.toString() + '€'}
          color="primary"
          className={classes.chip}
        />
      </Box>
    );
  };

  const modifyProductButton = () => {
    return (
      <Box border={1} style={{ borderRadius: 10, color: 'darkblue', width: 50, marginBottom: 25}}>
        <IconButton
        style={{ width: '100%', height: '100%'}}
        color="primary"
        onClick={() => dispatch(handleModal(true, 'ModifyProduct'))}
        >
          <Edit />
        </IconButton>
      </Box>
    );
  };

  const ratedTag = ():JSX.Element => {
    return (
      <Box border={2} className={classes.ratedTag}>
          <Typography>Rated</Typography>
      </Box>
    );
  };

  const addToShoppingcart = () => {   
    return (
      <Box border={1} justifyContent="center" style={{ backgroundColor: 'lightgrey', maxWidth: 300, borderRadius: 10 }}>
        <Button
          className={classes.button}
          disabled={product.stock <= 0}
          size="small" color="primary"
          onClick={() => handleShoppingCart()}
        >
          Lisää ostoskoriin
          <Tooltip title={<><p> Green = Available <br/> Yellow = Few left <br/> Red = Not available  </p> </>}>
            {productStock()}
          </Tooltip> 
        </Button>
      </Box>
    );
  };

  let image;
  if (product.image) {
    const buffer = Buffer.from(product.image.data);
    image = arrayBufferToBase64(buffer);
  }

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardMedia image={image} className={classes.image} />
      </Card>
      <Box border={1} className={classes.box} style={{ color: 'blue' }}>
        <Grid container item xs={12} spacing={3} style={{ color: 'black', padding: 15 }} >
          <Grid item xs={7}>
            <div style={{ display: 'flex', flexDirection: 'row'}}>
              <Typography variant='h3' style={{ marginRight: 15 }}> {product.name}  </Typography>
              {user?.userType === 'Admin' && modifyProductButton()}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row'}}>
              <Rating
                readOnly={!user || hasUserRatedTheProduct}
                value={productRating()}
                name={product.name}
                precision={0.5}
                emptyIcon={<StarBorder fontSize="inherit" />}
                onChange={(_event, value) => handleRating(value)}
              />
              {hasUserRatedTheProduct === true && ratedTag()}
            </div>
            <Typography>
              <br/>
              {product.description}
              <br/>
              {loremIpsum()}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <div style={{ position: 'relative', top: 150}}>
              {priceTag()}
              {addToShoppingcart()}
            </div>
          </Grid>
        </Grid>
      </Box>
      <ModifyProductModal />
    </div>
  );
};

export default ProductInfo;