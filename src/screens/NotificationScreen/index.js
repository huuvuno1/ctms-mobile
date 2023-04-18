import { View, Text } from "react-native";
import styles from "./styles";
import { LoginForm } from "../../containers";
import { useCallback, useEffect, useState } from "react";
import { SCREENS } from "../../constants";
import { WidgetPreview } from "react-native-android-widget";
import { ClassScheduleWidget } from "../../widgets/ClassScheduleWidget";
import { ctmsService } from "../../services";

const NotificationScreen = ({ navigation }) => {
  const [data, setData] = useState({})
  useEffect(() => {
    (async () => {
      const result = await ctmsService.getNearestClass();
      setData(result)
    })()
  }, [])
  return (
    <View style={styles.wrapper}>
      <WidgetPreview
        renderWidget={() => <ClassScheduleWidget data={data} />}
        width={500}
        height={500}
        style={{
          borderWidth: 1,
        }}
        borderWidth={1}
      />
    </View>
  );
};
export default NotificationScreen;
