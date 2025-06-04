import { Plus } from "lucide-react";
import React, { useState } from "react";
import UserCard from "../components/UserCard";
import useChatStore from "../zustand/useChatStore";
import { useEffect } from "react";
import UserCardSkeleton from "../components/UserCardSkeleton";

function Sidebar() {
	const {
		toggleShowAllUsersComponent,
		isLoadingConnectedUsers,
		getConnectedUsers,
		connectedUsers,
		setSelectedUser,
		selectedUser
	} = useChatStore();

	// Fetch all the connected users
	useEffect(() => {
		getConnectedUsers();
	}, []);

	return (
		<div className={`h-full w-full ${selectedUser ? "hidden lg:block" : ""} lg:max-w-1/4 bg-base-100 border-r border-r-base-300 flex flex-col`}>
			<div className="flex flex-col p-4 py-6 space-y-2 border-b-2 border-b-base-300">
				{/* Heading */}
				<div className="flex flex-row items-center justify-between">
					<div className="space-x-2 sm:space-x-4 flex flex-row items-center">
						<h1 className="text-lg font-bold text-nowrap">
							Active conversations
						</h1>
						<span className="px-2 py-1 text-xs border border-base-200 bg-base-200 rounded-lg text-zinc-400">
							8
						</span>
					</div>

					<button
						onClick={toggleShowAllUsersComponent}
						className="p-1 border border-base-200 bg-base-200 rounded-lg hover:scale-105 transition-all duration-75  text-zinc-500 hover:text-primary cursor-pointer"
					>
						<Plus className="size-5" />
					</button>
				</div>
			</div>

			{/* Search Input */}
			<div className="px-4 flex flex-col gap-4 py-4 border-b-2 border-b-base-300">
				<label className="input w-full bg-base-200">
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

				{/* Online Users - Checkbox */}
				<div className="flex flex-row gap-2 items-center">
					<input type="checkbox" className="checkbox checkbox-xs" />
					<p className="text-xs">Show online only</p>
				</div>
			</div>

			{/* Users */}
			<div className="h-full w-full overflow-auto">
				<div className="w-full flex flex-col gap-1">
					{isLoadingConnectedUsers
						? new Array(10)
								.fill("")
								.map((element, index) => (
									<UserCardSkeleton key={index} />
								))
						: Array.isArray(connectedUsers) && connectedUsers?.map((conversationDetail, index) => (
							<UserCard key={index} conversationDetail={conversationDetail} />
						))}
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
