import { getMessaging, getToken, onMessage } from "firebase/messaging";
import app from "utils/firebase";
import { VAPID_KEY } from "constants/config";
import profileService from "services/profile";
import { IPushNotification } from "interfaces";
import { getApps } from "firebase/app";

type INotification = {
  notification?: IPushNotification;
};

export const getNotification = (
  setNotification: (data?: IPushNotification) => void
) => {
  // Check if Firebase is properly initialized
  if (getApps().length === 0 || !app) {
    console.error("Firebase is not initialized");
    return;
  }

  try {
    const messaging = getMessaging(app);
  getToken(messaging, { vapidKey: VAPID_KEY })
    .then((currentToken) => {
      if (currentToken) {
        profileService
          .firebaseTokenUpdate({ firebase_token: currentToken })
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });

        onMessage(messaging, (payload: INotification) => {
          setNotification(payload?.notification);
        });
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.error("An error occurred while retrieving token. ", err);
    });
  } catch (err) {
    console.error("Failed to initialize Firebase messaging:", err);
  }
};
