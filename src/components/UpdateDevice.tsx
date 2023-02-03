import axios from "axios";
import React, { useRef } from "react";
import { updateDoc } from "../api-functions";
import { URL } from "../App";
import { Device } from "../TypescriptTypes";
import { ReactComponent as Close } from "./../assets/close.svg";

type Props = {
	setIsUpdating: React.Dispatch<React.SetStateAction<string>>;
	id: string;
	reload: () => void;
};

function UpdateDevice({ setIsUpdating, id, reload }: Props) {
	const name = useRef() as React.MutableRefObject<HTMLInputElement>;
	const type = useRef() as React.MutableRefObject<HTMLSelectElement>;
	const capacity = useRef() as React.MutableRefObject<HTMLInputElement>;
	const [device, setDevice] = React.useState({} as Device);

	React.useEffect(() => {
		axios.get(`${URL}/devices/${id}`).then((response) => {
			setDevice(response.data);
		});
	}, []);
	console.log(device)
	
	const handleSubmit = async () => {
		const data = {
			system_name: name.current.value,
			type: type.current.value as "WINDOWS" | "MAC" | "LINUX",
			hdd_capacity: capacity.current.value,
		};

		await updateDoc(id, data);
		reload();
		setIsUpdating("");
	};

	return (
		<div className="space-y-4">
			<header className="flex items-center justify-between">
				<h2 className="text-2xl">Update Device</h2>
				<Close onClick={() => setIsUpdating("")} />
			</header>
			<form className="space-y-4" onSubmit={handleSubmit}>
				<div className="space-y-1">
					<label className="block w-full text-sm" htmlFor="name">
						System name <sup>*</sup>
					</label>
					<input className="block w-full" type="text" ref={name} defaultValue={device.system_name} />
				</div>
				<div className="space-y-1">
					<label className="block w-full text-sm" htmlFor="name">
						Device type <sup>*</sup>
					</label>
					<select
						className="block w-full"
						name="system_type"
						ref={type}
						defaultValue={device.type as "WINDOWS" | "MAC" | "LINUX"}
					>
						<option value="WINDOWS">Windows</option>
						<option value="MAC">Mac</option>
						<option value="LINUX">Linux</option>
					</select>
				</div>
				<div className="space-y-1">
					<label className="block w-full text-sm" htmlFor="name">
						HDD capacity (GB) <sup>*</sup>
					</label>
					<input
						className="block w-full"
						type="text"
						name="hdd_capacity"
						ref={capacity}
						defaultValue={device.hdd_capacity}
					/>
				</div>
			</form>
			<footer className="space-x-2 text-right">
				<button
					className="rounded border border-gray px-3 py-2 text-primary"
					onClick={() => setIsUpdating("")}
				>
					Cancel
				</button>
				<button
					className="rounded bg-primary px-3 py-2 text-white ring-primary"
					children="Submit"
					onClick={handleSubmit}
				/>
			</footer>
		</div>
	);
}

export default UpdateDevice;
