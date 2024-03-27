import {createSlice} from "@reduxjs/toolkit";

export const cartItemSlice = createSlice({
    name: "cartItem",
    initialState: [],
    reducers:
        {
            addCartItem: (state, action) => {
                state.push(action.payload);
            },
            removeCartItem: (state, action) => {
                return state.filter((item) => item.id !== action.payload);
            },
            updateCartItemQuantity: (state, action) => {
                const {id, quantity} = action.payload;
                const itemToUpdate = state.find(item => item.id === id);
                if (itemToUpdate) {
                    itemToUpdate.quantityInCart = quantity;
                }
            },
        }
})

export const {addCartItem, removeCartItem, updateCartItemQuantity} = cartItemSlice.actions;
export default cartItemSlice.reducer;