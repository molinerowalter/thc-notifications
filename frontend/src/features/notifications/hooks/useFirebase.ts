import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { saveFirebaseToken } from "@/features/notifications/services";

const FIREBASE_CONFIG = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(FIREBASE_CONFIG);
const messaging = getMessaging(app);
const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;

export const useFirebase = () => {
  const initialize = async (username: string) => {
    try {
      // 1. Pedir permisos y obtener el token usando la VAPID_KEY de tus variables de entorno
      const token = await getToken(messaging, { vapidKey: VAPID_KEY });
      
      if (!token) {
        console.warn("No se pudo obtener el token de Firebase.");
        return;
      }

      console.log("Token obtenido exitosamente:", token);

      // 2. Guardar el token en tu backend utilizando tu servicio
      await saveFirebaseToken({ userId: username, token });
      
    } catch (error: unknown) {
      // Manejo seguro del tipo de error en TypeScript
      const err = error as { code?: string; message?: string };
      
      if (err?.code === 'messaging/permission-blocked') {
        console.warn('El usuario bloqueó las notificaciones en el navegador.');
      } else {
        console.error('Error al inicializar Firebase Messaging:', err);
      }
    }
  };

  return { initialize };
};