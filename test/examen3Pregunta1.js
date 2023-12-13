// Definición de la clase abstracta Secuencia
class Secuencia {
    constructor() {
        this.elementos = [];
    }

    agregar(elemento) {
        this.elementos.push(elemento);
    }

    remover() {
        if (this.vacio()) {
            throw new Error("La secuencia está vacía");
        }
    }

    vacio() {
        return this.elementos.length === 0;
    }
}

// Definición de la clase Pila
class Pila extends Secuencia {
    remover() {
        super.remover();
        return this.elementos.pop();
    }
}

// Definición de la clase Cola
class Cola extends Secuencia {
    remover() {
        super.remover();
        return this.elementos.shift();
    }
}

// Definición del tipo de datos Grafo
class Grafo {
    constructor() {
        this.nodos = new Map();
    }

    agregarNodo(nodo) {
        this.nodos.set(nodo, []);
    }

    agregarArista(origen, destino) {
        this.nodos.get(origen).push(destino);
        this.nodos.get(destino).push(origen);
    }
}

// Definición de la clase abstracta Busqueda
class Busqueda {
    constructor(grafo, inicio, objetivo) {
        if (!Number.isInteger(inicio) || !Number.isInteger(objetivo)) {
            throw new Error("Los nodos deben ser números enteros");
        }
        this.grafo = grafo;
        this.inicio = inicio;
        this.objetivo = objetivo;
        this.visitados = new Set();
        this.secuencia = this.crearSecuencia();
    }

    // Método para crear la secuencia (Pila o Cola)
    // Este método esta implementado por las subclases
    crearSecuencia() {
        throw new Error("Método 'crearSecuencia' no implementado");
    }

    buscar() {
        this.secuencia.agregar(this.inicio);

        while (!this.secuencia.vacio()) {
            let nodoActual = this.secuencia.remover();

            if (nodoActual === this.objetivo) {
                return this.visitados.size;
            }

            if (!this.visitados.has(nodoActual)) {
                this.visitados.add(nodoActual);

                let vecinos = this.grafo.nodos.get(nodoActual);
                vecinos.forEach(vecino => {
                    this.secuencia.agregar(vecino);
                });
            }
        }

        return -1;
    }
}

// Definición de la clase DFS
class DFS extends Busqueda {
    crearSecuencia() {
        return new Pila();
    }
}

// Definición de la clase BFS
class BFS extends Busqueda {
    crearSecuencia() {
        return new Cola();
    }
}

// Prueba del Programa
// Crear un nuevo grafo
let grafo = new Grafo();
grafo.agregarNodo(1);
grafo.agregarNodo(2);
grafo.agregarNodo(3);
grafo.agregarNodo(4);
grafo.agregarArista(1, 2);
grafo.agregarArista(1, 3);
grafo.agregarArista(2, 4);
grafo.agregarArista(3, 4);

// Realizar una búsqueda DFS
let dfs = new DFS(grafo, 1, 4);
console.log(`DFS: ${dfs.buscar()}`);

// Realizar una búsqueda BFS
let bfs = new BFS(grafo, 1, 4);
console.log(`BFS: ${bfs.buscar()}`);
