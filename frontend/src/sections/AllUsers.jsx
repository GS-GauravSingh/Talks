import React, { useEffect, useState } from "react";
import useChatStore from "../zustand/useChatStore";
import UserCardSkeleton from "../components/UserCardSkeleton";
import { X } from "lucide-react";
import UserCard from "../components/UserCard";
import useAuthStore from "../zustand/useAuthStore";

function AllUsers() {
	const {
		allUsers,
		isLoadingAllUsers,
		showAllUsersComponent,
		toggleShowAllUsersComponent,
		getAllUsers,
	} = useChatStore();

	const { authUser } = useAuthStore();
	const [createConversation, setCreateConversation] = useState({
		oneToOneConversation: true,
		groupConversation: false,
	});
	const [groupName, setGroupName] = useState("");

	// fetch all user's on component mount
	useEffect(() => {
		getAllUsers();
	}, []);

	return (
		<div
			className={`${
				showAllUsersComponent ? "absolute top-0 left-0 " : "hidden"
			} h-full w-full z-[999] bg-base-100`}
		>
			<div className="container h-full flex flex-col">
				{/* Search Input */}
				<div className="flex flex-col justify-center gap-4 py-4 border-b-2 border-b-base-100 relative">
					<div className="flex items-center justify-center gap-4 relative">
						<label className="input w-full bg-base-200 max-w-2xl">
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
									<circle cx="11" cy="11" r="8"></circle>
									<path d="m21 21-4.3-4.3"></path>
								</g>
							</svg>
							<input
								type="text"
								className="text-xs"
								placeholder="Search here..."
							/>
						</label>

						<X
							onClick={toggleShowAllUsersComponent}
							className="size-5 hover:text-primary cursor-pointer hover:scale-120 transition-all duration-75 absolute right-4 top-1/2 -translate-y-1/2"
						/>
					</div>

					<div className="flex flex-col justify-center gap-2">
						<div className="flex flex-row items-center gap-4 justify-center">
							{createConversation.oneToOneConversation ? (
								<button
									type="button"
									className={`btn btn-sm ${
										createConversation.oneToOneConversation
											? "bg-primary text-primary-content"
											: ""
									}`}
									onClick={() =>
										setCreateConversation((prev) => ({
											...prev,
											oneToOneConversation: true,
											groupConversation: false,
										}))
									}
								>
									One to One Chat
								</button>
							) : (
								""
							)}
							<button
								type="button"
								className={`btn btn-sm ${
									createConversation.groupConversation
										? "bg-primary text-primary-content"
										: ""
								}`}
								onClick={() =>
									setCreateConversation((prev) => ({
										...prev,
										oneToOneConversation: false,
										groupConversation: true,
									}))
								}
							>
								Group Chat
							</button>
						</div>

						{createConversation.groupConversation ? (
							<div className="flex flex-row items-center justify-center gap-4">
								<input
									type="text"
									value={groupName}
									placeholder="Group name"
									className="input input-sm"
									onChange={(event) => setGroupName(event.target.value)}
								/>
								<button
									type="button"
									disabled={groupName ? false : true}
									className="btn btn-sm bg-info text-info-content"
									onClick={() =>
										setCreateConversation((prev) => ({
											...prev,
											oneToOneConversation: true,
											groupConversation: false,
										}))
									}
								>
									Create Group
								</button>
							</div>
						) : (
							""
						)}
					</div>
				</div>

				{/* Users List */}
				<div className="mx-auto w-full h-full overflow-y-scroll border border-base-100 bg-base-100 shadow-2xl rounded-lg space-y-1 p-2">
					{isLoadingAllUsers
						? new Array(10)
								.fill("")
								.map((value, index) => (
									<UserCardSkeleton key={index} />
								))
						: Array.isArray(allUsers)
						? allUsers?.map((user, index) =>
								authUser.id !== user.id ? (
									<UserCard
										key={index}
										user={user}
										createConversation={createConversation}
									/>
								) : (
									""
								)
						  )
						: ""}
				</div>
			</div>
		</div>
	);
}

export default AllUsers;
