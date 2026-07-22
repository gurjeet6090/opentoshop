import * as Notifications from "expo-notifications";

import Constants from "expo-constants";

export async function requestNotificationPermission() {
  let { status } = await Notifications.getPermissionsAsync();

  if (status !== "granted") {
    const permission = await Notifications.requestPermissionsAsync();
    status = permission.status;
  }

  return status === "granted";
}

export async function sendLocalNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Login Suceess",
      body: "Thank you for using OpenToSHop.",
      data: {
        orderId: 101,
        type: "order",
      },
    },
    trigger: null,

    //  trigger: {
    //   type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
    //   seconds: 1,
    // }
  });
}

export async function getPushToken() {
  const token = await Notifications.getExpoPushTokenAsync({
    projectId:
      Constants.easConfig?.projectId ??
      Constants.expoConfig?.extra?.eas?.projectId,
  });

  console.log("Expo Push Token:", token);

  return token.data;
}
