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


function getScore_5(score_3) {
  if (score_3 >= 8.5) {
    return 4;
  } else if (score_3 >= 8) {
    return 3.5;
  } else if (score_3 >= 7) {
    return 3.0;
  } else if (score_3 >= 6.5) {
    return 2.5;
  } else if (score_3 >= 5.5) {
    return 2.0;
  } else if (score_3 >= 5) {
    return 1.5;
  } else if (score_3 >= 4) {
    return 1.0;
  } else {
    return 0;
  }
}

function ignoreSubjectFail(subjects, subject) {
  const list = subjects.filter(item => subject.subjectName === item.subjectName)

  if (list.length >= 2) {
    const subjectMax = list.reduce((prev, curr) => {

      const score_3_curr = curr.score_3.split(' |')[0]
      const score_3_prev = prev.score_3.split(' |')[0]
      const score_10_current = (+curr.score_1 * 0.1 + +curr.score_2 * 0.2 + +score_3_curr * 0.7);
      const score_10_prev = (+prev.score_1 * 0.1 + +prev.score_2 * 0.2 + +score_3_prev * 0.7);

      if (score_10_current > score_10_prev) {
        return curr;
      }

      return prev;
    }, list[0])

    return subject.className !== subjectMax.className

  }
  return false;
}

function ignoreSubject(subject) {
  if (subject.score_1 === '' || subject.score_2 === '' || subject.score_3 === '' || subject.score_3.includes('?')) {
    return true;
  }

  const list = [
    "Kiến tập doanh nghiệp",
    "Thực hành",
    "Giáo dục",
    "Sinh hoạt",
    "Đầu vào Chuyên ngành Công nghệ Phần mềm",
  ];

  if (list.find(item => subject.subjectName.includes(item))) {
    return true;
  }

  return false;
}

const ScoreScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [overview, setOverview] = useState({})
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
        "Điểm hệ 10",
        "Điểm hệ 4"
      ],
      widthArr: [200, 100, 150, 180, 140, 100, 100, 100, 100],
    }),
    []
  );

  const tableData = useMemo(() => {
    const result = [];
    let credit = 0;
    let sum10 = 0;
    let sum4 = 0;
    data?.forEach((item) => {
      const score_3 = item.score_3.split(' |')[0]
      const score_4 = (+item.score_1 * 0.1 + +item.score_2 * 0.2 + +score_3 * 0.7);
      const rowData = [];
      rowData.push(item.subjectName);
      rowData.push(item.credit);
      rowData.push(item.className);
      rowData.push(item.teacher);
      rowData.push(item.score_1);
      rowData.push(item.score_2);
      rowData.push(score_3);
      if (!ignoreSubject(item) && !ignoreSubjectFail(data, item)) {
        rowData.push(score_4.toFixed(2))
        rowData.push(getScore_5(score_4))

        sum10 += +(score_4.toFixed(2)) * +item.credit
        sum4 += getScore_5(score_4) * +item.credit
        credit += +item.credit
      }
      result.push(rowData);
    });

    console.log(sum4 / credit)

    if (data?.length) {
      setOverview({
        credit,
        score_10: (sum10 / credit).toFixed(2),

      })
    }

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
      {
        true && (<View style={styles.summaryWrapper}>
          <View style={[styles.summaryItem, styles.mr7]}>
            <View style={styles.summaryLeftItem}>
              <Text style={styles.summaryLabel}>Điểm TB hệ 10</Text>
              <Text style={styles.summaryValue}>{overview.score_10 || ''}</Text>
            </View>
            <View>
              <Image source={summaryScore} style={styles.summaryIcon} />
            </View>
          </View>
          <View style={[styles.summaryItem, styles.ml7]}>
            <View style={styles.summaryLeftItem}>
              <Text style={styles.summaryLabel}>Tín chỉ tích lũy</Text>
              <Text style={styles.summaryValue}>{overview.credit || ''}</Text>
            </View>
            <View>
              <Image source={sum} style={styles.summaryIcon} />
            </View>
          </View>
        </View>)
      }
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
    </View>
  );
};
export default ScoreScreen;
