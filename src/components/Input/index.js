import React from "react";
import { TextInput } from "react-native";
import styles from "./styles";

const Input = ({ value, placeholder }) => {
  const [text, onChangeText] = React.useState(value);

  return (
    <TextInput
      style={styles.input}
      onChangeText={onChangeText}
      value={text}
      placeholder={placeholder}
    />
  );
};

export default Input;
