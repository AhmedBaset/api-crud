import React, { FormEvent, useRef } from "react";
import { createDoc } from "../api-functions";
import { ReactComponent as Close } from "./../assets/close.svg";

type Props = {
	setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
	reload: () => void;
};

function AddDevice({ setIsAdding, reload }: Props) {
	const name = useRef() as React.MutableRefObject<HTMLInputElement>;
	const type = useRef() as React.MutableRefObject<HTMLSelectElement>;
	const capacity = useRef() as React.MutableRefObject<HTMLInputElement>;

	const handleSubmit = async () => {
		const data = {
			system_name: name.current.value,
			type: type.current.value as "WINDOWS" | "MAC" | "LINUX",
			hdd_capacity: capacity.current.value,
		};

		await createDoc(data);

		reload();

		setIsAdding(false);
	};

	return (
		<div className="space-y-4">
			<header className="flex items-center justify-between">
				<h2 className="text-2xl">Add Device</h2>
				<Close onClick={() => setIsAdding(false)} />
			</header>
			<form className="space-y-4" onSubmit={handleSubmit}>
				<div className="space-y-1">
					<label className="block w-full text-sm" htmlFor="name">
						System name <sup>*</sup>
					</label>
					<input className="block w-full" type="text" ref={name} />
				</div>
				<div className="space-y-1">
					<label className="block w-full text-sm" htmlFor="name">
						Device type <sup>*</sup>
					</label>
					<select
						className="block w-full"
						name="system_type"
						defaultValue="null"
						ref={type}
					>
						<option disabled value="null">
							Select type
						</option>
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
					/>
				</div>
			</form>
			<footer className="space-x-2 text-right">
				<button
					className="rounded border border-gray px-3 py-2 text-primary"
					onClick={() => setIsAdding(false)}
				>
					Cancel
				</button>
				<button
					onClick={handleSubmit}
					className="rounded border border-primary bg-primary px-3 py-2 text-white"
				>
					Submit
				</button>
			</footer>
		</div>
	);
}

export default AddDevice;
