import React from "react";
import commonStyles from "../commonStyles";

function TypingIndicator() {
    return (
        <div className={`flex items-center justify-start max-w-fit`}>
            <div
                className={`${commonStyles.inputBackground} ${commonStyles.border} !rounded-tl-none flex items-center gap-1 rounded-lg px-4 py-2`}
            >
                <span className="text-sm">Typing</span>
                <div className="flex items-center">
                    {/* typing-indicator-dot - used for custome animation - defined in 'index.css' file */}
                    <span className="font-medium typing-indicator-dot">.</span>
                    <span className="font-medium typing-indicator-dot">.</span>
                    <span className="font-medium typing-indicator-dot">.</span>
                </div>
            </div>
        </div>
    );
}

export default TypingIndicator;
