import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../products/productsReducer";


const store = configureStore({
    reducer: {
        productsReducer,
    }
});


export default store;