import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 13,
    backgroundColor: 'white',
  },
  card: {
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#4682B4',
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: "#ADD8E6",
    borderRadius: 8,
    marginBottom: 30,
    overflow: 'hidden'
  },
  wrapSchedule: {
    padding: 8,
    paddingBottom: 30,
    height: Dimensions.get("window").height - 200,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#D4F1F4',
    fontWeight: 'bold',
  },
  scheduleDay: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,

    color: '#0096FF'
  },
  pay: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#D4F1F4',
    fontWeight: 'bold',
    justifyContent: 'center',
    flex: 6
  },
  cellW1: {
    flex: 4
  },
  cellW2: {
    flex: 6
  },
  into: {
    width: 30,
    height: 30,
  },
  billPaid: {
    borderColor: 'green',
    borderWidth: 2,
    color: '#FF0000',
    textAlign: 'center',
    padding: 5,
    paddingTop: 6,
    fontWeight: 'bold',
    borderRadius: 3,
    textTransform: 'uppercase',
  }
});

export default styles;
