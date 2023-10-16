class Vector {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    // Suma de vectores
    plus(v) {
        return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    // Resta de vectores
    minus(v) {
        return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    // Producto cruz
    cross(v) {
        return new Vector(
            this.y * v.z - this.z * v.y,
            this.z * v.x - this.x * v.z,
            this.x * v.y - this.y * v.x
        );
    }

    // Producto punto
    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    // Norma del vector
    norm() {
        return Math.sqrt(this.dot(this));
    }

    // Multiplicación por un escalar
    times(scalar) {
        return new Vector(this.x * scalar, this.y * scalar, this.z * scalar);
    }
}

module.exports = Vector;
