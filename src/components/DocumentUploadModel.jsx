import { PaperPlaneTilt, X } from "@phosphor-icons/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDocumentUploadModel } from "../redux/slices/appSlice";
import commonStyles from "../commonStyles";
import FileDropzone from "./FileDropzone";

function DocumentUploadModel() {
    const dispatch = useDispatch();
    const documentUploadRedux = useSelector(
        (state) => state.appReducers.models.documentUpload
    );

    // Function to document upload Model.
    function hanldeCloseMediaUploadModel(event) {
        event.preventDefault();
        dispatch(
            updateDocumentUploadModel({
                show: false,
            })
        );
    }

    // Close the media upload model when user click on the ESC key.
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!documentUploadRedux.show || keyCode !== 27) {
                return;
            }

            dispatch(
                updateDocumentUploadModel({
                    show: false,
                })
            );
        };

        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    return (
        <div
            className={`${documentUploadRedux.show ? "fixed" : "hidden"} top-0 h-full min-h-screen w-full bg-black/90 z-999999 flex items-center justify-center px-4 py-5`}
        >
            <div className="bg-white dark:bg-smokyBlack w-full max-w-md px-10 py-8 rounded-md space-y-8">
                <div className="flex items-center justify-between">
                    <h3 className="text-black dark:text-white font-medium text-sm">
                        Choose Files to send
                    </h3>

                    <button
                        className="text-black dark:text-white hover:!text-primary"
                        onClick={hanldeCloseMediaUploadModel}
                    >
                        <X size={24} weight="regular" />
                    </button>
                </div>

                {/* File Dropzone Component */}
                <FileDropzone
                    maxFileSize={64 * 1024 * 1024}
                    acceptedFiles=".pdf,.ppt,.doc,.docx,.xls,.xlsx,.txt,.csv,.fig" // no space between two formats
                    
                />

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

export default DocumentUploadModel;
