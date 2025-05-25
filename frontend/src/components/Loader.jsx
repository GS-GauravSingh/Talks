import React from "react";
import { LoaderCircle } from "lucide-react";

function Loader() {
	return (
		<div className="grid place-content-center h-screen backdrop-blur-lg">
			<LoaderCircle className="size-10 animate-spin" />
		</div>
	);
}

export default Loader;
