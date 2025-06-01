import React, { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import useAuthStore from "../../zustand/useAuthStore";
import { Link, useNavigate } from "react-router";
import { AuthImagePattern } from "../../components";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod"; // `z` is the core object from Zod that helps define and validate schemas.
import { zodResolver } from "@hookform/resolvers/zod"; // `zodResolver` connects Zod with React Hook Form, so React Hook Form can use the Zod schema for validation.
import toast from "react-hot-toast";
import GoogleAuthenticationWrapper from "../../components/GoogleAuthenticationWrapper";

function Signin() {
	const { isLoggingIn, loginUser } = useAuthStore();
	const navigate = useNavigate();

	// Creating Schema
	// Zod is a schema based validation library.
	// Instead of defining validation rules in multiple places (register for each input), you define a single validation schema using Zod.

	// `z.object()` is used to define an object schema.
	const signupSchema = z.object({
		// In Zod, all fields are required by default unless explicitly marked as `.optional()`.
		email: z.string().email("Please provide a valid email address."),

		password: z
			.string("Password is required!")
			.min(8, "Password must be at least 8 characters.")
			.regex(
				/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
				"Password must be at least 8 characters, including a number, a lowercase letter, and an uppercase letter"
			),
	});

	// React Hook Form
	const {
		register, // `register` is a function provided by the `useForm` hook. We can assign it to each input field so that the react-hook-form can track the changes for the input field value
		handleSubmit, // `handleSubmit` is the function we can call when the form is submitted
		formState: { errors }, // the `formState` object contains various properties that help track the form's state. It provides details about errors, touched fields, dirty fields, submission status, etc.
		reset, // `reset` is a function provided by the `useForm` hook to clear the form fields and reset errors to their default state.
	} = useForm({
		resolver:
			zodResolver(
				signupSchema
			) /* Attaching Zod Validation, so that react hook form uses zod schema for validations. */,
	});

	// function to handle user registration.
	async function onSubmit(data) {
		try {
			loginUser(data, navigate);
		} catch (error) {
			console.log(error);
		}
	}

	// Form validation Error - Displaying as Toast Errors.
	useEffect(() => {
		if (errors.email) {
			toast.error(errors.email.message);
		}
		if (errors.password) {
			toast.error(errors.password.message);
		}
	}, [errors]);

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
								Welcome Back 👋
							</h1>
							<p className="text-base-content/60">
								Log in and start chatting.
							</p>
						</div>
					</div>

					{/* FORM */}
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-4 w-full"
					>
						{/* Email */}
						<label className="input validator w-full">
							<svg
								className="h-[1em] opacity-50"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
							>
								<g
									strokeLinejoin="round"
									strokeLinecap="round"
									strokeWidth="2.5"
									fill="none"
									stroke="currentColor"
								>
									<rect
										width="20"
										height="16"
										x="2"
										y="4"
										rx="2"
									></rect>
									<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
								</g>
							</svg>
							<input
								type="email"
								placeholder="mail@site.com"
								className="tracking-wider"
								disabled={isLoggingIn}
								{...register("email")}
							/>
						</label>

						{/* Password */}
						<label className="input validator w-full">
							<svg
								className="h-[1em] opacity-50"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
							>
								<g
									strokeLinejoin="round"
									strokeLinecap="round"
									strokeWidth="2.5"
									fill="none"
									stroke="currentColor"
								>
									<path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
									<circle
										cx="16.5"
										cy="7.5"
										r=".5"
										fill="currentColor"
									></circle>
								</g>
							</svg>
							<input
								type="password"
								placeholder="Password"
								minLength="8"
								className="tracking-wider"
								pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
								title="At least 8 characters, including a number, a lowercase letter, and an uppercase letter"
								disabled={isLoggingIn}
								{...register("password")}
							/>
						</label>

						{/* Button - Form Submit */}
						<div className="w-full flex flex-col space-y-4">
							<button
								type="submit"
								className="btn btn-primary  w-full"
								disabled={isLoggingIn}
							>
								{isLoggingIn ? (
									<LoaderCircle className="animate-spin text-base-content/60" />
								) : (
									"Sign In"
								)}
							</button>

							<p className="text-center text-base-content/60 text-xs">
								Don't have any account? &nbsp;
								<Link
									to="/auth/signup"
									className="text-primary font-medium"
								>
									Sign Up
								</Link>
							</p>
						</div>

						{/* Separator */}
						<div className="flex flex-row items-center gap-2">
							<span className="h-[1px] flex-grow bg-base-content/60 rounded-full"></span>
							<span className="text-base-content/60">
								Or Sign in with
							</span>
							<span className="h-[1px] flex-grow bg-base-content/60 rounded-full"></span>
						</div>

						{/* Log in with Google  */}
						<GoogleAuthenticationWrapper />
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

export default Signin;
