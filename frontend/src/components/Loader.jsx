import React, { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

function Loader() {
	const messages = [
		"Verifying your credentials...",
		"Setting things up for you...",
		"Syncing your experience...",
		"Almost ready to go...",
		"Just a sec, loading securely...",
	];

	const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentMessageIndex((prevMessageIndex) => (prevMessageIndex + 1) % messages.length);
		}, 3000); // change message every 2 seconds

		return () => clearInterval(interval); // cleanup on unmount
	}, []);

	return (
		<div className="grid place-content-center h-screen bg-base-100 backdrop-blur-lg">
			<div className="flex flex-col items-center justify-center gap-4">
				<LoaderCircle className="size-10 animate-spin" />
			<p className="text-center">
				{messages[currentMessageIndex]}
			</p>
			</div>
		</div>
	);
}

export default Loader;
