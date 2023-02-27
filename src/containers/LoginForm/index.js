import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "../../components";
import styles from "./styles";

const LoginForm = () => {
  console.log(styles);
  return (
    <SafeAreaView>
      <Input placeholder="Nhap vao username" />
    </SafeAreaView>
  );
};

export default LoginForm;
