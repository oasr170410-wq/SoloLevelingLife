import { cargarHistorial, Evento, exportarHistorial } from '@/utils/storage';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HistorialScreen() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [exportado, setExportado] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      const data = await cargarHistorial();
      setEventos(data);
    };
    cargar();
  }, []);

  const handleExportar = async () => {
    const texto = await exportarHistorial();
    console.log('=== HISTORIAL EXPORTADO ===\n' + texto);
    setExportado(true);
    setTimeout(() => setExportado(false), 2000);
  };

  const coloresTipo = {
    quest:  { bg: '#04180f', border: '#0F6E56', text: '#1D9E75', label: 'Quest' },
    tarot:  { bg: '#1c1838', border: '#534AB7', text: '#7F77DD', label: 'Tarot' },
    rango:  { bg: '#1a1224', border: '#993556', text: '#D4537E', label: 'Rango' },
  };

  const agrupadosPorFecha = eventos.reduce((acc, e) => {
    if (!acc[e.fecha]) acc[e.fecha] = [];
    acc[e.fecha].push(e);
    return acc;
  }, {} as Record<string, Evento[]>);

  return (
    <ScrollView style={s.screen} contentContainerStyle={s.content}>

      <Text style={s.sysMsg}>— Diario del cazador —</Text>

      <View style={s.statsRow}>
        <View style={s.statCell}>
          <Text style={s.statVal}>{eventos.length}</Text>
          <Text style={s.statLbl}>eventos</Text>
        </View>
        <View style={s.statCell}>
          <Text style={s.statVal}>{eventos.filter(e => e.tipo === 'quest').length}</Text>
          <Text style={s.statLbl}>quests</Text>
        </View>
        <View style={s.statCell}>
          <Text style={s.statVal}>{eventos.filter(e => e.tipo === 'tarot').length}</Text>
          <Text style={s.statLbl}>dungeons</Text>
        </View>
        <View style={s.statCell}>
          <Text style={s.statVal}>{eventos.reduce((s, e) => s + e.xp, 0)}</Text>
          <Text style={s.statLbl}>XP total</Text>
        </View>
      </View>

      <TouchableOpacity style={s.exportBtn} onPress={handleExportar} activeOpacity={0.8}>
        <Text style={s.exportBtnText}>
          {exportado ? '¡Copiado en consola!' : 'Exportar historial →'}
        </Text>
      </TouchableOpacity>

      {Object.keys(agrupadosPorFecha).length === 0 && (
        <View style={s.emptyBox}>
          <Text style={s.emptyText}>Todavía no hay eventos registrados.</Text>
          <Text style={s.emptySubText}>Completá una quest para empezar el historial.</Text>
        </View>
      )}

      {Object.entries(agrupadosPorFecha).map(([fecha, evs]) => (
        <View key={fecha}>
          <Text style={s.fechaLabel}>{fecha}</Text>
          {evs.map(e => {
            const c = coloresTipo[e.tipo];
            return (
              <View key={e.id} style={[s.eventoCard, { backgroundColor: c.bg, borderColor: c.border }]}>
                <View style={s.eventoTop}>
                  <View style={[s.tipoBadge, { borderColor: c.border }]}>
                    <Text style={[s.tipoText, { color: c.text }]}>{c.label}</Text>
                  </View>
                  <Text style={s.eventoHora}>{e.hora}</Text>
                </View>
                <Text style={s.eventoDesc}>{e.descripcion}</Text>
                <Text style={[s.eventoXp, { color: c.text }]}>+{e.xp} XP</Text>
              </View>
            );
          })}
        </View>
      ))}

    </ScrollView>
  );
}

const s = StyleSheet.create({
  screen:      { flex: 1, backgroundColor: '#0e0c1a' },
  content:     { padding: 20, paddingBottom: 40 },
  sysMsg:      { color: '#534AB7', fontSize: 11, letterSpacing: 3, textAlign: 'center', marginBottom: 16, textTransform: 'uppercase' },
  statsRow:    { flexDirection: 'row', gap: 8, marginBottom: 12 },
  statCell:    { flex: 1, backgroundColor: '#1a1730', borderRadius: 10, padding: 8, alignItems: 'center', borderWidth: 0.5, borderColor: '#2a2540' },
  statVal:     { color: '#e8e4f4', fontSize: 16, fontWeight: '500' },
  statLbl:     { color: '#4a4468', fontSize: 9, marginTop: 2 },
  exportBtn:   { backgroundColor: '#26215C', borderRadius: 10, padding: 11, alignItems: 'center', marginBottom: 16 },
  exportBtnText:{ color: '#AFA9EC', fontSize: 12, fontWeight: '500' },
  fechaLabel:  { color: '#4a4468', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 8, marginTop: 8 },
  eventoCard:  { borderRadius: 12, padding: 11, marginBottom: 7, borderWidth: 0.5 },
  eventoTop:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  tipoBadge:   { borderRadius: 20, borderWidth: 0.5, paddingHorizontal: 8, paddingVertical: 2 },
  tipoText:    { fontSize: 10, fontWeight: '500' },
  eventoHora:  { color: '#4a4468', fontSize: 10 },
  eventoDesc:  { color: '#c4bede', fontSize: 12, marginBottom: 4 },
  eventoXp:    { fontSize: 11, fontWeight: '500' },
  emptyBox:    { alignItems: 'center', padding: 30 },
  emptyText:   { color: '#4a4468', fontSize: 13, marginBottom: 6 },
  emptySubText:{ color: '#2a2540', fontSize: 11 },
});