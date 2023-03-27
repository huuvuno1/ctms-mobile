import axiosInstance from "./axiosInstance";
import qs from "qs";
import configs from "../configs";

const requestCtms = async (
  { path = "", method = "GET", param = {}, body = {} },
  withCredentials = false
) => {
  try {
    const response = await axiosInstance({
      method,
      url: `${configs.BASE_URL}/${path}`,
      data: qs.stringify(body),
      params: param,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      withCredentials,
    });
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export { requestCtms };
