import { Dimensions, Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
    paddingHorizontal: 15,
    // paddingVertical: 22,
    fontFamily: Platform.OS === "ios" ? undefined : "monospace",
  },
  reload: {
    width: 30,
    height: 30,
  },

  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  titleLabel: {
    color: "#0047AB",
    fontWeight: "bold",
    fontSize: 16,
  },
  titleValue: {
    fontWeight: "bold",
    fontSize: 17,
    // color: "#581845"
  },
  titleValue2: {
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 15,
  },
  scheduleWrapper: {
    backgroundColor: "#89CFF0",
    borderRadius: 15,
    minHeight: 170,
    marginBottom: 20,
  },
  imgBg: {
    flex: 1,
    width: null,
    borderRadius: 15,
    overflow: "hidden",
  },
  wrapperQc: {
    padding: 20,
  },
  qcTitle: {
    color: "red",
    textTransform: "uppercase",
    fontFamily: Platform.OS === "ios" ? undefined : "monospace",
  },
  qcName: {
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? undefined : "monospace",
    marginTop: 4,
    width: "70%",
  },
  subject: {
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? undefined : "monospace",
    marginTop: 4,
    color: "#008744",
    fontSize: 16,
  },
  wrapperBtnQc: {
    backgroundColor: "blue",
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 50,
    marginLeft: 20,
  },
  btnQc: {
    color: "white",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  imageItem: {
    width: 50,
    height: 50,
    marginTop: 10,
  },
  textItem: {
    fontSize: 13,
    marginTop: 5,
  },
  wrapperItem: {
    marginTop: 5,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
