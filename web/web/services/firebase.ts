import { getAuth } from "firebase/auth";
import { getApps } from "firebase/app";
import {
  API_KEY,
  APP_ID,
  AUTH_DOMAIN,
  MEASUREMENT_ID,
  MESSAGING_SENDER_ID,
  PROJECT_ID,
  STORAGE_BUCKET,
} from "constants/config";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { store } from "redux/store";
import { setChats, setMessages } from "redux/slices/chat";
import { IChat, IMessage } from "interfaces";
import { error } from "components/alert/toast";
import app from "utils/firebase";

// Use the app from utils/firebase to avoid duplicate initialization
export const auth = getAuth(app);
export { app as default };

// Initialize Firestore and Storage with error handling
let db: ReturnType<typeof getFirestore> | undefined;
let storage: ReturnType<typeof getStorage> | undefined;

try {
  if (getApps().length > 0 && PROJECT_ID) {
    db = getFirestore(app);
    storage = getStorage(app);
    
    // Set up Firestore listeners with error handling
    try {
      onSnapshot(
        query(collection(db, "messages"), orderBy("created_at", "asc")),
        (querySnapshot) => {
          const messages = querySnapshot.docs.map((x) => ({
            id: x.id,
            ...x.data(),
            created_at: String(new Date(x.data().created_at?.seconds * 1000)),
          }));
          store.dispatch(setMessages(messages));
        },
        (err) => {
          console.error("Firestore messages listener error:", err);
        }
      );
    } catch (err) {
      console.error("Failed to set up messages listener:", err);
    }

    try {
      onSnapshot(
        query(collection(db, "chats"), orderBy("created_at", "asc")),
        (querySnapshot) => {
          const chats = querySnapshot.docs.map((x) => ({
            id: x.id,
            ...x.data(),
            created_at: String(new Date(x.data().created_at?.seconds * 1000)),
          }));
          store.dispatch(setChats(chats));
        },
        (err) => {
          console.error("Firestore chats listener error:", err);
        }
      );
    } catch (err) {
      console.error("Failed to set up chats listener:", err);
    }
  }
} catch (err) {
  console.error("Firebase services initialization error:", err);
}

export { storage };
export { db };

export async function sendMessage(payload: IMessage) {
  try {
    if (!db) {
      throw new Error("Firestore is not initialized");
    }
    await addDoc(collection(db, "messages"), {
      ...payload,
      created_at: serverTimestamp(),
    });
  } catch (err) {
    console.error("Send message error:", err);
    error("chat error");
  }
}

export async function createChat(payload: IChat) {
  try {
    if (!db) {
      throw new Error("Firestore is not initialized");
    }
    await addDoc(collection(db, "chats"), {
      ...payload,
      created_at: serverTimestamp(),
    });
  } catch (err) {
    console.error("Create chat error:", err);
    error("chat error");
  }
}
