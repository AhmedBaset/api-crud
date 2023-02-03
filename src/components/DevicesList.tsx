import { Device } from "./../TypescriptTypes";
import ListItem from "./ListItem";

type Props = {
	devices: Device[];
	setIsUpdating: React.Dispatch<React.SetStateAction<string>>;
	setIsDeleting: React.Dispatch<React.SetStateAction<string>>;
};

function DevicesList({ devices, setIsUpdating, setIsDeleting }: Props) {
	return (
		<main className="container">
			<h2 className="border-b border-gray py-2 font-semibold">Device</h2>
			<ul>
				{devices.map((device) => (
					<ListItem
						key={device.id}
						device={device}
						setIsUpdating={setIsUpdating}
						setIsDeleting={setIsDeleting}
					/>
				))}
			</ul>
		</main>
	);
}

export default DevicesList;
