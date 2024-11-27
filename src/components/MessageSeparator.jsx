import React from "react";
import commonStyles from "../commonStyles"


function MessageSeparator() {
    return (
        <div className="w-full py-2 flex flex-row items-center gap-4">
            <div className={`${commonStyles.border} !border grow rounded-lg`}></div>
            <div className="text-xs font-medium">
                Today
            </div>
            <div className={`${commonStyles.border} !border grow rounded-lg`}></div>
        </div>
    );
}

export default MessageSeparator;
