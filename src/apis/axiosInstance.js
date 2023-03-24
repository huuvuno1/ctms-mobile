import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { SECURE_STORE } from "../constants";
import { ctmsService } from "../services";

const instance = axios.create();

instance.interceptors.request.use(async function (configs) {
  // login before call api
  const store = await SecureStore.getItemAsync(SECURE_STORE.LOGIN_INFO);
  const { username, password } = JSON.parse(store || {});
  const { isSuccess, cookie } = await ctmsService.login(
    username,
    password,
    false
  );
  console.log("isSuccess", isSuccess, cookie);
  if (isSuccess) {
    configs = {
      ...configs,
      headers: {
        ...configs.headers,
        Cookie: cookie,
      },
    };
  }
  return configs;
});

instance.interceptors.response.use(function (response) {
  // logout after call api
  // ctmsService.logout(response.config.headers["Cookie"]);
  return response;
});

export default instance;
