import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../../model/product";

export const productsAdapter = createEntityAdapter<Product>();

export const fetchProductThunk = createAsyncThunk<Product[]>(
    'catalog/fetchProducts',
    async () => {
        try {
            const response = await axios.get('products');
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const fetchProductByIdThunk = createAsyncThunk<Product, number>(
    'catalog/fetchProductsById',
    async (productId) => {
        try {
            const response = await axios.get(`products/${productId}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState({
        status: 'idle',
        productLoaded: false
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProductThunk.pending, (state) => {
            state.status = 'pendingFetchProducts'
        });
        builder.addCase(fetchProductThunk.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.productLoaded = true;
        });
        builder.addCase(fetchProductThunk.rejected, (state) => {
            state.status = 'idle';
        });

        builder.addCase(fetchProductByIdThunk.pending, (state) => {
            state.status = 'pendingFetchProductsById'
        });
        builder.addCase(fetchProductByIdThunk.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchProductByIdThunk.rejected, (state) => {
            state.status = 'idle';
        });
    },
});