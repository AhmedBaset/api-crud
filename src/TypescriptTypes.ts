export type Device = {
	id: string;
	system_name: string;
	type: "WINDOWS" | "MAC" | "LINUX";
	hdd_capacity: string;
};