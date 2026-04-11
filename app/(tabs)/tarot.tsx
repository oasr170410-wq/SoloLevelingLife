import { cargarTarot, guardarTarot, guardarXPTotal } from '@/utils/storage';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet, Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const CARTAS = [
  { name:'El Loco', num:'0', tipo:'mayor', derecho:'Nuevos comienzos, espontaneidad, libertad', invertido:'Impulsividad, riesgo sin planificación' },
  { name:'El Mago', num:'I', tipo:'mayor', derecho:'Voluntad, habilidad, manifestación', invertido:'Manipulación, talentos sin usar' },
  { name:'La Sacerdotisa', num:'II', tipo:'mayor', derecho:'Intuición, sabiduría interior, misterio', invertido:'Secretos, desconexión interior' },
  { name:'La Emperatriz', num:'III', tipo:'mayor', derecho:'Fertilidad, abundancia, creatividad', invertido:'Dependencia, bloqueo creativo' },
  { name:'El Emperador', num:'IV', tipo:'mayor', derecho:'Autoridad, estructura, disciplina', invertido:'Rigidez, control excesivo' },
  { name:'El Sumo Sacerdote', num:'V', tipo:'mayor', derecho:'Tradición, espiritualidad, guía', invertido:'Dogmatismo, rebeldía' },
  { name:'Los Enamorados', num:'VI', tipo:'mayor', derecho:'Amor, elección, alineación de valores', invertido:'Desalineación, malas decisiones' },
  { name:'El Carro', num:'VII', tipo:'mayor', derecho:'Control, victoria, determinación', invertido:'Falta de dirección, agresión' },
  { name:'La Fuerza', num:'VIII', tipo:'mayor', derecho:'Coraje, paciencia, compasión', invertido:'Inseguridad, duda interna' },
  { name:'El Ermitaño', num:'IX', tipo:'mayor', derecho:'Introspección, búsqueda interior, guía', invertido:'Aislamiento, rechazo a la ayuda' },
  { name:'La Rueda', num:'X', tipo:'mayor', derecho:'Ciclos, buena suerte, destino', invertido:'Mala suerte, resistencia al cambio' },
  { name:'La Justicia', num:'XI', tipo:'mayor', derecho:'Verdad, equidad, causa-efecto', invertido:'Injusticia, deshonestidad' },
  { name:'El Colgado', num:'XII', tipo:'mayor', derecho:'Pausa, rendición, nueva perspectiva', invertido:'Resistencia, sacrificio inútil' },
  { name:'La Muerte', num:'XIII', tipo:'mayor', derecho:'Transformación, fin de ciclo, cambio', invertido:'Resistencia al cambio, estancamiento' },
  { name:'La Templanza', num:'XIV', tipo:'mayor', derecho:'Equilibrio, moderación, paciencia', invertido:'Exceso, desbalance' },
  { name:'El Diablo', num:'XV', tipo:'mayor', derecho:'Sombra, ataduras, materialismo', invertido:'Liberación, recuperar el poder' },
  { name:'La Torre', num:'XVI', tipo:'mayor', derecho:'Caos súbito, revelación, ruptura', invertido:'Evitar el desastre, resistencia' },
  { name:'La Estrella', num:'XVII', tipo:'mayor', derecho:'Esperanza, fe, renovación', invertido:'Desesperanza, desconexión' },
  { name:'La Luna', num:'XVIII', tipo:'mayor', derecho:'Ilusión, miedo, subconsciente', invertido:'Liberación del miedo, claridad' },
  { name:'El Sol', num:'XIX', tipo:'mayor', derecho:'Alegría, éxito, vitalidad', invertido:'Negatividad, tristeza temporal' },
  { name:'El Juicio', num:'XX', tipo:'mayor', derecho:'Reflexión, renacer, llamado interior', invertido:'Duda, autojuicio severo' },
  { name:'El Mundo', num:'XXI', tipo:'mayor', derecho:'Completitud, logro, integración', invertido:'Incompletitud, falta de cierre' },
  { name:'As de Oros', num:'As', tipo:'menor', palo:'Oros', derecho:'Nueva oportunidad material', invertido:'Oportunidad perdida' },
  { name:'As de Copas', num:'As', tipo:'menor', palo:'Copas', derecho:'Nuevo amor, intuición', invertido:'Bloqueo emocional' },
  { name:'As de Espadas', num:'As', tipo:'menor', palo:'Espadas', derecho:'Claridad mental, verdad', invertido:'Confusión, ideas bloqueadas' },
  { name:'As de Bastos', num:'As', tipo:'menor', palo:'Bastos', derecho:'Inspiración, nuevo proyecto', invertido:'Energía bloqueada' },
  { name:'2 de Oros', num:'2', tipo:'menor', palo:'Oros', derecho:'Equilibrio, adaptabilidad', invertido:'Desorganización, sobrecarga' },
  { name:'2 de Copas', num:'2', tipo:'menor', palo:'Copas', derecho:'Unión, conexión, asociación', invertido:'Desequilibrio en relaciones' },
  { name:'2 de Espadas', num:'2', tipo:'menor', palo:'Espadas', derecho:'Decisión difícil, bloqueo', invertido:'Confusión, parálisis' },
  { name:'2 de Bastos', num:'2', tipo:'menor', palo:'Bastos', derecho:'Planificación, visión de futuro', invertido:'Falta de planificación' },
  { name:'3 de Oros', num:'3', tipo:'menor', palo:'Oros', derecho:'Trabajo en equipo, habilidad', invertido:'Falta de colaboración' },
  { name:'3 de Copas', num:'3', tipo:'menor', palo:'Copas', derecho:'Celebración, amistad, alegría', invertido:'Exceso, chismes' },
  { name:'3 de Espadas', num:'3', tipo:'menor', palo:'Espadas', derecho:'Dolor, separación, tristeza', invertido:'Recuperación, perdonar' },
  { name:'3 de Bastos', num:'3', tipo:'menor', palo:'Bastos', derecho:'Expansión, visión, liderazgo', invertido:'Retrasos, falta de visión' },
  { name:'4 de Oros', num:'4', tipo:'menor', palo:'Oros', derecho:'Seguridad, ahorro, control', invertido:'Avaricia, inseguridad' },
  { name:'4 de Copas', num:'4', tipo:'menor', palo:'Copas', derecho:'Meditación, apatía, introspección', invertido:'Nuevas oportunidades' },
  { name:'4 de Espadas', num:'4', tipo:'menor', palo:'Espadas', derecho:'Descanso, recuperación, pausa', invertido:'Agotamiento, no descansar' },
  { name:'4 de Bastos', num:'4', tipo:'menor', palo:'Bastos', derecho:'Celebración, hogar, armonía', invertido:'Inestabilidad en el hogar' },
  { name:'5 de Oros', num:'5', tipo:'menor', palo:'Oros', derecho:'Dificultad financiera, pérdida', invertido:'Recuperación económica' },
  { name:'5 de Copas', num:'5', tipo:'menor', palo:'Copas', derecho:'Pérdida, pena, arrepentimiento', invertido:'Aceptación, seguir adelante' },
  { name:'5 de Espadas', num:'5', tipo:'menor', palo:'Espadas', derecho:'Conflicto, derrota, deshonor', invertido:'Reconciliación, paz' },
  { name:'5 de Bastos', num:'5', tipo:'menor', palo:'Bastos', derecho:'Competencia, caos, lucha', invertido:'Evitar conflictos' },
  { name:'6 de Oros', num:'6', tipo:'menor', palo:'Oros', derecho:'Generosidad, dar y recibir', invertido:'Deuda, desigualdad' },
  { name:'6 de Copas', num:'6', tipo:'menor', palo:'Copas', derecho:'Nostalgia, infancia, inocencia', invertido:'Vivir en el pasado' },
  { name:'6 de Espadas', num:'6', tipo:'menor', palo:'Espadas', derecho:'Transición, alejarse, calma', invertido:'Resistencia al cambio' },
  { name:'6 de Bastos', num:'6', tipo:'menor', palo:'Bastos', derecho:'Victoria, reconocimiento, éxito', invertido:'Ego, falta de confianza' },
  { name:'7 de Oros', num:'7', tipo:'menor', palo:'Oros', derecho:'Paciencia, inversión, cosecha', invertido:'Impaciencia, trabajo sin frutos' },
  { name:'7 de Copas', num:'7', tipo:'menor', palo:'Copas', derecho:'Ilusiones, fantasías, elecciones', invertido:'Claridad, decisión' },
  { name:'7 de Espadas', num:'7', tipo:'menor', palo:'Espadas', derecho:'Engaño, estrategia, sigilo', invertido:'Confesión, consciencia' },
  { name:'7 de Bastos', num:'7', tipo:'menor', palo:'Bastos', derecho:'Desafío, perseverancia, defensa', invertido:'Rendirse, abrumado' },
  { name:'8 de Oros', num:'8', tipo:'menor', palo:'Oros', derecho:'Dedicación, aprendizaje, detalle', invertido:'Perfeccionismo, falta de foco' },
  { name:'8 de Copas', num:'8', tipo:'menor', palo:'Copas', derecho:'Abandono, búsqueda espiritual', invertido:'Miedo a dejar ir' },
  { name:'8 de Espadas', num:'8', tipo:'menor', palo:'Espadas', derecho:'Restricción, trampa mental, miedo', invertido:'Liberación, ver con claridad' },
  { name:'8 de Bastos', num:'8', tipo:'menor', palo:'Bastos', derecho:'Rapidez, acción, movimiento', invertido:'Retrasos, frustración' },
  { name:'9 de Oros', num:'9', tipo:'menor', palo:'Oros', derecho:'Abundancia, independencia, logro', invertido:'Dependencia, falsa riqueza' },
  { name:'9 de Copas', num:'9', tipo:'menor', palo:'Copas', derecho:'Satisfacción, deseos cumplidos', invertido:'Insatisfacción, exceso' },
  { name:'9 de Espadas', num:'9', tipo:'menor', palo:'Espadas', derecho:'Ansiedad, pesadillas, preocupación', invertido:'Esperanza, salir del miedo' },
  { name:'9 de Bastos', num:'9', tipo:'menor', palo:'Bastos', derecho:'Resiliencia, persistencia, guardia', invertido:'Paranoia, obstinación' },
  { name:'10 de Oros', num:'10', tipo:'menor', palo:'Oros', derecho:'Riqueza, familia, legado', invertido:'Pérdida familiar, deudas' },
  { name:'10 de Copas', num:'10', tipo:'menor', palo:'Copas', derecho:'Felicidad familiar, armonía', invertido:'Disfunción, valores rotos' },
  { name:'10 de Espadas', num:'10', tipo:'menor', palo:'Espadas', derecho:'Fin doloroso, traición, colapso', invertido:'Recuperación, resistir' },
  { name:'10 de Bastos', num:'10', tipo:'menor', palo:'Bastos', derecho:'Carga excesiva, responsabilidad', invertido:'Soltar cargas, delegar' },
  { name:'Sota de Oros', num:'J', tipo:'menor', palo:'Oros', derecho:'Oportunidad práctica, estudio', invertido:'Procrastinación, falta de foco' },
  { name:'Sota de Copas', num:'J', tipo:'menor', palo:'Copas', derecho:'Creatividad, intuición joven', invertido:'Inmadurez emocional' },
  { name:'Sota de Espadas', num:'J', tipo:'menor', palo:'Espadas', derecho:'Curiosidad, nuevas ideas, alerta', invertido:'Chismes, impulsividad' },
  { name:'Sota de Bastos', num:'J', tipo:'menor', palo:'Bastos', derecho:'Entusiasmo, aventura, energía', invertido:'Precipitación, falta de dirección' },
  { name:'Caballo de Oros', num:'K', tipo:'menor', palo:'Oros', derecho:'Trabajo duro, rutina, confiabilidad', invertido:'Pereza, obsesión con trabajo' },
  { name:'Caballo de Copas', num:'K', tipo:'menor', palo:'Copas', derecho:'Romance, encanto, imaginación', invertido:'Moodiness, decepciones' },
  { name:'Caballo de Espadas', num:'K', tipo:'menor', palo:'Espadas', derecho:'Ambición, acción rápida, impulso', invertido:'Impulsividad, agresión' },
  { name:'Caballo de Bastos', num:'K', tipo:'menor', palo:'Bastos', derecho:'Energía, pasión, aventura', invertido:'Impaciencia, inconstancia' },
  { name:'Reina de Oros', num:'Q', tipo:'menor', palo:'Oros', derecho:'Practicidad, abundancia, cuidado', invertido:'Inseguridad, descuido' },
  { name:'Reina de Copas', num:'Q', tipo:'menor', palo:'Copas', derecho:'Compasión, intuición, apoyo', invertido:'Dependencia emocional' },
  { name:'Reina de Espadas', num:'Q', tipo:'menor', palo:'Espadas', derecho:'Claridad, independencia, verdad', invertido:'Crueldad, aislamiento' },
  { name:'Reina de Bastos', num:'Q', tipo:'menor', palo:'Bastos', derecho:'Confianza, determinación, carisma', invertido:'Inseguridad, celos' },
  { name:'Rey de Oros', num:'R', tipo:'menor', palo:'Oros', derecho:'Prosperidad, liderazgo, disciplina', invertido:'Codicia, mal manejo' },
  { name:'Rey de Copas', num:'R', tipo:'menor', palo:'Copas', derecho:'Sabiduría emocional, diplomacia', invertido:'Manipulación, inestabilidad' },
  { name:'Rey de Espadas', num:'R', tipo:'menor', palo:'Espadas', derecho:'Autoridad intelectual, verdad', invertido:'Tiranía, abuso de poder' },
  { name:'Rey de Bastos', num:'R', tipo:'menor', palo:'Bastos', derecho:'Visión, emprendimiento, honor', invertido:'Impulsividad, expectativas altas' },
];

