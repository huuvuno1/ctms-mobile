import { ScrollView, Text, View } from "react-native";
import styles from "./styles";
import { useCallback, useEffect, useState } from "react";
import { SCREENS } from "../../constants";
import { ctmsService } from "../../services";

const UserDetailScreen = ({ navigation }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      const result = await ctmsService.getInfo();
      console.log(result);
      setData(result);
    })();
  }, []);

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.wrapSchedule}>
        <View>
          <View style={styles.datePicker}>
            <Text style={styles.dateLabel}>Mã sinh viên</Text>
            <Text style={styles.dateValue}>{data.id}</Text>
          </View>
          <View style={styles.datePicker}>
            <Text style={styles.dateLabel}>Họ tên</Text>
            <Text style={styles.dateValue}>{data.name}</Text>
          </View>
          <View style={styles.datePicker}>
            <Text style={styles.dateLabel}>Ngày sinh</Text>
            <Text style={styles.dateValue}>{data.birthday}</Text>
          </View>
          <View style={styles.datePicker}>
            <Text style={styles.dateLabel}>Hình thức đào tạo</Text>
            <Text style={styles.dateValue}>{data.formTraining}</Text>
          </View>
          <View style={styles.datePicker}>
            <Text style={styles.dateLabel}>Khoa</Text>
            <Text style={styles.dateValue}>{data.department}</Text>
          </View>
          <View style={styles.datePicker}>
            <Text style={styles.dateLabel}>Ngành</Text>
            <Text style={styles.dateValue}>{data.major}</Text>
          </View>
          <View style={styles.datePicker}>
            <Text style={styles.dateLabel}>Khóa học</Text>
            <Text style={styles.dateValue}>{data.courses}</Text>
          </View>
          <View style={styles.datePicker}>
            <Text style={styles.dateLabel}>Lớp hành chính</Text>
            <Text style={styles.dateValue}>{data.className}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default UserDetailScreen;
