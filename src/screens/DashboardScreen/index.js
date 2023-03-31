import { useEffect, useState } from "react";
import { Button, Image, ImageBackground, ScrollView, Text, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SecureStore from 'expo-secure-store';
import { SCREENS, SECURE_STORE } from "../../constants";
import styles from "./styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import BlueBg from '../../../assets/blue.jpg'
import QC from '../../../assets/qc.jpg'
import schedule from '../../../assets/schedule.png'
import exam from '../../../assets/exam.png'
import credit from '../../../assets/credit.png'
import score from '../../../assets/score.png'
import bill from '../../../assets/bill.png'
import post from '../../../assets/post.png'
import { ctmsService } from "../../services";

const Tab = createBottomTabNavigator();

const DashboardScreen = ({ navigation }) => {
  const [name, setName] = useState()

  useEffect(() => {
    (async () => {
      const value = await SecureStore.getItemAsync(SECURE_STORE.LOGIN_INFO)
      if (!value) {
        navigation.replace(SCREENS.LOGIN)
      }

      const data = await ctmsService.getInfo()
      setName(data.name)
    })()
  }, [])

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.title}>
        <View>
          <Text style={styles.titleLabel}>Xin chào</Text>
          <Text style={styles.titleValue}>{name}</Text>
        </View>
        <View>
          <Icon name="person" size={35} color={'#0047AB'} />
        </View>
      </View>
      <View style={styles.scheduleWrapper}>
        <ImageBackground source={QC} style={styles.imgBg} >
          <View style={styles.wrapperQc}>
            <Text style={styles.qcTitle}>Đã ra mắt:</Text>
            <Text style={styles.qcName}>FITHOU BOT</Text>
            <Text style={styles.qcName}>Sử dụng ngay trên nền tảng Messenger</Text>
          </View>
          <View style={styles.wrapperBtnQc}>
            <Text style={styles.btnQc}>Quan tâm</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.scheduleWrapper}>
        <ImageBackground source={BlueBg} style={styles.imgBg} >
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
          <View style={styles.wrapperItem}>
            <Image style={styles.imageItem} source={schedule} />
            <Text style={styles.textItem}>Lịch học</Text>
          </View>
          <View style={styles.wrapperItem}>
            <Image style={styles.imageItem} source={exam} />
            <Text style={styles.textItem}>Lịch thi</Text>
          </View>
          <View style={styles.wrapperItem}>
            <Image style={styles.imageItem} source={credit} />
            <Text style={styles.textItem}>Tín chỉ</Text>
          </View>
          <View style={styles.wrapperItem}>
            <Image style={styles.imageItem} source={score} />
            <Text style={styles.textItem}>Điểm số</Text>
          </View>
          <View style={styles.wrapperItem}>
            <Image style={styles.imageItem} source={bill} />
            <Text style={styles.textItem}>Học phí</Text>
          </View>
        </View>
      </View>

      <View style={{
        paddingBottom: 100
      }}>
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
