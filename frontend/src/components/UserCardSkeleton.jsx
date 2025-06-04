import React from "react";

function UserCardSkeleton() {
	return (
		<div className="w-full bg-base-300 py-4 px-4 rounded-lg cursor-default ">
			<div className="flex flex-row items-center gap-2">
				<div className="skeleton bg-base-200 size-10 shrink-0 rounded-full"></div>

				<div className="flex flex-col gap-2 w-full">
					<div className="skeleton h-4 max-w-32 bg-base-200"></div>
					<div className="skeleton h-4 max-w-72 bg-base-200"></div>
				</div>
			</div>
		</div>
	);
}

export default UserCardSkeleton;
