import React from "react";
import commonStyles from "../commonStyles";
import { Navbar, ChatList, MessagesInbox } from "../sections";
import { DocumentUploadModel, GifModel, MediaUploadModel, VoiceRecorderModel } from "../components";

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


                {/* Model Components */}
                <GifModel />
                <VoiceRecorderModel />
                <MediaUploadModel />
                <DocumentUploadModel />
            </div>
        </div>
    );
}

export default Dashboard;
