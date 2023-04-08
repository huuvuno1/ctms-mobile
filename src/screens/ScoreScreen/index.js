import { SCREENS } from "../../constants";
import { TouchableOpacity, Text, View, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { ctmsService } from "../../services";
import styles from "./styles";
import { Col, Row, Rows, Table, TableWrapper } from "react-native-table-component";

const ScoreScreen = ({ navigation }) => {
  const [state, setState] = useState({
    tableHead: ['Head', 'Head2', 'Head3', 'Head4', 'Head5', 'Head6', 'Head7', 'Head8', 'Head9'],
    widthArr: [40, 60, 80, 100, 120, 140, 160, 180, 200]
  })

  const goToHome = () => {
    navigation.navigate(SCREENS.HOME);
  };

  const tableData = [];
  for (let i = 0; i < 30; i += 1) {
    const rowData = [];
    for (let j = 0; j < 9; j += 1) {
      rowData.push(`${i}${j}`);
    }
    tableData.push(rowData);
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
            <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text} />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
              {
                tableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={state.widthArr}
                    style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                    textStyle={styles.text}
                  />
                ))
              }
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};
export default ScoreScreen;
