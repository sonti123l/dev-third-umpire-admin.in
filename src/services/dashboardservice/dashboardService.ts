import { $fetch } from "@/http/fetch";
import { FotaDetails } from "@/types/fotaDetails";

export const getDevicesDetails = async () => {
  try {
    const result = await $fetch.get("/devices");
    return result;
  } catch (err) {
    throw err;
  }
};

export const AddDetailsIntoFotaDb = async (payload: FotaDetails) => {
  try {
    const res = await $fetch.post("/add-fota-details", payload);
    return res;
  } catch (err) {
    throw err;
  }
};
