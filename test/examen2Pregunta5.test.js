const assert = require("chai").assert;
const { Tipo, Manejador } = require("./examen2Pregunta5"); // Asegúrate de exportar las clases Tipo y Manejador en tu archivo simulador.js

describe("Manejador", function () {
  describe("#atomico()", function () {
    it("debe definir un nuevo tipo atómico", function () {
      let manejador = new Manejador();
      manejador.atomico("char", 1, 2);
      assert.instanceOf(manejador.tipos["char"], Tipo);
      assert.equal(manejador.tipos["char"].representacion, 1);
      assert.equal(manejador.tipos["char"].alineacion, 2);
    });

    it("no debe definir un tipo atómico si el nombre ya existe", function () {
      let manejador = new Manejador();
      manejador.atomico("char", 1, 2);
      manejador.atomico("char", 4, 4);
      assert.equal(manejador.tipos["char"].representacion, 1);
      assert.equal(manejador.tipos["char"].alineacion, 2);
    });
  });

  describe("#struct()", function () {
    it("debe definir un nuevo registro", function () {
      let manejador = new Manejador();
      manejador.atomico("char", 1, 2);
      manejador.atomico("int", 4, 4);
      manejador.struct("foo", ["char", "int"]);
      assert.isObject(manejador.tipos["foo"]);
      assert.isArray(manejador.tipos["foo"].tipos);
      assert.equal(manejador.tipos["foo"].tipos.length, 2);
      assert.isFalse(manejador.tipos["foo"].esRegistroVariante);
    });

    it("no debe definir un registro si el nombre ya existe", function () {
      let manejador = new Manejador();
      manejador.atomico("char", 1, 2);
      manejador.atomico("int", 4, 4);
      manejador.struct("foo", ["char", "int"]);
      manejador.struct("foo", ["int", "char"]);
      assert.equal(manejador.tipos["foo"].tipos[0], "char");
      assert.equal(manejador.tipos["foo"].tipos[1], "int");
    });

    it("no debe definir un registro si alguno de los tipos no ha sido definido", function () {
      let manejador = new Manejador();
      manejador.atomico("char", 1, 2);
      manejador.struct("foo", ["char", "int"]);
      assert.isUndefined(manejador.tipos["foo"]);
    });
  });

  describe("#union()", function () {
    it("debe definir un nuevo registro variante", function () {
      let manejador = new Manejador();
      manejador.atomico("char", 1, 2);
      manejador.atomico("int", 4, 4);
      manejador.union("bar", ["char", "int"]);
      assert.isObject(manejador.tipos["bar"]);
      assert.isArray(manejador.tipos["bar"].tipos);
      assert.equal(manejador.tipos["bar"].tipos.length, 2);
      assert.isTrue(manejador.tipos["bar"].esRegistroVariante);
    });

    it("no debe definir un registro variante si el nombre ya existe", function () {
      let manejador = new Manejador();
      manejador.atomico("char", 1, 2);
      manejador.atomico("int", 4, 4);
      manejador.union("bar", ["char", "int"]);
      manejador.union("bar", ["int", "char"]);
      assert.equal(manejador.tipos["bar"].tipos[0], "char");
      assert.equal(manejador.tipos["bar"].tipos[1], "int");
    });

    it("no debe definir un registro variante si alguno de los tipos no ha sido definido", function () {
      let manejador = new Manejador();
      manejador.atomico("char", 1, 2);
      manejador.union("bar", ["char", "int"]);
      assert.isUndefined(manejador.tipos["bar"]);
    });
  });

  describe("#describir()", function () {
    it("debe describir un tipo atómico", function () {
      let manejador = new Manejador();
      manejador.atomico("char", 1, 2);
      assert.equal(
        manejador.describir("char"),
        "Tipo: char, Tamaño: 1, Representación: 1, Alineación: 2, Bytes desperdiciados: 0"
      );
    });

    it("debe describir un registro", function () {
      let manejador = new Manejador();
      manejador.atomico("char", 1, 2);
      manejador.atomico("int", 4, 4);
      manejador.struct("foo", ["char", "int"]);
      assert.equal(
        manejador.describir("foo"),
        "Tipo: foo, Tamaño: 5, Representación: 5, Alineación: 4, Bytes desperdiciados: 1"
      );
    });

    it("debe describir un registro variante", function () {
      let manejador = new Manejador();
      manejador.atomico("char", 1, 2);
      manejador.atomico("int", 4, 4);
      manejador.union("bar", ["char", "int"]);
      assert.equal(
        manejador.describir("bar"),
        "Tipo: bar, Tamaño: 5, Representación: 4, Alineación: 4, Bytes desperdiciados: 1"
      );
    });

    it("no debe describir un tipo que no ha sido definido", function () {
      let manejador = new Manejador();
      assert.isUndefined(manejador.describir("char"));
    });
  });
});
