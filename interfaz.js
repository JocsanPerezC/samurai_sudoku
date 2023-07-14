/**
 * Crea los cuadros del sudoku
 */
window.onload = function() {
    crearInterfaz();
}

/*============================================================================================================/
 * Funciones para la creacion del sudoku Vizualmente entre otro apartado vizual
=============================================================================================================*/
/**
 * Funcion para crear los cuadros del sudoku
 */
function crearInterfaz(){

    //CICLO PARA CREAR LOS 5 CUADROS GRANDES
    for (var x = 0; x < 5; x++) {                           
        if(x === 0){                //SUDOKU TopLeft
            var tabla = document.createElement("table");
            var tbody = document.createElement("tbody");

            for (var columna = 0; columna < 9; columna++) {             //crea columnas
                var tr = document.createElement("tr");
                for (var fila = 0; fila < 9; fila++) {                  //crea filas 
                    var td = document.createElement("td");              //va creando las filas
                    var numero = document.createElement("input");       //el cuadro para escribir el numero
                    
                    
                    //pone las lineas horizontales
                    if (columna  === 2 || columna === 5){
                        numero.style.borderBottom = '6px solid aqua';
                    }
                    if (columna  === 3 || columna  === 6){
                        numero.style.borderTop = '6px solid aqua';
                    }

                    //pone las linea verticales
                    if (fila  === 2 || fila === 5){
                        numero.style.borderRight = '6px solid aqua';
                    }
                    if (fila  === 3 || fila === 6){
                        numero.style.borderLeft = '6px solid aqua';
                    }

                    numero.type = "number";                              //hace el cuadro de tipo numerico
                    nombre = "TL" + columna.toString() + fila.toString();//Crea el id, ej: C00,C01,C02 hasta C88
                    numero.id = nombre;

                    if (fila >= 6 && columna >= 6){
                        numero.type = "hidden";  
                    }

                    tr.appendChild(numero);                             //agrega el cuadro a la fila
                    tr.appendChild(td);                                 //se agrega el elemento de la fila al tr, va desde el index 0 hasta el 9
                }
                tbody.appendChild(tr);                                  //se agrega la fila a la tabla
            }
            tabla.appendChild(tbody);

            document.getElementById("boardTopLeft").appendChild(tabla);
        }
        if(x === 1){                //SUDOKU TopRight
            var tabla = document.createElement("table");
            var tbody = document.createElement("tbody");

            for (var columna = 0; columna < 9; columna++) {                 //crea columnas
                var tr = document.createElement("tr");                      //crea filas
                for (var fila = 0; fila < 9; fila++) {    
                    var td = document.createElement("td");                   //va creando las filas
                    var numero = document.createElement("input");           //el cuadro para escribir el numero   

                    //pone las lineas horizontales
                    if (columna  === 2 || columna === 5){
                        numero.style.borderBottom = '6px solid aqua';
                    }
                    if (columna  === 3 || columna  === 6){
                        numero.style.borderTop = '6px solid aqua';
                    }

                    //pone las linea verticales
                    if (fila  === 2 || fila === 5){
                        numero.style.borderRight = '6px solid aqua';
                    }
                    if (fila  === 3 || fila === 6){
                        numero.style.borderLeft = '6px solid aqua';
                    }

                    numero.type = "number";    
                    nombre = "TR" + columna.toString() + fila.toString();
                    numero.id = nombre; 

                    if (columna >= 6 && fila <= 2) {                        //para no crear cuadros de mas
                        numero.type = "hidden";                             //oculta los cuadros
                    } 
                    
                    td.appendChild(numero);
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);//se agrega la fila a la tabla
            }
            tabla.appendChild(tbody);

            document.getElementById("boardTopRight").appendChild(tabla);
        }
        if(x === 2){                //SUDOKU Center
            var tabla = document.createElement("table");
            var tbody = document.createElement("tbody");

            for (var columna = 0; columna < 9; columna++) {             //crea columnas
                var tr = document.createElement("tr");
                for (var fila = 0; fila < 9; fila++) {                  //crea filas
                    var td = document.createElement("td");              //va creando las filas
                    var numero = document.createElement("input");       //el cuadro para escribir el numero

                    //pone las lineas horizontales
                    if (columna  === 2 || columna === 5){
                        numero.style.borderBottom = '6px solid aqua';
                    }
                    if (columna  === 3 || columna  === 6){
                        numero.style.borderTop = '6px solid aqua';
                    }

                    //pone las linea verticales
                    if (fila  === 2 || fila === 5){
                        numero.style.borderRight = '6px solid aqua';
                    }
                    if (fila  === 3 || fila === 6){
                        numero.style.borderLeft = '6px solid aqua';
                    }

                    numero.type = "number";                             //tipo numerico
                    nombre = "C" + columna.toString() + fila.toString();//Crea el id, ej: C00,C01,C02 hasta C88
                    numero.id = nombre;   

                    td.appendChild(numero);                             //agrega el cuadro a la fila
                    tr.appendChild(td);                                 //se agrega el elemento de la fila al tr, va desde el index 0 hasta el 9
                }
                tbody.appendChild(tr);                                  //se agrega la fila a la tabla
            }
            tabla.appendChild(tbody);

            document.getElementById("boardCenter").appendChild(tabla);
        }
        if(x === 3){                //SUDOKU BottLEFT
            var tabla = document.createElement("table");
            var tbody = document.createElement("tbody");

            for (var columna = 0; columna < 9; columna++) {                 //crea columnas
                var tr = document.createElement("tr");
                for (var fila = 0; fila < 9; fila++) {                      //crea filas 
                    var td = document.createElement("td");                  //va creando las filas
                    var numero = document.createElement("input");           //el cuadro para escribir el numero
                    
                    //pone las lineas horizontales
                    if (columna  === 2 || columna === 5){
                        numero.style.borderBottom = '6px solid aqua';
                    }
                    if (columna  === 3 || columna  === 6){
                        numero.style.borderTop = '6px solid aqua';
                    }

                    //pone las linea verticales
                    if (fila  === 2 || fila === 5){
                        numero.style.borderRight = '6px solid aqua';
                    }
                    if (fila  === 3 || fila === 6){
                        numero.style.borderLeft = '6px solid aqua';
                    }

                    numero.type = "number"; 
                    nombre = "BL" + columna.toString() + fila.toString();   //Crea el id, ej: C00,C01,C02 hasta C88
                    numero.id = nombre; 

                    if (fila >= 6 && columna <= 2) { 
                        numero.type = "hidden";  
                    }

                    tr.appendChild(numero);                                 //agrega el cuadro a la fila
                    tr.appendChild(td);                                     //se agrega el elemento de la fila al tr, va desde el index 0 hasta el 9
                }
                tbody.appendChild(tr);                                      //se agrega la fila a la tabla
            }
            tabla.appendChild(tbody);

            document.getElementById("boardBottLeft").appendChild(tabla);
        }
        if(x === 4){                //SUDOKU BottRight
            var tabla = document.createElement("table");
            var tbody = document.createElement("tbody");
        
            for (var columna = 0; columna < 9; columna++) {                 //crea columnas
                var tr = document.createElement("tr");
                for (var fila = 0; fila < 9; fila++) {                      //crea filas
                    var td = document.createElement("td");                  //va creando las filas
                    var numero = document.createElement("input");           //el cuadro para escribir el numero
        
                    //pone las lineas horizontales
                    if (columna  === 2 || columna === 5){
                        numero.style.borderBottom = '6px solid aqua';
                    }
                    if (columna  === 3 || columna  === 6){
                        numero.style.borderTop = '6px solid aqua';
                    }

                    //pone las linea verticales
                    if (fila  === 2 || fila === 5){
                        numero.style.borderRight = '6px solid aqua';
                    }
                    if (fila  === 3 || fila === 6){
                        numero.style.borderLeft = '6px solid aqua';
                    }
                    
                    numero.type = "number";    
                    nombre = "BR" + columna.toString() + fila.toString();   //Crea el id, ej: C00,C01,C02 hasta C88
                    numero.id = nombre;
        
                    if (columna <= 2 && fila <= 2) {                         //para no crear cuadros de mas
                        numero.type = "hidden";                             //oculta los cuadros
                    } 
        
                    td.appendChild(numero);
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);//se agrega la fila a la tabla
            }
            tabla.appendChild(tbody);
        
            document.getElementById("boardBottRight").appendChild(tabla);
        }
    }
}



