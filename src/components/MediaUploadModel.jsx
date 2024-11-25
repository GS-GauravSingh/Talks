import { PaperPlaneTilt, X } from "@phosphor-icons/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMediaUploadModel } from "../redux/slices/appSlice";
import commonStyles from "../commonStyles";
import FileDropzone from "./FileDropzone";

function MediaUploadModel() {
    const dispatch = useDispatch();
    const mediaUploadRedux = useSelector(
        (state) => state.appReducers.models.mediaUpload
    );

    // Function to media upload Model.
    function hanldeCloseMediaUploadModel(event) {
        event.preventDefault();
        dispatch(
            updateMediaUploadModel({
                show: false,
            })
        );
    }

    // Close the media upload model when user click on the ESC key.
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!mediaUploadRedux.show || keyCode !== 27) {
                return;
            }

            dispatch(
                updateMediaUploadModel({
                    show: false,
                })
            );
        };

        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    return (
        <div
            className={`${mediaUploadRedux.show ? "fixed" : "hidden"} top-0 h-full min-h-screen w-full bg-black/90 z-999999 flex items-center justify-center px-4 py-5`}
        >
            <div className="bg-white dark:bg-smokyBlack w-full max-w-md px-10 py-8 rounded-md space-y-8">
                <div className="flex items-center justify-between">
                    <h3 className="text-black dark:text-white font-medium text-sm">
                        Choose Media Files to send
                    </h3>

                    <button
                        className="text-black dark:text-white hover:!text-primary"
                        onClick={hanldeCloseMediaUploadModel}
                    >
                        <X size={24} weight="regular" />
                    </button>
                </div>

                {/* File Dropzone Component */}
                <FileDropzone acceptedFiles=".jpg,.jpeg,.png,.gif,.bmp,.webp,.svg,.mp4,.mkv,.mov,.avi,.wmv,.flv,.webm" />

                <form className="flex items-center gap-2">
                    <input
                        type="text"
                        className={`${commonStyles.inputBackground} outline-none text-black dark:text-white w-full text-sm rounded-full  px-4 h-10 border-2 border-transparent focus-within:border-primary`}
                        placeholder="Type your message here..."
                    />
                    <button className="rounded-full bg-primary p-2 text-white">
                        <PaperPlaneTilt size={24} weight="regular" />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default MediaUploadModel;
