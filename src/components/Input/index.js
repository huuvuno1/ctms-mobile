import React, { useCallback } from "react";
import { TextInput } from "react-native";
import styles from "./styles";

const Input = ({ value, placeholder, customStyle, onChange, isSecure }) => {
  const [text, setText] = React.useState(value);

  const handleChangeText = useCallback(
    (value) => {
      setText(value);
      onChange(value);
    },
    [onChange, setText]
  );

  return (
    <TextInput
      style={{
        ...styles.input,
        ...customStyle,
      }}
      onChangeText={handleChangeText}
      value={text}
      placeholder={placeholder}
      secureTextEntry={isSecure || false}
    />
  );
};

export default Input;
