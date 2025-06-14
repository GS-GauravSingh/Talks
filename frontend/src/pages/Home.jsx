import React from "react";
import { Outlet } from "react-router";
import { Messages, NoChatSelected, Sidebar } from "../sections";
import useChatStore from "../zustand/useChatStore";

function Home() {
	const { selectedUser } = useChatStore();

	return (
		<div className="h-screen w-screen bg-base-200 overflow-hidden">
			<div className="pt-16 size-full mx-auto max-w-[1600px] shadow-xl shadow-base-300 rounded-md flex flex-row">
				<Sidebar />
				{selectedUser ? <Messages /> : <NoChatSelected />}
			</div>
		</div>
	);
}

export default Home;
