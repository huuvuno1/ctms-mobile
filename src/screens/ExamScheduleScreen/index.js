import { Text, ScrollView, View, Image } from "react-native";
import { useEffect, useState } from "react";
import styles from "./styles";
import { ctmsService } from "../../services";
import room from "../../../assets/room.png";
import unique from "../../../assets/unique.png";
import lab from "../../../assets/lab.jpg"
import schedule from "../../../assets/schedule.png"

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
              marginBottom: 20,
              borderRadius: 10,

            }}
          >
            <View>
              <View style={{
                padding: 10,
                width: 150,
                borderTopRightRadius: 7,
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 10,
                ...(item.status === 'Sắp thi' ? {
                  backgroundColor: 'red',
                } : {
                  backgroundColor: 'green'
                })
              }}>
                <Text style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: 18
                }}>{item.status}</Text>
              </View>
              <Image source={lab} style={styles.examClass} />
            </View>
            <Text style={styles.scheduleName}>{item.subjectName}</Text>
            <View style={styles.row}>
              <Image source={schedule} style={styles.subjectIcon}></Image>
              <Text style={styles.schedule}>{item.examTime}</Text>
            </View>
            <View style={styles.row}>
              <Image source={room} style={styles.subjectIcon}></Image>
              <Text style={styles.schedule}>{item.room}</Text>
            </View>
            <View style={styles.row}>
              <Image source={unique} style={styles.subjectIcon}></Image>
              <Text style={styles.schedule}>{item.subjectId}</Text>
            </View>


          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default ExamScheduleScreen;
