import React, { useEffect, useRef, useState } from "react";
import { MessageSquare, VenetianMask } from "lucide-react";
import useAuthStore from "../../zustand/useAuthStore";
import { Link, useNavigate } from "react-router";
import { AuthImagePattern } from "../../components";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";

function VerifyOTP() {
	const { isSigningUp, verifyOTP, resendOTP } = useAuthStore();
	const navigate = useNavigate();
	const [otp, setOtp] = useState(new Array(6).fill(""));
	const inputRef = useRef([]);
	const [timeLeft, setTimeLeft] = useState(2 * 60); // 2 * 60 = 120 seconds, 2 minutes (in seconds). Once generated, the OTP will expire in 2 minutes.
	const [showResendButton, setShowResendButton] = useState(false);
	let minutes = Math.floor(timeLeft / 60);
	let seconds = timeLeft % 60;

	useEffect(() => {
		// stop the timer.
		if (timeLeft <= 0) {
			setShowResendButton(true);
			return;
		}

		const intervalId = setInterval(() => {
			setTimeLeft((prevTime) => prevTime - 1);
		}, 1000);

		return () => clearInterval(intervalId);
	}, [timeLeft]);

	useEffect(() => {
		if (inputRef.current[0]) {
			inputRef.current[0].focus();
		}
	}, []);

	function handleOnChange(event, index) {
		const value = event.target.value;
		if (isNaN(value)) {
			return;
		}

		const newOtp = [...otp];
		newOtp[index] = value.substring(value.length - 1);
		setOtp(newOtp);

		if (index < inputRef.current.length - 1) {
			// move focus to next input field.
			inputRef.current[index + 1].focus();
		}

		// combined otp
		// const combinedOtp = newOtp.join("");
		// if (combinedOtp.length === 6) {
		// 	console.log("OTP: ", combinedOtp);
		// }
	}

	function handleOnClick(index) {
		inputRef.current[index].setSelectionRange(1, 1);
	}

	function handleOnKeyDown(event, index) {
		if (event.key === "Backspace") {
			const newOtp = [...otp];

			if (otp[index]) {
				// Clear current input
				newOtp[index] = "";
				setOtp(newOtp);
			} else if (index > 0) {
				// Move focus to previous input and clear it
				inputRef.current[index - 1].focus();
				newOtp[index - 1] = "";
				setOtp(newOtp);
			}
		}
	}

	function handleOnSubmit(event) {
		event.preventDefault();
		const combinedOTP = otp.join("");
		if (combinedOTP.length !== 6) {
			toast.error("Please enter the complete OTP");
			return;
		}

		try {
			const email = sessionStorage.getItem("userEmail");
			verifyOTP({ email, otp: combinedOTP }, navigate);
		} catch (error) {
			comsole.log(error);
		}
	}

	function handleResendOTP(event) {
		event.preventDefault();

		try {
			const email = sessionStorage.getItem("userEmail");
			resendOTP({ email });

			// restart the time of 2 minutes.
			setTimeLeft(2 * 60);
			setShowResendButton(false);
		} catch (error) {
			comsole.log(error);
		}
	}

	return (
		<div className="min-h-screen grid place-content-center grid-rows-1 lg:grid-cols-2 pt-16">
			{/* Left Side */}
			<div className="flex flex-col items-center justify-center p-6 sm:p-12">
				<div className="w-full max-w-md space-y-8 ">
					{/* LOGO */}
					<div className="text-center mb-8">
						<div className="flex flex-col items-center gap-2 group">
							<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
								<MessageSquare className="size-6 text-primary" />
							</div>

							<h1 className="text-2xl font-bold mt-2">
								Verify Your Email
							</h1>
							<p className="text-base-content/60">
								Enter the 6-digit code we just sent to your
								inbox to verify your account.
							</p>
						</div>
					</div>

					{/* FORM */}
					<form
						className="space-y-4 w-full"
						onSubmit={handleOnSubmit}
					>
						<div className="flex flex-row gap-4 items-center">
							{otp.map((value, index) => (
								<input
									ref={
										// we can fire a callback inside a `ref` attribute, this is called as `callback ref`.
										(inputElement) => {
											inputRef.current[index] =
												inputElement;
										}
									}
									key={index}
									required
									type="text"
									className="input input-md text-center bg-base-200"
									value={value}
									onChange={(event) =>
										handleOnChange(event, index)
									}
									onClick={() => handleOnClick(index)}
									onKeyDown={(event) =>
										handleOnKeyDown(event, index)
									}
								/>
							))}
						</div>

						{/* Resend OTP */}
						<p className="text-xs text-center flex flex-col gap-2">
							{showResendButton ? (
								<button
									onClick={handleResendOTP}
									className="btn btn-md"
								>
									Resend OTP
								</button>
							) : (
								<span className="text-base-content/60">
									Verification code expires in:{" "}
									<span className="text-info">
										{minutes}:{seconds < 10 ? "0" : ""}
										{seconds}
									</span>
								</span>
							)}
							<span className="text-red-500">
								Do not share the verification code with anyone.
							</span>
						</p>

						{/* Button - Form Submit */}
						<button
							type="submit"
							className="btn btn-primary  w-full"
							disabled={isSigningUp}
						>
							{isSigningUp ? (
								<LoaderCircle className="animate-spin text-base-content/60" />
							) : (
								"Verify OTP"
							)}
						</button>
					</form>
				</div>
			</div>

			{/* Right Side */}
			<AuthImagePattern
				title="Join the Community"
				subtitle="Connect with friends, share memories, and stay close to those who matter."
			/>
		</div>
	);
}

export default VerifyOTP;
