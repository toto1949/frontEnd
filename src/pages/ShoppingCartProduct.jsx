import React, {useState} from 'react';
import {IconButton, Input, styled, TableCell, TableRow} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";
import {updateCartItemQuantity} from "../store/slices/cartItemSlice.js";
import {API} from "../API.js";

const StyledIconButton = styled(IconButton)(() => ({
    color: 'red',
    background: 'lightgray',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
}));

const ShoppingCartProduct = (x) => {

    const [quantity, setQuantity] = useState(x.item.quantityInCart);
    const dispatch = useDispatch();

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        setQuantity(newQuantity);
        dispatch(updateCartItemQuantity({id: x.item.id, quantity: newQuantity}));
    };
    const handleDelete = () => {
        x.OnDeleteCartItem(x.item.id);
    };
    return (
        <TableRow>
            <TableCell>
                <img src={`${API}/${x.item.imageUrl}`} alt={x.item.name} style={{width: '50px'}}/>
            </TableCell>
            <TableCell>{x.item.name}</TableCell>
            <TableCell>${x.item.price}</TableCell>
            <TableCell>
                <Input
                    type="number"
                    name="quantity"
                    inputProps={{min: '1', max: '10'}}
                    value={quantity}
                    onChange={handleQuantityChange}
                />
            </TableCell>
            <TableCell>${x.item.price * quantity}</TableCell>
            <TableCell>
                <StyledIconButton onClick={handleDelete}>
                    <DeleteIcon/>
                </StyledIconButton>
            </TableCell>
        </TableRow>
    );
};

export default ShoppingCartProduct;
