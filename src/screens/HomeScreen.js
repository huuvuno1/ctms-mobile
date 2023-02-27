import { LoginForm } from "../containers";
import { Button, Text, View } from "react-native";
import { SCREENS } from "../constants";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <LoginForm />
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
