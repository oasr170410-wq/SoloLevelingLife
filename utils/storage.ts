import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const KEYS = {
  XP:     'xp_total',
  RACHA:  'racha_dias',
  ULTIMA: 'ultima_fecha',
  QUESTS: 'quests_hoy',
};

async function setItem(key: string, value: string) {
  if (Platform.OS === 'web') {
    localStorage.setItem(key, value);
  } else {
    await AsyncStorage.setItem(key, value);
  }
}

async function getItem(key: string): Promise<string | null> {
  if (Platform.OS === 'web') {
    return localStorage.getItem(key);
  }
  return await AsyncStorage.getItem(key);
}

export async function guardarXP(xp: number) {
  await setItem(KEYS.XP, String(xp));
}

export async function cargarXP(): Promise<number> {
  const val = await getItem(KEYS.XP);
  return val ? parseInt(val) : 0;
}

export async function guardarQuests(done: number[]) {
  await setItem(KEYS.QUESTS, JSON.stringify(done));
  await setItem(KEYS.ULTIMA, new Date().toDateString());
  console.log('Quests guardadas:', done);
}

export async function cargarQuests(): Promise<number[]> {
  const val = await getItem(KEYS.QUESTS);
  console.log('Quests cargadas:', val);
  return val ? JSON.parse(val) : [];
}

export async function cargarRacha(): Promise<number> {
  const val = await getItem(KEYS.RACHA);
  return val ? parseInt(val) : 0;
}

export async function actualizarRacha(): Promise<number> {
  const hoy = new Date().toDateString();
  const ultima = await getItem(KEYS.ULTIMA);
  const rachaActual = await cargarRacha();
  let nuevaRacha = rachaActual;
  if (ultima === null) {
    nuevaRacha = 1;
  } else {
    const ayer = new Date();
    ayer.setDate(ayer.getDate() - 1);
    if (ultima === ayer.toDateString()) {
      nuevaRacha = rachaActual + 1;
    } else if (ultima !== hoy) {
      nuevaRacha = 1;
    }
  }
  await setItem(KEYS.RACHA, String(nuevaRacha));
  await setItem(KEYS.ULTIMA, hoy);
  return nuevaRacha;
}

export async function resetearQuestsDelDia() {
  const hoy = new Date().toDateString();
  const ultima = await getItem(KEYS.ULTIMA);
  if (ultima !== hoy) {
    await setItem(KEYS.QUESTS, JSON.stringify([]));
  }
}

export async function guardarTarot(data: {
  carta: string;
  orientacion: string;
  fecha: string;
  questsDone: boolean[];
  xpGanado: number;
}) {
  await setItem('tarot_hoy', JSON.stringify(data));
}

export async function cargarTarot(): Promise<{
  carta: string;
  orientacion: string;
  fecha: string;
  questsDone: boolean[];
  xpGanado: number;
} | null> {
  const val = await getItem('tarot_hoy');
  if (!val) return null;
  const data = JSON.parse(val);
  const hoy = new Date().toDateString();
  if (data.fecha !== hoy) return null;
  return data;
}

export async function guardarXPTotal(xp: number) {
  const actual = await cargarXP();
  await setItem(KEYS.XP, String(actual + xp));
}