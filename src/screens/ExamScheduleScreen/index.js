import { Text, ScrollView, View, Image } from "react-native";
import { useEffect, useState } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import dateFormat from "dateformat";
import styles from "./styles";
import { ctmsService } from "../../services";
import picker from "../../../assets/picker.png";
import prev from "../../../assets/prev.png";
import next from "../../../assets/next.png";
import morning from "../../../assets/morning.png";
import afternoon from "../../../assets/afternoon.png";
import evening from "../../../assets/evening.png";
import teacher from "../../../assets/teacher.png";
import room from "../../../assets/room.png";
import status from "../../../assets/status.png";
import unique from "../../../assets/unique.png";
import lab from "../../../assets/lab.jpg"
import schedule from "../../../assets/schedule.png"
import { TouchableOpacity } from "react-native";
import { DatePicker } from "../../components";

const ExamScheduleScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

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
      <ScrollView style={styles.wrapSchedule}>
        {data.map((item, index) => (
          <View
            key={index}
            style={{
              backgroundColor: '#fff',
              padding: 10,
              marginBottom:20,
              borderRadius: 10,
            }}
          >
            <Image source={lab} style= {styles.examClass} />
            <Text style={styles.scheduleName}>{item.subjectName}</Text>
            <View style= {styles.row}>
                <Image source={schedule} style= {styles.subjectIcon}></Image>
                <Text style= {styles.schedule}>{item.examTime}</Text>
            </View>
            <View style= {styles.row}>
                <Image source={room} style= {styles.subjectIcon}></Image>
                <Text style= {styles.schedule}>{item.room}</Text>
            </View>
            <View style= {styles.row}>
                <Image source={unique} style ={styles.subjectIcon}></Image>
                <Text style= {styles.schedule}>{item.subjectId}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default ExamScheduleScreen;
