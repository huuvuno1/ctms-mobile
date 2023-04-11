import { SCREENS } from "../../constants";
import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { useEffect, useMemo, useState } from "react";
import { ctmsService } from "../../services";
import summaryScore from "../../../assets/summaryScore.png";
import sum from "../../../assets/sum.png";
import styles from "./styles";
import {
  Col,
  Row,
  Rows,
  Table,
  TableWrapper,
} from "react-native-table-component";

const CreditScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const state = useMemo(
    () => ({
      tableHead: [
        "Tên lớp",
        "Môn - Giảng viên",
        "Tối thiểu",
        "Tối đa",
        "Đã đăng ký",
        "Hạn đăng ký",
        "Lịch học dự kiến",
      ],
      widthArr: [200, 200, 150, 180, 140, 100, 100],
    }),
    []
  );

  const tableDataCanRegister = useMemo(() => {
    const result = [];
    data?.canRegister?.forEach((item) => {
      const rowData = [];
      rowData.push(item.className);
      rowData.push(item.teacher);
      rowData.push(item.minStudent);
      rowData.push(item.maxStudent);
      rowData.push(item.registered);
      rowData.push(item.registrationDeadline);
      rowData.push(item.plan);
      result.push(rowData);
    });
    return result;
  }, [data]);

  const tableDataRegisted = useMemo(() => {
    const result = [];
    data?.registered?.forEach((item) => {
      const rowData = [];
      rowData.push(item.className);
      rowData.push(item.teacher);
      rowData.push(item.minStudent);
      rowData.push(item.maxStudent);
      rowData.push(item.registered);
      rowData.push(item.registrationDeadline);
      rowData.push(item.plan);
      result.push(rowData);
    });
    return result;
  }, [data]);

  useEffect(() => {
    (async () => {
      const result = await ctmsService.getCredits();
      setData(result);
      setLoading(false);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          maxHeight: Dimensions.get("window").height / 2,
        }}
      >
        <Text style={styles.labelCredit}>Lớp có thể đăng ký</Text>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
              <Row
                data={state.tableHead}
                widthArr={state.widthArr}
                style={styles.header}
                textStyle={{ ...styles.text, ...styles.headerText }}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{ borderWidth: 1, borderColor: "#7EC8E3" }}>
                {!loading ? (
                  tableDataCanRegister.length > 0 ? (
                    tableDataCanRegister.map((rowData, index) => (
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
                      Không có lớp nào có thể đăng ký...
                    </Text>
                  )
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
      </View>

      <View style={{ flex: 5, marginTop: 30 }}>
        <Text style={styles.labelCredit}>Lớp đã đăng ký</Text>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
              <Row
                data={state.tableHead}
                widthArr={state.widthArr}
                style={styles.header}
                textStyle={{ ...styles.text, ...styles.headerText }}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{ borderWidth: 1, borderColor: "#7EC8E3" }}>
                {!loading ? (
                  tableDataRegisted.length > 0 ? (
                    tableDataRegisted.map((rowData, index) => (
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
                      Không có lớp nào đã đăng ký...
                    </Text>
                  )
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
      </View>
    </View>
  );
};
export default CreditScreen;
