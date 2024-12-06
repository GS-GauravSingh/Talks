import React, { useState } from "react";
import commonStyles from "../../commonStyles";
import { ProfileForm, ProfileUpdateForm } from "../../sections";

function ProfilePage() {
    const [active, setActive] = useState(0);
    const tabs = [
        {
            title: "Profile",
            element: <ProfileForm />,
        },
        {
            title: "Update Password",
            element: <ProfileUpdateForm />,
        },
    ];
    return (
        <div
            className={`${commonStyles.borderLeft} w-full h-full flex flex-col`}
        >
            {/* Buttons */}
            <div
                className={`flex flex-row items-center px-4 pt-9 text-base gap-5 ${commonStyles.borderBottom}`}
            >
                {tabs.map((tab, index) => {
                    return (
                        <button
                            key={index}
                            onClick={(e) => {
                                e.preventDefault();
                                setActive(index);
                            }}
                            className={`${active === index && "text-primary"} pb-4 relative`}
                        >
                            {tab.title}

                            <span
                                className={`w-full h-[2px] rounded-lg absolute -bottom-[2px] left-0 bg-primary ${active === index ? "block" : "hidden"}`}
                            ></span>
                        </button>
                    );
                })}
            </div>

            {/* Content for tabs */}
            {tabs.map((tab, index) => {
                return (
                    <div
                        className={`${active === index ? "block" : "hidden"} h-full max-h-full overflow-hidden`}
                    >
                        {tab.element}
                    </div>
                );
            })}
        </div>
    );
}

export default ProfilePage;
