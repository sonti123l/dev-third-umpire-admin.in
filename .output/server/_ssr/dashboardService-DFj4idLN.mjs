import { t as $fetch } from "./AuthContext-Cji_UYzS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboardService-DFj4idLN.js
var getDevicesDetails = async () => {
	try {
		return await $fetch.get("/devices-list");
	} catch (err) {
		throw err;
	}
};
var getFotaDetailsForDevice = async (device_id) => {
	try {
		return await $fetch.get(`/${device_id}/get-fota-details`);
	} catch (err) {
		throw err;
	}
};
var AddDetailsIntoFotaDb = async (payload) => {
	try {
		return await $fetch.postFormData("/add-fota-details", payload);
	} catch (err) {
		throw err;
	}
};
var getFotaList = async (device_id, params) => {
	try {
		const query = new URLSearchParams();
		if (params?.page) query.set("page", String(params.page));
		if (params?.page_size) query.set("page_size", String(params.page_size));
		const qs = query.toString();
		return await $fetch.get(`/${device_id}/fota-details-list${qs ? `?${qs}` : ""}`);
	} catch (err) {
		throw err;
	}
};
//#endregion
export { getFotaList as i, getDevicesDetails as n, getFotaDetailsForDevice as r, AddDetailsIntoFotaDb as t };
