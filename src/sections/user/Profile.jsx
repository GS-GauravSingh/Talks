import {
    Clock,
    DotsThreeVertical,
    EnvelopeSimple,
    X,
    Chat
} from "@phosphor-icons/react";
import React from "react";
import commonStyles from "../../commonStyles";
import { VideoCamera } from "@phosphor-icons/react/dist/ssr";

function Profile({ setShowUserProfile }) {
    return (
        <div className={`${commonStyles.borderLeft} w-1/4`}>
            {/* Header */}
            <div
                className={`flex items-center justify-between px-4 py-[1.89rem] cursor-default ${commonStyles.borderBottom}`}
            >
                <h3 className="text-black dark:text-white text-lg font-medium">
                    Profile
                </h3>

                <button
                    className="hover:text-primary"
                    onClick={(event) => {
                        event.preventDefault();
                        setShowUserProfile((prev) => !prev);
                    }}
                >
                    <X size={24} weight="regular" />
                </button>
            </div>

            <div className="flex flex-col items-center py-4 pt-8 pb-4 gap-4 h-full w-full">
                <img
                    src="https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Profile"
                    className="w-40 h-28 object-cover object-center rounded-lg"
                />

                <div className="w-full px-4">
                    <h2 className="text-black dark:text-white">
                        Black Jonathan
                    </h2>
                    <p className="text-sm">Sales Manager</p>
                </div>

                <div className="flex gap-2 items-center w-full px-4">
                    <span className="">
                        <Clock size={20} weight="regular" />
                    </span>

                    <span className="text-sm">6:40 AM local time</span>
                </div>

                <div className="w-full flex items-center gap-2 px-4">
                    <button
                        className={`min-w-28 flex items-center justify-center gap-2 text-sm ${commonStyles.border} rounded-md p-2 hover:!border-primary hover:bg-primary hover:text-white`}
                    >
                        <span>
                            <Chat size={20} weight="regular" />
                        </span>

                        <span>Message</span>
                    </button>

                    <button
                        className={`min-w-28 flex items-center justify-center gap-2 text-sm ${commonStyles.border} rounded-md p-2 hover:!border-primary hover:bg-primary hover:text-white`}
                    >
                        <span>
                            <VideoCamera size={20} weight="regular" />
                        </span>

                        <span>Video</span>
                    </button>

                    <button
                        className={`flex items-center justify-center gap-2 text-sm ${commonStyles.border} rounded-md p-2 hover:!border-primary hover:bg-primary hover:text-white`}
                    >
                        <span>
                            <DotsThreeVertical size={20} weight="bold" />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
