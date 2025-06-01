import React from "react";
import useAuthStore from "../zustand/useAuthStore";
import {
	BookUser,
	Camera,
	Earth,
	IdCard,
	Mail,
	Pencil,
	User,
} from "lucide-react";
import SelectInput from "../components/SelectInput";
import { COUNTRY_SELECT_OPTIONS } from "../constants";

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
						<p className="mt-2 text-sm">All About You</p>
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
						{/* Firstname */}
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

						{/* Lastname */}
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

						{/* Email */}
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

						{/* Job Title */}
						<div className="space-y-1.5">
							<div className="flex items-center justify-between">
								<div className="text-sm text-zinc-400 flex items-center gap-2">
									<IdCard className="w-4 h-4" />
									Job Title
								</div>
								<div
									title={"Click to edit"}
									className="text-sm text-zinc-400 hover:text-primary hover:scale-105 transition-all duration-75 flex items-center gap-2 cursor-pointer"
								>
									<Pencil className="size-4" />
								</div>
							</div>
							<input
								type="text"
								placeholder="Your Job Title"
								value={authUser?.jobTitle}
								readOnly
								className="input w-full px-4 py-2.5 bg-base-200"
							/>
						</div>

						{/* Bio */}
						<div className="space-y-1.5">
							<div className="flex items-center justify-between">
								<div className="text-sm text-zinc-400 flex items-center gap-2">
									<BookUser className="w-4 h-4" />
									Bio
								</div>
								<div
									title={"Click to edit"}
									className="text-sm text-zinc-400 hover:text-primary hover:scale-105 transition-all duration-75 flex items-center gap-2 cursor-pointer"
								>
									<Pencil className="size-4" />
								</div>
							</div>
							<input
								type="text"
								placeholder="Add Bio"
								value={authUser?.bio}
								readOnly
								className="input w-full px-4 py-2.5 bg-base-200"
							/>
						</div>

						{/* Country */}

						<SelectInput
							title={"Country"}
							disabledOptionTitle={"Select Country"}
							defaultValue={authUser?.country}
							readOnly={authUser?.country ? true : false}
							options={COUNTRY_SELECT_OPTIONS}
							icon={<Earth className="size-5" />}
							titleOnHover={"Click to edit"}
						/>
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
