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

const getTuitionBill = async () => {
  const response = await requestCtms({
    path: "HocphiDsHoadonSV.aspx",
    method: "POST",
    body: {
      __EVENTTARGET: "",
      __EVENTARGUMENT: "",
      __VIEWSTATEENCRYPTED: "",
      __VIEWSTATE:
        "obNbtmD2gW8m973xDKuLLLKl+ZfX05UXeOHupmzxJR0lLFe50ZdzVFhskb60bDBcWTn9C/ZhxdzBsAK8psXx4VjCa0p9z+fPfEI0VrB8IB62O4+r/Gr09H+0gSowL8Cfk0zm+Snjd/msbuQynv2SVu6DBCvjpaSOaYmzHi98YudPev1/iMCkFVhBJChZifBDRHnLEaKEpmb1ih1lNpXwjMAQCXpMFfO5YzaNgmEr+HWHUiwQp5Uo8EXYVDAgIHzgj9mCLge8j+HGmvkLZq0p4E4nxap+Qj85I3A8JnG80Tl7UpeJWml+0TvGi0+wx+5dOkBfeJ7LlU4Ky6Gb8U+0JT5r0Hjs+LMxXc7UpWvJT3GOuIwxrHAk54vhJQTrenBQVQorZ/uPfs6fz3YsTYynd+zft2TChXoKyZYP/KYzWHc=",
      __VIEWSTATEGENERATOR: "0651EE50",
      __EVENTVALIDATION:
        "ZkklRitHMGUUF4h/QheT6BKPw2dFc96g0AV0qSZG7q0prazegax+pDaXZ8WkfNLZ7LGDzkNGUVldDiVPhdahrSfdPCQSFDF7g+w/iY+9A5JBu+zXN4ABJwbVmACK7y9qqoTFn02+NBsxaVTypXNPFfos1szNIR0aDraFudEiNZdUel1LIv+zn33xfMc25Set",
      ctl00$LeftCol$DsHoadonHocphi1$txtNgaylap1: "2022-03-27",
      ctl00$LeftCol$DsHoadonHocphi1$txtNgaylap2: "2023-03-27",
      ctl00$LeftCol$DsHoadonHocphi1$btnXemdanhsach: "Xem danh sách",
    },
  });

  const $ = cheerio.load(response?.data || "");
  const rows = $("#LeftCol_DsHoadonHocphi1_grvHoadon > tbody > tr");
  const result = [];
  rows.each((index, row) => {
    if (index === 0) return;
    const studentId = $(row).find("td:nth-child(1)")?.text()?.trim();
    const studentName = $(row).find("td:nth-child(2)")?.text()?.trim();
    const birthday = $(row).find("td:nth-child(3)")?.text()?.trim();
    const className = $(row).find("td:nth-child(4)")?.text()?.trim();
    const billId = $(row).find("td:nth-child(5)")?.text()?.trim();
    const createdBy = $(row).find("td:nth-child(6)")?.text()?.trim();
    const createdAt = $(row).find("td:nth-child(7)")?.text()?.trim();
    const totalCredits = $(row).find("td:nth-child(8)")?.text()?.trim();
    const totalMoney = $(row).find("td:nth-child(9)")?.text()?.trim();
    const reduce = $(row).find("td:nth-child(10)")?.text()?.trim();
    const paid = $(row).find("td:nth-child(11)")?.text()?.trim();
    const owed = $(row).find("td:nth-child(12)")?.text()?.trim();

    result.push({
      studentId,
      studentName,
      birthday,
      className,
      billId,
      createdBy,
      createdAt,
      totalCredits,
      totalMoney,
      reduce,
      paid,
      owed,
    });
  });

  return result;
};

const getExamSchedule = async () => {
  const response = await requestCtms({
    path: "Lichthi.aspx",
    method: "POST",
    body: {
      __EVENTTARGET: "",
      __EVENTARGUMENT: "",
      __VIEWSTATE:
        "/wEPDwULLTIwMjQzMTMxNjYPZBYCZg9kFgICAw9kFgQCBQ9kFgQCAQ8WAh4EVGV4dAUkTOG7i2NoIHRoaSBj4bunYSBOZ3V54buFbiBI4buvdSAgVsWpZAIDD2QWAgIKDxYCHgtfIUl0ZW1Db3VudAICFgQCAQ9kFghmDxUCATEQMTM6MDAgMjcvMDQvMjAyM2QCAQ8WAh8ABQNQMjJkAgMPFgIfAAUaTOG6rXAgdHLDrG5oIFdlYiBuw6JuZyBjYW9kAgUPFgIfAAUENzA0MmQCAg9kFghmDxUCATIQMDc6MzAgMDYvMDEvMjAyNGQCAQ8WAh8ABQdQLiBHRFRDZAIDDxYCHwAFGEdpw6FvIGThu6VjIHRo4buDIGNo4bqldGQCBQ8WAh8ABQQ3MDIxZAIGDw8WAh4HVmlzaWJsZWhkFgICAw8QZGQWAGQYAQUeX19Db250cm9sc1JlcXVpcmVQb3N0QmFja0tleV9fFgUFImN0bDAwJExlZnRDb2wkTGljaHRoaTEkcmJ0bkNodWF0aGkFIGN0bDAwJExlZnRDb2wkTGljaHRoaTEkcmJ0bkRhdGhpBSBjdGwwMCRMZWZ0Q29sJExpY2h0aGkxJHJidG5EYXRoaQUgY3RsMDAkTGVmdENvbCRMaWNodGhpMSRyYnRuVGF0Y2EFIGN0bDAwJExlZnRDb2wkTGljaHRoaTEkcmJ0blRhdGNhJ8Hz410N51/AFfGTuTSmhzxjliMEMrU9j8UUaOeuXk0=",
      __VIEWSTATEGENERATOR: "CF2F9093",
      __EVENTVALIDATION:
        "/wEdAAWN24s4TgIpAh6wBQVbNVZDXEm3fbvpxAJkqTXlh/jNY2buBLZsldFPHAC8e+hd77F/vr5XWQHmmRN8lralWNXTqgWfuQi5eQOHKBG9POpff1VYG5Y1QYf687xN2VdvGXujBx567175Kon/gWXMSrmd",
      ctl00$LeftCol$Lichthi1$Tuychon: "rbtnTatca",
      ctl00$LeftCol$Lichthi1$btnHien: "Hiện",
    },
  });
  const result = [];
  const $ = cheerio.load(response?.data || "");
  const rows = $("#leftcontent > table > tbody > tr");
  rows.each((index, row) => {
    if (index === 0) return;
    const examTime = $(row).find("td:nth-child(2)")?.text()?.trim();
    const time = examTime.split(" ")[0];
    const date = examTime.split(" ")[1];
    const room = $(row).find("td:nth-child(3)")?.text()?.trim();
    const subjectName = $(row).find("td:nth-child(4)")?.text()?.trim();
    const subjectId = $(row).find("td:nth-child(5)")?.text()?.trim();
    result.push({
      subjectName,
      subjectId,
      examTime,
      room,
      date,
      time
    });
  });
  return result;
};

export const ctmsService = {
  login,
  logout,
  getClassSchedule,
  getTuitionBill,
  getExamSchedule,
};
