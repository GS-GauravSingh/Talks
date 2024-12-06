import { ChatDots } from "@phosphor-icons/react/dist/ssr";
import React from "react";
import commonStyles from "../../commonStyles";
import { Chat } from "@phosphor-icons/react";

function Verification() {
    return (
        <div className="h-screen w-full bg-lightGray dark:bg-smokyBlack flex flex-col items-center justify-center space-y-5">
            {/* Header */}
            <div className="flex flex-row items-center space-x-4">
                <span
                    className={`text-primary px-2 py-2 ${commonStyles.borderPrimary} bg-primary text-white rounded-lg`}
                >
                    <Chat size={25} weight="regular" />
                </span>

                <span className="text-2xl font-medium text-primary">Talks</span>
            </div>

            {/* Main */}
            <div className="w-full max-w-md px-8 py-8 bg-white dark:bg-darkGray rounded-lg text-center space-y-4">
                <div className="space-y-2">
                    <h3 className="text-black dark:text-white text-xl">
                        Verify your account
                    </h3>
                    <p className="text-xs 2xl:text-sm">
                        Enter a 4-digit code sent to your registered email id.
                    </p>
                </div>

                <form action="" className="space-y-4">
                    <div className="grid grid-cols-4 grid-rows-1 place-content-center space-x-4">
                        <input
                            type="text"
                            name=""
                            id=""
                            className="rounded-sm bg-lightGray dark:bg-gunmetalGray/30 border border-lightGray dark:border-gunmetalGray/30 outline-none focus-within:!border-primary text-center px-2 py-2 text-black dark:text-white"
                        />
                        <input
                            type="text"
                            name=""
                            id=""
                            className="rounded-sm bg-lightGray dark:bg-gunmetalGray/30 border border-lightGray dark:border-gunmetalGray/30 outline-none focus-within:!border-primary text-center px-2 py-2 text-black dark:text-white"
                        />
                        <input
                            type="text"
                            name=""
                            id=""
                            className="rounded-sm bg-lightGray dark:bg-gunmetalGray/30 border border-lightGray dark:border-gunmetalGray/30 outline-none focus-within:!border-primary text-center px-2 py-2 text-black dark:text-white"
                        />
                        <input
                            type="text"
                            name=""
                            id=""
                            className="rounded-sm bg-lightGray dark:bg-gunmetalGray/30 border border-lightGray dark:border-gunmetalGray/30 outline-none focus-within:!border-primary text-center px-2 py-2 text-black dark:text-white"
                        />
                    </div>

                    <p className="text-xs 2xl:text-sm">
                        <span>Did not receive a code?&nbsp;</span>
                        <span className="text-primary">Resend</span>
                    </p>

                    <button className="bg-primary rounded-lg text-white font-medium w-full text-sm py-2 px-2 hover:opacity-90">
                        Verify
                    </button>
                </form>

                <p className="text-xs 2xl:text-sm text-warning dark:text-warningLight">
                    Don't share the verification code with anyone!
                </p>
            </div>
        </div>
    );
}

export default Verification;
