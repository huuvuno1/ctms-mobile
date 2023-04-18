import React from "react";
import { FlexWidget, ImageWidget, TextWidget } from "react-native-android-widget";

export function ClassScheduleWidget(props) {
  const { name, teacher, classId, room, day } = props.data
  console.log(props)
  return (
    <FlexWidget
      style={{
        height: "match_parent",
        width: "match_parent",
        backgroundColor: "#EBF5FB",
        borderRadius: 16,
        justifyContent: 'center',
        padding: 15,
      }}
    >
      <FlexWidget>
        <TextWidget
          text={"LỊCH HỌC GẦN NHẤT CỦA BẠN"}
          style={{
            fontSize: 20,
            marginBottom: 10,
            marginLeft: 5,
            fontFamily: "Inter",
            color: "#E74C3C",
            fontWeight: 'bold'
          }}
        />
      </FlexWidget>
      <FlexWidget style={{
        flexDirection: 'row',
        padding: 5,
        width: "match_parent",
      }}>
        <TextWidget
          text="Môn"
          style={{
            width: 110,
            textAlign: 'left',
            fontSize: 18,
            fontFamily: "Inter",
            color: "#5DADE2"
          }}
        />
        <TextWidget
          text={name}
          style={{
            fontSize: 18,
            fontFamily: "Inter",
            color: "#5DADE2"
          }}
        />
      </FlexWidget>

      <FlexWidget style={{
        flexDirection: 'row',
        padding: 5,
        width: "match_parent",
      }}>
        <TextWidget
          text="Giảng viên"
          style={{
            width: 110,
            textAlign: 'left',
            fontSize: 18,
            fontFamily: "Inter",
            color: "#5DADE2"
          }}
        />
        <TextWidget
          text={teacher}
          style={{
            fontSize: 18,
            fontFamily: "Inter",
            color: "#5DADE2"
          }}
        />
      </FlexWidget>
      <FlexWidget style={{
        flexDirection: 'row',
        padding: 5,
        width: "match_parent",
      }}>
        <TextWidget
          text="Mã lớp"
          style={{
            width: 110,
            textAlign: 'left',
            fontSize: 18,
            fontFamily: "Inter",
            color: "#5DADE2"
          }}
        />
        <TextWidget
          text={classId}
          style={{
            fontSize: 18,
            fontFamily: "Inter",
            color: "#5DADE2"
          }}
        />
      </FlexWidget>
      <FlexWidget style={{
        flexDirection: 'row',
        padding: 5,
        width: "match_parent",
      }}>
        <TextWidget
          text="Phòng"
          style={{
            width: 110,
            textAlign: 'left',
            fontSize: 18,
            fontFamily: "Inter",
            color: "#5DADE2"
          }}
        />
        <TextWidget
          text={room}
          style={{
            fontSize: 18,
            fontFamily: "Inter",
            color: "#5DADE2"
          }}
        />
      </FlexWidget>
      <FlexWidget style={{
        flexDirection: 'row',
        padding: 5,
        width: "match_parent",
      }}>
        <TextWidget
          text="Thời gian"
          style={{
            width: 110,
            textAlign: 'left',
            fontSize: 18,
            fontFamily: "Inter",
            color: "#5DADE2"
          }}
        />
        <TextWidget
          text={day}
          style={{
            fontSize: 18,
            fontFamily: "Inter",
            color: "#5DADE2"
          }}
        />
      </FlexWidget>
    </FlexWidget>
  );
}
