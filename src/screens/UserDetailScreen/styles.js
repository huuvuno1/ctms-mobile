import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  dateValue: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#0096FF",
  },
  datePicker: {
    height: 50,
    flexDirection: "row",
    flex: 1,
    borderWidth: 1,
    paddingHorizontal: 15,
    alignItems: "center",
    borderColor: "#0096FF",
    borderRadius: 7,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 35,
  },
  dateLabel: {
    position: "absolute",
    top: -10,
    backgroundColor: "white",
    paddingHorizontal: 5,
    left: 10,
    color: "#0096FF",
  },
});

export default styles;
