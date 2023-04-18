import React from "react";
import { requestWidgetUpdate } from "react-native-android-widget";
import { ctmsService } from "../services";
import { HelloWidget } from "./ClassSchedule/HelloWidget";
import dateFormat from "dateformat";

const nameToWidget = {
  Hello: HelloWidget,
};

export async function widgetTaskHandler(props) {
  const widgetInfo = props.widgetInfo;
  const Widget = nameToWidget[widgetInfo.widgetName];

  switch (props.widgetAction) {
    case "WIDGET_ADDED":
      props.renderWidget(<Widget />);
      break;

    case "WIDGET_RESIZED":
      // Not needed for now
      break;

    case "WIDGET_CLICK":
      // Not needed for now
      break;

    default:
      break;
  }
}

export async function updateWidget() {
  const data = await ctmsService.getClassSchedule();
  const today = dateFormat(new Date(), "dd/mm/yyyy");
  console.log("ok", data);
  const todaySchedule = data.find((item) => item?.day?.includes(today));
  console.log("todaySchedule", todaySchedule);

  requestWidgetUpdate({
    widgetName: "Hello",
    renderWidget: () => <HelloWidget text={"ok" + todaySchedule.length} />,
    widgetNotFound: () => {
      console.log("Widget not found");
    },
  });
}
