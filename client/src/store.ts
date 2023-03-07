import { configureStore } from "@reduxjs/toolkit";
import { basketSlice } from "./features/basket/basketSlice";
import { catalogSlice } from "./features/catalog/catalogSlice";
import counterReducer from './features/counter/counterSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        basket: basketSlice.reducer,
        catalog: catalogSlice.reducer
    }
});