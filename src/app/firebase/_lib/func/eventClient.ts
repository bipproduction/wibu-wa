import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import {
  getDatabase,
  onChildChanged,
  onValue,
  ref,
  set,
} from "firebase/database";
import { decode } from "js-base64";
import { useCallback, useEffect } from "react";

// Hook untuk digunakan pada komponen React
export function useEventClient<T extends readonly string[]>({
  config,
  projectId,
  listSubscribe,
}: {
  config: string;
  projectId: string;
  listSubscribe: T;
}) {
  type Subscribe = T[number];
  if (!config) {
    throw new Error("config not found");
  }

  const appConfig = JSON.parse(decode(config));
  let app: FirebaseApp;

  // Inisialisasi Firebase App jika belum ada
  if (getApps().length === 0) {
    app = initializeApp(appConfig);
  } else {
    app = getApp();
  }

  const db = getDatabase(app);

  // Gunakan useCallback untuk mencegah fungsi berubah antara render
  const onRefresh = useCallback(
    (subscribe: Subscribe, callback: (snapshot: any) => void) => {
      const reference = ref(db, `wibu/${projectId}/${subscribe}`);
      return onValue(reference, callback);
    },
    [db, projectId]
  );

  const onChange = useCallback(
    (subscribe: Subscribe, callback: (snapshot: any) => void) => {
      const reference = ref(db, `wibu/${projectId}/${subscribe}`);
      return onChildChanged(reference, callback);
    },
    [db, projectId]
  );

  const setRefresh = useCallback(
    (subscribe: Subscribe) => {
      const reference = ref(db, `wibu/${projectId}/${subscribe}`);
      return set(reference, { data: Math.random() });
    },
    [db, projectId]
  );

  useEffect(() => {
    const unsubscribeList = listSubscribe.map((subscribe) =>
      onRefresh(subscribe, () => {
        // Implement callback here
        // console.log(`${subscribe} has been refreshed`);
      })
    );

    // Cleanup listener on unmount
    return () => {
      unsubscribeList.forEach((unsubscribe) => unsubscribe());
    };
  }, [listSubscribe, onRefresh]);

  return [onRefresh, setRefresh, onChange] as const;
}
