import { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as SecureStore from "expo-secure-store";
import { SCREENS, SECURE_STORE } from "../../constants";
import styles from "./styles";
import BlueBg from "../../../assets/blue.jpg";
import QC from "../../../assets/qc.jpg";
import schedule from "../../../assets/schedule.png";
import exam from "../../../assets/exam.png";
import credit from "../../../assets/credit.png";
import score from "../../../assets/score.png";
import bill from "../../../assets/bill.png";
import post from "../../../assets/post.png";
import reload from "../../../assets/reload.png";
import { ctmsService } from "../../services";
import { KEY, repository } from "../../repository";

const Tab = createBottomTabNavigator();

const DashboardScreen = ({ navigation }) => {
  const [name, setName] = useState();
  const [subject, setSubject] = useState();

  useEffect(() => {
    (async () => {
      const value = await SecureStore.getItemAsync(SECURE_STORE.LOGIN_INFO);
      if (!value) {
        navigation.replace(SCREENS.LOGIN);
      }

      let user = await repository.getData(KEY.USER_INFO);
      // console.log("data", user);
      if (!user || !user.name) {
        user = await ctmsService.getInfo();
      }
      setName(user.name);

      let subjects = await repository.getData(SCREENS.CLASS_SCHEDULE);
      if (!subjects) {
        subjects = await ctmsService.getClassSchedule();
      }

      setSubject(subjects[0]);
    })();
  }, []);

  const goToScreen = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.title}>
        <View>
          <Text style={styles.titleLabel}>Xin chào</Text>
          <Text style={styles.titleValue}>{name}</Text>
        </View>
        <View>
          <Image style={styles.reload} source={reload} />
        </View>
      </View>
      <View style={styles.scheduleWrapper}>
        <ImageBackground source={QC} style={styles.imgBg}>
          <View style={styles.wrapperQc}>
            <Text style={styles.qcTitle}>Đã ra mắt:</Text>
            <Text style={styles.qcName}>FITHOU BOT</Text>
            <Text
              style={[
                styles.qcName,
                {
                  fontWeight: "normal",
                },
              ]}
            >
              Sử dụng ngay trên nền tảng Messenger
            </Text>
          </View>
          <TouchableOpacity
            style={styles.wrapperBtnQc}
            onPress={() => Linking.openURL("https://facebook.com/fithoutool")}
          >
            <Text style={styles.btnQc}>Chiến luôn</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View style={styles.scheduleWrapper}>
        <ImageBackground source={BlueBg} style={styles.imgBg}>
          <View style={styles.wrapperQc}>
            <Text style={styles.qcTitle}>Lịch học gần nhất của bạn</Text>
            <Text style={styles.subject}>Nhập môn công nghệ phần mềm</Text>
            <Text style={styles.qcName}>Phòng: 20</Text>
            <Text style={styles.qcName}>Giảng viên: Nguyễn Đức Tuấn</Text>
            <Text style={styles.qcName}>Giờ: 07:30 - 15:15</Text>
            <Text style={styles.qcName}>Ngày: 20/01/2023</Text>
          </View>
        </ImageBackground>
      </View>

      <View>
        <Text style={styles.titleValue}>Dịch vụ CTMS</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.wrapperItem}
            onPress={() => goToScreen(SCREENS.CLASS_SCHEDULE)}
          >
            <Image style={styles.imageItem} source={schedule} />
            <Text style={styles.textItem}>Lịch học</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.wrapperItem}
            onPress={() => goToScreen(SCREENS.EXAM_SCHEDULE)}
          >
            <Image style={styles.imageItem} source={exam} />
            <Text style={styles.textItem}>Lịch thi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.wrapperItem}
            onPress={() => goToScreen(SCREENS.CREDIT)}
          >
            <Image style={styles.imageItem} source={credit} />
            <Text style={styles.textItem}>Tín chỉ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.wrapperItem}
            onPress={() => goToScreen(SCREENS.SCORE)}
          >
            <Image style={styles.imageItem} source={score} />
            <Text style={styles.textItem}>Điểm số</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.wrapperItem}
            onPress={() => goToScreen(SCREENS.TUITION_BILL)}
          >
            <Image style={styles.imageItem} source={bill} />
            <Text style={styles.textItem}>Học phí</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          paddingBottom: 100,
        }}
      >
        <Text style={styles.titleValue2}>Dịch vụ FITHOU</Text>
        <View style={styles.row}>
          <View style={styles.wrapperItem}>
            <Image style={styles.imageItem} source={post} />
            <Text style={styles.textItem}>Bài viết</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default DashboardScreen;
