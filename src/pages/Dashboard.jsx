import React from "react";
import commonStyles from "../commonStyles";
import { Navbar, ChatList, MessagesInbox } from "../sections";
import { GifModel, VoiceRecorderModel } from "../components";

function Dashboard() {
    return (
        <div className="h-screen overflow-hidden">
            <div
                className={`${commonStyles.bodyBackground} ${commonStyles.border} !border h-full flex flex-row`}
            >
                {/* Navbar */}
                <Navbar />

                {/* Chat List */}
                <ChatList />

                {/* Message Inbox */}
                <MessagesInbox />

                {/* GIF Model - Popup opens when user clicks on any particular GIF. */}
                <GifModel />

                {/* Voice Recorder Model - Popup opens when user clicks on Microphone button. */}
                <VoiceRecorderModel />
            </div>
        </div>
    );
}

export default Dashboard;
