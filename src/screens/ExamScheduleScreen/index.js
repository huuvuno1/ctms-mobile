import { SCREENS } from "../../constants";
import { TextInput, Text, ScrollView, View } from "react-native";
import { useEffect, useState } from "react";
import { ctmsService } from "../../services";
import styles from "./styles";
const randomColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

const ExamScheduleScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const goToHome = () => {
    navigation.navigate(SCREENS.HOME);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await ctmsService.getExamSchedule();
      console.log("data", data);
      setData(data);
    };
    getData();
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.navigate}>
        <View style={styles.datePicker}></View>
        <View style={styles.nextWeek}>
          <Text>{"<<"}</Text>
        </View>
        <View style={styles.nextWeek}>
          <Text>{">>"}</Text>
        </View>
      </View>
      <ScrollView style={styles.wrapSchedule}>
        {data.reverse().map((item, index) => (
          <View>
              <Text style={styles.scheduleDay}>{item.date}</Text>
              <View style={styles.card}>
                <View style={styles.leftCard}>
                  <Text>{item.time}</Text>
                </View>
                <View style={styles.rightCard}>
                  <View
                    style={{
                      ...styles.schedule,
                      backgroundColor: randomColor(),
                    }}
                  >
                    <Text style={styles.subjectName}>{item.subjectName}</Text>
                    <Text>Phòng: {item.room}</Text>
                    <Text>Mã DS thi: {item.subjectId}</Text>
                  </View>
                </View>
              </View>
           
          </View>
        ))}
      </ScrollView>
    </View>
      
  );
};
export default ExamScheduleScreen;
