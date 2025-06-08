import React from "react";

function Separator({ timestamp }) {

	return (
		<div className="w-full flex flex-row gap-2 items-center my-2">
			<span className="h-[2px] flex-grow rounded-full bg-base-300"></span>
			<span className="text-xs">{timestamp}</span>
			<span className="h-[2px] flex-grow bg-base-300"></span>
		</div>
	);
}

export default Separator;
