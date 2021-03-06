import React, { useState, useEffect } from 'react';

import { Redirect } from 'react-router-dom';
import userService from '../services/userService';
import { useAppSelector } from '../store/rootReducer';
import { makeStyles } from '@material-ui/styles';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons/';
import { parseDate } from '../utils/DateParser';
import { blue, grey } from '@material-ui/core/colors/';

type ShoppingCartWithCompletionDate = {
  products: ShoppingCartProduct[],
  user: string,
  id: string,
  completionDate: Date,
};

import {
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  Paper,
  Typography,
  IconButton,
  Collapse,
  Box
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#3F88B5',
    '& > *': {
      borderBottom: 'unset',
    },
  },
  header: {
    backgroundColor: '#3f51b5',
  },
  row: {  
    '&:hover': {
      backgroundColor: blue[200],
    },
  },
  body: {
    backgroundColor: grey[200],
  }
});

interface RowProps {
  order: ShoppingCart
}

const Row = ({ order }: RowProps):JSX.Element => {
  const [ open, setOpen ] = useState<boolean>();
  const classes = useStyles();

  const totalPrice = () => {
    return order.products.reduce((prev, cur) => prev + cur.price * cur.quantity, 0);
  };

  return (
    <>
      <TableRow className={`${classes.root}`}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" style={{ color: 'white'}}> {parseDate(order.completionDate)} </TableCell>
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Tilauksen kokonaishinta: &nbsp; {totalPrice()}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow className={classes.body}>
                    <TableCell>Nimi</TableCell>
                    <TableCell>Hinta</TableCell>
                    <TableCell align="right">Määrä</TableCell>
                    <TableCell align="right">Hinta yhteensä</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className={classes.body}>
                  {order.products.map((product) => (
                    <TableRow key={product._id} className={classes.row}>
                      <TableCell component="th" scope="row">
                        {product.name}
                      </TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell align="right">{product.quantity}</TableCell>
                      <TableCell align="right">
                        {Math.round(product.quantity * product.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const sortOrders = (orders: ShoppingCart[]): ShoppingCartWithCompletionDate[] => {
  const newList: ShoppingCartWithCompletionDate[] = orders as ShoppingCartWithCompletionDate[];
  return newList.sort((o1, o2) => new Date(o2.completionDate).getTime() - new Date(o1.completionDate).getTime());
};

type Props = {
  redirect: string,
};

const PastOrders = ({ redirect }: Props): JSX.Element => {
  const [ orders, setOrders ] = useState<ShoppingCart[]>([]);
  const sortedOrders = sortOrders(orders);
  const classes = useStyles();
  const user = useAppSelector(state => state.userReducer.user);

  useEffect(() => {
    if (user) {
      void userService.getUsersCompletedShoppingcarts(user._id)
      .then((res) => {
        setOrders(res);
      });
    }
  }, []);

  return (
    <>
      {redirect && <Redirect to={redirect} /> }
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow className={classes.header}>
              <TableCell />
              <TableCell style={{ color: 'white' }}>Tilauksen päivämäärä</TableCell>
              <TableCell align="left" />
              <TableCell align="right"/>
              <TableCell align="right"/>
              <TableCell align="right"/>
            </TableRow>
          </TableHead>
          <TableBody className={classes.body}>
            {sortedOrders.map((order) => (
              <Row key={order.id} order={order}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PastOrders;