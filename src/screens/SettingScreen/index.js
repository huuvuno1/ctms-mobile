import { ListItem, Avatar } from "react-native-elements";
import { Text, View } from "react-native";
import styles from "./styles";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SCREENS, SECURE_STORE } from "../../constants";
import user from "../../../assets/user.png";
import password from "../../../assets/password.png";
import policy from "../../../assets/policy.png";
import logout from "../../../assets/logout.png";
import { ctmsService } from "../../services";
import * as SecureStore from "expo-secure-store";

const SettingScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({});
  const items = useMemo(
    () => [
      {
        title: userInfo?.name,
        icon: user,
        subtitle: userInfo?.email,
        chevron: true,
        onPress: () => {
          navigation.navigate(SCREENS.USER_DETAIL);
        },
      },
      {
        title: "Đổi mật khẩu",
        icon: password,
        chevron: true,
        onPress: () => {
          navigation.navigate(SCREENS.CHANGE_PASSWORD);
        },
      },
      {
        title: "Điều khoản và dịch vụ",
        icon: policy,
        chevron: true,
      },
      {
        title: "Đăng xuất",
        icon: logout,
        chevron: true,
        onPress: async () => {
          await SecureStore.deleteItemAsync(SECURE_STORE.LOGIN_INFO);
          navigation.replace(SCREENS.LOGIN);
        },
      },
    ],
    [userInfo, navigation]
  );

  useEffect(() => {
    ctmsService.getInfo().then((res) => setUserInfo(res));
  }, []);

  return (
    <View style={styles.wrapper}>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Cài đặt
        </Text>
      </View>
      {items?.map((item, key) => (
        <ListItem bottomDivider key={key} onPress={item.onPress}>
          <Avatar source={item.icon} />
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>
            {item.subtitle && (
              <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
            )}
          </ListItem.Content>
          {item.chevron && <ListItem.Chevron />}
        </ListItem>
      ))}
    </View>
  );
};
export default SettingScreen;
