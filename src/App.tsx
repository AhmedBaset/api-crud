import { useEffect, useLayoutEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import DevicesList from "./components/DevicesList";
import { Device } from "./TypescriptTypes";
import AddDevice from "./components/AddDevice";
import DeleteDevice from "./components/DeleteDevice";
import UpdateDevice from "./components/UpdateDevice";
import Modal from "./components/Modal";
import axios from "axios";

export const URL = "http://localhost:3000";

function App() {
	const [devices, setDevices] = useState<Device[]>([] as Device[]);
	const [filteredDevices, setFilteredDevices] = useState<Device[]>(
		[] as Device[]
	);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isAddingDevice, setIsAddingDevice] = useState(false);
	const [isDeletingDevice, setIsDeletingDevice] = useState("");
	const [isUpdatingDevice, setIsUpdatingDevice] = useState("");
	const [sortMethod, setSortMethod] = useState<
		"NAME" | "HDD_CAPACITY" | "null"
	>("null");
	const [rerender, setReRender] = useState(0);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => {
		setIsModalOpen(false);
		setIsAddingDevice(false);
	};

	const sort = () => {
		if (sortMethod === "NAME") {
			const newArr = filteredDevices.sort((a, b) => {
				if (a.system_name < b.system_name) {
					return -1;
				} else if (a.system_name > b.system_name) {
					return 1;
				}
				return 0;
			});
			setFilteredDevices(newArr);
		} else if (sortMethod === "HDD_CAPACITY") {
			const newArr = filteredDevices.sort((a, b) => {
				if (a.hdd_capacity > b.hdd_capacity) {
					return -1;
				} else if (a.hdd_capacity > b.hdd_capacity) {
					return 1;
				}
				return 0;
			});
			setFilteredDevices(newArr);
		}
	};

	const getDocs = () => {
		axios.get(`${URL}/devices`).then((response) => {
			setDevices(() => response.data);
		});
	};

	useLayoutEffect(() => {
		getDocs();
	}, []);

	useLayoutEffect(() => {
		setFilteredDevices(devices);
	}, [devices.length]);

	useLayoutEffect(() => {
		sort();
		setReRender((v) => v + 1);
	}, [sortMethod]);

	useEffect(() => {
		if (isAddingDevice || isDeletingDevice !== "" || isUpdatingDevice !== "")
			openModal();
		else closeModal();
	}, [isAddingDevice, isDeletingDevice, isUpdatingDevice]);

	return (
		<div className="text-gray">
			<Navbar />
			<Header
				setIsAdding={setIsAddingDevice}
				setFiltered={setFilteredDevices}
				devices={devices}
				reload={getDocs}
				sortMethod={sortMethod}
				setSortMethod={setSortMethod}
			/>
			<DevicesList
				devices={filteredDevices}
				setIsUpdating={setIsUpdatingDevice}
				setIsDeleting={setIsDeletingDevice}
			/>

			{isModalOpen && (
				<Modal>
					{isAddingDevice && (
						<AddDevice setIsAdding={setIsAddingDevice} reload={getDocs} />
					)}
					{isDeletingDevice !== "" && (
						<DeleteDevice
							id={isDeletingDevice}
							setIsDeleting={setIsDeletingDevice}
							reload={getDocs}
						/>
					)}
					{isUpdatingDevice !== "" && (
						<UpdateDevice
							id={isDeletingDevice}
							setIsUpdating={setIsUpdatingDevice}
							reload={getDocs}
						/>
					)}
				</Modal>
			)}
		</div>
	);
}

export default App;
