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

export const getFotaList = async (
  device_id: number,
  params?: { page?: number; page_size?: number },
) => {
  try {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.page_size) query.set("page_size", String(params.page_size));
    const qs = query.toString();
    const result = await $fetch.get(
      `/${device_id}/fota-details-list${qs ? `?${qs}` : ""}`,
    );
    return result;
  } catch (err) {
    throw err;
  }
};