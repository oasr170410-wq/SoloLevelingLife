import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function pedirPermisos(): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function programarNotificaciones() {
  if (Platform.OS === 'web') return;

  await Notifications.cancelAllScheduledNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: '— Sistema activo —',
      body: 'Tus quests del día te esperan, cazadora. ¡A subir de rango!',
      sound: true,
    },
    trigger: {
      hour: 8,
      minute: 0,
      repeats: true,
    } as any,
  });

  await Notifications.scheduleNotificationAsync({
    content: {
      title: '⚔ Recordatorio del cazador',
      body: '¿Ya completaste tus quests de hoy? Quedan pocas horas.',
      sound: true,
    },
    trigger: {
      hour: 15,
      minute: 0,
      repeats: true,
    } as any,
  });

  await Notifications.scheduleNotificationAsync({
    content: {
      title: '✦ Resumen del día',
      body: 'Cerrá el día — revisá tu XP ganada y tu racha.',
      sound: true,
    },
    trigger: {
      hour: 21,
      minute: 0,
      repeats: true,
    } as any,
  });
}

export async function notificarSubidaDeRango(nuevoRango: string) {
  if (Platform.OS === 'web') return;
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '🎉 ¡SUBISTE DE RANGO!',
      body: `Felicitaciones cazadora — ahora sos ${nuevoRango}. El sistema te reconoce.`,
      sound: true,
    },
    trigger: null,
  });
}