import { Earth, Pencil } from "lucide-react";
import React from "react";

function SelectInput({
	title,
	disabledOptionTitle,
	defaultValue,
	readOnly,
	options,
	icon,
	titleOnHover
}) {
	return (
		<div className="w-full">
			<div className="space-y-1.5 w-full">
				<div className="flex items-center justify-between">
					<div className="text-sm text-zinc-400 flex items-center gap-2">
						{icon}
						{title}
					</div>
					<div
						title={titleOnHover}
						className="text-sm text-zinc-400 hover:text-primary hover:scale-105 transition-all duration-75 flex items-center gap-2 cursor-pointer"
					>
						<Pencil className="size-4" />
					</div>
				</div>
				<select
					defaultValue={disabledOptionTitle}
					className="select w-full"
					readOnly={readOnly}
					value={defaultValue}
				>
					<option disabled={true} selected>{disabledOptionTitle}</option>
					{options?.map((option, index) => {
						return (
							<option
								key={index}
							>{`${option.country} (${option.dialCode} )`}</option>
						);
					})}
				</select>
			</div>
		</div>
	);
}

export default SelectInput;
