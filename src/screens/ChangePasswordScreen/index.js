import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import * as SecureStore from "expo-secure-store";

import styles from "./styles";
import { ctmsService } from "../../services";
import { Input } from "../../components";
import { SECURE_STORE } from "../../constants";

const ChangePasswordScreen = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState();

  const handleChangePassword = async () => {
    const result = await ctmsService.changePassword(oldPassword, newPassword);
    setStatus(result);
    if (result === "Mật khẩu đã được đổi thành công") {
      const loginInfo = await SecureStore.getItemAsync(SECURE_STORE.LOGIN_INFO);
      const loginInfoObj = JSON.parse(loginInfo);
      await SecureStore.setItemAsync(
        SECURE_STORE.LOGIN_INFO,
        JSON.stringify({
          ...loginInfoObj,
          password: newPassword,
        })
      );

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <View style={styles.wrapper}>
      {status && (
        <View
          style={{
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              ...(status === "Mật khẩu đã được đổi thành công"
                ? { color: "green" }
                : { color: "red" }),
            }}
          >
            {status}
          </Text>
        </View>
      )}
      <View style={styles.datePicker}>
        <Text style={styles.dateLabel}>Mật khẩu cũ</Text>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Input
            value={oldPassword}
            onChange={setOldPassword}
            customStyle={{
              backgroundColor: "transparent",
              borderWidth: 2,
              borderColor: "#0096FF",
            }}
            isSecure={true}
          />
        </View>
      </View>
      <View style={styles.datePicker}>
        <Text style={styles.dateLabel}>Mật khẩu mới</Text>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Input
            value={newPassword}
            onChange={setNewPassword}
            customStyle={{
              backgroundColor: "transparent",
              borderWidth: 2,
              borderColor: "#0096FF",
            }}
            isSecure={true}
          />
        </View>
      </View>
      <View style={styles.datePicker}>
        <Text style={styles.dateLabel}>Nhập lại mật khẩu mới</Text>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Input
            value={confirmPassword}
            onChange={setConfirmPassword}
            customStyle={{
              backgroundColor: "transparent",
              borderWidth: 2,
              borderColor: "#0096FF",
            }}
            isSecure={true}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#0096FF",
          alignItems: "center",
          padding: 13,
          borderRadius: 8,
          marginTop: 20,
          borderWidth: 1,
          borderColor: "#0096FF",
        }}
        onPress={handleChangePassword}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
            color: "#FFFFFF",
          }}
        >
          Cập nhật
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default ChangePasswordScreen;
