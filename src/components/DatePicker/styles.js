import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 13,
    backgroundColor: 'white',
  },
  card: {
    flexDirection: "row",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#4682B4',
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: "#ADD8E6",
    borderRadius: 8,
    marginBottom: 10
  },
  label: {
    width: 100,
    height: 20,
    position: 'absolute'
  },
  dateLabel: {
    position: 'absolute',
    top: -10,
    backgroundColor: 'white',
    paddingHorizontal: 5,
    left: 10,
    color: '#0096FF'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  leftCard: {
    flexGrow: 1,
    flex: .7
  },
  rightCard: {
    alignItems: 'center',
    flex: .3,
    paddingVertical: 15,
    justifyContent: 'center'
  },
  schedule: {
    borderRadius: 7,
    marginBottom: 10,
  },
  imageItem: {
    width: 17,
    height: 17,
    marginTop: 10,
    position: 'absolute',
    right: 14,
  },
  btnNav: {
    width: 33,
    height: 33,
  },
  datePicker: {
    height: 50,
    flexDirection: 'row',
    flex: 1,
    borderWidth: 1,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderColor: '#0096FF',
    borderRadius: 7,
    marginRight: 10,
  },
  dateValue: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0096FF'
  },
  nextWeek: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 11,
    height: 50
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
    height: Dimensions.get("window").height - 200,
  },
  teacher: {
    flexDirection: "row",
    marginVertical: 4
  },
  bold: {
    fontWeight: 'bold'
  },
  scheduleDay: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#0096FF',
    color: '#0096FF'
  },
  subjectName: {
    fontSize: 15,
    fontWeight: "bold",
    flex: .7,
    color: '#088F8F',
    marginBottom: 10
  },
  subjectIcon: {
    width: 18,
    height: 18,
    marginRight: 10
  }
});

export default styles;
