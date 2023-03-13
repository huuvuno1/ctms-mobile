import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREENS } from "../constants";
import { ScoreScreen, HomeScreen, LoginScreen } from "../screens";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
    showBottomNavigation: false
  },
  {
    name: SCREENS.SCORE,
    component: ScoreScreen,
    options: {
      headerShown: false,
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
