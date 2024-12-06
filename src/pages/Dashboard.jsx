import React from "react";
import { ChatList, MessagesInbox } from "../sections";
import {
    DocumentUploadModel,
    GifModel,
    MediaUploadModel,
    VoiceRecorderModel,
} from "../components";

function Dashboard() {
    return (
        <>
            <div className="flex flex-row w-full">
                {/* Chat List */}
                <ChatList />

                {/* Message Inbox */}
                <MessagesInbox />
            </div>
            
            {/* Model Components */}
            <GifModel />
            <VoiceRecorderModel />
            <MediaUploadModel />
            <DocumentUploadModel />
        </>
    );
}

export default Dashboard;
