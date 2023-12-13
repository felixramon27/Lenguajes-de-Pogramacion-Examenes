import Dispatch
import Foundation

// Funcion que calcula el producto punto de dos vectores
func dotProduct(_ v1: [Double], _ v2: [Double]) -> Double {
    let group = DispatchGroup()
    var result = 0.0

    for i in 0..<v1.count {
        DispatchQueue.global().async(group: group) {
            result += v1[i] * v2[i]
        }
    }

    group.wait()
    return result
}

// Vectores de prueba 
let v1 = [1.0, 2.0, 3.0]
let v2 = [4.0, 5.0, 6.0]
// Calculo de prueba de los vectores
print(dotProduct(v1, v2)) 
// Output: 32.0

// Funcion que cuenta la cantidad de archivos que están localizados en el subarbol que tiene como raíz el directorio propuesto. 
func countFiles(in directory: URL) -> Int {
    let fileManager = FileManager.default
    guard let enumerator = fileManager.enumerator(at: directory, includingPropertiesForKeys: [.isRegularFileKey], options: []) else {
        return 0
    }

    var count = 0
    for case let fileURL as URL in enumerator {
        do {
            let resourceValues = try fileURL.resourceValues(forKeys: [.isRegularFileKey])
            if resourceValues.isRegularFile == true {
                count += 1
            }
        } catch {
            print("Error: \(error)")
        }
    }
    return count
}

// Aqui le pasamos el directorio propuesto para probar que cuenta de manera exitosa.
// Para probar esta funcion debe colocar un path correcto de la pc en la que se ejecuta.
let directory = URL(fileURLWithPath: "/Users/Felix/Documents/prueba", isDirectory: true)
print(countFiles(in: directory))  
// Output: Numero de Archivos