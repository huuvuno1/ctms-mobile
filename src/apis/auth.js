import axios from "axios";
import qs from "qs";
import md5 from "md5";
import configs from "../configs";

const requestLoginCtms = async (username, password, withCredentials = true) => {
  try {
    const response = await axios.post(
      `${configs.BASE_URL}/login.aspx`,
      qs.stringify({
        ctl00$LeftCol$UserLogin1$txtUsername: username,
        ctl00$LeftCol$UserLogin1$txtPassword: md5(password),
        ctl00$LeftCol$UserLogin1$btnLogin: "Đăng nhập",
        __VIEWSTATE:
          "/wEPDwUJNjgxODI3MDEzZGQYhImpueCRmFchkTJkEoLggX4C6Nz/NXMIzR9/49O/0g==",
        __VIEWSTATEGENERATOR: "C2EE9ABB",
        __EVENTVALIDATION:
          "/wEdAAQxNFjzuCTBmG4Ry6gmDFTXMVDm8KVzqxEfMx7263Qx5VsdkPb56sD60m4bRwV1zT7o396vFnxqy4G+sdDoX0RYcT0vDsg4dG9gkFX2SUYDeTjkkBvsNMeyzTehazPIVNk=",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials,
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const requestLogoutCtms = async (cookie) => {
  try {
    await axios.post(
      `${configs.BASE_URL}/login.aspx`,
      qs.stringify({
        __VIEWSTATE:
          "/wEPDwUJNjgxODI3MDEzZGQYhImpueCRmFchkTJkEoLggX4C6Nz/NXMIzR9/49O/0g==",
        __VIEWSTATEGENERATOR: "C2EE9ABB",
        __CALLBACKID: "ctl00$QuanlyMenu1",
        __CALLBACKPARAM: "logout",
        __EVENTVALIDATION:
          "/wEdAAMxNFjzuCTBmG4Ry6gmDFTXTejtjMBkE36L0/PKMZ6NUFz2qw7h0Mjf+8JwwBMjyrteAD/2TDLsirEPe9XnNMdullyh5lFH+KHD2XyjF64MYw==",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: cookie?.join("; "),
        },
      }
    );
  } catch (e) {
    console.log("logout errr:", e.message);
  }
};

export { requestLoginCtms, requestLogoutCtms };
