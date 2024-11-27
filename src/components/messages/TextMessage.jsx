import React from "react";
import commonStyles from "../../commonStyles";
import extrackLinksFromText from "../../utils/extractLinksFromText";
import Microlink from "@microlink/react";

function TextMessage({ incoming = false, author = "", timestamp = "", content = "" }) {

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
                <p className={``} dangerouslySetInnerHTML={{__html: originalString}}></p>
                {
                    links.length > 0 && <Microlink style={{width: "100%", borderRadius: "0.5rem"}} url={links[0]} />
                }
            </div>

            <p className={`${!incoming && "text-right"} text-xs font-medium`}>
                {timestamp}
            </p>
        </div>
    );
}

export default TextMessage;
