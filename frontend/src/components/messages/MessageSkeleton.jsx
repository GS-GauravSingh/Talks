import React from "react";

function MessageSkeleton({ type = "outgoing" }) {
	return (
		<div className="w-full bg-base-100 hover:bg-base-300 py-4 px-4 rounded-lg cursor-default">
			<div className={`flex ${type === "outgoing" ? "flex-row" : "flex-row-reverse"} items-center gap-2`}>
				<div className="skeleton bg-base-200 size-10 shrink-0 rounded-full"></div>

				<div className={`flex flex-col ${type === "outgoing" ? "" : "items-end"} gap-2 w-full`}>
					<div className="skeleton h-4 w-full max-w-32 bg-base-200"></div>
					<div className="skeleton h-4 w-full max-w-72 bg-base-200"></div>
				</div>
			</div>
		</div>
	);
}

export default MessageSkeleton;
