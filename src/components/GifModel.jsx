import { PaperPlaneTilt, X } from "@phosphor-icons/react";
import React, { useEffect, useRef } from "react";
import commonStyles from "../commonStyles";
import { useDispatch, useSelector } from "react-redux";
import { updateGifModel } from "../redux/slices/appSlice";

function GifModel() {
    const dispatch = useDispatch();
    const gifRedux = useSelector((state) => state.appReducers.models.gif);
    const containerRef = useRef(null);

    // Function to send Gif
    function handleSendGif(event) {
        event.preventDefault();
    }

    // Function to close GIF Model.
    function hanldeCloseGifModel(event) {
        event.preventDefault();
        dispatch(
            updateGifModel({
                show: false,
                url: "",
            })
        );
    }

    // Close the gif model when user click on the ESC key.
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!gifRedux.show || keyCode !== 27) {
                return;
            }

            dispatch(
                updateGifModel({
                    show: false,
                    url: "",
                })
            );
        };

        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    return (
        <div
            ref={containerRef}
            className={`${gifRedux.show ? "block" : "hidden"} fixed top-0 h-full min-h-screen w-full bg-black/90 z-999999 flex items-center justify-center px-4 py-5`}
        >
            <div className="bg-white dark:bg-smokyBlack w-full max-w-md px-10 py-8 rounded-md space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-black dark:text-white font-medium text-sm">
                        Send Giphy
                    </h3>

                    <button
                        className="text-black dark:text-white hover:!text-primary"
                        onClick={hanldeCloseGifModel}
                    >
                        <X size={24} weight="regular" />
                    </button>
                </div>

                <img
                    src={gifRedux.url}
                    alt="GIPHY"
                    className="rounded-md w-full max-w-96 h-full max-h-96 object-center object-fill"
                />

                <form className="flex items-center gap-2">
                    <input
                        type="text"
                        className={`${commonStyles.inputBackground} outline-none text-black dark:text-white w-full text-sm rounded-full  px-4 h-10 border-2 border-transparent focus-within:border-primary`}
                        placeholder="Type your message here..."
                    />
                    <button
                        className="rounded-full bg-primary p-2 text-white"
                        onClick={handleSendGif}
                    >
                        <PaperPlaneTilt size={24} weight="regular" />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default GifModel;
