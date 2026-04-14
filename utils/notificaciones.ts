
export async function pedirPermisos(): Promise<boolean> {
  return false;
}

export async function programarNotificaciones() {
  console.log('Notificaciones: requiere development build');
}

export async function notificarSubidaDeRango(nuevoRango: string) {
  console.log('Subida de rango:', nuevoRango);
}