const QUESTS: Record<string, { derecho: string[], invertido: string[] }> = {
  'El Loco':   { derecho: ['Hacé algo que normalmente evitás por miedo','Escribí 3 cosas nuevas que querés probar','Salí a caminar sin destino 20 minutos'], invertido: ['Escribí una decisión impulsiva reciente y sus consecuencias','Antes de tu próxima decisión, anotá pros y contras','Meditá 10 minutos enfocándote en la respiración'] },
  'El Mago':   { derecho: ['Usá una habilidad tuya para resolver algo hoy','Escribí 5 talentos que tenés pero no usás','Completá una tarea pendiente de tu lista'], invertido: ['Dedicale 30 min a un talento abandonado','Escribí qué estás postergando y por qué','Hablá con alguien sobre tus metas reales'] },
  'La Torre':  { derecho: ['Escribí algo que querés dejar ir','Revisá un hábito que no te está funcionando','Estudiá el significado de La Torre en profundidad'], invertido: ['Identificá algo que sabés que va a cambiar','Escribí cómo te sentirías si ese cambio ya ocurrió','Hacé 15 min de ejercicio para liberar tensión'] },
  'El Sol':    { derecho: ['Escribí 3 logros recientes que no celebraste','Llamá a alguien que te alegra','Hacé algo creativo que te dé alegría hoy'], invertido: ['Escribí qué te está robando energía esta semana','Dormí al menos 8 horas esta noche','Salí a tomar sol 15 minutos hoy'] },
  'La Luna':   { derecho: ['Escribí un miedo y de dónde creés que viene','Estudiá qué simboliza La Luna en Rider-Waite','Anotá tus pensamientos antes de dormir'], invertido: ['Identificá una ilusión que estás manteniendo','Hablá con alguien de algo que te angustia','Meditá 10 minutos visualizando claridad'] },
  'La Muerte': { derecho: ['Escribí qué ciclo está terminando en tu vida','Tirá o doná algo que ya no necesitás','Reflexioná: ¿qué necesitás transformar?'], invertido: ['Escribí qué estás resistiendo cambiar','Hacé un pequeño cambio de rutina hoy','Estudiá la Muerte como transformación, no como fin'] },
  'El Mundo':  { derecho: ['Celebrá un logro reciente, aunque sea pequeño','Escribí 3 cosas que completaste este mes','Planificá tu próximo gran objetivo'], invertido: ['Identificá algo que dejaste sin terminar','Retomá una tarea incompleta importante','Reflexioná: ¿qué te falta para sentirte completo?'] },
  'default':   { derecho: ['Escribí en un diario qué mensaje te trajo esta carta','Estudiá el significado de esta carta en profundidad','Aplicá el mensaje de la carta a una situación real'], invertido: ['Reflexioná qué bloqueo interno señala esta carta','Escribí sin censura qué parte de vos resiste este mensaje','Meditá 10 minutos con la pregunta: ¿qué necesito soltar?'] },
};

