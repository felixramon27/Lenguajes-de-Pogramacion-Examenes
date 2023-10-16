const assert = require('assert');
const Vector = require('./parte4Vector');

describe('Vector', function() {
    it('debería calcular correctamente la norma', function() {
        let v = new Vector(1, 2, 2);
        assert.equal(v.norm(), 3);
    });

    it('debería sumar correctamente dos vectores', function() {
        let v1 = new Vector(1, 2, 3);
        let v2 = new Vector(4, 5, 6);
        let v = v1.plus(v2);
        assert.equal(v.x, 5);
        assert.equal(v.y, 7);
        assert.equal(v.z, 9);
    });

    it('debería restar correctamente dos vectores', function() {
        let v1 = new Vector(1, 2, 3);
        let v2 = new Vector(4, 5, 6);
        let v = v1.minus(v2);
        assert.equal(v.x, -3);
        assert.equal(v.y, -3);
        assert.equal(v.z, -3);
    });

    it('debería calcular correctamente el producto cruz', function() {
        let v1 = new Vector(1, 2, 3);
        let v2 = new Vector(4, 5, 6);
        let v = v1.cross(v2);
        assert.equal(v.x, -3);
        assert.equal(v.y, 6);
        assert.equal(v.z, -3);
    });

    it('debería calcular correctamente el producto punto', function() {
        let v1 = new Vector(1, 2, 3);
        let v2 = new Vector(4, 5, 6);
        let productoPunto = v1.dot(v2);
        assert.equal(productoPunto, 32);
    });

    it('debería multiplicar correctamente por un escalar', function() {
        let v1 = new Vector(1, 2, 3);
        let escalar = 2;
        let v = v1.times(escalar);
        assert.equal(v.x, 2);
        assert.equal(v.y, 4);
        assert.equal(v.z, 6);
    });
});
