import { SCREENS } from "../../constants";
import { TouchableOpacity, Text, View, ScrollView, Image } from "react-native";
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

const ScoreScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const state = useMemo(
    () => ({
      tableHead: [
        "Môn học",
        "Số tín chỉ",
        "Lớp",
        "Giảng viên",
        "Điểm chuyên cần",
        "Điểm giữa kỳ",
        "Điểm cuối kỳ",
      ],
      widthArr: [200, 100, 150, 180, 140, 100, 100],
    }),
    []
  );

  const tableData = useMemo(() => {
    const result = [];
    data?.forEach((item) => {
      const rowData = [];
      rowData.push(item.subjectName);
      rowData.push(item.credit);
      rowData.push(item.className);
      rowData.push(item.teacher);
      rowData.push(item.score_1);
      rowData.push(item.score_2);
      rowData.push(item.score_3);
      result.push(rowData);
    });
    return result;
  }, [data]);

  useEffect(() => {
    (async () => {
      const result = await ctmsService.getScore();
      console.log("result", result);
      setData(result);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.summaryWrapper}>
        <View style={[styles.summaryItem, styles.mr7]}>
          <View style={styles.summaryLeftItem}>
            <Text style={styles.summaryLabel}>Điểm TB hệ 10</Text>
            <Text style={styles.summaryValue}>7.45</Text>
          </View>
          <View>
            <Image source={summaryScore} style={styles.summaryIcon} />
          </View>
        </View>
        <View style={[styles.summaryItem, styles.ml7]}>
          <View style={styles.summaryLeftItem}>
            <Text style={styles.summaryLabel}>Tín chỉ tích lũy</Text>
            <Text style={styles.summaryValue}>100</Text>
          </View>
          <View>
            <Image source={sum} style={styles.summaryIcon} />
          </View>
        </View>
      </View>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
            <Row
              data={state.tableHead}
              widthArr={state.widthArr}
              style={styles.header}
              textStyle={[styles.text, styles.headerText]}
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
                    style={[
                      styles.row,
                      index % 2 && { backgroundColor: "#A9DFBF" },
                    ]}
                    textStyle={[styles.text, styles.rowText]}
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
    </View>
  );
};
export default ScoreScreen;
