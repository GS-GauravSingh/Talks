import { Check, CheckCheck } from "lucide-react";
import React from "react";

function TextMessage({
	type = "outgoing",
	message = "",
	timestamp = "",
	readReceipt = "",
	avatar = "",
	ref = "",
	author = "",
}) {
	if (type === "incomming" && message) {
		return (
			<div ref={ref} className="chat chat-start">
				<div className="chat-image avatar">
					<div className="w-10 rounded-full">
						<img alt={author} src={avatar} />
					</div>
				</div>
				<div className="chat-header">
					{author}
					{/* <time className="text-xs opacity-50">12:45</time> */}
				</div>
				<div className="chat-bubble">{message}</div>
				<div className="chat-footer opacity-50">{timestamp}</div>
			</div>
		);
	} else if(type === "outgoing" && message){
		return (
			<div ref={ref} className="chat chat-end">
				{/* <div className="chat-image avatar">
						<div className="w-10 rounded-full">
							<img
								alt=""
								src=""
							/>
						</div>
					</div> */}
				{/* <div className="chat-header">
						Anakin
						<time className="text-xs opacity-50">12:46</time>
					</div> */}
				<div className="chat-bubble">{message}</div>
				<div className="chat-footer opacity-50">
					{readReceipt === "sent" ? (
						<Check className="size-4" />
					) : (
						<CheckCheck
							className={`${
								readReceipt === "read" && "text-primary"
							} size-4`}
						/>
					)}
				</div>
			</div>
		);
	}
}

export default TextMessage;