/**
 * Funcion para visualizar los cambios hechos
 * @param {array*} tablero el tablero que se desea hacer el cambio, es el tablero interno
 * @param {string*} nombre para obtener cual tablero se desea cambiar (ej: C del centro)
 */
function actualizarPantalla(tablero,nombre){
    for (var filas = 0; filas < 9; filas++) {                           
        for (var columnas = 0; columnas < 9; columnas++) {     
            cuadrado = nombre + filas.toString() + columnas.toString();     //para obtener el id del cuadro
            let input = document.getElementById(cuadrado);                  //crea el input con el id
            input.value = tablero[filas][columnas];                         //cambia en pantalla
        }
    }
}

/**
 * Funcion para hacer los procesos en tiempo real
 * @param {number*} ms 
 * @returns tiempo
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Funcion para actualizar el cuadrado exterior momentaneamente en rojo
 * @param {string*} cuadrado nombre del cuadrado, ej: C00, C01
 */
async function actulizaCuadrado(cuadrado){
    let input = document.getElementById(cuadrado);
    input.style.backgroundColor = "red";                             //esto es para visualizar el cambio en el tablero externamente
    await sleep(400)
    input.style.backgroundColor = "black";  
}


/*============================================================================================================/
 * Funciones para la creacion del sudoku interno 
=============================================================================================================*/
/**
 * Funcion para verificar si un numero es valido en cierta posicion (pertenece al de generar sudokus)
 * @param {array*} sudoku 
 * @param {number*} fila 
 * @param {number*} columna 
 * @param {number*} num 
 * @returns true, el numero es valido
 */
