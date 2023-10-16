//Se necesita open System para poder pedir por consola los datos de la funcion main
open System
// Rotacion de palabras
let rec rotar w k = 
    match w, k with
    //casos de la funcion
    | _, 0 -> w
    | "", _ -> ""
    | _ ->
        let a = w.[0]
        let x = w.Substring(1)
        rotar (x + a.ToString()) (k - 1)

//pruebas para ver la correctitud de la funcion 
// rotar "" 1
// rotar "hola" 0
// rotar "hola" 1
// rotar "hola" 2
// rotar "hola" 3
// rotar "hola" 4
// rotar "hola" 5

// Producto de Matriz
// Aqui se obtiene la transpuesta
let transpuesta (matriz: int[][]) =
    Array.init (matriz.Length) (fun i -> Array.init (matriz.Length) (fun j -> matriz.[j].[i]))

// Aqui se crea la funcion para multiplicar matrices  
let producto (matrizA: int[][]) (matrizB: int[][]) =
    Array.init matrizA.Length (fun i ->
        Array.init matrizB.Length (fun j ->
            Array.fold2 (fun acc (x: int) (y: int) -> acc + x * y) 0 matrizA.[i] matrizB.[j]
        )
    )

//Aqui se multiplica la matriz por su transpuesta
let productoPorTranspuesta (matriz: int[][]) =
    let matrizT = transpuesta matriz
    producto matriz matrizT

// let resultadoRotacion = rotar "hola" 2
// printfn "%s" resultadoRotacion

// let matriz = [| [| 1; 2; 3 |]; [| 4; 5; 6 |]; [| 7; 8; 9 |] |]
// let resultadoProducto = productoPorTranspuesta matriz
// resultadoProducto |> Array.iter (fun fila -> fila |> Array.iter (printf "%d "); printfn "")

let leerMatriz () =
    printfn "Por favor, introduce el tamaño de la matriz:"
    let n = Console.ReadLine() |> int
    printfn "Ahora introduce las filas de la matriz una por una, separando los números con espacios:"
    let matriz = Array.init n (fun _ ->
        Console.ReadLine()
        |> fun linea -> linea.Split(' ')
        |> Array.map int
    )
    matriz

// Aqui se crea la funcion main donde se le pide al usuario las funciones a ejecutar
let rec main () =
    printfn "Por favor, introduce el nombre de la función que deseas ejecutar (o escribe 'salir' para terminar):"
    printfn "Las dos funciones son rotar y productoPorTranspuesta"
    let funcion = Console.ReadLine()
    match funcion with
    | "salir" -> 
        printfn "¡Hasta luego! :)"
    | "rotar" ->
        printfn "Introduce la cadena a rotar:"
        let cadena = Console.ReadLine()
        printfn "Introduce el número de posiciones a rotar:"
        let k = Console.ReadLine() |> int
        let resultado = rotar cadena k
        printfn "El resultado es: %s" resultado
    | "productoPorTranspuesta" ->
        let matriz = leerMatriz ()
        let resultado = productoPorTranspuesta matriz
        printfn "El resultado de la multiplicacion de la matriz por su transpuesta es: %A" resultado
    | _ ->
        printfn "Lo siento, no reconozco esa función."
        main()
    ()

let program args  =
    main ()
    0

[<EntryPoint>]
program [||]




    
    
    
    