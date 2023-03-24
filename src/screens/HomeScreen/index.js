import { useEffect } from "react";
import { Button, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { SCREENS, SECURE_STORE } from "../../constants";

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    (async () => {
      const value = await SecureStore.getItemAsync(SECURE_STORE.LOGIN_INFO);
      if (!value) {
        navigation.replace(SCREENS.LOGIN);
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Xem lich hoc"
        onPress={() => {
          navigation.navigate(SCREENS.CLASS_SCHEDULE);
        }}
      ></Button>
    </View>
  );
};
export default HomeScreen;
