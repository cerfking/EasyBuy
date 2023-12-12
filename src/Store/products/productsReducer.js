import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    products: [],
    product: { name: "New Module 123", description: "New Description" , price: 0, images:[]},
};


const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.products = [action.payload, ...state.products];
        },

        deleteProduct: (state, action) => {
            state.products = state.products.filter(
                (product) => product._id !== action.payload
            );
        },
        updateProduct: (state, action) => {
            state.products = state.products.map((product) => {
                if (product._id === action.payload._id) {
                    return action.payload;
                } else {
                    return product;
                }
            });
        },
        setProduct: (state, action) => {
            state.product = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },

    },
});


export const { addProduct, deleteProduct,
    updateProduct, setProduct,setProducts } = productsSlice.actions;
export default productsSlice.reducer;

