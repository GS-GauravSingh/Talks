import React, { useState } from "react";

import { Desktop, Eye, EyeClosed, User } from "@phosphor-icons/react";
import commonStyles from "../../commonStyles";

function ProfileUpdateForm() {
    const [isCurrentVisible, setIsCurrentVisible] = useState(false);
    const [isNewVisible, setIsNewVisible] = useState(false);

    return (
        <div className="h-full max-h-full overflow-hidden flex flex-col items-start justify-start gap-6 px-4 py-4">
            {/* Form */}
            <form
                className={`flex-grow space-y-4 w-full max-w-md overflow-scroll no-scrollbar`}
            >
                {/* Current Password */}
                <div className="group flex flex-col gap-1">
                    <label className="font-medium group-focus-within:text-primary">
                        Current Password
                    </label>
                    <div className="relative">
                        <input
                            type={`${isCurrentVisible ? "text" : "password"}`}
                            placeholder="Enter current password"
                            className={`${commonStyles.inputBackground} ${commonStyles.border} h-10 w-full pl-4 pr-12 text-sm rounded-md outline-none group-focus-within:border-primary group-focus-within:text-gunmetalGray dark:group-focus-within:text-white tracking-wide`}
                        />
                        <button
                            className="absolute top-1/2 -translate-y-1/2 right-4 group-focus-within:text-primary"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsCurrentVisible((prev) => !prev);
                            }}
                        >
                            {isCurrentVisible ? (
                                <Eye size={24} weight="regular" />
                            ) : (
                                <EyeClosed size={24} weight="regular" />
                            )}
                        </button>
                    </div>
                </div>

                {/*New Password */}
                <div className="group flex flex-col gap-1">
                    <label className="font-medium group-focus-within:text-primary">
                        New Password
                    </label>
                    <div className="relative">
                        <input
                            type={`${isNewVisible ? "text" : "password"}`}
                            placeholder="Enter new password"
                            className={`${commonStyles.inputBackground} ${commonStyles.border} h-10 w-full pl-4 pr-12 text-sm rounded-md outline-none group-focus-within:border-primary group-focus-within:text-gunmetalGray dark:group-focus-within:text-white tracking-wide`}
                        />
                        <button
                            className="absolute top-1/2 -translate-y-1/2 right-4 group-focus-within:text-primary"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsNewVisible((prev) => !prev);
                            }}
                        >
                            {isNewVisible ? (
                                <Eye size={24} weight="regular" />
                            ) : (
                                <EyeClosed size={24} weight="regular" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <button className="text-center w-full bg-primary rounded-md text-white font-medium h-10 hover:opacity-90">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default ProfileUpdateForm;
