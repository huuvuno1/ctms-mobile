import { SCREENS } from "../constants";
import { TouchableOpacity, Text } from "react-native";

const ScoreScreen = ({ navigation }) => {
  const goToHome = () => {
    navigation.navigate(SCREENS.HOME);
  };
  return (
    <TouchableOpacity style={{ margin: 128 }} onPress={goToHome}>
      <Text>This is ScoreScreen</Text>
    </TouchableOpacity>
  );
};
export default ScoreScreen;
