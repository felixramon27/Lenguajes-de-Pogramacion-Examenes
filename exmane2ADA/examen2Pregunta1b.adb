--  Para compilar hacer: gnatmake examen2Pregunta1b.adb 
--  Para ejecutar hacer: examen2pregunta1b.exe o ./examen2pregunta1b 
with Ada.Text_IO; use Ada.Text_IO;

procedure examen2Pregunta1b is 
  -- Definimos un tipo de datos para representar los numerales de Church como una lista enlazada.
  type Church is record
      Valor : Integer;
      Siguiente : access Church;
   end record;
   type Church_Ptr is access all Church;

  -- Definimos un procedimiento para incrementar un numeral de Church.
  procedure Suc (N : in out Church_Ptr) is
      Nuevo : Church_Ptr := new Church'(Valor => N.Valor + 1, Siguiente => null);
   begin
      Nuevo.Siguiente := N;
      N := Nuevo;
   end Suc;

  -- Definimos una función para sumar dos numerales de Church.
  function Suma (X, Y : Church_Ptr) return Church_Ptr is
      Z : Church_Ptr := new Church'(Valor => X.Valor + Y.Valor, Siguiente => null);
   begin
      return Z;
   end Suma;

  -- Definimos una función para multiplicar dos numerales de Church.
  function Multiplicacion (X, Y : Church_Ptr) return Church_Ptr is
      Z : Church_Ptr := new Church'(Valor => X.Valor * Y.Valor, Siguiente => null);
   begin
      return Z;
   end Multiplicacion;

  -- Definimos un tipo de datos para representar un árbol binario.
  type Arbol is record
      Valor : Integer;
      Izquierda, Derecha : access Arbol;
   end record;

  -- Definimos una función para verificar si un árbol es un espejo.
  function esEspejo(A1, A2: access Arbol) return Boolean is
   begin
      if A1 = null and A2 = null then
         return True;
      elsif A1 /= null and A2 /= null then
         return (A1.Valor = A2.Valor) and esEspejo(A1.Izquierda, A2.Derecha) and esEspejo(A1.Derecha, A2.Izquierda);
      else
         return False;
      end if;
   end esEspejo;

  -- Definimos una función para verificar si un árbol es un max-heap simétrico.
  function esMaxHeapSimetrico (A : access Arbol) return Boolean is
   begin
      if A = null then
         return True;
      elsif A.Izquierda /= null and then A.Izquierda.Valor > A.Valor then
         return False;
      elsif A.Derecha /= null and then A.Derecha.Valor > A.Valor then
         return False;
      else
         return esMaxHeapSimetrico (A.Izquierda) and then esMaxHeapSimetrico (A.Derecha) and then esEspejo(A.Izquierda, A.Derecha);
      end if;
   end esMaxHeapSimetrico;
begin
  -- Realizamos pruebas de las funciones y mostramos ejemplos de cómo se deben ejecutar.
  declare
      Cero : Church_Ptr := new Church'(Valor => 0, Siguiente => null);
      Uno : Church_Ptr := new Church'(Valor => 0, Siguiente => null);
      Dos : Church_Ptr := new Church'(Valor => 0, Siguiente => null);
      Tres : Church_Ptr := new Church'(Valor => 0, Siguiente => null);
      Resultado : Church_Ptr;
      A : access Arbol := new Arbol'(Valor => 3, Izquierda => new Arbol'(Valor => 2, Izquierda => new Arbol'(Valor => 1, Izquierda => null, Derecha => null), Derecha => new Arbol'(Valor => 1, Izquierda => null, Derecha => null)), Derecha => new Arbol'(Valor => 2, Izquierda => new Arbol'(Valor => 1, Izquierda => null, Derecha => null), Derecha => new Arbol'(Valor => 1, Izquierda => null, Derecha => null)));
   begin
      Put_Line("El árbol es un max-heap simétrico: " & Boolean'Image(esMaxHeapSimetrico(A)));
      Suc(Uno);
      Suc(Dos);
      Suc(Dos);
      Suc(Tres);
      Suc(Tres);
      Suc(Tres);
      -- Prueba de la suma
      Resultado := Suma(Cero, Tres);
      Put_Line("El resultado de la suma es: " & Integer'Image(Resultado.Valor));
      --  La respuesta es 3, es correcto
      
      -- Prueba de la multiplicación
      Resultado := Multiplicacion(Cero, Tres);
      Put_Line("El resultado de la multiplicación es: " & Integer'Image(Resultado.Valor));
      -- El resultado es 0, es correcto
   end;
end examen2Pregunta1b;