function esValidoGenerador(sudoku, fila, columna, num) {
    for (let i = 0; i < 9; i++) {
        if (sudoku[fila][i] === num || sudoku[i][columna] === num) {
        return false;
        }
    }
    // para Verificar si el número ya está en el cuadrado 3x3 actual
    let filaInicio = Math.floor(fila / 3) * 3;
    let columnaInicio = Math.floor(columna / 3) * 3;

    for (let i = filaInicio; i < filaInicio + 3; i++) {
        for (let j = columnaInicio; j < columnaInicio + 3; j++) {
            if (sudoku[i][j] === num) {
                return false;   //no es valido
            }
        }
    }
    return true; //el numero es valido
}

/**
 * Funcion para generar sudokus aleatorios internamente en el codigo
 * @returns sudoku (matriz 9x9 de numeros aleatorios, con espacios en null para completarlo)
 */
function generarSudoku() {
    let sudoku = [];
    for (let i = 0; i < 9; i++) {                   // Crear una matriz 9x9 para el Sudoku vacío
        sudoku.push(new Array(9).fill(null));
    }
    // Función para generar un número aleatorio que no se repita en una fila o columna
    function generarNumeroNoRepetido(fila, columna) {
        let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        while (numeros.length > 0) {
            //elige un elemento aleatorio del arreglo numeros y lo almacena en la variable num.
            let indice = Math.floor(Math.random() * numeros.length);//para generar un número aleatorio entre 0 y 1. Luego, se multiplica por el tamaño del arreglo numeros
            let num = numeros[indice];
            numeros.splice(indice, 1);//para eliminar un elemento del arreglo de numeros
            if (esValidoGenerador(sudoku, fila, columna, num)) {
                return num;
            }
        }
        return null;
    }
    // Se llena el Sudoku celda por celda
    for (var columna = 0; columna < 9; columna++) {                             //crea Columnas
        for (var fila = 0; fila < 9; fila++) {                                  //crea Filas 
            sudoku[fila][columna] = generarNumeroNoRepetido(fila, columna);     // Se genera un número aleatorio para la celda
            // Se vacía la celda con una probabilidad aleatoria
            if (Math.random() < 0.9) { //CON ESTE PRACTICAMENTE SE CAMBIA LA DIFICULTAD, SE HACEN MENOS O MAS NUMEROS
                sudoku[fila][columna] = null;
            }
        }
    }
    return sudoku;  // Se devuelve el Sudoku generado
}
