import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrders = createAsyncThunk(
    "order/fetchOrders",
    async () => {
        const res = await axios.get("http://localhost:8080/api/orders");
        return res.data;
    }
);

export const addOrder = createAsyncThunk(
    "order/addOrder",
    async (order) => {
        const res = await axios.post("http://localhost:8080/api/orders", order);
        return res.data;
    }
);

export const updateOrder = createAsyncThunk(
    "order/updateOrder",
    async (order) => {
        const res = await axios.put(
            `http://localhost:8080/api/orders/${order.id}`,
            order
        );
        return res.data;
    }
);

export const removeOrder = createAsyncThunk(
    "order/removeOrder",
    async (orderId) => {
        await axios.delete(`http://localhost:8080/api/orders/${orderId}`);
        return orderId;
    }
);

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchOrders.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orders = action.payload;
        });
        builder.addCase(fetchOrders.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
        builder.addCase(addOrder.fulfilled, (state, action) => {
            state.orders.push(action.payload);
        });
        builder.addCase(updateOrder.fulfilled, (state, action) => {
            const index = state.orders.findIndex(
                (order) => order.id === action.payload.id
            );
            if (index !== -1) {
                state.orders[index] = action.payload;
            }
        });
        builder.addCase(removeOrder.fulfilled, (state, action) => {
            state.orders = state.orders.filter(
                (order) => order.id !== action.payload
            );
        });
    },
});

export default orderSlice.reducer;
