const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

class Expresion {
    constructor(nombre) {
        this.nombre = nombre;
    }
}

class Atomo extends Expresion {
    constructor(nombre) {
        super(nombre);
        this.tipo = "Atomo";
    }
}

class Variable extends Expresion {
    constructor(nombre) {
        super(nombre);
        this.tipo = "Variable";
    }
}

class Estructura extends Expresion {
    constructor(nombre, expresiones) {
        super(nombre);
        this.tipo = "Estructura";
        this.expresiones = expresiones;
    }
}

class Hecho {
    constructor(expresion) {
        this.expresion = expresion;
    }
}

class Regla {
    constructor(consecuente, antecedentes) {
        this.consecuente = consecuente;
        this.antecedentes = antecedentes;
    }
}

let hechos = [];
let reglas = [];

function interprete(prologStr) {
    let partes = prologStr.split('(');
    let nombre = partes[0];
    if (nombre[0] === nombre[0].toUpperCase()) {
        return new Variable(nombre);
    } else if (partes.length === 1) {
        return new Atomo(nombre);
    } else {
        let expresiones = partes[1].split(')')[0].split(', ').map(interprete);
        return new Estructura(nombre, expresiones);
    }
}

function def(expresiones) {
    if (expresiones.length === 1) {
        hechos.push(new Hecho(expresiones[0]));
    } else {
        reglas.push(new Regla(expresiones[0], expresiones.slice(1)));
    }
}

function unificar(expresion1, expresion2, unificaciones) {
    if (expresion1.nombre === expresion2.nombre) {
        return unificaciones;
    } else if (expresion1 instanceof Variable) {
        unificaciones[expresion1.nombre] = expresion2;
        return unificaciones;
    } else if (expresion2 instanceof Variable) {
        unificaciones[expresion2.nombre] = expresion1;
        return unificaciones;
    } else if (expresion1 instanceof Estructura && expresion2 instanceof Estructura) {
        if (expresion1.expresiones.length !== expresion2.expresiones.length) {
            return null;
        }
        for (let i = 0; i < expresion1.expresiones.length; i++) {
            unificaciones = unificar(expresion1.expresiones[i], expresion2.expresiones[i], unificaciones);
            if (unificaciones === null) {
                return null;
            }
        }
        return unificaciones;
    } else {
        return null;
    }
}

function askQuestion(query) {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => readline.question(query, ans => {
        readline.close();
        resolve(ans);
    }))
}

async function ask(expresion) {
    // Buscar en la lista de hechos
    for (let hecho of hechos) {
        let unificaciones = unificar(hecho.expresion, expresion, {});
        if (unificaciones !== null) {
            console.log(`Hecho encontrado: ${hecho.expresion.nombre}, Unificaciones: ${JSON.stringify(unificaciones)}`);
            let respuesta = await askQuestion('¿Deseas aceptar este resultado? (S/N): ');
            if (respuesta.toUpperCase() === 'S') {
                console.log('Consulta aceptada');
                return;
            } else {
                console.log('Continuando la búsqueda...');
            }
        }
    }

    // Buscar en la lista de reglas
    for (let regla of reglas) {
        let unificaciones = unificar(regla.consecuente, expresion, {});
        if (unificaciones !== null) {
            console.log(`Regla encontrada: ${regla.consecuente.nombre}, Unificaciones: ${JSON.stringify(unificaciones)}`);
            let respuesta = await askQuestion('¿Deseas aceptar este resultado? (S/N): ');
            if (respuesta.toUpperCase() === 'S') {
                console.log('Consulta aceptada');
                return;
            } else {
                console.log('Continuando la búsqueda...');
            }
        }
    }

    console.log('No se encontró ningún hecho o regla que coincida con la expresión.');
}

function iniciarPrograma() {
    function pedirAccion() {
        readline.question('Introduce una acción: ', (accion) => {
            let partes = accion.split(' ');
            let comando = partes[0];
            switch (comando) {
                case "DEF":
                case "ASK":
                    if (partes.length < 2) {
                        console.log('Formato de entrada incorrecto. Por favor, introduce una acción válida.');
                        pedirAccion();
                        return;
                    }
                    let expresiones = partes.slice(1).join(' ').split(',').map(s => s.trim()).map(interprete);
                    if (comando === "DEF") {
                        def(expresiones);
                        console.log(`Se definió el hecho '${expresiones[0].nombre}'`);
                    } else if (comando === "ASK") {
                        let resultado = ask(expresiones[0]);
                        if (resultado) {
                            console.log(`Satisfacible, cuando '${resultado}'`);
                        } else {
                            console.log('No es satisfacible');
                        }
                    }
                    break;
                case "SALIR":
                    readline.close();
                    return;
                default:
                    console.log('Comando desconocido. Por favor, introduce una acción válida.');
            }
            pedirAccion();
        });
    }

    pedirAccion();
}

iniciarPrograma();