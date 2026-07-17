export type FotaDetails = {
  device_id: number;
  device_old_version: string;
  device_new_version: string;
  web_old_version: string;
  web_new_version: string;
  device_update_url: string;
  web_update_url: string;
  fota_old_version: string,
  fota_new_version: string,
  fota_update_url: string
};