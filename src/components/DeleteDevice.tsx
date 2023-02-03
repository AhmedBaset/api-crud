import React from "react";
import { ReactComponent as Close } from "./../assets/close.svg";
import { Device } from "../TypescriptTypes";
import axios from "axios";
import { URL } from "../App";
import { deleteDoc } from "../api-functions";

type Props = {
	setIsDeleting: React.Dispatch<React.SetStateAction<string>>;
	id: string;
	reload: () => void;
};

function DeleteDevice({ setIsDeleting, id, reload }: Props) {
	const [device, setDevice] = React.useState<Device>({} as Device);

	React.useEffect(() => {
		axios.get(`${URL}/devices/${id}`).then((response) => {
			setDevice(response.data);
		});
	}, []);

	const handleDelete = async () => {
		await deleteDoc(id);
		reload();
		setIsDeleting("");
	};

	return (
		<div className="space-y-4">
			<header className="flex items-center justify-between">
				<h2 className="text-2xl">Delete Device?</h2>
				<Close onClick={() => setIsDeleting("")} />
			</header>
			<section className="space-y-4">
				<p>
					You are about to delete the device {device.system_name}. This
					action cannot be undone.
				</p>
			</section>
			<footer className="space-x-2 text-right">
				<button
					className="rounded border border-gray px-3 py-2 text-primary"
					onClick={() => setIsDeleting("")}
				>
					Cancel
				</button>
				<button
					onClick={handleDelete}
					className="rounded border border-rose-700 bg-rose-700 px-3 py-2 text-white"
				>
					Submit
				</button>
			</footer>
		</div>
	);
}

export default DeleteDevice;
