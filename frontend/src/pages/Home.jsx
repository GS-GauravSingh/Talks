import React from "react";
import { Outlet } from "react-router";
import { Sidebar } from "../sections";

function Home() {
	return (
		<div className="h-screen bg-base-200 overflow-hidden">
			<div className="pt-16 h-full w-full">
				<div className="w-full max-w-[1600px] h-full rounded-md shadow-xl shadow-base-300 flex flex-col">
					<Sidebar />
				</div>
			</div>
		</div>
	);
}

export default Home;
