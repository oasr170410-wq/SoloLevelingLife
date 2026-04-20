const nombreCazador = "Ari"
const rangoActual = "Rango E"
let xpActual = 160
const xpParaSubir = 500
let nivel = 1

const questsDisponibles = [
  "10 minutos meditación mañana",
  "Estudiar 30 min", 
  "Escribir código 30 min",
  "Registrar gastos",
  "10 min meditacion tarde"
]

const questsCompletadas = [1, 3]
let dungeonAbierto = false

console.log("Cazador:", nombreCazador)
console.log("Rango:", rangoActual)
console.log("XP:", xpActual, "/", xpParaSubir)
console.log("Quests disponibles:", questsDisponibles.length)
console.log("Quests completadas:", questsCompletadas)
console.log("Dungeon abierto:", dungeonAbierto)


const quests = ["Ejercicio", "Estudio", "Código", "Gastos", "Puntualidad"]

console.log("Primera quest:", quests[0])
console.log("Última quest:", quests[quests.length - 1])
console.log("Total:", quests.length)

quests.push("Meditación")
console.log("Con meditación:", quests)

console.log("¿Existe Código?", quests.includes("Código"))
console.log("¿Existe Tarot?", quests.includes("Tarot"))