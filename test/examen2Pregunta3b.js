const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "Por favor, introduce una lista de números separados por comas (Por ejemplo: 1,4,3,2,5): ",
  (listaUsuario) => {
    let lista = listaUsuario.split(",").map(Number);

    function crecienteSublistas(lista) {
      if (lista.length === 0) {
        return [[]];
      }

      let sublistas = [];
      let primerElemento = lista[0];
      let sublistasRestantes = crecienteSublistas(lista.slice(1));

      sublistasRestantes.forEach((sublista) => {
        if (sublista.length === 0 || sublista[0] >= primerElemento) {
          sublistas.push([primerElemento, ...sublista]);
        }
      });

      return sublistas.concat(sublistasRestantes);
    }

    let sublistas = crecienteSublistas(lista);

    sublistas.forEach((sublista) => {
      console.log(sublista);
    });

    rl.close();
  }
);
