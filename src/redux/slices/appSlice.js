import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    models: {
        gif: {
            show: false,
            url: "",
        },

        voiceRecorder: {
            show: false,
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
        // reducer function to update the 'show' and 'url' property of gif model (i.e., state.models.gif.show, state.models.gif.url).
        updateGifModel: (state, action) => {
            state.models.gif.show = action.payload.show;
            state.models.gif.url = action.payload.url;
        },

        // reducer function to update the 'show'  property of voiceRecorder model (i.e., state.models.voiceRecorder.show).
        updateVoiceRecorderModel: (state, action) => {
            state.models.voiceRecorder.show = action.payload.show;
        },
    },
});

export const { updateGifModel, updateVoiceRecorderModel } = appSlice.actions;
export default appSlice.reducer;
