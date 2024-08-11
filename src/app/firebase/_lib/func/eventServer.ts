import dotenv from "dotenv";
import admin from "firebase-admin";
import { decode } from "js-base64";
dotenv.config();

const EVENT_SERVICE_ACCOUNT_SERVER = process.env.EVENT_SERVICE_ACCOUNT_SERVER!;
const EVENT_DATABASE_URL = process.env.EVENT_DATABASE_URL!;

if (!EVENT_SERVICE_ACCOUNT_SERVER || !EVENT_DATABASE_URL) {
  throw new Error(
    "EVENT_SERVICE_ACCOUNT_SERVER or EVENT_DATABASE_URL not found"
  );
}

if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(
      decode(EVENT_SERVICE_ACCOUNT_SERVER as string)
    );
    const databaseURL = decode(EVENT_DATABASE_URL as string);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL,
    });
  } catch (error) {
    console.error("Error initializing Firebase Admin SDK:", error);
    throw error;
  }
}

const realtimeDB = admin.database();

function eventServer<T extends readonly string[]>({
  projectId,
  listSubscribe,
}: {
  projectId: string;
  listSubscribe: T;
}) {
  type Subscribe = T[number];

  function onUpdate({
    subscribe,
    event,
  }: {
    subscribe: Subscribe;
    event: () => void;
  }) {
    const ref = realtimeDB.ref(`wibu/${projectId}/${subscribe}`);

    ref.on("value", () => {
      event();
    });

    // Return a cleanup function to remove the listener
    return () => ref.off("value");
  }

  function update({
    subscribe,
    onSuccess,
  }: {
    subscribe: Subscribe;
    onSuccess?: () => void;
  }) {
    const ref = realtimeDB.ref(`wibu/${projectId}/${subscribe}`);
    ref.set({ data: Math.random() }, (err) => {
      if (err) {
        console.log("Error setting value:", err);
        return;
      }
      onSuccess?.();
    });
  }

  function onChange({
    subscribe,
    event,
  }: {
    subscribe: Subscribe;
    event: () => void;
  }) {
    const ref = realtimeDB.ref(`wibu/${projectId}/${subscribe}`);
    ref.on("child_changed", (snapshot) => {
      event();
    });

    // Return a cleanup function to remove the listener
    return () => ref.off("child_changed");
  }

  return { onUpdate, update, onChange };
}

export { eventServer };
