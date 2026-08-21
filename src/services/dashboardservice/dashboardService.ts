import { $fetch } from "@/http/fetch";
import { FotaDetails } from "@/types/fotaDetails";

export const getDevicesDetails = async () => {
  try {
    const result = await $fetch.get("/devices-list");
    return result;
  } catch (err) {
    throw err;
  }
};


export const getFotaDetailsForDevice = async (device_id: number) => {
  try {
    const result = await $fetch.get(`/${device_id}/get-fota-details`);
    return result;
  } catch (err) {
    throw err;
  }
};



export const AddDetailsIntoFotaDb = async (payload: FormData) => {
  try {
    const res = await $fetch.postFormData("/add-fota-details", payload);
    return res;
  } catch (err) {
    throw err;
  }
};
