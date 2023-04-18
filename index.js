import { registerRootComponent } from "expo";
import {
  registerWidgetTaskHandler
} from "react-native-android-widget";
import {
  updateWidget,
  widgetTaskHandler,
} from "./src/widgets/widget-task-handler";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

import App from "./App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
registerWidgetTaskHandler(widgetTaskHandler);

const BACKGROUND_FETCH_TASK = "background-fetch";
TaskManager.defineTask(BACKGROUND_FETCH_TASK, updateWidget);
BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
  minimumInterval: 60 * 15, // 15 minutes
  stopOnTerminate: false, // android only,
  startOnBoot: true, // android only
});
