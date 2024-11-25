import { File, Image, LinkSimple } from "@phosphor-icons/react";
import React, { useEffect, useRef, useState } from "react";
import commonStyles from "../commonStyles";
import { useDispatch } from "react-redux";
import { updateDocumentUploadModel, updateMediaUploadModel } from "../redux/slices/appSlice";

function MediaUploadPopup() {
    const dispatch = useDispatch();
    const popupRef = useRef(null);
    const triggerRef = useRef(null);
    const [showPopup, setShowPopup] = useState(false);
    function handleToggleShowPopup(event) {
        event.preventDefault();
        setShowPopup((prev) => !prev);
    }

    // close dropdown when user click outside the dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                !popupRef ||
                !triggerRef ||
                !showPopup ||
                popupRef.current.contains(event.target) ||
                triggerRef.current.contains(event.target)
            ) {
                return;
            }

            setShowPopup(false);
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [showPopup]);

    // close dropdown when user click on the ESC key.
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (!showPopup || event.keyCode !== 27) {
                return;
            }

            setShowPopup(false);
        };

        document.addEventListener("keydown", handleKeyPress);
        return () => document.removeEventListener("keydown", handleKeyPress);
    }, [showPopup]);

    // Function to dispatch an action to open the media upload model - for uploading images and videos.
    function showMediaUploadModel(event) {
        event.preventDefault();

        dispatch(
            updateMediaUploadModel({
                show: true,
            })
        );
    }

    // Function to dispatch an action to open the document upload model - for uploading files and documents
    function showDocumentUploadModel(event) {
        event.preventDefault();

        dispatch(
            updateDocumentUploadModel({
                show: true,
            })
        );
    }

    return (
        <div className="relative">
            <button
                ref={triggerRef}
                className="flex items-center justify-center hover:text-primary"
                onClick={handleToggleShowPopup}
            >
                <LinkSimple size={20} weight="regular" />
            </button>

            <div
                ref={popupRef}
                className={`${showPopup ? "block" : "hidden"} ${commonStyles.inputBackground} absolute right-0 -top-[5.2rem] flex flex-col justify-center items-start gap-2 px-2 py-2 min-w-28 rounded-md`}
            >
                <button
                    className="flex items-center gap-2 hover:text-primary"
                    onClick={showMediaUploadModel}
                >
                    <span className="">
                        <Image size={20} weight="regular" />
                    </span>

                    <span className="text-nowrap text-sm">Images & videos</span>
                </button>

                <button
                    className="flex items-center gap-2 hover:text-primary"
                    onClick={showDocumentUploadModel}
                >
                    <span className="">
                        <File size={20} weight="regular" />
                    </span>

                    <span className="text-nowrap text-sm">
                        Files & documents
                    </span>
                </button>
            </div>
        </div>
    );
}

export default MediaUploadPopup;
