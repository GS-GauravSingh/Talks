import React from "react";
import useAuthStore from "../zustand/useAuthStore";
import { Link, useNavigate } from "react-router";
import { MessageSquare, Settings, LogOut, User, House } from "lucide-react";
import toast from "react-hot-toast";

function Navbar() {
	const { authUser, logoutUser } = useAuthStore();
	const navigate = useNavigate();

	function showLogoutConfirmatonToast() {
		toast((t) => (
			<div className="flex flex-col gap-2">
				<span>
					Are you sure you want to <b>log out?</b>
				</span>
				<p className="flex items-center justify-around">
					<button
						className="btn btn-sm"
						onClick={() => toast.dismiss(t.id)}
					>
						Dismiss
					</button>
					<button
						className="btn btn-sm btn-warning"
						onClick={() => {
							logoutUser(navigate);
							toast.dismiss(t.id);
						}}
					>
						Confirm
					</button>
				</p>
			</div>
		));
	}

	return (
		<div className="fixed top-0 w-full z-50 backdrop-blur-lg bg-base-100/80 border-b border-base-300">
			<div className="container mx-auto px-4 h-16">
				<div className="flex items-center justify-between h-full">
					<div className="flex items-center gap-8">
						<Link
							to="/"
							className="flex items-center gap-2.5 hover:opacity-80 transition-all"
						>
							<div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
								<MessageSquare className="size-5 text-primary" />
							</div>

							<h1 className="text-lg font-medium">Talks</h1>
						</Link>
					</div>

					<div className="flex items-center gap-2">
						{authUser && (
							<>
								<Link
									to="/home"
									className="btn btn-sm gap-2 transition-colors rounded-lg"
								>
									<House className="size-4" />
									<span className="hidden sm:inline">
										Home
									</span>
								</Link>

								<Link
									to="/profile"
									className="btn btn-sm gap-2 transition-colors rounded-lg"
								>
									<User className="size-4" />
									<span className="hidden sm:inline">
										Profile
									</span>
								</Link>
							</>
						)}

						<Link
							to="/settings"
							className="btn btn-sm gap-2 transition-colors rounded-lg"
						>
							<Settings className="size-4" />
							<span className="hidden sm:inline">Settings</span>
						</Link>

						{authUser && (
							<button
								onClick={showLogoutConfirmatonToast}
								className="btn btn-sm gap-2 transition-colors rounded-lg"
							>
								<LogOut className="size-4" />
								<span className="hidden sm:inline">Logout</span>
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
