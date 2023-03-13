import { useEffect } from "react";
import { Button, Image, Text, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SecureStore from 'expo-secure-store';
import { SCREENS, SECURE_STORE } from "../../constants";
import styles from "./styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import CardBg from '../../../assets/card_bg.svg'

const Tab = createBottomTabNavigator();

const DashboardScreen = ({ navigation }) => {
  useEffect(() => {
    (async () => {
      const value = await SecureStore.getItemAsync(SECURE_STORE.LOGIN_INFO)
      if (!value) {
        navigation.replace(SCREENS.LOGIN)
      }
    })()
  }, [])

  return (
    <View style={styles.wrapper}>
      <View style={styles.title}>
        <View>
          <Text style={styles.titleLabel}>Xin chào</Text>
          <Text style={styles.titleValue}>nguyenhuuvuno1@gmail.com</Text>
        </View>
        <View>
          <Icon name="person" size={35} color={'#0047AB'} />
        </View>
      </View>
      <View style={styles.scheduleWrapper}>
        <Image source={CardBg} style={styles.imgBg} />
        <View style={styles.title}>
          <Text>Lịch học gần nhất</Text>

        </View>
      </View>
    </View>
  );
};
export default DashboardScreen;
