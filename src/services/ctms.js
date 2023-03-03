import * as cheerio from "cheerio";
import { requestLoginCtms, requestLogoutCtms } from "../apis/auth"

const login = async (username, password, withCredentials) => {
    const response = await requestLoginCtms(username, password, withCredentials)
    const dom = cheerio.load(response?.data || "")("#LeftCol_UserLogin1_lblMess");
    if (response) {
        return {
            cookie: response.headers["set-cookie"],
            isSuccess: response.data.includes("Xin chào mừng"),
            errorMsg: dom.text(),
        };
    }
    
    return {
        cookie: [],
        isSuccess: false,
        errorMsg: "Lỗi kết nối",
    };
} 

const logout = async (cookies) => {
    await requestLogoutCtms(cookies)
}

export const ctmsService = {
    login, logout
}