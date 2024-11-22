import React from "react";
import commonStyles from "../commonStyles";

function MessageBox({ type }) {
    return (
        <div className={`${type === "send" && "ml-auto"} max-w-[500px] flex flex-col gap-2 cursor-default`}>
            <h3 className={`${type === "send" && "hidden"} text-xs font-semibold`}>Ishika Verma</h3>
            <div
                className={`px-4 py-4 text-sm ${type === "send" ? "bg-primary border-primary text-white !rounded-br-none" : `${commonStyles.border} ${commonStyles.inputBackground} !border text-black dark:text-white !rounded-tl-none`} rounded-xl`}
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil quia dolore sequi delectus, vel rem veniam culpa itaque labore inventore!
            </div>
            <p className={`${type === "send" && "text-right"} text-xs font-medium`}>2:00 pm</p>
        </div>
    );
}

export default MessageBox;
