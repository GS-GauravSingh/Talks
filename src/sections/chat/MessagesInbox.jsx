import React from "react";
import commonStyles from "../../commonStyles";
import user_01 from "../../assets/userImages/user_01.png";
import {
    DotsThree,
    Gif,
    LinkSimple,
    Microphone,
    PaperPlaneTilt,
    Smiley,
} from "@phosphor-icons/react";
import { Dropdown, MessageBox } from "../../components";

function MessagesInbox() {
    return (
        <div className={`h-full w-3/4 flex flex-col`}>
            {/* Header */}
            <div
                className={`flex justify-between items-center px-4 py-4 ${commonStyles.borderBottom} cursor-default`}
            >
                <div className="flex items-center gap-4">
                    <div className=" cursor-pointer">
                        <img
                            src={user_01}
                            alt="Profile Image"
                            className="h-14 w-14 object-cover object-center"
                        />
                    </div>

                    <div className="flex flex-col">
                        <h3 className="text-black dark:text-white text-lg font-medium">
                            Ishika Verma
                        </h3>
                        <p className="text-sm">Reply to message(s)</p>
                    </div>
                </div>

                {/* Dropdown Component */}
                <Dropdown />
            </div>

            {/* Messages */}
            <div className="flex-grow flex flex-col gap-4 px-4 h-full overflow-auto no-scrollbar my-4">
                <MessageBox key={1} type="received" />
                <MessageBox key={2} type="send" />
                <MessageBox key={3} type="received" />
                <MessageBox key={4} type="send" />
            </div>

            {/* Input */}
            <form className="pb-4 px-4 flex gap-4">
                <div className="w-full relative group">
                    <input
                        type="text"
                        className={`w-full ${commonStyles.inputBackground} text-black dark:text-white outline-none border-2 border-transparent group-focus-within:border-primary h-10 rounded-full text-sm pl-4 pr-32 tracking-wide`}
                        placeholder="Type something here..."
                    />

                    <div className="flex items-center gap-2 absolute top-1/2 -translate-y-1/2 right-4">
                        <button className="hover:text-primary">
                            <Microphone size={20} weight="regular" />
                        </button>

                        <button className="hover:text-primary">
                            <Gif size={20} weight="regular" />
                        </button>

                        <button className="hover:text-primary">
                            <LinkSimple size={20} weight="regular" />
                        </button>

                        <button className="hover:text-primary ">
                            <Smiley size={20} weight="regular" />
                        </button>
                    </div>
                </div>

                <button className="bg-primary text-white p-2 rounded-full">
                    <PaperPlaneTilt size={24} weight="bold" />
                </button>
            </form>
        </div>
    );
}

export default MessagesInbox;