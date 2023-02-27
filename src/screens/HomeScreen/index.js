import { useEffect } from "react";
import { Button, Text, View } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { SCREENS, SECURE_STORE } from "../../constants";

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    (async() => {
      const value = await SecureStore.getItemAsync(SECURE_STORE.LOGIN_INFO)
      if (!value) {
        navigation.replace(SCREENS.LOGIN)
      }
    })()
  }, [])

  SecureStore.setItemAsync(SECURE_STORE.LOGIN_INFO, '')

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Click me"
        onPress={() => {
          navigation.navigate(SCREENS.SCORE);
        }}
      ></Button>
    </View>
  );
};
export default HomeScreen;
