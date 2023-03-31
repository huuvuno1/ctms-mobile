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
    options: {
      headerShown: false,
    }
  },
  {
    name: SCREENS.SCORE,
    component: ScoreScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: SCREENS.CLASS_SCHEDULE,
    component: ClassScheduleScreen,
    options: {
      headerShown: true,
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
            options={route.options || {}}
          />
        ))}
      </Stack.Navigator>
    </>
  );
};

export default Routes;
