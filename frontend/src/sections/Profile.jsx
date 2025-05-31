import React from "react";
import useAuthStore from "../zustand/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

function Profile() {
	const { authUser, isUpdatingUser, updateUserAvatar } = useAuthStore();

	function handleFileUpload(event) {
		try {
			const file = event.target.files[0];
			const formData = new FormData();
			formData.append("file", file);
			updateUserAvatar(formData);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="min-h-screen bg-base-200">
			<div className="pt-16 h-full w-full flex items-center justify-center">
				<div className="rounded-lg shadow-lg bg-base-300 w-full max-w-2xl space-y-8 my-4 py-8 px-4 overflow-auto">
					{/* Heading */}
					<div className="text-center">
						<h1 className="text-2xl font-bold">Profile</h1>
						{/* <p className="mt-2 text-sm">Your profile information</p> */}
					</div>

					{/* Avatar */}
					<div className="mx-auto flex justify-center items-center">
						<div className="avatar">
							<div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
								<img
									src={`${
										authUser.avatar
										// "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
									}`}
								/>
							</div>

							<label
								htmlFor="avatarUpload"
								className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-75 ${
									isUpdatingUser
										? "animate-pulse pointer-events-none"
										: ""
								}`}
							>
								<Camera className="size-5 text-base-200" />
								<input
									type="file"
									id="avatarUpload"
									accept="image/*"
									className="hidden"
									disabled={isUpdatingUser}
									onChange={handleFileUpload}
								/>
							</label>
						</div>
					</div>

					{/* User Details */}
					<div className="space-y-6">
						<div className="space-y-1.5">
							<div className="text-sm text-zinc-400 flex items-center gap-2">
								<User className="w-4 h-4" />
								First Name
							</div>

							<input
								type="text"
								placeholder="Enter your firtname"
								value={authUser?.firstname}
								readOnly
								className="input w-full px-4 py-2.5 bg-base-200"
							/>
						</div>

						<div className="space-y-1.5">
							<div className="text-sm text-zinc-400 flex items-center gap-2">
								<User className="w-4 h-4" />
								Last Name
							</div>
							<input
								type="text"
								placeholder="Enter your lastname"
								value={authUser?.lastname}
								readOnly
								className="input w-full px-4 py-2.5 bg-base-200"
							/>
						</div>

						<div className="space-y-1.5">
							<div className="text-sm text-zinc-400 flex items-center gap-2">
								<Mail className="w-4 h-4" />
								Email Address
							</div>
							<input
								type="email"
								placeholder="Enter your email adress"
								value={authUser?.email}
								readOnly
								className="input w-full px-4 py-2.5 bg-base-200"
							/>
						</div>
					</div>
                    

                    {/* Account Information */}
					<div className="bg-base-300 rounded-xl">
						<h2 className="text-lg font-medium">
							Account Information
						</h2>
						<div className="mt-2 space-y-3 text-sm">
							<div className="flex items-center justify-between pb-2 border-b border-zinc-700">
								<span>Member Since</span>
								<span>{authUser.createdAt?.split("T")[0]}</span>
							</div>
							<div className="flex items-center justify-between">
								<span>Account Status</span>
								<span className="text-green-500">Active</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
