const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function evaluarPrefijo(expresion) {
  let partes = expresion.split(" ");
  let stack = [];
  // Recorremos la expresión de derecha a izquierda
  for (let i = partes.length - 1; i >= 0; i--) {
    let c = partes[i];
    if (!isNaN(c)) {
      stack.push(parseInt(c));
    } else {
      let val1 = stack.pop();
      let val2 = stack.pop();
      switch (c) {
        case "+":
          stack.push(val1 + val2);
          break;
        case "-":
          stack.push(val1 - val2);
          break;
        case "*":
          stack.push(val1 * val2);
          break;
        case "/":
          stack.push(Math.floor(val1 / val2)); // Utiliza la división entera
          break;
      }
    }
  }
  return stack.pop();
}

function evaluarPostfijo(expresion) {
  let partes = expresion.split(" ");
  let stack = [];
  // Recorremos la expresión de izquierda a derecha
  for (let i = 0; i < partes.length; i++) {
    let c = partes[i];
    if (!isNaN(c)) {
      stack.push(parseInt(c));
    } else {
      let val2 = stack.pop();
      let val1 = stack.pop();
      switch (c) {
        case "+":
          stack.push(val1 + val2);
          break;
        case "-":
          stack.push(val1 - val2);
          break;
        case "*":
          stack.push(val1 * val2);
          break;
        case "/":
          stack.push(Math.floor(val1 / val2)); // Utiliza la división entera
          break;
      }
    }
  }
  return stack.pop();
}

function mostrarPrefijo(expresion) {
  let partes = expresion.split(" ");
  let stack = [];
  for (let i = partes.length - 1; i >= 0; i--) {
    let c = partes[i];
    if (!isNaN(c)) {
      stack.push(c);
    } else {
      let val2 = stack.pop();
      let val1 = stack.pop();
      if (c === "*" || c === "/") {
        if (val1.includes("+") || val1.includes("-")) {
          val1 = "(" + val1 + ")";
        }
        if (val2.includes("+") || val2.includes("-")) {
          val2 = "(" + val2 + ")";
        }
      }
      stack.push(val2 + " " + c + " " + val1);
    }
  }
  return stack.pop();
}

function mostrarPostfijo(expresion) {
  let partes = expresion.split(" ");
  let stack = [];
  for (let i = 0; i < partes.length; i++) {
    let c = partes[i];
    if (!isNaN(c)) {
      stack.push(c);
    } else {
      let val2 = stack.pop();
      let val1 = stack.pop();
      if (c === "*" || c === "/") {
        if (val1.includes("+") || val1.includes("-")) {
          val1 = "(" + val1 + ")";
        }
        if (val2.includes("+") || val2.includes("-")) {
          val2 = "(" + val2 + ")";
        }
      }
      stack.push(val1 + " " + c + " " + val2);
    }
  }
  return stack.pop();
}

rl.on("line", (line) => {
  const partes = line.split(" ");
  const comando = partes[0];
  const orden = partes[1];
  const expr = partes.slice(2).join(" ");

  switch (comando.toUpperCase()) {
    case "EVAL":
      if (orden.toUpperCase() === "PRE") {
        console.log(evaluarPrefijo(expr));
      } else if (orden.toUpperCase() === "POST") {
        console.log(evaluarPostfijo(expr));
      }
      break;
    case "MOSTRAR":
      if (orden.toUpperCase() === "PRE") {
        console.log(mostrarPrefijo(expr));
      } else if (orden.toUpperCase() === "POST") {
        console.log(mostrarPostfijo(expr));
      }
      break;
    case "SALIR":
      rl.close();
      break;
  }
});

module.exports = {
  evaluarPrefijo,
  evaluarPostfijo,
  mostrarPrefijo,
  mostrarPostfijo,
};
