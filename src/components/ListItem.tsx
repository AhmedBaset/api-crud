import { Device } from "../TypescriptTypes";
import { ReactComponent as Windows } from "./../assets/windows.svg";
import { ReactComponent as Mac } from "./../assets/apple.svg";
import { ReactComponent as Linux } from "./../assets/linux.svg";
import { ReactComponent as Menu } from "./../assets/menu.svg";
import React, { useEffect, useState } from "react";

function ListItem({
	device,
	setIsDeleting,
	setIsUpdating,
}: {
	device: Device;
	setIsDeleting: React.Dispatch<React.SetStateAction<string>>;
	setIsUpdating: React.Dispatch<React.SetStateAction<string>>;
}) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		const time = setTimeout(() => {
			setIsMenuOpen(false);
		}, 3000);
		return () => clearTimeout(time);
	}, [isMenuOpen]);

	return (
		<li
			className="group flex cursor-default items-center justify-between border-b border-gray-light py-1 px-2 hover:bg-light"
			key={device.system_name}
		>
			<div>
				<h3 className="flex items-center gap-2 text-lg font-semibold">
					{device.type === "WINDOWS" ? (
						<Windows stroke="none" />
					) : device.type === "MAC" ? (
						<Mac stroke="none" />
					) : device.type === "LINUX" ? (
						<Linux stroke="none" />
					) : null}
					<span>{device.system_name}</span>
				</h3>
				<p className="text-sm text-gray">
					<span className="capitalize">{device.type}</span> workstation -{" "}
					{device.hdd_capacity} GB
				</p>
			</div>

			<div className="relative flex items-center justify-center">
				<button
					className="group/btn h-5 w-5 cursor-pointer transition-opacity group-hover:opacity-100 md:opacity-0"
					onClick={() => setIsMenuOpen((val) => !val)}
				>
					<Menu />
				</button>
				{isMenuOpen && (
					<ul
						className={`absolute top-6 right-0 w-60 rounded bg-white shadow shadow-light`}
					>
						<li>
							<button
								className="w-full p-2"
								onClick={() => setIsUpdating(device.id)}
							>
								Edit
							</button>
						</li>
						<li>
							<button
								className="w-full p-2 text-rose-500"
								onClick={() => setIsDeleting(device.id)}
							>
								Delete
							</button>
						</li>
					</ul>
				)}
			</div>
		</li>
	);
}

export default ListItem;
