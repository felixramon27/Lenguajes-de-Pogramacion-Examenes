const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let programas = {};
let interpretes = {};
let traductores = {};

function esEjecutable(lenguaje, visitados = {}) {
    if (lenguaje === 'LOCAL') {
      return true;
    }
    if (visitados[lenguaje]) {
      return false;
    }
    visitados[lenguaje] = true;
    if (interpretes[lenguaje]) {
      return esEjecutable(interpretes[lenguaje], visitados);
    }
    for (let key in traductores) {
      if (traductores[key].lenguajeDestino === lenguaje && esEjecutable(traductores[key].lenguajeBase, visitados) && esEjecutable(key, visitados)) {
        return true;
      }
    }
    return false;
}  

rl.on("line", (input) => {
  const args = input.split(" ");
  const command = args[0];

  switch (command) {
    case "DEFINIR":
      const tipo = args[1];
      if (tipo === "PROGRAMA") {
        const nombre = args[2];
        const lenguaje = args[3];
        if (programas[nombre]) {
          console.log(`Error: Ya existe un programa con el nombre ${nombre}`);
        } else {
          programas[nombre] = lenguaje;
        }
      } else if (tipo === "INTERPRETE") {
        const lenguajeBase = args[2];
        const lenguaje = args[3];
        interpretes[lenguaje] = lenguajeBase;
      } else if (tipo === "TRADUCTOR") {
        const lenguajeBase = args[2];
        const lenguajeOrigen = args[3];
        const lenguajeDestino = args[4];
        traductores[lenguajeOrigen] = { lenguajeBase, lenguajeDestino };
      }
      break;
    case "EJECUTABLE":
      const nombrePrograma = args[1];
      if (!programas[nombrePrograma]) {
        console.log(
          `Error: No existe un programa con el nombre ${nombrePrograma}`
        );
      } else {
        const lenguajePrograma = programas[nombrePrograma];
        if (esEjecutable(lenguajePrograma)) {
          console.log(`El programa ${nombrePrograma} es ejecutable`);
        } else {
          console.log(`El programa ${nombrePrograma} no es ejecutable`);
        }
      }
      break;
    case "SALIR":
      rl.close();
      break;
    default:
      console.log("Comando desconocido");
  }
});

console.log("Simulador iniciado. Por favor, introduce un comando:");
