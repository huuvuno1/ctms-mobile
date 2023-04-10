import { Text, View, ScrollView } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { ctmsService } from "../../services";
import styles from "./styles";
import { Row, Table } from "react-native-table-component";

const TuitionBillDetailScreen = ({ navigation, route }) => {
  const { billId } = route.params;
  const [data, setData] = useState({});

  const state = useMemo(
    () => ({
      tableHead: [
        "STT",
        "Lớp",
        "Môn học",
        "Số tín chỉ",
        "Đơn giá",
        "Số tiền (vnđ)",
      ],
      widthArr: [60, 150, 150, 120, 140, 100],
    }),
    []
  );

  const tableData = useMemo(() => {
    const result = [];
    data?.subjects?.forEach((item, index) => {
      const rowData = [];
      rowData.push(index + 1);
      rowData.push(item.className);
      rowData.push(item.subjectName);
      rowData.push(item.credit);
      rowData.push(item.unitPrice);
      rowData.push(item.amount);
      result.push(rowData);
    });
    return result;
  }, [data]);

  useEffect(() => {
    (async () => {
      const result = await ctmsService.getTuitionBillDetail(billId);
      setData(result);
    })();
  }, [billId]);

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.wrapSchedule}>
        <View style={styles.datePicker}>
          <Text style={styles.dateLabel}>Mã phiếu</Text>
          <Text style={styles.dateValue}>{billId}</Text>
        </View>
        <View style={styles.datePicker}>
          <Text style={styles.dateLabel}>Thời gian lập</Text>
          <Text style={styles.dateValue}>{data.createdAt}</Text>
        </View>
        <View style={styles.datePicker}>
          <Text style={styles.dateLabel}>Ngày thu tiền</Text>
          <Text style={styles.dateValue}>
            {data.updatedAt || "Chưa có dữ liệu"}
          </Text>
        </View>

        <ScrollView horizontal={true}>
          <View
            style={{
              maxHeight: 400,
              marginBottom: 20,
            }}
          >
            <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
              <Row
                data={state.tableHead}
                widthArr={state.widthArr}
                style={styles.header}
                textStyle={{
                  ...styles.text,
                  ...styles.headerText,
                }}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{ borderWidth: 1, borderColor: "#7EC8E3" }}>
                {tableData.length > 0 ? (
                  tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={{
                        ...styles.row,
                        ...(index % 2 ? { backgroundColor: "#A9DFBF" } : {}),
                      }}
                      textStyle={{ ...styles.text, ...styles.rowText }}
                    />
                  ))
                ) : (
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 16,
                      padding: 10,
                    }}
                  >
                    Đang tải dữ liệu...
                  </Text>
                )}
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
        <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: "#7EC8E3" }}>
            <Row
              style={{
                ...styles.header,
                ...{
                  backgroundColor: "#D35400",
                },
              }}
              textStyle={{
                ...styles.text,
                ...styles.headerText,
              }}
              data={["Tổng tiền", "Giảm trừ", "Đã thanh toán", "Còn phải nộp"]}
            ></Row>
            <Row
              data={[data?.totalMoney, data?.reduce, data?.paid, data?.debt]}
              style={{
                ...styles.row,
                ...{
                  backgroundColor: "#FDEBD0",
                },
              }}
              textStyle={{ ...styles.text, ...styles.rowText }}
            ></Row>
          </Table>
        </View>
      </ScrollView>
    </View>
  );
};
export default TuitionBillDetailScreen;
