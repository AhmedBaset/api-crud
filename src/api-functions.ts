import axios from "axios";
import { Device } from "./TypescriptTypes";

type DeviceWithoutId = Omit<Device, "id">;

const URL = "http://localhost:3000";

export async function getDocs() {
	return axios.get(`${URL}/devices`).then((response) => {
		return response.data;
	});
}

export async function getDoc(id: string) {
	return axios.get(`${URL}/devices/${id}`).then((response) => {
		return response.data;
	});
}

export async function deleteDoc(id: string) {
	return axios.delete(`${URL}/devices/${id}`).then((response) => {
		return response.data;
	});
}

export async function createDoc(data: DeviceWithoutId) {
	return axios.post(`${URL}/devices`, data).then((response) => {
		return response.data;
	});
}

export async function updateDoc(id: any, data: DeviceWithoutId) {
	return axios.put(`${URL}/devices/${id}`, data).then((response) => {
		console.log(response.data);
		return response.data;
	});
}