import React from "react";
import { MessagesSquare } from "lucide-react";

function NoChatSelected() {
	return (
		<div className="h-full w-3/4 hidden lg:flex items-center justify-center bg-base-100">
			<div className="flex flex-col items-center">
				<div className="size-14 rounded-md flex items-center justify-center border border-primary animate-bounce">
					<MessagesSquare className="size-10 text-primary" />
				</div>

				<h3 className="text-xl text-heading mt-6">Welcome to <strong className="text-primary">Talks!</strong></h3>
                <p className="mt-2">Select a conversation from the sidebar to start chatting.</p>
			</div>
		</div>
	);
}

export default NoChatSelected;