import React, { useState } from "react";
import loginSVG from "../../assets/svg/login.svg";
import googleSVG from "../../assets/svg/google-icon.svg";
import commonStyles from "../../commonStyles";
import { EnvelopeSimple, Eye } from "@phosphor-icons/react";
import { EyeClosed } from "@phosphor-icons/react/dist/ssr";
import { Link } from "react-router-dom";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    function handleToggleShowPassword(event) {
        event.preventDefault();
        setShowPassword((prev) => !prev);
    }

    return (
        <div className="h-screen bg-white dark:bg-darkGray overflow-hidden">
            <div className="h-full max-w-screen-2xl flex flex-row items-center mx-auto">
                {/* Login SVG */}
                <div className="flex-grow hidden lg:flex items-center justify-center">
                    <img src={loginSVG} alt="Login SVG" className="w-[500px]" />
                </div>

                {/* Sign-In Form */}
                <div className="flex-grow px-4 flex flex-col gap-4 mx-auto">
                    <div>
                        <p className="text-xs font-medium">
                            Talks That Bring Us Closer.
                        </p>
                        <h1 className="text-black dark:text-white font-bold text-3xl">
                            Sign In to Talks
                        </h1>
                    </div>

                    <form className="space-y-4">
                        {/* Email */}
                        <div className="group flex flex-col gap-1">
                            <label className="font-medium group-focus-within:text-primary">
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Enter your registered email"
                                    className={`${commonStyles.inputBackground} ${commonStyles.border} h-10 w-full pl-4 pr-12 text-sm rounded-md outline-none group-focus-within:border-primary text-gunmetalGray dark:text-white tracking-wide`}
                                />
                                <button className="absolute top-1/2 -translate-y-1/2 right-4 group-focus-within:text-primary">
                                    <EnvelopeSimple
                                        size={24}
                                        weight="regular"
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Password */}
                        <div className="group flex flex-col gap-1">
                            <label className="font-medium group-focus-within:text-primary">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={`${showPassword ? "text" : "password"}`}
                                    placeholder="Enter your password"
                                    className={`${commonStyles.inputBackground} ${commonStyles.border} h-10 w-full pl-4 pr-12 text-sm rounded-md outline-none group-focus-within:border-primary text-gunmetalGray dark:text-white tracking-wide`}
                                />
                                <button
                                    className="absolute top-1/2 -translate-y-1/2 right-4 group-focus-within:text-primary"
                                    onClick={handleToggleShowPassword}
                                >
                                    {showPassword ? (
                                        <Eye size={24} weight="regular" />
                                    ) : (
                                        <EyeClosed size={24} weight="regular" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Sign-In Button */}
                        <button className="text-center w-full bg-primary rounded-md text-white font-medium h-10">
                            Sign In
                        </button>

                        {/* Sign-In with Google */}
                        <button
                            className={`${commonStyles.inputBackground} text-center w-full  rounded-md text-white font-medium h-10 flex justify-center items-center gap-2`}
                        >
                            <img
                                src={googleSVG}
                                alt="Google SVG"
                                className="h-5 w-5"
                            />
                            <span className="text-gunmetalGray dark:text-white text-sm">
                                Sign In with Google
                            </span>
                        </button>
                    </form>

                    <p className="text-sm text-center">
                        <span className="cursor-default">Don't have an account?&nbsp;</span>
                        <Link to="/auth/signup" className="text-primary">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;