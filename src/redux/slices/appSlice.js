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

        mediaUpload: {
            show: false,
        },

        documentUpload: {
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

        // reducer function to update the 'show'  property of mediaUpload model (i.e., state.models.mediaUpload.show).
        updateMediaUploadModel: (state, action) => {
            state.models.mediaUpload.show = action.payload.show;
        },

        // reducer function to update the 'show'  property of documentUpload model (i.e., state.models.documentUpload.show).
        updateDocumentUploadModel: (state, action) => {
            state.models.documentUpload.show = action.payload.show;
        },
    },
});

export const { updateGifModel, updateVoiceRecorderModel, updateMediaUploadModel, updateDocumentUploadModel } = appSlice.actions;
export default appSlice.reducer;
