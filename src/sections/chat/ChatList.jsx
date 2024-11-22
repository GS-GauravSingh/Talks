import React from "react";
import commonStyles from "../../commonStyles";
import { MagnifyingGlass } from "@phosphor-icons/react";
import user_01 from "../../assets/userImages/user_01.png";
import user_02 from "../../assets/userImages/user_02.png";
import user_03 from "../../assets/userImages/user_03.png";
import user_04 from "../../assets/userImages/user_04.png";
import user_05 from "../../assets/userImages/user_05.png";
import user_06 from "../../assets/userImages/user_06.png";
import user_07 from "../../assets/userImages/user_07.png";
import user_08 from "../../assets/userImages/user_08.png";
import user_09 from "../../assets/userImages/user_09.png";
import user_10 from "../../assets/userImages/user_10.png";
import user_11 from "../../assets/userImages/user_11.png";
import user_12 from "../../assets/userImages/user_12.png";
import user_13 from "../../assets/userImages/user_13.png";
import user_14 from "../../assets/userImages/user_14.png";
import user_15 from "../../assets/userImages/user_15.png";
import user_16 from "../../assets/userImages/user_16.png";
import user_17 from "../../assets/userImages/user_17.png";
import user_18 from "../../assets/userImages/user_18.png";
import user_19 from "../../assets/userImages/user_19.png";
import user_20 from "../../assets/userImages/user_20.png";

function ChatList() {
    const users = [
        {
            name: "Aarav Sharma",
            imageUrl: user_01,
            description: "Just catching up on some chats. 😊",
        },
        {
            name: "Anaya Gupta",
            imageUrl: user_02,
            description: "Excited to join this conversation!",
        },
        {
            name: "Vihaan Singh",
            imageUrl: user_03,
            description: "Can we discuss the updates now?",
        },
        {
            name: "Ishika Verma",
            imageUrl: user_04,
            description: "Looking forward to hearing from you.",
        },
        {
            name: "Aditya Mehta",
            imageUrl: user_05,
            description: "Let's make this project great! 🚀",
        },
        {
            name: "Kiara Kapoor",
            imageUrl: user_06,
            description: "Just sent you the docs. Let me know.",
        },
        {
            name: "Aryan Jain",
            imageUrl: user_07,
            description: "I'll review and get back shortly.",
        },
        {
            name: "Myra Reddy",
            imageUrl: user_08,
            description: "Ping me when you're free!",
        },
        {
            name: "Kabir Das",
            imageUrl: user_09,
            description: "Quick question: what's the ETA?",
        },
        {
            name: "Zara Ali",
            imageUrl: user_10,
            description: "Good morning, team! 🌞",
        },
        {
            name: "Vivaan Kumar",
            imageUrl: user_11,
            description: "I have a few updates to share.",
        },
        {
            name: "Saanvi Mishra",
            imageUrl: user_12,
            description: "Any feedback on the designs?",
        },
        {
            name: "Ayaan Patel",
            imageUrl: user_13,
            description: "Ready to start our meeting?",
        },
        {
            name: "Riya Malhotra",
            imageUrl: user_14,
            description: "Had a great conversation earlier.",
        },
        {
            name: "Dev Raj",
            imageUrl: user_15,
            description: "Let's discuss the deliverables.",
        },
        {
            name: "Meera Nair",
            imageUrl: user_16,
            description: "I've emailed you the slides.",
        },
        {
            name: "Arjun Bhatt",
            imageUrl: user_17,
            description: "Looking forward to our next steps.",
        },
        {
            name: "Navya Sen",
            imageUrl: user_18,
            description: "Just joined the group. Hi all!",
        },
        {
            name: "Reyansh Chopra",
            imageUrl: user_19,
            description: "Do we have an agenda for today?",
        },
        {
            name: "Anvi Rathore",
            imageUrl: user_20,
            description: "All set for the discussion.",
        },
    ];

    console.log(users);

    return (
        <div
            className={`${commonStyles.bodyBackground}  ${commonStyles.borderLeft} ${commonStyles.borderRight} flex flex-col h-full max-h-full w-1/4 overflow-auto`}
        >
            {/* Header */}
            <div
                className={`flex items-center gap-4 ${commonStyles.borderBottom} px-4 py-7`}
            >
                <h2 className="text-black dark:text-white font-semibold text-2xl">
                    Your Space
                </h2>

                <span
                    className={`${commonStyles.border} ${commonStyles.inputBackground} rounded-md px-1 py-1 text-xs font-medium text-black dark:text-white`}
                >
                    14
                </span>
            </div>

            {/* Search Input */}
            <form className="px-4 py-4 relative group">
                <input
                    type="text"
                    className={`${commonStyles.inputBackground} w-full rounded-full text-xs h-8 pl-3.5 pr-10 text-black dark:text-white outline-none border-2 border-transparent group-focus-within:border-primary tracking-wide`}
                    placeholder="Search..."
                />
                <span className="absolute right-7 top-1/2 -translate-y-1/2 group-focus-within:text-primary">
                    <MagnifyingGlass size={20} weight="regular" />
                </span>
            </form>

            {/* Chat List */}
            <div className="pb-2 max-h-full overflow-auto no-scrollbar">
                {/* JavaScript */}
                {users.map((user, index) => {
                    return (
                        <div
                            key={index}
                            className={`flex items-center gap-4 cursor-pointer hover:bg-lightGray dark:hover:bg-gunmetalGray py-2 px-4 rounded-sm`}
                        >
                            <img
                                src={user.imageUrl}
                                alt="Profile Image"
                                className="h-12 w-12 object-cover object-center"
                            />
                            <div className="overflow-hidden">
                                <h3 className="text-black dark:text-white font-medium">
                                    {user.name}
                                </h3>
                                <p className="text-sm overflow-hidden text-nowrap text-ellipsis">
                                    {user.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ChatList;
