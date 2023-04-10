import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { ctmsService } from "../../services";
import styles from "./styles";
import { DatePicker } from "../../components";
import into from "../../../assets/into.png";
import { SCREENS } from "../../constants";

const fields = [
  { key: "totalCredits", name: "Tổng tín chỉ" },
  { key: "totalMoney", name: "Tổng tiền" },
  { key: "reduce", name: "Giảm trừ" },
  { key: "paid", name: "Đã thanh toán" },
  { key: "owed", name: "Còn nợ" },
  { key: "detail", name: "Chi tiết" },
  { key: "status", name: "Trạng thái" },
];

const TuitionBillScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  const [startDay, setStartDay] = useState(() => {
    const date = new Date();
    date.setFullYear(new Date().getFullYear() - 1);
    return date;
  });
  const [endDay, setEndDay] = useState(new Date());

  useEffect(() => {
    (async () => {
      const result = await ctmsService.getTuitionBill(startDay, endDay);
      console.log("hoa don", result.length);
      setData(result);
    })();
  }, [startDay, endDay]);

  return (
    <View style={styles.wrapper}>
      <DatePicker
        onChange={setStartDay}
        label="Từ ngày"
        shiftValue={30}
        defaultValue={startDay}
        style={{
          marginBottom: 10,
        }}
      />
      <DatePicker onChange={setEndDay} label="Đến ngày" shiftValue={30} />

      <ScrollView style={styles.wrapSchedule}>
        <Text
          style={[
            styles.scheduleDay,
            {
              color: "green",
              fontSize: 18,
              marginTop: 20,
              textAlign: "center",
            },
          ]}
        >
          Tìm thấy {data.length} hóa đơn
        </Text>
        {data?.length ? (
          data?.map((item, index) => (
            <React.Fragment key={`card-${index}`}>
              <View
                key={`car-${index}`}
                style={{
                  justifyContent: "space-between",
                  borderBottomWidth: 1,
                  borderBottomColor: "#0096FF",
                  flexDirection: "row",
                }}
              >
                <Text style={styles.scheduleDay}>
                  Ngày lập: {item.createdAt}
                </Text>
                <Text style={styles.scheduleDay}>HĐ: {item.billId}</Text>
              </View>
              <View key={index} style={styles.card}>
                <View style={styles.table}>
                  {fields.map((field, index) =>
                    index === 4 && item[field.key] === "0,0" ? undefined : (
                      <View style={styles.row} key={index}>
                        <Text style={[styles.cell, styles.cellW1]}>
                          {field.name}
                        </Text>
                        {(() => {
                          switch (field) {
                            case fields[6]:
                              return item["owed"] === "0,0" ? (
                                <View style={[styles.pay]}>
                                  <Text style={styles.billPaid}>
                                    Đã thanh toán
                                  </Text>
                                </View>
                              ) : (
                                <View style={[styles.pay]}>
                                  <Text style={styles.billPaid}>Còn nợ</Text>
                                </View>
                              );
                            case fields[5]:
                              return (
                                <TouchableOpacity
                                  style={[
                                    styles.cell,
                                    styles.cellW2,
                                    {
                                      alignItems: "center",
                                    },
                                  ]}
                                  onPress={() => {
                                    navigation.navigate(
                                      SCREENS.TUITION_BILL_DETAIL,
                                      {
                                        billId: item.billId,
                                      }
                                    );
                                  }}
                                >
                                  <Image style={styles.into} source={into} />
                                </TouchableOpacity>
                              );
                            default:
                              return (
                                <Text
                                  style={[
                                    styles.cell,
                                    styles.cellW2,
                                    {
                                      textAlign: "center",
                                    },
                                  ]}
                                >
                                  {item[field.key]}
                                </Text>
                              );
                          }
                        })()}
                      </View>
                    )
                  )}
                </View>
              </View>
            </React.Fragment>
          ))
        ) : (
          <Text
            style={{
              textAlign: "center",
            }}
          >
            Không có dữ liệu...
          </Text>
        )}
      </ScrollView>
    </View>
  );
};
export default TuitionBillScreen;
