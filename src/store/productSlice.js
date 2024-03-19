import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";
import axios from "axios";

const initialState = {
  products: [],
  productsStatus: STATUS.IDLE,
  productSingle: [],
  productSingleStatus: STATUS.IDLE,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncProducts.pending, (state, action) => {
        state.productsStatus = STATUS.LOADING;
      })

      .addCase(fetchAsyncProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.productsStatus = STATUS.SUCCEEDED;
      })

      .addCase(fetchAsyncProducts.rejected, (state, action) => {
        state.productsStatus = STATUS.FAILED;
      })

      .addCase(fetchAsyncProductSingle.pending, (state, action) => {
        state.productSingleStatus = STATUS.LOADING;
      })

      .addCase(fetchAsyncProductSingle.fulfilled, (state, action) => {
        state.productSingle = action.payload;
        state.productSingleStatus = STATUS.SUCCEEDED;
      })

      .addCase(fetchAsyncProductSingle.rejected, (state, action) => {
        state.productSingleStatus = STATUS.FAILED;
      });
  },
});

export const fetchAsyncProducts = createAsyncThunk(
  "products/fetch",
  async (limit, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}products/?limit=${limit}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Getting the single product data
export const fetchAsyncProductSingle = createAsyncThunk(
  "product-single/fetch",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}products/${id}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllProducts = (state) => state.product.products;
export const getAllProductsStatus = (state) => state.product.productsStatus;
export const getProductSingle = (state) => state.product.productSingle;
export const getSingleProductStatus = (state) =>
  state.product.productSingleStatus;
export default productSlice.reducer;

