import { useEffect } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SecureStore from 'expo-secure-store';
import { SCREENS, SECURE_STORE } from "../../constants";
import { DashboardScreen, NotificationScreen, SettingScreen } from "../../screens";
import Icon from "react-native-vector-icons/MaterialIcons";

const Tab = createBottomTabNavigator();

const HomeLayout = ({ navigation }) => {
  useEffect(() => {
    (async () => {
      const value = await SecureStore.getItemAsync(SECURE_STORE.LOGIN_INFO)
      if (!value) {
        navigation.replace(SCREENS.LOGIN)
      }
    })()
  }, [])

  return (
    <Tab.Navigator>
      <Tab.Screen name={SCREENS.DASHBOARD} component={DashboardScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (<Icon name="home" color={color} size={size} />),
          tabBarShowLabel: false
        }} />
      <Tab.Screen name={SCREENS.NOTIFICATION} component={NotificationScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (<Icon name="notifications" color={color} size={size} />),
          tabBarShowLabel: false
        }} />
      <Tab.Screen name={SCREENS.SETTING} component={SettingScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (<Icon name="settings" color={color} size={size} />),
          tabBarShowLabel: false
        }} />
    </Tab.Navigator>
  );
};
export default HomeLayout;
