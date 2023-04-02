import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";
import { LogBox } from "react-native";
import { SafeAreaView } from "react-native";

LogBox.ignoreLogs(['Require cycles'])

export default function App() {
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: 'white'
    }}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </SafeAreaView>
  );
}