type Carta = typeof CARTAS[0];

export default function TarotScreen() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Carta | null>(null);
  const [ori, setOri] = useState<'derecha'|'invertida'>('derecha');
  const [dungeon, setDungeon] = useState(false);
  const [done, setDone] = useState<boolean[]>([false, false, false]);
  const [xpSumado, setXpSumado] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      const saved = await cargarTarot();
      if (saved) {
        const carta = CARTAS.find(c => c.name === saved.carta);
        if (carta) {
          setSelected(carta);
          setOri(saved.orientacion as 'derecha'|'invertida');
          setDone(saved.questsDone);
          setDungeon(true);
          setXpSumado(true);
        }
      }
    };
    cargar();
  }, []);

  const filtered = search.length < 1
    ? CARTAS.slice(0, 12)
    : CARTAS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  const questKey = selected && QUESTS[selected.name] ? selected.name : 'default';
  const quests = selected ? QUESTS[questKey][ori === 'derecha' ? 'derecho' : 'invertido'] : [];
  const xpBonus = selected
    ? selected.tipo === 'mayor'
      ? ori === 'derecha' ? 90 : 110
      : ori === 'derecha' ? 60 : 75
    : 0;

  const toggleDone = async (i: number) => {
    const newDone = done.map((v, j) => j === i ? !v : v);
    setDone(newDone);
    if (selected) {
      const xpGanado = newDone.filter(Boolean).length * Math.round(xpBonus / 3);
      await guardarTarot({
        carta: selected.name,
        orientacion: ori,
        fecha: new Date().toDateString(),
        questsDone: newDone,
        xpGanado,
      });
      if (!xpSumado && newDone.filter(Boolean).length === 1) {
        setXpSumado(true);
      }
      if (newDone.every(Boolean) && !xpSumado) {
        await guardarXPTotal(xpBonus);
        setXpSumado(true);
      }
    }
  };

  const openDungeon = async () => {
    setDone([false, false, false]);
    setXpSumado(false);
    setDungeon(true);
    if (selected) {
      await guardarTarot({
        carta: selected.name,
        orientacion: ori,
        fecha: new Date().toDateString(),
        questsDone: [false, false, false],
        xpGanado: 0,
      });
    }
  };

  const xpCompletado = done.filter(Boolean).length * Math.round(xpBonus / 3);

  return (
    <ScrollView style={s.screen} contentContainerStyle={s.content}>

      <Text style={s.sysMsg}>— Dungeon del día —</Text>

      {!dungeon ? (
        <>
          <Text style={s.sectionTitle}>Buscá tu carta</Text>
          <TextInput
            style={s.searchInput}
            placeholder="Nombre de la carta..."
            placeholderTextColor="#4a4468"
            value={search}
            onChangeText={setSearch}
          />

          <View style={s.cardGrid}>
            {filtered.map((c, i) => (
              <TouchableOpacity
                key={i}
                style={[s.cardBtn, selected?.name === c.name && s.cardBtnSelected]}
                onPress={() => { setSelected(c); setDungeon(false); }}
                activeOpacity={0.7}
              >
                <Text style={s.cardName}>{c.name}</Text>
                <Text style={s.cardSub}>
                  {c.tipo === 'mayor' ? 'Arcano Mayor' : 'Menor · ' + (c as any).palo}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {selected && (
            <View style={s.oriPanel}>
              <Text style={s.sectionTitle}>¿Cómo salió?</Text>
              <View style={s.oriRow}>
                <TouchableOpacity
                  style={[s.oriBtn, ori === 'derecha' && s.oriBtnActive]}
                  onPress={() => setOri('derecha')}
                >
                  <Text style={[s.oriBtnText, ori === 'derecha' && s.oriBtnTextActive]}>Al derecho</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[s.oriBtn, ori === 'invertida' && s.oriBtnActive]}
                  onPress={() => setOri('invertida')}
                >
                  <Text style={[s.oriBtnText, ori === 'invertida' && s.oriBtnTextActive]}>Invertida</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={s.openBtn} onPress={openDungeon} activeOpacity={0.8}>
                <Text style={s.openBtnText}>Abrir dungeon del día →</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      ) : (
        <View style={s.dungeonCard}>
          <Text style={s.dungeonSys}>— Dungeon especial —</Text>
          <Text style={s.dungeonName}>{selected?.name}</Text>
          <Text style={s.dungeonOri}>
            {ori === 'derecha' ? 'Al derecho' : 'Invertida'} · {selected?.tipo === 'mayor' ? 'Arcano Mayor' : 'Arcano Menor'}
          </Text>
          <Text style={s.dungeonMeaning}>
            {ori === 'derecha' ? selected?.derecho : selected?.invertido}
          </Text>

          <View style={s.xpRow}>
            <Text style={s.xpLabel}>XP bonus ganada hoy</Text>
            <Text style={s.xpVal}>{xpCompletado} / {xpBonus}</Text>
          </View>
          <View style={s.xpBg}>
            <View style={[s.xpFill, { width: `${Math.round(xpCompletado / xpBonus * 100)}%` as any }]} />
          </View>

          <Text style={[s.sectionTitle, { marginTop: 14 }]}>Quests bonus</Text>
          {quests.map((q, i: number) => (
            <TouchableOpacity
              key={i}
              style={s.questBonus}
              onPress={() => toggleDone(i)}
              activeOpacity={0.7}
            >
              <View style={[s.qbCheck, done[i] && s.qbCheckDone]}>
                {done[i] && <Text style={s.qbCheckMark}>✓</Text>}
              </View>
              <Text style={[s.qbText, done[i] && s.qbTextDone]}>{q}</Text>
              <Text style={s.qbXp}>+{Math.round(xpBonus / 3)} XP</Text>
            </TouchableOpacity>
          ))}

          {done.every(Boolean) && (
            <View style={s.completadoBox}>
              <Text style={s.completadoText}>¡Dungeon completado! +{xpBonus} XP sumados al rango</Text>
            </View>
          )}

          <TouchableOpacity
            style={[s.openBtn, { marginTop: 14 }]}
            onPress={() => { setDungeon(false); setSelected(null); setSearch(''); }}
            activeOpacity={0.8}
          >
            <Text style={s.openBtnText}>Cambiar carta</Text>
          </TouchableOpacity>
        </View>
      )}

    </ScrollView>
  );
}

const s = StyleSheet.create({
  screen:          { flex: 1, backgroundColor: '#0e0c1a' },
  content:         { padding: 20, paddingBottom: 40 },
  sysMsg:          { color: '#534AB7', fontSize: 11, letterSpacing: 3, textAlign: 'center', marginBottom: 16, textTransform: 'uppercase' },
  sectionTitle:    { color: '#4a4468', fontSize: 10, letterSpacing: 5, textTransform: 'uppercase', marginBottom: 8 },
  searchInput:     { backgroundColor: '#1a1730', borderRadius: 10, borderWidth: 0.5, borderColor: '#2a2540', color: '#e8e4f4', fontSize: 13, padding: 10, marginBottom: 10 },
  cardGrid:        { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 },
  cardBtn:         { width: '47%', backgroundColor: '#1a1730', borderRadius: 10, padding: 10, borderWidth: 0.5, borderColor: '#2a2540' },
  cardBtnSelected: { borderColor: '#7F77DD', backgroundColor: '#1c1838' },
  cardName:        { color: '#c4bede', fontSize: 12, fontWeight: '500', marginBottom: 2 },
  cardSub:         { color: '#4a4468', fontSize: 10 },
  oriPanel:        { backgroundColor: '#1a1730', borderRadius: 14, padding: 14, borderWidth: 0.5, borderColor: '#2e2850', marginBottom: 10 },
  oriRow:          { flexDirection: 'row', gap: 8, marginBottom: 12 },
  oriBtn:          { flex: 1, padding: 9, borderRadius: 10, borderWidth: 0.5, borderColor: '#2a2540', alignItems: 'center' },
  oriBtnActive:    { backgroundColor: '#26215C', borderColor: '#7F77DD' },
  oriBtnText:      { fontSize: 13, color: '#6b6480' },
  oriBtnTextActive:{ color: '#AFA9EC', fontWeight: '500' },
  openBtn:         { backgroundColor: '#26215C', borderRadius: 10, padding: 12, alignItems: 'center' },
  openBtnText:     { color: '#AFA9EC', fontSize: 13, fontWeight: '500' },
  dungeonCard:     { backgroundColor: '#131025', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#2e2850' },
  dungeonSys:      { color: '#534AB7', fontSize: 10, letterSpacing: 4, textAlign: 'center', marginBottom: 8, textTransform: 'uppercase' },
  dungeonName:     { color: '#e8e4f4', fontSize: 22, fontWeight: '500', textAlign: 'center', marginBottom: 4 },
  dungeonOri:      { color: '#4a4468', fontSize: 11, textAlign: 'center', marginBottom: 10 },
  dungeonMeaning:  { color: '#6b6480', fontSize: 12, textAlign: 'center', lineHeight: 20, marginBottom: 14, paddingHorizontal: 8 },
  xpRow:           { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  xpLabel:         { color: '#4a4468', fontSize: 11 },
  xpVal:           { color: '#7F77DD', fontSize: 11, fontWeight: '500' },
  xpBg:            { height: 5, backgroundColor: '#26215C', borderRadius: 3, marginBottom: 14 },
  xpFill:          { height: 5, backgroundColor: '#7F77DD', borderRadius: 3 },
  questBonus:      { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingVertical: 9, borderBottomWidth: 0.5, borderBottomColor: '#1f1c35' },
  qbCheck:         { width: 17, height: 17, borderRadius: 4, borderWidth: 1, borderColor: '#3a3560', alignItems: 'center', justifyContent: 'center', marginTop: 1 },
  qbCheckDone:     { backgroundColor: '#7F77DD', borderColor: '#7F77DD' },
  qbCheckMark:     { color: '#fff', fontSize: 10 },
  qbText:          { flex: 1, color: '#c4bede', fontSize: 12, lineHeight: 18 },
  qbTextDone:      { textDecorationLine: 'line-through', color: '#3a3060' },
  qbXp:            { color: '#534AB7', fontSize: 10, fontWeight: '500' },
  completadoBox:   { backgroundColor: '#04180f', borderRadius: 10, padding: 10, marginTop: 12, alignItems: 'center' },
  completadoText:  { color: '#1D9E75', fontSize: 12, fontWeight: '500', textAlign: 'center' },
});