import { SendHorizonal } from "lucide-react";
import React from "react";
import useAuthStore from "../zustand/useAuthStore";
import useChatStore from "../zustand/useChatStore";

function UserCard({ conversationDetail, user, createConversation }) {
	const { authUser } = useAuthStore();
	const { setSelectedUser, startConveration } = useChatStore();
	const isGroupChat = conversationDetail?.isGroupChat;
	const groupName = conversationDetail?.groupName;
	let users = conversationDetail?.Users?.filter(
		(user) => user.id !== authUser?.id
	);
	const showStartConversationButton =
		createConversation?.oneToOneConversation;

	if (!users) {
		users = [user];
	}
	let userNameInitials;
	if (!isGroupChat) {
		userNameInitials = `${users[0]?.firstname
			.charAt(0)
			.toUpperCase()} ${users[0]?.lastname?.charAt(0).toUpperCase()}`;
	}

	function handleStartConversation() {
		if (createConversation?.oneToOneConversation) {
			startConveration({
				userIds: [user.id],
			});
		}
	}

	return (
		<div className="w-full bg-base-100 rounded-lg hover:bg-base-300 py-4 px-4 relative">
			<div className="flex items-center justify-between">
				<div className="flex flex-row items-center gap-2 truncate cursor-pointer">
					{/* Avatar */}
					{isGroupChat ? (
						<div className="avatar avatar-placeholder">
							<div className="bg-neutral text-neutral-content size-10 rounded-full">
								<span className="">Grp</span>
							</div>
						</div>
					) : users[0]?.avatar ? (
						<div className="avatar avatar-online">
							<div className="size-10 rounded-full">
								<img
									src={
										users[0]?.avatar
											? users[0]?.avatar
											: "https://unsplash.com/photos/man-in-black-jacket-wearing-black-helmet-WMlRkqt1vII"
									}
								/>
							</div>
						</div>
					) : (
						<div className="avatar avatar-placeholder">
							<div className="bg-neutral text-neutral-content size-10 rounded-full">
								<span className="">{userNameInitials}</span>
							</div>
						</div>
					)}

					{/* User Info e.g., Name and last message */}
					<div className="flex-grow flex flex-col justify-center truncate">
						<p className="font-bold">{`${
							isGroupChat
								? groupName
								: `${
										users[0]?.firstname
											?.charAt(0)
											.toUpperCase() +
										users[0]?.firstname?.slice(1)
								  } ${
										users[0]?.lastname
											?.charAt(0)
											.toUpperCase() +
										users[0]?.lastname?.slice(1)
								  }`
						}`}</p>
						<p className="text-xs truncate">
							{isGroupChat
								? "Hi there! We are using Talks!"
								: users[0]?.tagline ??
								  "Hi there! I'm using Talks!"}
						</p>
					</div>
				</div>

				{showStartConversationButton && (
					<button
						type="button"
						title="Start Conversation"
						className="group cursor-pointer absolute left-0 top-0 size-full flex items-center justify-end pr-5"
					>
						<span className="group-hover:text-primary group-hover:scale-120 transition-all duration-75">
							<SendHorizonal className="size-5" />
						</span>
					</button>
				)}
			</div>
		</div>
	);
}

export default UserCard;
