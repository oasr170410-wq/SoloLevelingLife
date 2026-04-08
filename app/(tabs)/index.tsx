import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const QUESTS = [
  { id: 1, text: '20 min de ejercicio', xp: 30, area: 'Fitness' },
  { id: 2, text: 'Estudiar 30 min', xp: 35, area: 'Estudio' },
  { id: 3, text: 'Escribir código 30 min', xp: 35, area: 'Programación' },
  { id: 4, text: 'Registrar gastos del día', xp: 20, area: 'Finanzas' },
  { id: 5, text: 'Llegar 5 min antes a todo', xp: 20, area: 'Hábitos' },
  { id: 6, text: 'meditar 10 min', xp: 20, area: 'Hábitos' },
];

const AREAS = [
  { name: 'Programación', color: '#7F77DD' },
  { name: 'Fitness',      color: '#D85A30' },
  { name: 'Estudio',      color: '#1D9E75' },
  { name: 'Finanzas',     color: '#639922' },
  { name: 'Hábitos',      color: '#BA7517' },
];

export default function HomeScreen() {
  const [done, setDone] = useState<number[]>([]);

  const toggle = (id: number) => {
    setDone(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const xpGanada = QUESTS
    .filter(q => done.includes(q.id))
    .reduce((sum, q) => sum + q.xp, 0);

  const xpTotal = 500;
  const xpPct = Math.round((xpGanada / xpTotal) * 100);

  return (
    <ScrollView style={s.screen} contentContainerStyle={s.content}>

      {/* Header */}
      <Text style={s.sysMsg}>— Sistema activo —</Text>

      {/* Player card */}
      <View style={s.playerCard}>
        <View style={s.avatarWrap}>
          <Text style={s.avatarLetter}>E</Text>
        </View>
        <View style={s.playerInfo}>
          <Text style={s.playerName}>Ari</Text>
          <View style={s.rankRow}>
            <View style={s.rankBadge}>
              <Text style={s.rankBadgeText}>Rango E</Text>
            </View>
            <Text style={s.rankSub}>Iniciado</Text>
          </View>
          <Text style={s.levelText}>Nivel 1</Text>
        </View>
      </View>

      {/* XP Bar */}
      <View style={s.xpSection}>
        <View style={s.xpLabelRow}>
          <Text style={s.xpLabel}>XP del rango</Text>
          <Text style={s.xpVal}>{xpGanada} / {xpTotal}</Text>
        </View>
        <View style={s.xpBg}>
          <View style={[s.xpFill, { width: `${xpPct}%` as any }]} />
        </View>
      </View>

      {/* Stats */}
      <Text style={s.sectionTitle}>Stats</Text>
      <View style={s.statsGrid}>
        {[
          { label: 'Fuerza',   val: 1 },
          { label: 'Intel.',   val: 1 },
          { label: 'Agilidad', val: 1 },
          { label: 'Percep.',  val: 1 },
          { label: 'Vital.',   val: 1 },
        ].map(stat => (
          <View key={stat.label} style={s.statCell}>
            <Text style={s.statVal}>{stat.val}</Text>
            <Text style={s.statLbl}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Quests */}
      <View style={s.questsHeader}>
        <Text style={s.sectionTitle}>Quests de hoy</Text>
        <Text style={s.questCount}>{done.length} / {QUESTS.length}</Text>
      </View>

      {QUESTS.map(q => (
        <TouchableOpacity
          key={q.id}
          style={[s.questCard, done.includes(q.id) && s.questDone]}
          onPress={() => toggle(q.id)}
          activeOpacity={0.7}
        >
          <View style={[s.checkbox, done.includes(q.id) && s.checkboxDone]}>
            {done.includes(q.id) && <Text style={s.checkmark}>✓</Text>}
          </View>
          <View style={s.questBody}>
            <Text style={[s.questText, done.includes(q.id) && s.questTextDone]}>
              {q.text}
            </Text>
            <Text style={s.questArea}>{q.area}</Text>
          </View>
          <Text style={[s.questXp, done.includes(q.id) && s.questXpDone]}>
            +{q.xp} XP
          </Text>
        </TouchableOpacity>
      ))}

      {/* Areas */}
      <Text style={[s.sectionTitle, { marginTop: 16 }]}>Áreas</Text>
      <View style={s.areasGrid}>
        {AREAS.map(a => (
          <View key={a.name} style={s.areaCard}>
            <Text style={s.areaName}>{a.name}</Text>
            <Text style={s.areaRank}>E</Text>
            <View style={s.areaBarBg}>
              <View style={[s.areaBar, { backgroundColor: a.color, width: '0%' }]} />
            </View>
          </View>
        ))}
      </View>

    </ScrollView>
  );
}

const s = StyleSheet.create({
  screen:   { flex: 1, backgroundColor: '#0e0c1a' },
  content:  { padding: 20, paddingBottom: 40 },

  sysMsg:   { color: '#534AB7', fontSize: 11, letterSpacing: 3, textAlign: 'center', marginBottom: 16, textTransform: 'uppercase' },
  sectionTitle: { color: '#4a4468', fontSize: 10, letterSpacing: 5, textTransform: 'uppercase', marginBottom: 8 },

  playerCard:   { backgroundColor: '#1a1730', borderRadius: 16, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14, borderWidth: 0.5, borderColor: '#2e2850' },
  avatarWrap:   { width: 46, height: 46, borderRadius: 14, backgroundColor: '#26215C', borderWidth: 1.5, borderColor: '#534AB7', alignItems: 'center', justifyContent: 'center' },
  avatarLetter: { color: '#AFA9EC', fontSize: 20, fontWeight: '500' },
  playerInfo:   { flex: 1 },
  playerName:   { color: '#e8e4f4', fontSize: 15, fontWeight: '500', marginBottom: 4 },
  rankRow:      { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 3 },
  rankBadge:    { backgroundColor: '#26215C', borderRadius: 20, paddingHorizontal: 8, paddingVertical: 2 },
  rankBadgeText:{ color: '#AFA9EC', fontSize: 10, fontWeight: '500' },
  rankSub:      { color: '#534AB7', fontSize: 10 },
  levelText:    { color: '#4a4468', fontSize: 12 },

  xpSection:  { marginBottom: 16 },
  xpLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  xpLabel:    { color: '#4a4468', fontSize: 11 },
  xpVal:      { color: '#7F77DD', fontSize: 11, fontWeight: '500' },
  xpBg:       { height: 6, backgroundColor: '#1a1730', borderRadius: 3 },
  xpFill:     { height: 6, backgroundColor: '#7F77DD', borderRadius: 3 },

  statsGrid:  { flexDirection: 'row', gap: 6, marginBottom: 16 },
  statCell:   { flex: 1, backgroundColor: '#1a1730', borderRadius: 10, padding: 8, alignItems: 'center', borderWidth: 0.5, borderColor: '#2a2540' },
  statVal:    { color: '#e8e4f4', fontSize: 15, fontWeight: '500' },
  statLbl:    { color: '#4a4468', fontSize: 9, marginTop: 2 },

  questsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  questCount:   { color: '#7F77DD', fontSize: 12 },
  questCard:    { backgroundColor: '#1a1730', borderRadius: 14, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 7, borderWidth: 0.5, borderColor: '#2a2540' },
  questDone:    { borderColor: '#0F6E56', backgroundColor: '#04180f' },
  checkbox:     { width: 20, height: 20, borderRadius: 6, borderWidth: 1, borderColor: '#3a3560', alignItems: 'center', justifyContent: 'center' },
  checkboxDone: { backgroundColor: '#0F6E56', borderColor: '#0F6E56' },
  checkmark:    { color: '#fff', fontSize: 11 },
  questBody:    { flex: 1 },
  questText:    { color: '#c4bede', fontSize: 13, fontWeight: '500' },
  questTextDone:{ textDecorationLine: 'line-through', color: '#2a5448' },
  questArea:    { color: '#4a4468', fontSize: 10, marginTop: 2 },
  questXp:      { color: '#534AB7', fontSize: 11, fontWeight: '500' },
  questXpDone:  { color: '#0F6E56' },

  areasGrid:  { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  areaCard:   { width: '47%', backgroundColor: '#1a1730', borderRadius: 12, padding: 10, borderWidth: 0.5, borderColor: '#2a2540' },
  areaName:   { color: '#c4bede', fontSize: 12, fontWeight: '500', marginBottom: 4 },
  areaRank:   { color: '#4a4468', fontSize: 10, marginBottom: 6 },
  areaBarBg:  { height: 3, backgroundColor: '#26215C', borderRadius: 2 },
  areaBar:    { height: 3, borderRadius: 2 },
});