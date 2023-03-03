import {  View } from "react-native";
import styles from "./styles";
import { LoginForm } from "../../containers";
import { useCallback } from "react";
import { SCREENS } from "../../constants";

const LoginScreen = ({ navigation }) => {
  const goToHome = useCallback(() => {
    // console.log(navigation)
    navigation.replace(SCREENS.HOME);
  }, [navigation]);
  return (
    <View style={styles.wrapper}>
      <LoginForm onLoginSuccess={goToHome} />
    </View>
  );
};
export default LoginScreen;
