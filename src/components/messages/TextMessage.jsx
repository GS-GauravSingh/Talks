import React from "react";
import commonStyles from "../../commonStyles";
import extrackLinksFromText from "../../utils/extractLinksFromText";
import Microlink from "@microlink/react";
import { Check, Checks } from "@phosphor-icons/react";

/*
    read-receipt (Parameter) - will get from the backend and it has 3 states i.e.,
        1. Sent: The message has been sent but not yet delivered or read by the recipient.
        2. Delivered: The message has been successfully delivered to the recipient’s device.
        3. Read: The recipient has opened and viewed the message.

    // In technical Terms:
        1. Sent: user sends the message to the server
        2. Delivered: Server forwards the message to the recipient's device.
        3. Read: The recipient has opened and viewed the message.
*/
function TextMessage({
    incoming = false,
    author = "",
    timestamp = "",
    content = "",
    read_receipt = "",
}) {
    const { originalString, links } = extrackLinksFromText(content, incoming);

    return (
        <div
            className={`${!incoming && "ml-auto"} w-full max-w-[500px] flex flex-col gap-2 cursor-default`}
        >
            <h3 className={`${!incoming && "hidden"} text-xs font-semibold`}>
                {author}
            </h3>
            <div
                className={`px-4 py-4 text-sm ${!incoming ? "bg-primary border-primary text-white !rounded-br-none" : `${commonStyles.border} ${commonStyles.inputBackground} !border !rounded-tl-none`} text-black dark:text-white rounded-xl space-y-2`}
            >
                <p
                    className={``}
                    dangerouslySetInnerHTML={{ __html: originalString }}
                ></p>
                {links.length > 0 && (
                    <Microlink
                        style={{ width: "100%", borderRadius: "0.5rem" }}
                        url={links[0]}
                    />
                )}
            </div>

            <div className={`flex flex-row gap-2 items-center justify-end`}>
                <p className={`text-xs font-medium`}>{timestamp}</p>

                <div className={`${incoming && "hidden"} ${read_receipt === "read" && "text-primary"}`}>
                    {/* read-receipt: Single Tick (message sent), Double Tick (message delivered) and Double Tick with Primary Color (message read) */}
                    {
                        read_receipt === "sent" ? 
                        <Check size={18} weight="regular" /> :
                        <Checks size={18} weight="regular" />
                    }
                </div>
            </div>
        </div>
    );
}

export default TextMessage;
