import { configureStore } from "@reduxjs/toolkit";
import { basketSlice } from "./features/basket/basketSlice";
import counterReducer from './features/counter/counterSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        basket: basketSlice.reducer
    }
});