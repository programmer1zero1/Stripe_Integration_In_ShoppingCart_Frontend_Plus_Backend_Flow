import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices"

let store = configureStore({
    reducer:{
        products:productSlice,
    }
})

export default store



