import { Plus } from "lucide-react";
import React from "react";

function Sidebar() {
	return (
		<div className="h-full w-ful lg:max-w-1/4 bg-base-300 border-r-2 border-r-base-100 flex flex-col">
			<div className="flex flex-col p-4 py-6 space-y-2 border-b-2 border-b-base-100">
				{/* Heading */}
				<div className="flex flex-row items-center justify-between">
					<div className="space-x-4 flex flex-row items-center">
						<h1 className="text-lg font-bold">
							Active conversations
						</h1>
						<span className="px-2 py-1 text-xs border border-base-100 bg-base-100 rounded-lg text-zinc-400">
							8
						</span>
					</div>
					<div className="p-1 border border-base-100 bg-base-100 rounded-lg hover:scale-105 transition-all duration-75  text-zinc-500 hover:text-primary cursor-pointer">
						<Plus className="size-5" />
					</div>
				</div>
			</div>

			{/* Search Input */}
			<div className="px-4 flex flex-col gap-4 py-4 border-b-2 border-b-base-100">
				<label className="input w-full">
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
					<input type="text" className="text-xs" placeholder="Search here..." />
				</label>

				{/* Online Users - Checkbox */}
				<div className="flex flex-row gap-2 items-center">
					<input type="checkbox" className="checkbox checkbox-xs" />
					<p className="text-xs">Show online only</p>
				</div>
			</div>

			{/* Users */}
			<div className="h-full px-4 pb-4">

			</div>
		</div>
	);
}

export default Sidebar;
