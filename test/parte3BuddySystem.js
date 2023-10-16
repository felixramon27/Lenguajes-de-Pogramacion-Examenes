// Importamos el módulo 'readline' para interactuar con la entrada y salida estándar
const readline = require('readline');
// Creamos una interfaz de readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Inicializamos la memoria y el objeto de reservas
let memory = [];
let reserved = {};

// Esta función inicializa la memoria con la cantidad de bloques especificada
function initializeMemory(blocks) {
  memory = new Array(Number(blocks)).fill(0);
}

// Esta función busca un espacio libre contiguo en la memoria que sea lo suficientemente grande para los bloques requeridos
function findFreeSpace(blocks) {
    let start = -1;
    let count = 0;
    for (let i = 0; i < memory.length; i++) {
      if (memory[i] === 0) {
        if (start === -1) start = i;
        count++;
        if (count === blocks) return start;
      } else {
        start = -1;
        count = 0;
      }
    }
    return (count >= blocks) ? start : -1;
}
  
// Esta función reserva bloques de memoria con el nombre indicado
function reserve(blocks, name) {
  if (reserved[name]) {
    console.log(`Error: Ya existe memoria reservada con el nombre ${name}`);
    return;
  }

  let start = findFreeSpace(blocks);
  if (start === -1) {
    console.log(`Error: No hay suficiente espacio libre contiguo para reservar ${blocks} bloques`);
    return;
  }

  for (let i = start; i < start + blocks; i++) {
    memory[i] = name;
  }
  reserved[name] = { start, blocks };
}

// Esta función libera bloques de memoria reservados
function release(name) {
  if (!reserved[name]) {
    console.log(`Error: No existe memoria reservada con el nombre ${name}`);
    return;
  }

  let { start, blocks } = reserved[name];
  for (let i = start; i < start + blocks; i++) {
    memory[i] = 0;
  }
  delete reserved[name];
}

// Esta función muestra el estado actual de la memoria y las reservas
function show() {
  console.log('Memoria:', memory.join(' '));
  console.log('Reservado:', JSON.stringify(reserved, null, 2));
}

// Esta función solicita una acción al usuario y realiza las que existan, las que no, manda un mensaje al usuario diciendo que la accion no existe 
function prompt() {
  rl.question('Ingrese una acción: ', (action) => {
    let parts = action.split(' ');
    switch (parts[0].toUpperCase()) {
      case 'RESERVAR':
        reserve(parseInt(parts[1]), parts[2]);
        break;
      case 'LIBERAR':
        release(parts[1]);
        break;
      case 'MOSTRAR':
        show();
        break;
      case 'SALIR':
        rl.close();
        return;
      default:
        console.log('Acción desconocida');
    }
    prompt();
  });
}
// Inicializamos la memoria y comenzamos a solicitar acciones al usuario, si no se pasa la cantidad de memoria a manejar antes de ejecutar el programa, por defecto reserva 15
initializeMemory(process.argv[2] || 15);
prompt();

module.exports = {
    initializeMemory,
    reserve,
    release,
    show,
    memory,
    reserved
};

// Aquí te proporciono algunos ejemplos de cómo puedes probar este programa:

// 1- Inicia el programa con node parte3BuddySystem.js 20. Esto inicializará la memoria con 20 bloques.
// 2- Escribe mostrar para ver el estado actual de la memoria. Deberías ver 20 ceros.
// 3- Escribe reservar 5 pepe. Esto reservará 5 bloques para “pepe”.
// 4- Escribe mostrar nuevamente. Ahora deberías ver 5 “pepe” seguidos de 15 ceros.
// 5- Escribe reservar 10 juan. Esto reservará 10 bloques para “juan”.
// 6- Escribe mostrar nuevamente. Ahora deberías ver 5 “pepe”, seguidos de 10 “juan”, seguidos de 5 ceros.
// 7- Escribe liberar pepe. Esto liberará los bloques reservados para “pepe”.
// 8- Escribe mostrar nuevamente. Ahora deberías ver 5 ceros, seguidos de 10 “juan”, seguidos de 5 ceros.
// 9- Escribe salir para salir del programa.