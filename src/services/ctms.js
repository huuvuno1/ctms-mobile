import { requestCtms } from "../apis";
import * as cheerio from "cheerio";
import dateFormat from "dateformat";
import { requestLoginCtms, requestLogoutCtms } from "../apis/auth";
import { repository, KEY } from "../repository";
import dayjs from "dayjs";
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

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

const getClassSchedule = async (startDay, isSave) => {
  startDay =
    typeof startDay === "string"
      ? startDay
      : dateFormat(startDay || new Date(), "yyyy/mm/dd");

  console.log("startDay", startDay);

  try {
    const response = await requestCtms({
      path: "Lichhoc.aspx?sid=",
      method: "POST",
      body: {
        __VIEWSTATE:
          "/wEPDwUKMTA4NDM3NDc2OGQYBwUzY3RsMDAkTGVmdENvbCRMaWNoaG9jMSRycHRyTGljaGhvYyRjdGwwNSRncnZMaWNoaG9jDzwrAAwBCAIBZAUzY3RsMDAkTGVmdENvbCRMaWNoaG9jMSRycHRyTGljaGhvYyRjdGwwMyRncnZMaWNoaG9jDzwrAAwBCAIBZAUzY3RsMDAkTGVmdENvbCRMaWNoaG9jMSRycHRyTGljaGhvYyRjdGwwMiRncnZMaWNoaG9jDzwrAAwBCAIBZAUzY3RsMDAkTGVmdENvbCRMaWNoaG9jMSRycHRyTGljaGhvYyRjdGwwNiRncnZMaWNoaG9jDzwrAAwBCAIBZAUzY3RsMDAkTGVmdENvbCRMaWNoaG9jMSRycHRyTGljaGhvYyRjdGwwMSRncnZMaWNoaG9jDzwrAAwBCGZkBTNjdGwwMCRMZWZ0Q29sJExpY2hob2MxJHJwdHJMaWNoaG9jJGN0bDA0JGdydkxpY2hob2MPPCsADAEIAgFkBTNjdGwwMCRMZWZ0Q29sJExpY2hob2MxJHJwdHJMaWNoaG9jJGN0bDAwJGdydkxpY2hob2MPPCsADAEIZmSkFa8eLkvJyFtSd8jDUX6jAXl4UqywX6kbCvDedzL1iA==",
        __VIEWSTATEGENERATOR: "CB78C13A",
        __EVENTVALIDATION:
          "/wEdAAWAZedefWk1Oq9XbG32bj3SWWWHEhzFiGyQmAroNHRecPGp81KLC9U2/agHpgpfb4ZN6O2MwGQTfovT88oxno1QXParDuHQyN/7wnDAEyPKu51xrFynUe0dgdwOVipS86H2v7Iy9/GjQ46IARXhb7fK",
        ctl00$LeftCol$Lichhoc1$txtNgaydautuan: startDay,
        ctl00$LeftCol$Lichhoc1$btnXemlich: "Xem lịch",
      },
    });
    const $ = cheerio.load(response?.data || "");
    const tables = $("table");
    const result = [];
    tables.each((index, table) => {
      const day = $(`#LeftCol_Lichhoc1_pnView > div`)[index];
      if (!day) return;

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
    if (isSave !== false) {
      repository.storeData(KEY.CLASS_SCHEDULE, result);
    }

    return result;
  } catch (e) {
    console.log("Get class schedule from cache", e);
    return repository.getData(KEY.CLASS_SCHEDULE);
  }
};

const getTuitionBill = async (startDay, endDay) => {
  startDay =
    typeof startDay === "string"
      ? startDay
      : dateFormat(startDay || new Date(), "yyyy/mm/dd");

  endDay =
    typeof endDay === "string"
      ? endDay
      : dateFormat(endDay || new Date(), "yyyy/mm/dd");
  console.log(startDay, endDay);
  try {
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
        ctl00$LeftCol$DsHoadonHocphi1$txtNgaylap1: startDay,
        ctl00$LeftCol$DsHoadonHocphi1$txtNgaylap2: endDay,
        ctl00$LeftCol$DsHoadonHocphi1$btnXemdanhsach: "Xem danh sách",
      },
    });

    const $ = cheerio.load(response?.data || "");
    const rows = $("#LeftCol_DsHoadonHocphi1_grvHoadon > tbody > tr");
    let result = [];
    rows.each((index, row) => {
      if (index === 0) return;
      const billId = $(row).find("td:nth-child(5)")?.text()?.trim();
      const createdBy = $(row).find("td:nth-child(6)")?.text()?.trim();
      const createdAt = $(row)
        .find("td:nth-child(7)")
        ?.text()
        ?.replace("'", "")
        ?.trim()
        ?.split(" ")?.[1];
      const totalCredits = $(row).find("td:nth-child(8)")?.text()?.trim();
      const totalMoney = $(row).find("td:nth-child(9)")?.text()?.trim();
      const reduce = $(row).find("td:nth-child(10)")?.text()?.trim();
      const paid = $(row).find("td:nth-child(11)")?.text()?.trim();
      const owed = $(row).find("td:nth-child(12)")?.text()?.trim();
      result.push({
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

    result = result.reverse();

    repository.storeData(KEY.TUITION_BILL, result);
    return result;
  } catch (e) {
    console.log("Load from cache", e);
    return repository.getData(KEY.TUITION_BILL);
  }
};

const getExamSchedule = async () => {
  try {
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
      const room = $(row).find("td:nth-child(3)")?.text()?.trim();
      const subjectName = $(row).find("td:nth-child(4)")?.text()?.trim();
      const subjectId = $(row).find("td:nth-child(5)")?.text()?.trim();
      const status = dayjs().isBefore(dayjs(examTime, "HH:mm DD/MM/YYYY")) ? 'Sắp thi' : 'Đã Thi';
      result.push({
        subjectName,
        subjectId,
        examTime,
        room,
        status,
      });
    });
    repository.storeData(KEY.EXAM_SCHEDULE, result);
    return result.reverse();
  } catch (e) {
    console.log('get exam schedule error', e)
    return repository.getData(KEY.EXAM_SCHEDULE);
  }
};

const getScore = async () => {
  const response = await requestCtms({
    path: "KetquaHoctap.aspx",
  });
  const result = [];
  const $ = cheerio.load(response?.data || "");
  const rows = $("#leftcontent > table.RowEffect.CenterElement > tbody > tr");
  rows.each((index, row) => {
    const subjectName = $(row).find("td:nth-child(1)")?.text()?.trim();
    const credit = $(row).find("td:nth-child(2)")?.text()?.trim();
    const className = $(row).find("td:nth-child(3)")?.text()?.trim();
    const teacher = $(row).find("td:nth-child(4)")?.text()?.trim();
    const score_1 = $(row).find("td:nth-child(5)")?.text()?.trim();
    const score_2 = $(row).find("td:nth-child(6)")?.text()?.trim();
    const score_3 = $(row).find("td:nth-child(7)")?.text()?.trim();
    result.push({
      subjectName,
      credit,
      className,
      teacher,
      score_1,
      score_2,
      score_3,
    });
  });
  return result;
};

const getInfo = async () => {
  try {
    const response = await requestCtms({
      path: "KetquaHoctap.aspx",
    });
    const $ = cheerio.load(response?.data || "");
    const user = {};
    user.name = $(
      "#leftcontent > table.ThongtinSV > tbody > tr:nth-child(1) > td:nth-child(2)"
    )
      .text()
      ?.replace(":", "")
      ?.trim();
    user.birthday = $(
      "#leftcontent > table.ThongtinSV > tbody > tr:nth-child(1) > td:nth-child(4)"
    )
      .text()
      ?.replace(":", "")
      ?.trim();
    user.formTraining = $(
      "#leftcontent > table.ThongtinSV > tbody > tr:nth-child(2) > td:nth-child(2)"
    )
      .text()
      ?.replace(":", "")
      ?.trim();
    user.id = $(
      "#leftcontent > table.ThongtinSV > tbody > tr:nth-child(2) > td:nth-child(4)"
    )
      .text()
      ?.replace(":", "")
      ?.trim();
    user.department = $(
      "#leftcontent > table.ThongtinSV > tbody > tr:nth-child(3) > td:nth-child(2)"
    )
      .text()
      ?.replace(":", "")
      ?.trim();
    user.major = $(
      "#leftcontent > table.ThongtinSV > tbody > tr:nth-child(3) > td:nth-child(4)"
    )
      .text()
      ?.replace(":", "")
      ?.trim();
    user.courses = $(
      "#leftcontent > table.ThongtinSV > tbody > tr:nth-child(4) > td:nth-child(2)"
    )
      .text()
      ?.replace(":", "")
      ?.trim();
    user.className = $(
      "#leftcontent > table.ThongtinSV > tbody > tr:nth-child(4) > td:nth-child(4)"
    )
      .text()
      ?.replace(":", "")
      ?.trim();

    repository.storeData(KEY.USER_INFO, user);

    return user;
  } catch (e) {
    console.log("getInfo error", e);
    return repository.getData(KEY.USER_INFO);
  }
};

export const getTuitionBillDetail = async (id) => {
  try {
    const response = await requestCtms({
      path: "HocphiChitietHoadonSV.aspx?bid=" + id,
    });
    const $ = cheerio.load(response?.data || "");
    const result = {};
    const subjects = [];
    const rows = $("#leftcontent > table.ThongtinSV.RowEffect > tbody > tr");
    rows.each((index, row) => {
      if (index === 0) return;

      if (rows.length === index + 4) {
        result.totalMoney = $(row).find("td:nth-child(2)")?.text()?.trim();
        return;
      }

      if (rows.length === index + 3) {
        result.reduce = $(row).find("td:nth-child(2)")?.text()?.trim();
        return;
      }

      if (rows.length === index + 2) {
        result.paid = $(row).find("td:nth-child(2)")?.text()?.trim();
        return;
      }

      if (rows.length === index + 1) {
        result.debt = $(row).find("td:nth-child(2)")?.text()?.trim();
        return;
      }
      const className = $(row).find("td:nth-child(2)")?.text()?.trim();
      const subjectName = $(row).find("td:nth-child(3)")?.text()?.trim();
      const credit = $(row).find("td:nth-child(4)")?.text()?.trim();
      const unitPrice = $(row).find("td:nth-child(5)")?.text()?.trim();
      const amount = $(row).find("td:nth-child(6)")?.text()?.trim();
      subjects.push({
        className,
        subjectName,
        credit,
        unitPrice,
        amount,
      });
    });

    result.subjects = subjects;
    result.createdAt = $(
      "#leftcontent > table.ThongtinSV.CenterElement > tbody > tr:nth-child(1) > td:nth-child(4)"
    )
      .text()
      ?.replace(":", "")
      ?.trim();
    result.updatedAt = $("#leftcontent > div:nth-child(5)").text()?.trim();

    return result;
  } catch (e) {
    console.log("getTuitionBillDetail error", e);
    return [];
  }
};

export const ctmsService = {
  getInfo,
  login,
  logout,
  getClassSchedule,
  getTuitionBill,
  getExamSchedule,
  getScore,
  getTuitionBillDetail,
};
