# samurai-sudoku-backtracking

## Descripción
Este proyecto es una implementación del popular juego Samurai Sudoku en una página web. El Samurai Sudoku es una variante del clásico Sudoku que consta de cinco cuadrados de Sudoku superpuestos. El objetivo es rellenar todos los cuadrados con números del 1 al 9, asegurándote de que no haya números repetidos en ninguna fila, columna o subcuadrado.

## Especificaiones para usar el sudoku:
1. Al iniciar la pagina, esta crea un sudoku samurai totalmente vacio
2. El boton de generar tablero, genera un tablero para el usuario
3. El usuario puede ingresar numeros desde cero o con un tablero generado\
4. El boton de comprobar sudoku funciona para ver el estado actual del sudoku, este nos va a mostrar los lugares donde los numeros estan incorrectos y un mensaje de error, 
en el caso de estar bien, no va a mostrar nada en pantalla
5. El boton de limpiar sudoku, limpia todo el sudoku hecho
6. Los botones de Resolucion por A** y Resolucion por backtracking resuelven el sudoku hasta cierto punto, estos muestran el paso a paso del sudoku
7. El boton de Resolucion por A** se puede llamar varias veces para lograr un mayor resultado, sin embargo, se deben de eliminar los numeros que esten incorrectos en el caso de que
hayan

## Aclaraciones: 

SOBRE EL PASO A PASO: se utlizan funciones async, el problema de esta funcion es que hay que cambiarla dentro del codigo, debido a que si se dejan establecidas de una vez, internamente al programa no le da tiempo de mostrar los cambios, se ve mejor en la consola luego de cambiar las funciones, sin las funciones async, en la consola se ven los cambios dentro de cada matriz correctamente.

Sobre A**
1. El codigo de A** va a mostrar en consola algunos errores, debido a que encuentra que no se existe un valor para el sudoku
2. La funcion de A** hace demasiadas iteraciones por lo que si se quiere ver el PASO A PASO en pantalla se debe de editar unos valores, sin embargo dura demasiado en resolverse, los valores son: en la funcion llamada nodeEvaluation se debe de cambiar a una funcion asyn de esta manera: async function nodeEvaluation(array, whichOneSudoku, solveOneTime, nombreSudoku)
y en la linea 456 o await sleep(1) se debe de quitar el comentario, de esa manera se puede ver el paso a paso

Sobre Backtraking
1. Mismo problema con A**, el PASO A PASO, se deben de cambiar unos valores para poder vizualizarlos, en la funcion llamada resolverSudokuBack  se debe de cambiar a una funcion asyn de esta manera: async function resolverSudokuBack(board,nombreSudoku) y en las lineas 184 y 187 se deben de quitar el comentario, de esa manera se puede ver el paso a paso

## Estructura del proyecto
- sudoku.html: Archivo HTML que contiene la estructura de la página web.
- style.css: Archivo CSS con estilos para darle una apariencia visual al juego.
- sudoku.js: Archivo JavaScript con la lógica del juego, incluyendo la generación de números y la detección de movimientos.
- interfaz.js: Archivo JavaScript con la lógica de la creacion de la interfaz
- iconSudoku.jpeg: Imagen para el sudoku

## Contacto
Si tienes alguna pregunta o sugerencia, puedes contactarme a través de mi correo electrónico: jocsancoto@gmail.com.
