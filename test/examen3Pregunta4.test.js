const assert = require('chai').assert;
const { Clase, agregarClase, describir, clases } = require('./examen3Pregunta4'); // Asegúrate de exportar las clases y funciones en tu archivo

describe('Clase', function() {
  describe('#agregarClase()', function() {
    it('debe agregar una nueva clase', function() {
      agregarClase('A', ['f', 'g']);
      assert.instanceOf(clases['A'], Clase);
      assert.deepEqual(clases['A'].metodos, ['f', 'g']);
    });

    it('no debe agregar una clase si el nombre ya existe', function() {
      agregarClase('A', ['h', 'i']);
      assert.deepEqual(clases['A'].metodos, ['f', 'g']);
    });
  });
});
