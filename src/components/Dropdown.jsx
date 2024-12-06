import { DotsThree, PencilSimple, Trash } from "@phosphor-icons/react";
import React, { useEffect, useRef, useState } from "react";
import commonStyles from "../commonStyles";

function Dropdown() {
    const dropdownRef = useRef(null);
    const triggerRef = useRef(null);
    const [showDropdown, setShowDropdown] = useState(false);
    function handleToggleShowDropdown(event) {
        event.preventDefault();
        setShowDropdown((prev) => !prev);
    }

    // close dropdown when user click outside the dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                !dropdownRef ||
                !triggerRef ||
                !showDropdown ||
                dropdownRef.current.contains(event.target) ||
                triggerRef.current.contains(event.target)
            ) {
                return;
            }

            setShowDropdown(false);
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [showDropdown]);

    // close dropdown when user click on the ESC key.
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (!showDropdown || event.keyCode !== 27) {
                return;
            }

            setShowDropdown(false);
        };

        document.addEventListener("keydown", handleKeyPress);
        return () => document.removeEventListener("keydown", handleKeyPress);
    }, [showDropdown]);

    return (
        <div className="relative">
            <button
                ref={triggerRef}
                className="hover:text-primary"
                onClick={handleToggleShowDropdown}
            >
                <DotsThree size={24} weight="regular" />
            </button>

            <div
                ref={dropdownRef}
                className={`flex flex-col justify-center items-start gap-2 px-2 py-2 ${commonStyles.inputBackground} min-w-28 rounded-md absolute z-999999 ${showDropdown ? "-translate-x-full opacity-100" : "translate-x-0 opacity-0"} transition duration-75 ease-linear`}
            >
                <div className="flex gap-2 items-center cursor-pointer group">
                    <span className="group-hover:text-primary">
                        <PencilSimple size={18} weight="regular" />
                    </span>
                    <span className="text-sm text-nowrap group-hover:text-primary">
                        Edit Message(s)
                    </span>
                </div>

                <div className="flex gap-2 items-center cursor-pointer group">
                    <span className="group-hover:text-primary">
                        <Trash size={18} weight="regular" />
                    </span>
                    <span className="text-sm text-nowrap group-hover:text-primary">
                        Delete Message(s)
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Dropdown;
