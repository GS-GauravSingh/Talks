import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    models: {
        gif: {
            show: false,
            url: "",
        },
    },
};

const appSlice = createSlice({
    // name of the slice
    name: "app",

    // initial state of the 'app' slice
    initialState,

    // Reducer functions - used to make chages to the slice state (data).
    reducers: {
        // reducer function to update the 'show' and 'url' propertity of gif model (i.e., state.models.gif.show, state.models.gif.url).
        updateGifModel: (state, action) => {
            state.models.gif.show = action.payload.show;
            state.models.gif.url = action.payload.url;
        },
    },
});

export const { updateGifModel } = appSlice.actions;
export default appSlice.reducer;
