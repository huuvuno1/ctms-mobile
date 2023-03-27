import { SCREENS } from "../../constants";
import { TouchableOpacity, Text } from "react-native";
import { useEffect } from "react";
import { ctmsService } from "../../services";

const TuitionBillScreen = ({ navigation }) => {
  const goToHome = () => {
    navigation.navigate(SCREENS.HOME);
  };

  useEffect(() => {
    (async () => {
      const res = await ctmsService.getTuitionBill();
      console.log("hoa don", res);

      const res2 = await ctmsService.getExamSchedule();
      console.log("lich thi: ", res2);
    })();
  }, []);
  return (
    <TouchableOpacity style={{ margin: 128 }} onPress={goToHome}>
      <Text>This is TuitionBillScreen 2</Text>
    </TouchableOpacity>
  );
};
export default TuitionBillScreen;
