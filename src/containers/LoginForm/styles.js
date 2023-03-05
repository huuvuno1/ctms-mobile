import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#4A4EA8",
  },
  description: {
    marginTop: 20,
    fontSize: 15,
    color: "#717274",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    height: 43,
    backgroundColor: "#8673FD",
    color: "#FFFFFF",
    borderRadius: 7,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: 600,
    fontSize: 16
  },
  forgotPassword: {
    marginTop: 20,
    fontSize: 15,
    color: "#717274",
  },
  errorMsg: {
    color: "red",
    fontWeight: 600,
    textAlign: "center",
  },
});

export default styles;
