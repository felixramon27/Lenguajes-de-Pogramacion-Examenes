class Clase {
  constructor(nombre, superClase, metodos) {
    this.nombre = nombre;
    this.superClase = superClase;
    this.metodos = metodos;
  }
}

let clases = {};

function agregarClase(nombre, metodos) {
  let superClase = metodos.includes(":") ? metodos[1].trim() : null;
  let partes = nombre.split(":");
  if (partes.length > 1) {
    nombre = partes[0].trim();
    // superClase = metodos[1].trim();
    if (!clases[superClase]) {
      console.error("Error: La clase super no existe.");
      return;
    }
  }

  if (clases[nombre]) {
    console.error("Error: El nombre de la clase ya existe.");
    return;
  }

  // Verificar si hay métodos duplicados
  metodos = metodos.map((metodo) => metodo.trim());
  let metodosUnicos = [...new Set(metodos)];
  if (metodosUnicos.length !== metodos.length) {
    console.error(
      "Error: Hay definiciones repetidas en la lista de nombres de métodos."
    );
    return;
  }

  clases[nombre] = new Clase(
    nombre,
    superClase,
    metodosUnicos.includes(":")
      ? metodosUnicos.filter((x) => x !== ":" && x !== superClase)
      : metodosUnicos
  );
}

function describir(nombre) {
  if (!clases[nombre]) {
    console.error("Error: El nombre del tipo no existe.");
    return;
  }

  let resultado = {};
  let actual = nombre;
  while (actual) {
    let clase = clases[actual];
    clase.metodos.forEach((metodo) => {
      if (!resultado[metodo]) {
        resultado[metodo] = clase.nombre;
      }
    });
    actual = clase.superClase;
  }

  Object.keys(resultado)
    .sort()
    .forEach((metodo) =>
      console.log(`${metodo} -> ${resultado[metodo]} :: ${metodo}`)
    );
}

const readline = require("readline");

function iniciar() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const preguntar = () => {
    rl.question("Por favor, introduce una acción: ", (input) => {
      let partes = input.trim().split(" ");
      let comando = partes.shift().toUpperCase();

      switch (comando) {
        case "CLASS":
          let nombre = partes.shift();
          agregarClase(nombre, partes.join(" ").split(" "));
          break;
        case "DESCRIBIR":
          describir(partes.shift());
          break;
        case "SALIR":
          rl.close();
          break;
        default:
          console.error("Error: Comando desconocido.");
          preguntar();
          break;
      }

      if (comando !== "SALIR") {
        preguntar();
      }
    });
  };

  preguntar();

  rl.on("close", () => {
    console.log("Simulador finalizado.");
    process.exit(0);
  });
}

iniciar();

module.exports = { Clase, agregarClase, describir, clases };