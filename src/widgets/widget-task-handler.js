import React from "react";
import { requestWidgetUpdate } from "react-native-android-widget";
import { ctmsService } from "../services";
import { ClassScheduleWidget } from "./ClassScheduleWidget";
import dateFormat from "dateformat";

const nameToWidget = {
  ClassSchedule: ClassScheduleWidget,
};

export async function widgetTaskHandler(props) {
  const widgetInfo = props.widgetInfo;
  const Widget = nameToWidget[widgetInfo.widgetName];
  const data = await ctmsService.getNearestClass();

  switch (props.widgetAction) {
    case "WIDGET_ADDED":
      props.renderWidget(<Widget data={data} test={"oke em"} />);
      break;

    case "WIDGET_RESIZED":
      // Not needed for now
      break;

    case "WIDGET_CLICK":
      props.clickAction = "OPEN_APP";
      break;

    default:
      break;
  }
}

export async function updateWidget() {
  const data = await ctmsService.getNearestClass();
  console.log('update widget')

  requestWidgetUpdate({
    widgetName: "ClassSchedule",
    renderWidget: () => <ClassScheduleWidget data={data} test="ok k k " />,
    widgetNotFound: () => {
      console.log("Widget not found");
    },
  });
}
