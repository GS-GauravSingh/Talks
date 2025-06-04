import { SendHorizonal } from "lucide-react";
import React from "react";

function UserCard({ user, showStartConversationButton }) {
	return (
		<div className="w-full bg-base-100 rounded-lg hover:bg-base-300 py-4 px-4">
			<div className="flex items-center justify-between">
				<div className="flex flex-row items-center gap-2 truncate cursor-pointer">
					{/* Avatar */}
					<div className="avatar avatar-online">
						<div className="size-10 rounded-full">
							<img
								src={
									user?.avatar ??
									"https://img.daisyui.com/images/profile/demo/gordon@192.webp"
								}
							/>
						</div>
					</div>

					{/* User Info e.g., Name and last message */}
					<div className="flex-grow flex flex-col justify-center truncate">
						<p className="font-bold">{`${user?.firstname} ${user?.lastname}`}</p>
						<p className="text-xs truncate">
							{user?.tagline ?? "Hi there! I'm using Talks!"}
						</p>
					</div>
				</div>

				{showStartConversationButton && (
					<button
						title="Start Conversation"
						className="cursor-pointer hover:text-primary hover:scale-120 transition-all duration-75"
					>
						<SendHorizonal className="size-5" />
					</button>
				)}
			</div>
		</div>
	);
}

export default UserCard;
