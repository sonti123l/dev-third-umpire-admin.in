type FotaTextFields = {
  device_id: number;
  device_old_version: string;
  device_new_version: string;
  web_old_version: string;
  web_new_version: string;
  fota_old_version: string;
  fota_new_version: string;
};

type DeviceListItem = {
  id: number;
  hardwareUuid: string;
  name: string | null;
  siteId: number | null;
  status: string | null;
  firmwareVersion: string | null;
  deviceVersion: string | null;
  lastHeartbeat: string | null;
  createdAt: string | null;
};

type FotaDetailsRow = {
  id: number;
  deviceId: number;
  deviceOldVersion: string;
  deviceNewVersion: string;
  webOldVersion: string;
  webNewVersion: string;
  deviceStatus: number;
  webStatus: number;
  deviceFotaUrl: string;
  webFotaUrl: string;
  fotaOldVersion: string;
  fotaNewVersion: string;
  fotaUpdateUrl: string;
  fotaStatus: string;
  createdAt: string | null;
  [key: string]: unknown;
};

export {FotaDetailsRow, DeviceListItem, FotaTextFields};