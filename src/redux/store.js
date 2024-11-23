import { configureStore } from "@reduxjs/toolkit";
import appReducers from "./slices/appSlice";

const store = configureStore({
    reducer: {
        appReducers: appReducers
    },
});


export default store;
