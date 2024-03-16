import * as SecureStore from "expo-secure-store";

export async function saveToken(value: string) {
  if (!value) return;

  await SecureStore.setItemAsync("access_token", value);
}

export async function removeToken() {
  await SecureStore.deleteItemAsync("access_token");
}

export async function getToken() {
  let result = await SecureStore.getItemAsync("access_token");
  if (result) {
    return {
      success: true,
      value: result,
    };
  } else {
    return {
      success: false,
    };
  }
}
