import React, {useState} from 'react';
import {
    TableRow,
    TableCell,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    Paper,
    Typography,
    Grid,
    Button
} from '@mui/material';
import ShoppingCartProduct from "./ShoppingCartProduct.jsx";
import {useDispatch, useSelector} from "react-redux";
import {removeCartItem} from "../store/slices/cartItemSlice.js";
import {Link} from "react-router-dom";

const ShoppingCart = ({showSideBar}) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cartItem);

    const OnDeleteCartItem = (id) => {
        dispatch(removeCartItem(id));
    };

    const itemsInCart = cartItems.filter((item) => item.quantityInCart > 0);
    const amountToPay = cartItems.reduce((total, item) => total + item.price * item.quantityInCart, 0);

    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f5f5f5',
            padding: '20px',
            marginLeft: !showSideBar ? '80px' : '0'
        }}>
            <Typography variant="h4" align="center" gutterBottom>
                Your Shopping Cart
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cartItems.map((item, index) => (
                            <ShoppingCartProduct
                                key={index}
                                item={item}
                                OnDeleteCartItem={OnDeleteCartItem}
                                items={cartItems}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <section style={{marginTop: '20px'}}>
                <Typography variant="h5" gutterBottom>
                    Cart Total
                </Typography>
                <Grid container justifyContent="space-between">
                    <Grid item>
                        <Typography variant="body1">Cart Totals</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1">Number of items: {itemsInCart.length}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1">Total: £{amountToPay}</Typography>
                    </Grid>
                </Grid>
                <Grid style={{marginTop: '20px'}}>
                    <Link to={`/checkout`} state={{items: cartItems,amountToPay:amountToPay}}>
                        <Button
                            id="checkout"
                            disabled={itemsInCart.length === 0}
                            variant="contained"
                            color="primary"
                        >
                            Checkout
                        </Button>
                    </Link>

                </Grid>
            </section>
        </div>
    );
};

export default ShoppingCart;
