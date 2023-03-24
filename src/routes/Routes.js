import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREENS } from "../constants";
import {
  ScoreScreen,
  HomeScreen,
  LoginScreen,
  ClassScheduleScreen,
} from "../screens";

const Stack = createNativeStackNavigator();

const routes = [
  {
    name: SCREENS.HOME,
    component: HomeScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: SCREENS.LOGIN,
    component: LoginScreen,
    options: {
      headerShown: false,
    },
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
];

const Routes = () => {
  return (
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
  );
};

export default Routes;
