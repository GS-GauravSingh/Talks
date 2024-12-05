import React, { useRef, useState } from "react";
import commonStyles from "../../commonStyles";
import user_01 from "../../assets/userImages/user_01.png";
import {
    DotsThree,
    Gif,
    LinkSimple,
    Microphone,
    PaperPlaneTilt,
    Phone,
    Smiley,
    VideoCamera,
} from "@phosphor-icons/react";
import {
    Dropdown,
    TextMessage,
    DocumentMessage,
    EmojiPicker,
    GIF,
    MediaUploadPopup,
    MessageSeparator,
    TypingIndicator,
    VoiceMessage,
    MediaMessage,
    VideoRoom,
    AudioRoom,
} from "../../components";
import { useDispatch } from "react-redux";
import { updateVoiceRecorderModel } from "../../redux/slices/appSlice";
import Profile from "../user/Profile";

function MessagesInbox() {
    const dispatch = useDispatch();
    const [showGif, setShowGif] = useState(false);
    const [showUserProfile, setShowUserProfile] = useState(false);
    const [showAudioRoom, setShowAudioRoom] = useState(false);
    const [showVideoRoom, setShowVideoRoom] = useState(false);

    function handleToggleShowVideoRoom(event){
        event.preventDefault();
        setShowVideoRoom((prev) => !prev);
        
    }
    function handleToggleShowAudioRoom(event){
        event.preventDefault();
        setShowAudioRoom((prev) => !prev);

    }

    function handleToggleGifInput(event) {
        event.preventDefault();
        setShowGif((prev) => !prev);
    }

    function handleToggleVoiceRecorder(event) {
        event.preventDefault();
        dispatch(updateVoiceRecorderModel({ show: true }));
    }

    function handleToggleShowUserProfile() {
        setShowUserProfile((prev) => !prev);
    }

    return (
        <>
            <div className={`h-full flex flex-col w-[75%]`}>
                {/* Header */}
                <div
                    className={`flex justify-between items-center px-4 py-4 ${commonStyles.borderBottom} cursor-default`}
                >
                    <div className="flex items-center gap-4">
                        <div className=" cursor-pointer">
                            <img
                                src={user_01}
                                alt="Profile Image"
                                className="h-14 w-14 object-cover object-center cursor-pointer"
                                onClick={handleToggleShowUserProfile}
                            />
                        </div>

                        <div className="flex flex-col">
                            <h3 className="text-black dark:text-white text-lg font-medium">
                                Ishika Verma
                            </h3>
                            <p className="text-sm">Reply to message(s)</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-8">

                        <button className="hover:text-primary" onClick={handleToggleShowVideoRoom}>
                            <VideoCamera size={24} weight="regular" />
                        </button>

                        <button className="hover:text-primary" onClick={handleToggleShowAudioRoom}>
                            <Phone size={24} weight="regular" />
                        </button>

                        {/* Dropdown Component */}
                        <Dropdown />
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-grow flex flex-col gap-4 px-4 h-full overflow-auto no-scrollbar my-4">
                    <TextMessage
                        incoming={true}
                        author="Ishika Verma"
                        timestamp="2:00 pm"
                        content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et aliquam deserunt incidunt magnam veniam pariatur provident assumenda delectus voluptates voluptas. https://www.npmjs.com/"
                    />

                    <MessageSeparator />

                    <TextMessage
                        incoming={false}
                        timestamp="2:00 pm"
                        content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et aliquam deserunt incidunt magnam veniam pariatur provident assumenda delectus voluptates voluptas. https://www.npmjs.com/"
                    />

                    <TextMessage
                        incoming={true}
                        author="Ishika Verma"
                        timestamp="2:00 pm"
                        content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et aliquam deserunt incidunt magnam veniam pariatur provident assumenda delectus voluptates voluptas."
                    />

                    <TextMessage
                        incoming={false}
                        timestamp="2:00 pm"
                        content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et aliquam deserunt incidunt magnam veniam pariatur provident assumenda delectus voluptates voluptas."
                    />

                    <DocumentMessage
                        incoming={true}
                        author="Ishika Verma"
                        timestamp="3:00 pm"
                    />

                    <DocumentMessage incoming={false} timestamp="3:00 pm" />

                    <VoiceMessage
                        incoming={true}
                        author="Ishika Verma"
                        timestamp="4:00 pm"
                    />

                    <VoiceMessage incoming={false} timestamp="4:00 pm" />

                    <MediaMessage
                        incoming={true}
                        author="Ishika Verma"
                        timestamp="5:00 pm"
                        assets={[]}
                        caption="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
                    />

                    <MediaMessage
                        incoming={false}
                        timestamp="5:00 pm"
                        assets={[]}
                        caption="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
                    />

                    <TypingIndicator />
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
                            <button
                                className="hover:text-primary"
                                onClick={handleToggleVoiceRecorder}
                            >
                                <Microphone size={20} weight="regular" />
                            </button>

                            <button
                                className="hover:text-primary"
                                onClick={handleToggleGifInput}
                            >
                                <Gif size={20} weight="regular" />
                            </button>

                            {/* Media Upload Component */}
                            <MediaUploadPopup />

                            {/* Emoji Picker Component */}
                            <EmojiPicker />
                        </div>
                    </div>

                    <button className="bg-primary text-white p-2 rounded-full">
                        <PaperPlaneTilt size={24} weight="bold" />
                    </button>
                </form>

                {/* GIF Component */}
                {showGif && <GIF />}
            </div>

            {/* User Profile Component */}
            {showUserProfile && (
                <Profile setShowUserProfile={setShowUserProfile} />
            )}

            {/* Video Room Component */}
            {
                showVideoRoom && <VideoRoom showVideoRoom={showVideoRoom} handleToggleShowVideoRoom={handleToggleShowVideoRoom} />
            }

            {/* Audio Room Component */}
            {
                showAudioRoom && <AudioRoom showAudioRoom={showAudioRoom} handleToggleShowAudioRoom={handleToggleShowAudioRoom} />
            }
        </>
    );
}

export default MessagesInbox;
