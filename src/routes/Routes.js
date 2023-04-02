import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREENS } from "../constants";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeLayout } from "../layout";
import {
  ScoreScreen,
  LoginScreen,
  ClassScheduleScreen,
  TuitionBillScreen,
} from "../screens";
import reload from '../../assets/reload.png'
import { Image } from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const routes = [
  {
    name: SCREENS.HOME,
    component: HomeLayout,
    options: {
      headerShown: false,
    },
  },
  {
    name: SCREENS.LOGIN,
    component: LoginScreen,
  },
  {
    name: SCREENS.SCORE,
    component: ScoreScreen,
  },
  {
    name: SCREENS.CLASS_SCHEDULE,
    component: ClassScheduleScreen,
    options: {
      headerShown: true,
      title: "Lịch học",
    },
  },
  {
    name: SCREENS.TUITION_BILL,
    component: TuitionBillScreen,
    options: {
      headerShown: true,
    },
  },
];

const Routes = () => {
  return (
    <>
      <Stack.Navigator>
        {routes.map((route, index) => (
          <Stack.Screen
            key={index}
            name={route.name}
            component={route.component}
            options={{
              headerRight: () => (
                <Image style={{
                  width: 20,
                  height: 20,
                }} source={reload} />
              ),
              presentation: 'modal',
              animationTypeForReplace: 'push',
              animation: 'slide_from_right',
              ...(route.options || {})
            }}

          />
        ))}
      </Stack.Navigator>
    </>
  );
};

export default Routes;
