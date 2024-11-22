import React from "react";
import commonStyles from "../commonStyles";
import { Navbar, ChatList, MessagesInbox } from "../sections";

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
            </div>
        </div>
    );
}

export default Dashboard;
