import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";
import { LogBox } from "react-native";

LogBox.ignoreLogs(['Require cycles'])

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
