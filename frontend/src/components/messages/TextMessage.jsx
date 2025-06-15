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
	isUserOnline = false,
}) {
	if (type === "incomming" && message) {
		return (
			<div ref={ref} className="chat chat-start">
				<div
					className={`chat-image avatar ${
						isUserOnline ? "avatar-online" : ""
					}`}
				>
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
	} else if (type === "outgoing" && message) {
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
					<div className="chat-footer">{timestamp}</div>
					<div>
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
			</div>
		);
	}
}

export default TextMessage;
