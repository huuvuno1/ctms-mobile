import { useCallback, useState } from "react";
import { Button } from "react-native";
import { Text, TouchableHighlight } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { Input } from "../../components";
import { SECURE_STORE } from "../../constants";
import { ctmsService } from "../../services";
import styles from "./styles";

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = useCallback(() => {
    (async () => {
      const { isSuccess, errorMsg, cookie } = await ctmsService.login(
        username,
        password,
        false
      );
      if (isSuccess) {
        setError("");
        onLoginSuccess();
        // save username/password private
        await SecureStore.setItemAsync(SECURE_STORE.LOGIN_INFO, JSON.stringify({username, password}));
        
        // don't need logout if you use axiosInstance
        await ctmsService.logout(cookie);
      } else {
        setError(errorMsg);
      }
    })();
  }, [username, password, setError, onLoginSuccess]);

  return (
    <>
      <Text style={styles.title}>FITHOU APP</Text>
      <Text style={styles.description}>
        Xem lịch học, kết quả học tập, lịch thi, nhận thông báo về các bài viết
        mới của Fithou...
      </Text>
      {error && <Text style={styles.errorMsg}>{error}</Text>}
      <Input placeholder="Tên truy cập..." onChange={setUsername} />
      <Input placeholder="Mật khẩu..." onChange={setPassword} isSecure={true}/>
      <TouchableHighlight style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableHighlight>
      <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
    </>
  );
};

export default LoginForm;
