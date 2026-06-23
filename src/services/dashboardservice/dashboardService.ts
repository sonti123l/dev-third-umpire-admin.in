import { $fetch } from "@/http/fetch";

export const getDevicesDetails = async () => {
  try {
    const result = await $fetch.get("/devices");
    return result;
  } catch (err) {
    throw err;
  }
};
