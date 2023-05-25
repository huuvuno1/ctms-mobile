import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREENS } from "../constants";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeLayout } from "../layout";
import {
  ScoreScreen,
  LoginScreen,
  ClassScheduleScreen,
  TuitionBillScreen,
  TuitionBillDetailScreen,
  CreditScreen,
  FithouArticlesScreen,
  UserDetailScreen,
  ChangePasswordScreen,
  ExamScheduleScreen
} from "../screens";
import reload from "../../assets/reload.png";
import { Image } from "react-native";
import WebView from "react-native-webview";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MyWebComponent = ({ route }) => {
  const { url } = route.params;
  return <WebView source={{ uri: url }} style={{ flex: 1 }} />;
}

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
    },
  },
  {
    name: SCREENS.SCORE,
    component: ScoreScreen,
    options: {
      title: "Kết quả học tập",
    },
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
      title: "Học phí",
    },
  },
  {
    name: SCREENS.FITHOU_ARTICLES,
    component: FithouArticlesScreen,
    options: {
      headerShown: true,
      title: "Fithou Articles",
    },
  },
  {
    name: SCREENS.TUITION_BILL_DETAIL,
    component: TuitionBillDetailScreen,
    options: {
      headerShown: true,
      title: "Chi tiết hóa đơn",
    },
  },
  {
    name: SCREENS.CREDIT,
    component: CreditScreen,
    options: {
      headerShown: true,
      title: "Tín chỉ",
    },
  },
  {
    name: SCREENS.USER_DETAIL,
    component: UserDetailScreen,
    options: {
      headerShown: true,
      title: "Thông tin tài khoản",
    },
  },
  {
    name: SCREENS.CHANGE_PASSWORD,
    component: ChangePasswordScreen,
    options: {
      headerShown: true,
      title: "Đổi mật khẩu",
    },
  },
  {
    name: SCREENS.EXAM_SCHEDULE,
    component: ExamScheduleScreen,
    options: {
      title: 'Lịch thi',
    },
  },
  {
    name: "webview",
    component: MyWebComponent,
    options: {
      title: 'Thông báo từ Fithou',
    },
  }
];

console.log("routes", routes);

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
              // headerRight: () => (
              //   <Image
              //     style={{
              //       width: 20,
              //       height: 20,
              //     }}
              //     source={reload}
              //   />
              // ),
              animationTypeForReplace: "push",
              animation: "slide_from_right",
              ...(route.options || {}),
            }}
          />
        ))}
      </Stack.Navigator>
    </>
  );
};

export default Routes;
