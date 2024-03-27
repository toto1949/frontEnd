import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchReviews = createAsyncThunk(
    "review/fetchReviews",
    async (productId) => {
        const res = await axios.get(`http://localhost:8080/api/products/${productId}/reviews`);
        return res.data;
    }
);

export const addReview = createAsyncThunk(
    "review/addReview",
    async (review) => {
        const res = await axios.post(`http://localhost:8080/api/products/${review.productId}/reviews`, review);
        return res.data;
    }
);

export const reviewSlice = createSlice({
    name: "review",
    initialState: {
        reviews: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchReviews.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchReviews.fulfilled, (state, action) => {
            state.isLoading = false;
            state.reviews = action.payload;
        });
        builder.addCase(fetchReviews.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
        builder.addCase(addReview.fulfilled, (state, action) => {
            state.reviews.push(action.payload);
        });
    },
});

export default reviewSlice.reducer;
