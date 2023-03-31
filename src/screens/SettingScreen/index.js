import { ListItem, Avatar } from "react-native-elements";
import { Text, View } from "react-native";
import styles from "./styles";
import { useCallback } from "react";
import { SCREENS } from "../../constants";
import user from '../../../assets/user.png'
import password from '../../../assets/password.png'
import policy from '../../../assets/policy.png'
import logout from '../../../assets/logout.png'


const items = [
  {
    title: "Nguyễn Hữu Vũ",
    icon: user,
    subtitle: "nguyenhuuvuno1@gmail.com",
    chevron: true,
  },
  {
    title: "Đổi mật khẩu",
    icon: password,
    chevron: true,
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
  },
]


const SettingScreen = ({ navigation }) => {
  const goToHome = useCallback(() => {
    // console.log(navigation)
    navigation.replace(SCREENS.HOME);
  }, [navigation]);
  return (
    <View style={styles.wrapper}>
      <View style={{
        alignItems: 'center'
      }}>
        <Text style={{
          fontWeight: 'bold',
          fontSize: 18
        }}>Cài đặt</Text>
      </View>
      {items.map((item, key) => (
        <ListItem
          bottomDivider
          key={key}
        >
          <Avatar source={item.icon} />
          <ListItem.Content>
            <ListItem.Title>
              {item.title}
            </ListItem.Title>
            {item.subtitle && (
              <ListItem.Subtitle>
                {item.subtitle}
              </ListItem.Subtitle>)}
          </ListItem.Content>
          {item.chevron && <ListItem.Chevron />}
        </ListItem>))}

    </View>
  );
};
export default SettingScreen;
