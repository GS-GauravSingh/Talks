import React from "react";
import user01 from "../../assets/userImages/user_03.png";
import { Camera, Desktop, Lock, User } from "@phosphor-icons/react";
import commonStyles from "../../commonStyles";
import { EnvelopeSimple, PencilSimple } from "@phosphor-icons/react/dist/ssr";
import { SelectInputCountry } from "../../components";

function ProfileForm() {
    return (
        <div className="h-full max-h-full overflow-hidden flex flex-col items-start justify-start gap-6 px-4 py-4">
            {/* Image */}
            <div className="flex items-center relative">
                <img
                    src={user01}
                    alt="Profile"
                    className="h-28 w-28 object-cover object-center rounded-full"
                />

                <div className="absolute bottom-0 right-0 rounded-full flex items-center bg-primary text-white z-1">
                    <label
                        htmlFor="profileImageFileInput"
                        className="cursor-pointer px-2 py-2 "
                    >
                        <Camera size={24} weight="regular" />
                    </label>

                    <input
                        type="file"
                        name=""
                        id="profileImageFileInput"
                        className="h-1 w-1 hidden"
                        title=""
                    />
                </div>
            </div>

            {/* Form */}
            <form className={`flex-grow space-y-4 w-full max-w-md overflow-scroll no-scrollbar`}>

                {/* Name */}
                <div className="group flex flex-col gap-1">
                    <label className="font-medium group-focus-within:text-primary">
                        Full name
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            className={`${commonStyles.inputBackground} ${commonStyles.border} h-10 w-full pl-4 pr-12 text-sm rounded-md outline-none group-focus-within:border-primary text-gunmetalGray dark:text-white tracking-wide`}
                        />
                        <button className="absolute top-1/2 -translate-y-1/2 right-4 group-focus-within:text-primary">
                            <User size={24} weight="regular" />
                        </button>
                    </div>
                </div>

                {/* Job Title */}
                <div className="group flex flex-col gap-1">
                    <label className="font-medium group-focus-within:text-primary">
                        Job Title
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Enter your job title"
                            className={`${commonStyles.inputBackground} ${commonStyles.border} h-10 w-full pl-4 pr-12 text-sm rounded-md outline-none group-focus-within:border-primary text-gunmetalGray dark:text-white tracking-wide`}
                        />
                        <button className="absolute top-1/2 -translate-y-1/2 right-4 group-focus-within:text-primary">
                            <Desktop size={24} weight="regular" />
                        </button>
                    </div>
                </div>

                {/* Bio */}
                <div className="group flex flex-col gap-1">
                    <label className="font-medium group-focus-within:text-primary">
                        Bio
                    </label>
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Add you bio"
                            className={`${commonStyles.inputBackground} ${commonStyles.border} h-10 w-full pl-4 pr-12 text-sm rounded-md outline-none group-focus-within:border-primary text-gunmetalGray dark:text-white tracking-wide`}
                        />
                        <button className="absolute top-1/2 -translate-y-1/2 right-4 group-focus-within:text-primary">
                            <PencilSimple size={24} weight="regular" />
                        </button>
                    </div>
                </div>

                {/* Select Country */}
                <SelectInputCountry />

                {/* Submit Button */}
                <button className="text-center w-full bg-primary rounded-md text-white font-medium h-10">
                    Submit
                </button>

            </form>
            
        </div>
    );
}

export default ProfileForm;
