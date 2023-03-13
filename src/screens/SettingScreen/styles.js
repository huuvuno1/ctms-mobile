import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
    padding: 20,
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
  },
  forgotPassword: {
    marginTop: 20,
    fontSize: 15,
    color: "#717274",
  },
});

export default styles;
