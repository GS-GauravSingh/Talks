import React from "react";
import { Outlet } from "react-router";

function Home() {
	return (
		<div className="h-screen bg-base-200 overflow-hidden">
			<div className="pt-16 flex items-center justify-center h-full w-full">
				<div className="w-full max-w-[1600px] rounded-md shadow-xl">
					{/* <Sidebar /> */}
				</div>
			</div>
		</div>
	);
}

export default Home;
