const assert = require('chai').assert;
const { initializeMemory, reserve, release, show, memory, reserved } = require('./parte3BuddySystem');

describe('Manejador de memoria', function() {
  beforeEach(function() {
    // Inicializa la memoria antes de cada prueba
    initializeMemory(20);
  });

  afterEach(function() {
    // Libera toda la memoria después de cada prueba
    for (let name in reserved) {
      release(name);
    }
  });

  it('debería reservar memoria correctamente', function() {
    // Reserva memoria
    reserve(5,'pepe');
    assert.equal(reserved['pepe'].blocks, 5);
  });

  it('debería liberar memoria correctamente', function() {
    // Reserva memoria
    reserve(5, 'juan');
    assert.equal(reserved['juan'].blocks, 5);

    // Libera la memoria reservada para 'juan'
    release('juan');
    assert.equal(reserved['juan'], undefined);
  });

  it('debería manejar errores al reservar memoria con un nombre ya existente', function() {
    // Reserva memoria
    reserve(5, 'pepe');
    assert.equal(reserved['pepe'].blocks, 5);

    // Intenta reservar memoria con el mismo nombre
    reserve(5, 'pepe');
    assert.equal(reserved['pepe'].blocks, 5);
  });

  it('debería manejar errores al liberar memoria que no está reservada', function() {
    // Intenta liberar memoria que no está reservada
    release('noExiste');
    assert.equal(reserved['noExiste'], undefined);
  });
});

