import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: {},
  card: {
    flexDirection: "row",
  },
  leftCard: {
    width: 100,
    justifyContent: "center",
  },
  rightCard: {
    flex: 1,
  },
  schedule: {
    padding: 10,
    borderRadius: 7,
    marginBottom: 10,
  },
  datePicker: {
    backgroundColor: "red",
    height: 50,
    flex: 1,
  },
  nextWeek: {
    width: 60,
    backgroundColor: "#FFFFFF",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginLeft: 5,
  },
  navigate: {
    flexDirection: "row",
    padding: 8,
    height: 60,
  },
  wrapSchedule: {
    padding: 8,
    marginTop: 15,
    paddingBottom: 30,
    height: Dimensions.get("window").height - 150,
  },
  teacher: {
    flexDirection: "row",
  },
  scheduleDay: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  subjectName: {
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default styles;
