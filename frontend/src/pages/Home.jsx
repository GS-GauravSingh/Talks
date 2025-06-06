import React from "react";
import { Outlet } from "react-router";
import { Messages, NoChatSelected, Sidebar } from "../sections";
import useChatStore from "../zustand/useChatStore";

function Home() {
	const { selectedUser } = useChatStore();

	return (
		<div className="h-screen bg-base-200 overflow-hidden ">
			<div className="pt-16 size-full">
				<div className="w-full max-w-[1600px] h-full rounded-md shadow-xl shadow-base-300 flex flex-row">
					<Sidebar />

					{selectedUser ? <Messages /> : <NoChatSelected />}
				</div>
			</div>
		</div>
	);
}

export default Home;
