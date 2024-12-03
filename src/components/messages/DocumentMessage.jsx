import { Check, Checks, DownloadSimple, File } from "@phosphor-icons/react";
import React from "react";
import commonStyles from "../../commonStyles";

function DocumentMessage({
    incoming = "",
    author = "",
    timestamp = "",
    read_receipt = "",
}) {
    return (
        <div
            className={`${!incoming && "ml-auto"} w-fit max-w-[500px] flex flex-col gap-2 cursor-default`}
        >
            <h3 className={`${!incoming && "hidden"} text-xs font-semibold`}>
                {author}
            </h3>

            <div
                className={`px-4 py-4 text-sm ${!incoming ? "bg-primary border-primary text-white !rounded-br-none" : `${commonStyles.border} ${commonStyles.inputBackground} !border !rounded-tl-none`} text-black dark:text-white rounded-xl space-y-2 flex flex-col items-start justify-center `}
            >
                <div className={`w-full flex flex-row items-center gap-2 p-2 bg-slate-100 rounded-lg`}>
                    <span
                        className={`${commonStyles.borderPrimary} bg-primary text-white flex items-center px-2 py-2 rounded-lg`}
                    >
                        <File size={20} weight="regular" />
                    </span>

                    <div className={`flex-grow flex flex-col gap-1`}>
                        <p className="text-black">Filename</p>
                        <p className={`text-xs text-gray`}>File Size (in mb)</p>
                    </div>

                    <button className="pl-6 flex hover:text-primary text-gray">
                        <DownloadSimple size={20} weight="regular" />
                    </button>
                </div>

                <div>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis deleniti distinctio dolore, similique mollitia illo perspiciatis et dicta sint quis.</p>
                </div>
            </div>

            <div className={`flex flex-row gap-2 items-center justify-end`}>
                <p className={`text-xs font-medium`}>{timestamp}</p>

                <div
                    className={`${incoming && "hidden"} ${read_receipt === "read" && "text-primary"}`}
                >
                    {/* read-receipt: Single Tick (message sent), Double Tick (message delivered) and Double Tick with Primary Color (message read) */}
                    {read_receipt === "sent" ? (
                        <Check size={18} weight="regular" />
                    ) : (
                        <Checks size={18} weight="regular" />
                    )}
                </div>
            </div>
        </div>
    );
}

export default DocumentMessage;
