import { $fetch } from "@/http/fetch";

export const getDevicesDetails = async () => {
  try {
    const result = $fetch.get("/devices");
    console.log(result);
    return result;
  } catch (err) {
    throw err;
  }
};
