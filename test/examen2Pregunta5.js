const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Tipo {
  constructor(nombre, representacion, alineacion) {
    this.nombre = nombre;
    this.representacion = representacion;
    this.alineacion = alineacion;
  }
}

class Manejador {
  constructor() {
    this.tipos = {};
  }

  atomico(nombre, representacion, alineacion) {
    if (this.tipos[nombre]) {
      console.error(
        "Error: El nombre ya corresponde a algún tipo creado en el programa."
      );
      return;
    }
    this.tipos[nombre] = new Tipo(nombre, representacion, alineacion);
  }

  struct(nombre, tipos) {
    if (this.tipos[nombre]) {
      console.error(
        "Error: El nombre ya corresponde a algún tipo creado en el programa."
      );
      return;
    }
    for (let tipo of tipos) {
      if (!this.tipos[tipo]) {
        console.error(`Error: El tipo ${tipo} no ha sido definido.`);
        return;
      }
    }
    // Almacena los tipos dentro de un objeto, al igual que en union()
    this.tipos[nombre] = { tipos: tipos, esRegistroVariante: false };
  }

  union(nombre, tipos) {
    if (this.tipos[nombre]) {
      console.error(
        "Error: El nombre ya corresponde a algún tipo creado en el programa."
      );
      return;
    }
    for (let tipo of tipos) {
      if (!this.tipos[tipo]) {
        console.error(`Error: El tipo ${tipo} no ha sido definido.`);
        return;
      }
    }
    // Agrega una propiedad para indicar que este es un registro variante
    this.tipos[nombre] = { tipos: tipos, esRegistroVariante: true };
  }

  describir(nombre) {
    if (!this.tipos[nombre]) {
      console.error(
        "Error: El nombre no corresponde a algún tipo creado en el programa."
      );
      return;
    }
    let tipo = this.tipos[nombre];
    let resultado;
    if (tipo instanceof Tipo) {
      resultado = `Tipo: ${tipo.nombre}, Tamaño: ${tipo.representacion}, Representación: ${tipo.representacion}, Alineación: ${tipo.alineacion}, Bytes desperdiciados: 0`;
    } else {
      let representacion = 0;
      let alineacion = 0;
      let tamaño = 0;
      let esRegistroVariante = tipo.esRegistroVariante;
      for (let nombreTipo of tipo.tipos) {
        let tipoObjeto = this.tipos[nombreTipo];
        if (esRegistroVariante) {
          // Para un registro variante, la representación es la del campo más grande
          representacion = Math.max(representacion, tipoObjeto.representacion);
        } else {
          // Para un registro, la representación es la suma de las representaciones de sus campos
          representacion += tipoObjeto.representacion;
        }
        alineacion = Math.max(alineacion, tipoObjeto.alineacion);
        tamaño += tipoObjeto.representacion;
      }
      let bytesDesperdiciados = tamaño % alineacion;
      resultado = `Tipo: ${nombre}, Tamaño: ${tamaño}, Representación: ${representacion}, Alineación: ${alineacion}, Bytes desperdiciados: ${bytesDesperdiciados}`;
    }
    console.log(resultado);
    return resultado;
  }
}

let manejador = new Manejador();

function pedirAccion() {
  rl.question("Por favor, introduce una acción: ", (accion) => {
    let partes = accion.split(" ");
    let comando = partes[0];
    let nombre = partes[1];
    switch (comando) {
      case "ATOMICO":
        let representacion = parseInt(partes[2]);
        let alineacion = parseInt(partes[3]);
        manejador.atomico(nombre, representacion, alineacion);
        break;
      case "STRUCT":
        let tipos = partes.slice(2);
        manejador.struct(nombre, tipos);
        break;
      case "UNION":
        tipos = partes.slice(2);
        manejador.union(nombre, tipos);
        break;
      case "DESCRIBIR":
        manejador.describir(nombre);
        break;
      case "SALIR":
        rl.close();
        return;
      default:
        console.error("Error: Acción no reconocida.");
    }
    pedirAccion();
  });
}

pedirAccion();

module.exports = { Tipo, Manejador };
