import React, { useCallback } from "react";
import { TextInput } from "react-native";
import styles from "./styles";

const Input = ({ value, placeholder, customStyle, onChange, isSecure }) => {
  const handleChangeText = useCallback(
    (value) => {
      onChange && onChange(value);
    },
    [onChange]
  );

  return (
    <TextInput
      style={{
        ...styles.input,
        ...customStyle,
      }}
      onChangeText={handleChangeText}
      value={value}
      placeholder={placeholder}
      secureTextEntry={isSecure || false}
    />
  );
};

export default Input;
