import React, { useEffect, useRef, useState } from "react";
import useChatStore from "../zustand/useChatStore";
import useAuthStore from "../zustand/useAuthStore";
import { ArrowLeft, ArrowLeftCircle, Image, SendIcon, X } from "lucide-react";
import TextMessage from "../components/messages/TextMessage";
import EmojiPickerComponent from "../components/EmojiPickerComponent";
import toast from "react-hot-toast";
import MessageSkeleton from "../components/messages/MessageSkeleton";
import Separator from "../components/Separator";

function Messages() {
	const {
		selectedUser,
		isLoadingMessages,
		setSelectedUser,
		sendMessage,
		getMessageHistory,
		messages,
	} = useChatStore();
	const { authUser } = useAuthStore();

	const users = selectedUser?.users;
	const isGroupChat = selectedUser?.isGroupChat;
	const conversationId = selectedUser?.conversationId;

	let userNameInitials;
	if (!isGroupChat) {
		userNameInitials = `${users[0]?.firstname
			.charAt(0)
			.toUpperCase()} ${users[0]?.lastname?.charAt(0).toUpperCase()}`;
	}

	const fileInputRef = useRef(null);
	const [showImagePreview, setShowImagePreview] = useState(false);
	const [message, setMessage] = useState("");
	const [file, setFile] = useState("");
	const lastMessageRef = useRef(null);
	let prevSeparatorDay = null;

	useEffect(() => {
		// Scroll to the last message when messages update
		lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]); // Runs when `messages` change

	// Get Messages history on component mount
	useEffect(() => {
		getMessageHistory(conversationId);
	}, [selectedUser]);

	function handleSendMessage(event) {
		event.preventDefault();
		const formData = new FormData();
		formData.append("message", message);
		if (file) {
			formData.append("file", file);
		}

		sendMessage(conversationId, formData);
		setMessage("");
	}

	function handleRemoveImagePreview() {
		setShowImagePreview(false);
		setFile(null);
		if (fileInputRef.current) {
			fileInputRef.current.value =
				""; /* clears the selected file, resetting the file input. */
		}
	}

	function handleImageUpload(event) {
		const file = event.target.files[0];
		if (!file.type.startsWith("image/")) {
			toast.error("Please select an image file");
			return;
		}

		setFile(file);

		const reader = new FileReader();
		reader.onloadend = () => {
			setShowImagePreview(reader.result);
		};
		reader.readAsDataURL(file);
	}

	function getUserFullName(obj) {
		return `${
			obj?.firstname?.charAt(0).toUpperCase() + obj?.firstname?.slice(1)
		} ${obj?.lastname?.charAt(0).toUpperCase() + obj?.lastname?.slice(1)}`;
	}

	function getMessageDay(createdAt) {
		if(!createdAt){
			return null;
		}
		const createdDate = new Date(createdAt);

		// Reset hours to compare just the date part
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		yesterday.setHours(0, 0, 0, 0);

		const created = new Date(createdDate);
		created.setHours(0, 0, 0, 0);

		if (created.getTime() === today.getTime()) {
			return "Today";
		} else if (created.getTime() === yesterday.getTime()) {
			return "Yesterday";
		} else {
			return createdDate.toLocaleDateString("en-IN", {
				day: "2-digit",
				month: "short",
				year: "numeric",
			}); // e.g. "04 Jun 2025"
		}
	}

	return (
		<div className="size-full bg-base-100 border-r border-b border-base-300 overflow-hidden">
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
				<div className="h-full px-4 pt-4 overflow-y-auto space-y-2">
					{isLoadingMessages
						? new Array(4).fill("").map((value, index) => {
								return (
									<MessageSkeleton
										key={index}
										type={
											index & 1 ? "incomming" : "outgoing"
										}
									/>
								);
						  })
						: messages?.map((message, index) => {
								const messageType =
									message?.User?.id === authUser?.id
										? "outgoing"
										: "incomming";
								const author =
									messageType === "outgoing"
										? getUserFullName(authUser)
										: getUserFullName(message?.User);
								const avatar =
									messageType === "outgoing"
										? authUser?.avatar
										: message?.User?.avatar;

								const timestamp =
									messageType === "outgoing"
										? new Date().toLocaleTimeString(
												"en-IN",
												{
													hour: "2-digit",
													minute: "2-digit",
												}
										  )
										: new Date(
												message?.createdAt
										  ).toLocaleTimeString("en-IN", {
												hour: "2-digit",
												minute: "2-digit",
										  });

								const showSeparator =
									prevSeparatorDay ===
									getMessageDay(message?.createdAt)
										? false
										: true;

								prevSeparatorDay = getMessageDay(
									message?.createdAt
								);

								return (
									<React.Fragment key={index}>
										{showSeparator && prevSeparatorDay ? (
											<Separator
												timestamp={getMessageDay(
													message?.createdAt
												)}
											/>
										) : (
											""
										)}
										<TextMessage
											type={messageType}
											author={author}
											message={message?.message}
											ref={lastMessageRef}
											avatar={avatar}
											timestamp={timestamp}
											readReceipt
										/>
									</React.Fragment>
								);
						  })}
				</div>

				{/* Inputs  */}
				<form
					onSubmit={handleSendMessage}
					className="flex flex-row items-center gap-4 p-4"
				>
					<div className="flex-grow flex flex-row items-center justify-between relative">
						<input
							type="text"
							required
							value={message}
							name="message"
							placeholder="Type your message here..."
							className="input input-md w-full rounded-lg pr-20"
							onChange={(event) => {
								setMessage(event.target.value);
							}}
						/>

						{/* Buttons */}
						<div className="w-fit absolute right-0 top-1/2 -translate-y-1/2 px-4 z-10 flex flex-row items-center gap-4">
							{/* Image Upload */}
							<span className="">
								<label
									htmlFor="imageUpload"
									className="cursor-pointer hover:text-primary active:text-primary"
								>
									<Image className="size-5" />
								</label>
								<input
									type="file"
									accept="image/*" /* accepts only images (JPEG, PNG, etc.). */
									id="imageUpload"
									name="file"
									className="hidden"
									onChange={handleImageUpload}
									ref={fileInputRef}
								/>
							</span>
							<EmojiPickerComponent />
						</div>

						{/* Show Image Preview */}
						{showImagePreview ? (
							<div className="absolute left-4 bottom-[3rem]">
								<div className="relative">
									<img
										src={showImagePreview}
										alt="Selected Image Preview"
										className="size-24 object-center object-cover rounded-lg shadow-lg"
									/>

									{/* Remove Image Button */}
									<button
										type="button"
										onClick={handleRemoveImagePreview}
										className="absolute z-10 -top-1.5 -right-1.5 size-5 rounded-full bg-base-300 text-primary flex items-center justify-center cursor-pointer"
									>
										<X className="size-4" />
									</button>
								</div>
							</div>
						) : (
							""
						)}
					</div>

					<button
						type="submit"
						title="Send Message"
						className="cursor-pointer bg-primary/20 border border-primary/20 h-full px-4 rounded-lg"
					>
						<SendIcon className="size-5 text-primary" />
					</button>
				</form>
			</div>
		</div>
	);
}

export default Messages;
