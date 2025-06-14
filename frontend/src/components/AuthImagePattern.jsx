const AuthImagePattern = ({ title, subtitle }) => {
	return (
		<div className="p-2 sm:p-4 hidden lg:flex items-center justify-center bg-base-200">
			<div className="max-w-md text-center flex flex-col items-center">
				<div className="grid grid-cols-3 gap-3 mb-6">
					{[...Array(9)].map((_, i) => (
						<div
							key={i}
							className={`aspect-square w-24 rounded-2xl bg-primary/20 ${
								i % 2 === 0 ? "animate-pulse" : ""
							}`}
						/>
					))}
				</div>
				<h2 className="text-2xl font-bold mb-2">{title}</h2>
				<p className="text-base-content/60">{subtitle}</p>
			</div>
		</div>
	);
};

export default AuthImagePattern;
