const chai = require("chai");
const expect = chai.expect;
const {
  evaluarPrefijo,
  evaluarPostfijo,
  mostrarPrefijo,
  mostrarPostfijo,
} = require("./examen2Pregunta2");

describe("Pruebas para evaluar y mostrar expresiones", function () {
  it("evaluarPrefijo", function () {
    expect(evaluarPrefijo("+ * + 3 4 5 7")).to.equal(42);
  });

  it("evaluarPostfijo", function () {
    expect(evaluarPostfijo("8 3 - 8 4 4 + * +")).to.equal(69);
  });

  it("mostrarPrefijo", function () {
    expect(mostrarPrefijo("+ * + 3 4 5 7")).to.equal("(3 + 4) * 5 + 7");
  });

  it("mostrarPostfijo", function () {
    expect(mostrarPostfijo("8 3 - 8 4 4 + * +")).to.equal(
      "8 - 3 + 8 * (4 + 4)"
    );
  });
});
