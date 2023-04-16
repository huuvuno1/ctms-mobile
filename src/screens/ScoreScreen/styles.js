import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff",
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
    // fontWeight: "n",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  dataWrapper: { marginTop: -1 },
  row: {
    height: 50,
    backgroundColor: "#D5F5E3",
  },
  summaryWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  summaryItem: {
    padding: 8,
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: "#F8F9F9",
    alignSelf: "flex-start",
    borderColor: "#7EC8E3",
  },
  summaryLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#7EC8E3",
  },
  summaryIcon: {
    width: 30,
    height: 30,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E86C1",
    textAlign: "center",
  },
  summaryLeftItem: {
    marginRight: 15,
  },
  ml7: {
    marginLeft: 10,
  },
  mr7: {
    // marginRight: 7,
  },
  rowText: {
    color: "#17202A",
    fontWeight: "bold",
  },
});

export default styles;
