import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Basket } from "../../model/basket";


export interface BasketState {
    basket: Basket | null;
    status: string;
}

const initialState: BasketState = {
    basket: null,
    status: 'idle'
};

export const addBasketItemThunk = createAsyncThunk<Basket, {productId: number, quantity?: number}>(
    'basket/addBasketItem',
    async ({productId, quantity = 1}, thunkAPI) => {
        try {
            const response = await axios.post(`baskets?productId=${productId}&quantity=${quantity}`, {});
            return response.data;
        } catch (error: any) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const removeBasketItemThunk = 
        createAsyncThunk<void, {productId: number, quantity: number, name?: string}> (
    'basket/removeBasketItem',
    async ({productId, quantity}, thunkAPI) => {
        try {
            await axios.delete(`baskets?productId=${productId}&quantity=${quantity}`);
        } catch (error: any) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasketReducer: (state, action) => {
            state.basket = action.payload;
        },
        removeItemReducer: (state, action) => {
            if (!state.basket) {
                return;
            }
    
            // const basketItems = [...state.basket.basketItems];
            const itemIndex = state.basket.basketItems
                    .findIndex(i => i.productId === action.payload.productId);
    
            if (itemIndex > -1) {
                state.basket.basketItems[itemIndex].quantity -= action.payload.quantity;
    
                if (state.basket.basketItems[itemIndex].quantity === 0) {
                    state.basket.basketItems.splice(itemIndex, 1);
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addBasketItemThunk.pending, (state, action) => {
            // console.log(action);
            state.status = 'pendingAddItem' + action.meta.arg.productId;
        });
        builder.addCase(addBasketItemThunk.rejected, (state) => {
            // console.log(action);
            state.status = 'idle';
        });
        builder.addCase(addBasketItemThunk.fulfilled, (state, action) => {
            state.status = 'idle';
            state.basket = action.payload;
        });

        builder.addCase(removeBasketItemThunk.pending, (state, action) => {
            state.status = 'pendingRemoveItem' + action.meta.arg.productId + action.meta.arg.name;
        });
        builder.addCase(removeBasketItemThunk.fulfilled, (state, action) => {
            const itemIndex = state.basket?.basketItems.findIndex(i => i.productId === action.meta.arg.productId);

            if (itemIndex !== undefined && itemIndex > -1) {
                state.basket!.basketItems[itemIndex].quantity -= action.meta.arg.quantity;

                if (state.basket?.basketItems[itemIndex].quantity === 0) {
                    state.basket.basketItems.splice(itemIndex, 1);
                }
            }
            state.status = 'idle';
        });
        builder.addCase(removeBasketItemThunk.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action);
        });
    },
});

export const { setBasketReducer, removeItemReducer} = basketSlice.actions;