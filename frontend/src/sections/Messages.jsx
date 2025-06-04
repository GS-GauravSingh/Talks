import React from "react";
import useChatStore from "../zustand/useChatStore";
import useAuthStore from "../zustand/useAuthStore";
import { ArrowLeft, ArrowLeftCircle, SendIcon } from "lucide-react";
import TextMessage from "../components/messages/TextMessage";

function Messages() {
	const { selectedUser, isLoadingMessages, setSelectedUser } = useChatStore();
	const { authUser } = useAuthStore();
	const users = selectedUser?.users;
	const isGroupChat = selectedUser?.isGroupChat;
	let userNameInitials;
	if (!isGroupChat) {
		userNameInitials = `${users[0]?.firstname
			.charAt(0)
			.toUpperCase()} ${users[0]?.lastname?.charAt(0).toUpperCase()}`;
	}

	return (
		<div className="size-full bg-base-100 border-r border-b border-base-300">
			<div className="size-full flex flex-col">
				{/* Header */}
				<div className="flex flex-row items-center justify-between border-b-2 border-base-300">
					{/* Left Side */}
					<div className="flex flex-row items-center gap-2 px-4 py-[0.95rem]">
						<div className="flex flex-row items-center gap-4">
							<button
								onClick={() => setSelectedUser({}, true)}
								className="hover:text-primary"
							>
								<ArrowLeft className="size-5 lg:hidden hover:scale-120  transition-all duration-75" />
							</button>
							{/* Avatar */}
							{isGroupChat ? (
								<div className="avatar avatar-placeholder">
									<div className="bg-neutral text-neutral-content size-12 rounded-full">
										<span className="">Grp</span>
									</div>
								</div>
							) : users[0]?.avatar ? (
								<div className="avatar avatar-online">
									<div className="size-12 rounded-full">
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
									<div className="bg-neutral text-neutral-content size-12 rounded-full">
										<span className="">
											{userNameInitials}
										</span>
									</div>
								</div>
							)}
						</div>

						{/* User/Group Name */}
						<p className="flex flex-col gap-0">
							<span className="text-lg font-bold">
								{isGroupChat
									? selectedUser?.groupName
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
									  }`}
							</span>

							{/* Status - Online or Offline */}
							<span className="text-xs">Online</span>
						</p>
					</div>

					{/* Right Side */}
					<div></div>
				</div>

				{/* Main Messages Container */}
				<div className="flex-grow px-4 overflow-auto">
                    <TextMessage />
                    <TextMessage />
                    <TextMessage />
                    <TextMessage />
                </div>

				{/* Inputs  */}
				<form className="flex flex-row items-center gap-4 p-4">
					<div className="flex-grow">
						<input
							type="text"
                            required
							placeholder="Type your message here..."
							class="input input-md w-full"
						/>
					</div>

                    <button type="submit" title="Send Message" className="cursor-pointer bg-primary/20 border border-primary/20 h-full px-4 rounded-lg">
                        <SendIcon className="size-5 text-primary" />
                    </button>
				</form>
			</div>
		</div>
	);
}

export default Messages;
