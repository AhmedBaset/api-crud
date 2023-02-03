import React from "react";
import { ReactComponent as Plus } from "./../assets/plus.svg";
import { ReactComponent as Search } from "./../assets/search.svg";
import { ReactComponent as Reaload } from "./../assets/reload.svg";
import { Device } from "../TypescriptTypes";

function Header({
	setFiltered,
	setIsAdding,
	reload,
	devices,
	sortMethod,
	setSortMethod,
}: {
	setFiltered: React.Dispatch<React.SetStateAction<Device[]>>;
	setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
	reload: () => void;
	devices: Device[];
	sortMethod: "NAME" | "HDD_CAPACITY" | "null";
	setSortMethod: React.Dispatch<
		React.SetStateAction<"NAME" | "HDD_CAPACITY" | "null">
	>;
}) {
	const search = (value: string) => {
		setFiltered(() => {
			return devices.filter((device) => {
				return (
					device.system_name.toLowerCase().indexOf(value.toLowerCase()) !==
					-1
				);
			});
		});
	};

	const filterByType = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFiltered(() => {
			if (e.target.value === "WINDOWS") {
				return devices.filter(
					(device) => device.type.toLocaleLowerCase() === "windows"
				);
			} else if (e.target.value === "MAC") {
				return devices.filter(
					(device) => device.type.toLocaleLowerCase() === "mac"
				);
			} else if (e.target.value === "LINUX") {
				return devices.filter(
					(device) => device.type.toLocaleLowerCase() === "linux"
				);
			}
			return devices;
		});
	};

	return (
		<header className="container space-y-2 py-4">
			<div className="flex justify-between">
				<h1 className="text-2xl font-bold">Devices</h1>
				<button
					onClick={() => setIsAdding(true)}
					className="flex items-center gap-2 rounded bg-primary px-3 py-2 text-white"
				>
					<Plus />
					<span>Add Device</span>
				</button>
			</div>

			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<div className="relative">
						<input
							onChange={(e) => search(e.target.value)}
							type="text"
							placeholder="Search"
							className="h-full w-full pl-8"
						/>
						<Search className="pointer-events-none absolute top-1/2 left-2 w-4 -translate-y-1/2" />
					</div>
					<Reaload onClick={() => reload()} className="text-gray" />
				</div>

				<div className="flex flex-wrap gap-2">
					<select className="relative" onChange={filterByType}>
						<option value="ALL">Device type: All</option>
						<option value="WINDOWS">Device type: Windows</option>
						<option value="MAC">Device type: Mac</option>
						<option value="LINUX">Device type: Linux</option>
					</select>

					<select
						value={sortMethod}
						onChange={(e) =>
							setSortMethod(
								e.target.value as "NAME" | "HDD_CAPACITY" | "null"
							)
						}
					>
						<option value="null">Sort by: Nothing</option>
						<option value="NAME">Sort by: Name</option>
						<option value="HDD_CAPACITY">
							Sort by: HDD Capacity (Descending)
						</option>
					</select>
				</div>
			</div>
		</header>
	);
}

export default Header;
