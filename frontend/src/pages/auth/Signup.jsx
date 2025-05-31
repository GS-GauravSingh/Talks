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

function Signup() {
	const { isSigningUp, registerUser } = useAuthStore();
	const navigate = useNavigate();

	// Creating Schema
	// Zod is a schema based validation library.
	// Instead of defining validation rules in multiple places (register for each input), you define a single validation schema using Zod.

	// `z.object()` is used to define an object schema.
	const signupSchema = z.object({
		// In Zod, all fields are required by default unless explicitly marked as `.optional()`.
		firstname: z
			.string()
			.min(2, "Firstname must be at least 2 characters.")
			.max(30, "Firstname cannot exceed 30 characters.")
			.regex(
				/^[A-Za-z](?!.*(--|__))[A-Za-z_-]*[A-Za-z]$/,
				"Only letters, single dash or underscore allowed. Must start and end with a letter."
			),

		lastname: z
			.string()
			.optional()

			// zod allows us to write custom validation logic via `.refine()`.
			.refine(
				(val) =>
					!val ||
					/^[A-Za-z](?!.*(--|__))[A-Za-z_-]*[A-Za-z]$/.test(val),
				{
					message:
						"Only letters, single dash or underscore allowed. Must start and end with a letter.",
				}
			),

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
			registerUser(data, navigate);
		} catch (error) {
			console.log(error);
		}
	}

	// Form validation Error - Displaying as Toast Errors.
	useEffect(() => {
		if (errors.firstname) {
			toast.error(errors.firstname.message);
		}
		if (errors.lastname) {
			toast.error(errors.lastname.message);
		}
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
								Welcome to Talks 👋
							</h1>
							<p className="text-base-content/60">
								Sign up to start chatting.
							</p>
						</div>
					</div>

					{/* FORM */}
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-4 w-full"
					>
						{/* Firstname */}
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
									<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
									<circle cx="12" cy="7" r="4"></circle>
								</g>
							</svg>
							<input
								type="text"
								className="tracking-wider"
								placeholder="Firstname"
								title="Only letters, single dash or underscore allowed. Must start and end with a letter."
								disabled={isSigningUp}
								{...register("firstname")}
							/>
						</label>

						{/* Lastname */}
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
									<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
									<circle cx="12" cy="7" r="4"></circle>
								</g>
							</svg>
							<input
								type="text"
								className="tracking-wider"
								placeholder="Lastname"
								title="Only letters, single dash or underscore allowed. Must start and end with a letter."
								disabled={isSigningUp}
								{...register("lastname")}
							/>
						</label>

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
								disabled={isSigningUp}
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
								className="tracking-wider"
								title="At least 8 characters, including a number, a lowercase letter, and an uppercase letter"
								disabled={isSigningUp}
								{...register("password")}
							/>
						</label>

						{/* Button - Form Submit */}
						<div className="w-full flex flex-col space-y-4">
							<button
								type="submit"
								className="btn btn-primary  w-full"
								disabled={isSigningUp}
							>
								{isSigningUp ? (
									<LoaderCircle className="animate-spin text-base-content/60" />
								) : (
									"Create Account"
								)}
							</button>

							<p className="text-center text-base-content/60 text-xs">
								Already have an account? &nbsp;
								<Link
									to="/auth/signin"
									className="text-primary font-medium"
								>
									Sign In
								</Link>
							</p>
						</div>

						{/* Separator */}
						<div className="flex flex-row items-center gap-2">
							<span className="h-[1px] flex-grow bg-base-content/60 rounded-full"></span>
							<span className="text-base-content/60">or</span>
							<span className="h-[1px] flex-grow bg-base-content/60 rounded-full"></span>
						</div>

						{/* Signup with Google  */}
						<button className="btn bg-white text-black border-[#e5e5e5] w-full">
							<svg
								aria-label="Google logo"
								width="16"
								height="16"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 512 512"
							>
								<g>
									<path d="m0 0H512V512H0" fill="#fff"></path>
									<path
										fill="#34a853"
										d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
									></path>
									<path
										fill="#4285f4"
										d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
									></path>
									<path
										fill="#fbbc02"
										d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
									></path>
									<path
										fill="#ea4335"
										d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
									></path>
								</g>
							</svg>
							Sign-up with Google
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

export default Signup;
