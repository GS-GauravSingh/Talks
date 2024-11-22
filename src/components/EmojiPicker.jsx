import { Smiley } from "@phosphor-icons/react";
import React, { useEffect, useRef, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

function EmojiPicker() {

    const theme = JSON.parse(localStorage.getItem("theme"));
    const pickerRef = useRef(null);
    const triggerRef = useRef(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    function handleToggleShowEmojiPicker(event) {
        event.preventDefault();
        setShowEmojiPicker((prev) => !prev);
    }

    // close emoji picker when user click outside the emoji picker
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                !pickerRef ||
                !triggerRef ||
                !showEmojiPicker ||
                pickerRef.current.contains(event.target) ||
                triggerRef.current.contains(event.target)
            ) {
                return;
            }

            setShowEmojiPicker(false);
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [showEmojiPicker]);

    // close emoji picker when user click on the ESC key.
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (!showEmojiPicker || event.keyCode !== 27) {
                return;
            }

            setShowEmojiPicker(false);
        };

        document.addEventListener("keydown", handleKeyPress);
        return () => document.removeEventListener("keydown", handleKeyPress);
    }, [showEmojiPicker]);

    return (
        <div className="flex items-center relative">
            <button ref={triggerRef} className="hover:text-primary " onClick={handleToggleShowEmojiPicker}>
                <Smiley size={20} weight="regular" />
            </button>

            <div ref={pickerRef} className={`${showEmojiPicker ? "absolute" : "hidden"} z-40 right-0 -top-[455px]`}>
                <Picker theme={theme} data={data} onEmojiSelect={console.log} />
            </div>
        </div>
    );
}

export default EmojiPicker;
