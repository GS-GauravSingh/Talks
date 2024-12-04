import { Check, Checks } from "@phosphor-icons/react";
import React from "react";
import commonStyles from "../../commonStyles";
import Waveform from "../Waveform";

function VoiceMessage({
    incoming = "",
    author = "",
    timestamp = "",
    read_receipt = "",
}) {
    return (
        <div
            className={`${!incoming && "ml-auto"} w-full max-w-[500px] flex flex-col gap-2 cursor-default`}
        >
            <h3 className={`${!incoming && "hidden"} text-xs font-semibold`}>
                {author}
            </h3>

            {/* Waveform */}
            <div
                className={`px-4 py-4 text-sm ${!incoming ? "bg-primary border-primary text-white !rounded-br-none" : `${commonStyles.border} ${commonStyles.inputBackground} !border !rounded-tl-none`} text-black dark:text-white rounded-xl space-y-2`}
            >
                <Waveform incoming={incoming} />
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

export default VoiceMessage;
