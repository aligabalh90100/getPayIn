import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

function mmkvSetValue(key: string, value: string | object) {
  if (typeof value === "string") {
    storage.set(key, value);
  } else {
    storage.set(key, JSON.stringify(value));
  }
}
function mmkvDeleteValue(key: string) {
  storage.delete(key);
}

function mmkvGetValue(key: string) {
  return storage.getString(key);
}

export { mmkvSetValue, mmkvDeleteValue, mmkvGetValue };
