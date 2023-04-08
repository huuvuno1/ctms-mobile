import { TouchableOpacity, Text, View, Image } from "react-native";
import { useEffect, useState } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import dateFormat from "dateformat";
import styles from "./styles";
import picker from "../../../assets/picker.png";
import prev from "../../../assets/prev.png";
import next from "../../../assets/next.png";
const DatePicker = ({ onChange, label, style, shiftValue, defaultValue }) => {
  const [startDay, setStartDay] = useState(defaultValue || new Date());
  const [displayDatePicker, setDisplayDatePicker] = useState(false);

  const handleStartDateChange = (e, date) => {
    setDisplayDatePicker(false);
    setStartDay(date);
    onChange(date)
  };

  const handleShiftWeek = (type) => {
    const value = shiftValue || 7
    let day = new Date(startDay);
    if (type === "prev") {
      day.setDate(day.getDate() - value);
    } else {
      day.setDate(day.getDate() + value);
    }
    setStartDay(day);
    onChange(day)
  };
  return (
    <View style={[styles.navigate, style]}>
      <TouchableOpacity
        style={styles.datePicker}
        onPress={() => setDisplayDatePicker(true)}
      >
        <Text style={styles.dateLabel}>{label || 'Tuần từ'}</Text>
        <Text style={styles.dateValue}>
          {dateFormat(startDay, "dd / mm / yyyy")}
        </Text>
        {displayDatePicker && (
          <RNDateTimePicker
            value={startDay || new Date()}
            onChange={handleStartDateChange}
          />
        )}
        <Image style={styles.imageItem} source={picker} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.nextWeek}
        onPress={() => handleShiftWeek("prev")}
      >
        <Image style={styles.btnNav} source={prev} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.nextWeek}
        onPress={() => handleShiftWeek("next")}
      >
        <Image style={styles.btnNav} source={next} />
      </TouchableOpacity>
    </View>
  );
};
export default DatePicker;
