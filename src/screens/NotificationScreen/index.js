import { View, Text } from "react-native";
import styles from "./styles";
import { LoginForm } from "../../containers";
import { useCallback } from "react";
import { SCREENS } from "../../constants";

const NotificationScreen = ({ navigation }) => {
  const goToHome = useCallback(() => {
    // console.log(navigation)
    navigation.replace(SCREENS.HOME);
  }, [navigation]);
  return (
    <View style={styles.wrapper}>
      <Text>xin chao</Text>
    </View>
  );
};
export default NotificationScreen;
