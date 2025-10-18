import * as SecureStore from "expo-secure-store";

function set(key: string, value: string) {
  SecureStore.setItem(key, value);
}
function get(key: string) {
  return SecureStore.getItem(key);
}
async function remove(key: string) {
  return await SecureStore.deleteItemAsync(key);
}

const SecureStorage = { set, get, remove };
export default SecureStorage;
