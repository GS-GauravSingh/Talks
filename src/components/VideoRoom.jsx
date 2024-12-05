import {
    Microphone,
    MicrophoneSlash,
    PhoneDisconnect,
    VideoCamera,
    VideoCameraSlash,
    X,
} from "@phosphor-icons/react";
import React, { useState } from "react";
import user01 from "../assets/userImages/user_01.png";
import user02 from "../assets/userImages/user_02.png";

function VideoRoom({ showVideoRoom, handleToggleShowVideoRoom }) {
    const [muteAudio, setMuteAudio] = useState(false);
    const [muteVideo, setMuteVideo] = useState(false);

    function handleToggleMuteAudio(event) {
        event.preventDefault();
        setMuteAudio((prev) => !prev);
    }

    function handleToggleMuteVideo(event) {
        event.preventDefault();
        setMuteVideo((prev) => !prev);
    }

    return (
        <div
            className={`${showVideoRoom ? "block" : "hidden"} fixed top-0 left-0 h-full w-full z-999999 bg-black/70 flex items-center justify-center`}
        >
            <div className="bg-white dark:bg-smokyBlack w-full max-w-sm rounded-lg px-4 py-4 md:px-8 md:py-8 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between text-black dark:text-white">
                    <h3 className="font-medium cursor-default">Video Room</h3>
                    <button
                        className="hover:text-primary"
                        onClick={handleToggleShowVideoRoom}
                    >
                        <X size={24} weight="regular" />
                    </button>
                </div>

                {/* Main Body */}
                <div className="grid place-content-center gap-4 grid-cols-2 grid-rows-1">
                    <div className="flex items-center justify-center px-4 py-4 relative">
                        <img
                            src={user01}
                            alt="Profile"
                            className="h-16 w-16 object-cover object-center"
                        />

                        <span className="text-primary absolute right-0 top-0 space-y-2">
                            {muteAudio && (
                                <MicrophoneSlash size={18} weight="regular" />
                            )}
                        </span>
                    </div>

                    <div className="flex items-center justify-center px-4 py-4 relative">
                        <img
                            src={user02}
                            alt="Profile"
                            className="h-16 w-16 object-cover object-center"
                        />
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center space-x-4">
                    <button
                        className={`bg-lightGray dark:bg-gunmetalGray ${muteAudio && "!text-primary"} text-gunmetalGray dark:text-gray p-2 rounded-full hover:opacity-80 hover:!text-primary`}
                        onClick={handleToggleMuteAudio}
                    >
                        {muteAudio ? (
                            <MicrophoneSlash size={20} weight="regular" />
                        ) : (
                            <Microphone size={20} weight="regular" />
                        )}
                    </button>

                    <button
                        className="bg-warning dark:bg-warningLight text-white p-2 rounded-full hover:opacity-80"
                        onClick={handleToggleShowVideoRoom}
                    >
                        <PhoneDisconnect size={20} weight="regular" />
                    </button>

                    <button
                        className={`bg-lightGray dark:bg-gunmetalGray ${muteVideo && "!text-primary"} text-gunmetalGray dark:text-gray p-2 rounded-full hover:opacity-80 hover:!text-primary`}
                        onClick={handleToggleMuteVideo}
                    >
                        {muteVideo ? (
                            <VideoCameraSlash size={20} weight="regular" />
                        ) : (
                            <VideoCamera size={20} weight="regular" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VideoRoom;
