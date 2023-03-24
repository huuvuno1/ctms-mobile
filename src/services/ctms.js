import { requestCtms } from "../apis";
import * as cheerio from "cheerio";
import { requestLoginCtms, requestLogoutCtms } from "../apis/auth";

const login = async (username, password, withCredentials) => {
  const response = await requestLoginCtms(username, password, withCredentials);
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
};

const logout = async (cookies) => {
  await requestLogoutCtms(cookies);
};

const getClassSchedule = async () => {
  const response = await requestCtms({
    path: "Lichhoc.aspx?sid=",
  });
  const $ = cheerio.load(response?.data || "");
  const tables = $("table");
  const result = [];
  tables.each((index, table) => {
    const day = $(`#LeftCol_Lichhoc1_pnView > div`)[index];
    const data = {
      day: $($(day).children()[0]).text().replace(/\s+/g, " "),
      classes: [],
    };
    const trs = $(table).find("tr");
    trs.each((i, tr) => {
      if (i === 0) return;
      const id = $(tr).find("td:nth-child(1)")?.text()?.trim();
      const time = $(tr).find("td:nth-child(2)")?.text()?.trim();
      const room = $(tr).find("td:nth-child(3)")?.text()?.trim();
      const name = $(tr).find("td:nth-child(4)")?.text()?.trim();
      const teacher = $(tr).find("td:nth-child(5)")?.text()?.trim();
      const classId = $(tr).find("td:nth-child(6)")?.text()?.trim();
      const status = $(tr).find("td:nth-child(7)")?.text()?.trim();
      data.classes.push({
        id,
        time,
        room,
        name,
        teacher,
        classId,
        status,
      });
    });
    result.push(data);
  });
  return result;
};

export const ctmsService = {
  login,
  logout,
  getClassSchedule,
};
