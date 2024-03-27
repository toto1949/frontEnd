import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const res = await axios.get("http://localhost:8080/api/products");
    return res.data;
  }
);
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (product) => {
    const res = await axios.post("http://localhost:8080/api/products", product);
    return res.data;
  }
);
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (product, thunkAPI) => {
    const res = await axios.put(
      `http://localhost:8080/api/products/${product.number}`,
      product
    );
    return res.data;
  }
);
export const removeProduct = createAsyncThunk(
  "product/removeProduct",
  async (number) => {
    await axios.delete(`http://localhost:8080/api/products/${number}`);
    return number;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const index = state.products.findIndex(
        (product) => product.number === action.payload.number
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    });
    builder.addCase(removeProduct.fulfilled, (state, action) => {
      const index = state.products.findIndex(
        (product) => product.number === action.payload
      );
      if (index !== -1) {
        state.products.splice(index, 1);
      }
    });
  },
});

export default productSlice.reducer;
