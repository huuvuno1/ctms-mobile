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
import { TouchableOpacity } from "react-native";

const ClassScheduleScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [startDay, setStartDay] = useState(new Date());
  const [displayDatePicker, setDisplayDatePicker] = useState(false);

  const handleStartDateChange = (e, date) => {
    setDisplayDatePicker(false);
    setStartDay(date);
  };

  const handleShiftWeek = (type) => {
    let day = new Date(startDay);
    if (type === "prev") {
      day.setDate(day.getDate() - 7);
    } else {
      day.setDate(day.getDate() + 7);
    }
    setStartDay(day);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await ctmsService.getClassSchedule(startDay, false);
      setData(data);
    };
    getData();
  }, [startDay]);

  useEffect(() => {
    const getData = async () => {
      const data = await ctmsService.getClassSchedule();
      console.log("data", data);
      setData(data);
    };
    getData();
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.navigate}>
        <TouchableOpacity
          style={styles.datePicker}
          onPress={() => setDisplayDatePicker(true)}
        >
          <Text style={styles.dateLabel}>Tuần từ</Text>
          <Text style={styles.dateValue}>
            {dateFormat(startDay, "dd / mm / yyyy")}
          </Text>
          {displayDatePicker && (
            <RNDateTimePicker
              value={startDay || new Date()}
              onChange={handleStartDateChange}
            />
          )}
          <Image style={styles.imageItem} source={picker} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextWeek}
          onPress={() => handleShiftWeek("prev")}
        >
          <Image style={styles.btnNav} source={prev} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextWeek}
          onPress={() => handleShiftWeek("next")}
        >
          <Image style={styles.btnNav} source={next} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.wrapSchedule}>
        {data.map((item, index) => (
          <View
            key={index}
            style={{
              marginBottom: 10,
            }}
          >
            <Text style={styles.scheduleDay}>{item.day}</Text>
            {item.classes.map((data, index2) => (
              <View style={styles.card} key={index2}>
                <View style={styles.leftCard}>
                  <View
                    style={{
                      ...styles.schedule,
                      paddingHorizontal: 15,
                      paddingTop: 15,
                    }}
                  >
                    <Text style={styles.subjectName}>{data.name}</Text>
                    <View style={styles.teacher}>
                      <Image source={room} style={styles.subjectIcon} />
                      <Text style={styles.bold}>Phòng {data.room}</Text>
                    </View>
                    <View style={styles.teacher}>
                      <Image source={teacher} style={styles.subjectIcon} />
                      <Text style={styles.bold}>{data.teacher}</Text>
                    </View>
                    <View style={styles.teacher}>
                      <Image source={unique} style={styles.subjectIcon} />
                      <Text style={styles.bold}>{data.classId}</Text>
                    </View>
                    <View style={styles.teacher}>
                      <Image source={status} style={styles.subjectIcon} />
                      <Text
                        style={{
                          ...styles.bold,
                          color: data.status === "Học" ? "#008000" : "red",
                        }}
                      >
                        {data.status}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.rightCard}>
                  <Text>{data.time.split("->")[0]}</Text>
                  <Image
                    source={
                      data.time.startsWith("07")
                        ? morning
                        : data.time.startsWith("13")
                        ? afternoon
                        : evening
                    }
                    style={{
                      width: 30,
                      height: 30,
                      marginVertical: 7,
                    }}
                  />
                  <Text>{data.time.split("->")[1]}</Text>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default ClassScheduleScreen;
