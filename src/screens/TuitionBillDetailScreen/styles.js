import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    flex: 1,
    paddingVertical: 13,
  },
  card: {
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#4682B4",
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: "#ADD8E6",
    borderRadius: 8,
    marginBottom: 30,
    overflow: "hidden",
  },
  wrapSchedule: {
    padding: 8,
    paddingBottom: 30,
  },
  row2: {
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#D4F1F4",
    fontWeight: "bold",
  },
  scheduleDay: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,

    color: "#0096FF",
  },
  pay: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#D4F1F4",
    fontWeight: "bold",
    justifyContent: "center",
    flex: 6,
  },
  cellW1: {
    flex: 4,
  },
  cellW2: {
    flex: 6,
  },
  into: {
    width: 30,
    height: 30,
  },
  billPaid: {
    borderColor: "green",
    borderWidth: 2,
    color: "#FF0000",
    textAlign: "center",
    padding: 5,
    paddingTop: 6,
    fontWeight: "bold",
    borderRadius: 3,
    textTransform: "uppercase",
  },
  label: {
    width: 100,
    height: 20,
    position: "absolute",
  },
  dateLabel: {
    position: "absolute",
    top: -10,
    backgroundColor: "white",
    paddingHorizontal: 5,
    left: 10,
    color: "#0096FF",
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
    marginBottom: 15,
  },
  header: {
    height: 60,
    backgroundColor: "#5499C7",
  },
  headerText: {
    fontSize: 18,
  },
  text: {
    textAlign: "center",
    fontWeight: "100",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  dataWrapper: { marginTop: -1 },
  row: {
    minHeight: 70,
    backgroundColor: "#D5F5E3",
  },
  rowText: {
    color: "#17202A",
    fontWeight: "500",
  },
});

export default styles;
