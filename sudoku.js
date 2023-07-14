// TABLEROS // 
//son tableros 9x9 rellenados con null
var sudokuTopLeft = creaSudoku();      

var sudokuTopRight = creaSudoku();

var sudokuCenter = creaSudoku();

var sudokuBottLeft = creaSudoku();

var sudokuBottRight = creaSudoku();

//Lista para el A**
openList = [];              //Estados que no sirvan
auxOpenList = [];           //Meter estados y revisarlos, luego limpiar y añadir a lista abierta
closeList = [];             //Mejores estados sacados
listPossibleValues = [];    //Lista de posibles valores 
auxListPossibleValues = []; //Lista de posibles valores de casillas compartidas
possibValStates = [];       //Lista de posibles valores para estados
auxPossibValStates = [];    //Lista de posibles valores para estados de casilas compartidas

copyMatCent = structuredClone(sudokuCenter);

/**
 * Funcion para crear un sudoku 9x9 lleno de null
 */
function creaSudoku(){
    let sudoku = [];
    for (let i = 0; i < 9; i++) {                   // Crear una matriz 9x9 para el Sudoku 
        sudoku.push(new Array(9).fill(null));
    }
    return sudoku
}

/**
 * Funcion para actulizar las esquinas de los sudokus Internamente con excepcion del centro
 */
function actualizarEsquinas(){

    // arreglo board de arriba izq  

    for (let y = 6; y < 9; y++) {
        for (let x = 6; x < 9 ; x++) {
            sudokuTopLeft[y][x] = sudokuCenter[y-6][x-6]
        }
    }

    // arreglo board de arriba derecha

    for (let y = 6; y < 9; y++) {
        for (let x = 0; x < 3 ; x++) {
            sudokuTopRight[y][x] = sudokuCenter[y-6][x+6]
        }
    }

     // arreglo board de abajo izq

    for (let y = 0; y < 3; y++) {
        for (let x = 6; x < 9 ; x++) {
            sudokuBottLeft[y][x] = sudokuCenter[y+6][x-6]
        }
    }

    // arreglo board de abajo derecha

    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3 ; x++) {
            sudokuBottRight[y][x] = sudokuCenter[y+6][x+6]
        }
    }
}

/**
 * Funcion para imprimir el sudoku en la consola
 * @param {array*} board 
 */
function imprimirSudoku(board) {
    console.log("  1 2 3   4 5 6   7 8 9"); // imprimir los encabezados de columna
    console.log("+-------+-------+-------+");

    for (let i = 0; i < 9; i++) {
        let rowStr = "";
        for (let j = 0; j < 9; j++) {
            if (j % 3 === 0) {
            rowStr += "| ";
            }
            const val = board[i][j] === 0 ? " " : board[i][j];
            rowStr += `${val} `;
        }
        rowStr += "|";
        console.log(`${i+1} ${rowStr}`);
        if ((i + 1) % 3 === 0) {
            console.log("+-------+-------+-------+");
        }
    }
}

// --------------------------------------------------------------------
// CODIGO BACKTRACKING 
//---------------------------------------------------------------------

function revisar_eje_y(board, revisar_y, revisar_x) {
    for (let i = 0; i < 9; i++) {
        if (i !== revisar_y ){
            if(board[i][revisar_x] === board[revisar_y][revisar_x]) {
                return false;
            }
        }
    }
    return true;
}

function revisar_eje_x(board, revisar_y, revisar_x) {
    for (let i = 0; i < 9; i++) {
        if (i !== revisar_x){
            if(board[revisar_y][i] === board[revisar_y][revisar_x]) {
                return false;
            }
        }
    }
    return true;
}

function revisar_submatriz(board, revisar_y, revisar_x) {

    const primeraX = Math.floor(revisar_x / 3) * 3;
    const primeraY = Math.floor(revisar_y / 3) * 3;
    const numRevisar = board[revisar_y][revisar_x];

    for (let i = primeraY; i < primeraY + 3; i++) {
        for (let j = primeraX; j < primeraX + 3; j++) {
            if (i !== revisar_y || j !== revisar_x) { // Verificar si la posición actual no es la posición a revisar
                if (board[i][j] === numRevisar) {   // Verificar si el valor en la posición actual es igual al valor a revisar
                    return false;                   // Si encuentra uno igual, retornar false
                }
            }
        }
    }
    return true; // Si no encuentra ningún número igual, retornar true
}

function esValido(board,y,x){
    if(revisar_eje_x(board,y,x) && revisar_eje_y(board,y,x) && revisar_submatriz(board,y,x) === true ){
        return true
    }
    else {
        return false
    }
}

/**
 * Funcion para revolver un array de numeros de forma aleatoria
 * @param {array} array 
 */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/**
 * Funcion para resolver el sudoku por backtraking y se vizualiza en pantalla
 * @param {array*} board 
 * @param {string*} nombreDado nombre del sudoku (ej: C para el centro)
 * @returns array del sudoku, o false en caso de no resolverlo
 */
function resolverSudokuBack(board,nombreSudoku){

    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {                         //ciclo x y

            cuadrado = nombreSudoku + y.toString() + x.toString();          //para obtner la casilla y luego cambiar el color, ej: C00, C01

            if (board[y][x] === null) {                                 // si la casilla no tiene numero
                actulizaCuadrado(cuadrado);                             //actualiza el cuadrado momentaneamente en rojo

                let nums = [1,2,3,4,5,6,7,8,9];
                shuffle(nums);                                          // tiro shuffle al array de nums  

                for(let i=0; i< nums.length;i++){                       // pruebo los numeros del array
                    board[y][x] = nums[i];                              // seteo la casilla en el numero
                    actualizarPantalla(board,nombreSudoku);
                    //await sleep(200)  

                    if (esValido(board, y, x)) { 
                        //await sleep(200);                                 //sin este se muestra todos los cambios de una vez
                        if (resolverSudokuBack(board,nombreSudoku)) {     // recursivo 
                            return board;
                        }
                    }
                    board[y][x] = null;                                   // si no es posible devuelvo el valor a null 
                    actualizarPantalla(board,nombreSudoku);
                }
                return false;                                             // si no se puede resolver
            }
        }
    }
    return board;                       // retorno la matriz
}

// --------------------------------------------------------------------
//  FINAL CODIGO BACKTRACKING 
//---------------------------------------------------------------------


// --------------------------------------------------------------------
//   CODIGO A** 
//---------------------------------------------------------------------

/**
 * It validates if the values is in the row.
 * @param {Array} array is the array/sudoku when we going to validate row values.
 * @param {Number} row the row we goint to validate in the array.
 * @param {Number} value the value we goin to validate if it exist.
 * @returns true if exists or false if odnt exist.
*/
function validateRowValues(array, row, value){
    for (let j = 0; j < 9; j++) {  //aumentar a la columna, para que revise todos los elementos de esa fila.
        if (array[row][j] === value)
            return true;
    }
    return false;
}

/**
 * It validates if the values is in the column.
 * @param {Array} array is the array/sudoku when we going to validate column values.
 * @param {Number} column the column we goint to validate in the array.
 * @param {Number} value the value we goin to validate if it exist.
 * @returns true if exists or false if odnt exist.
*/
function validateColumnValues(array, column, value){
    for (let i = 0; i < 9; i++) {  //aumentar a la fila, para que revise todos los elementos de esa columna.
        if (array[i][column] === value)
            return true;
    }
    return false;
}

/**
 * It validates if the values is in the grid.
 * @param {Array} array is the array/sudoku when we going to validate row values.
 * @param {Number} row the row we goint to validate in the array.
 * @param {Number} column the column we goint to validate in the array.
 * @param {Number} value the value we goin to validate if it exist.
 * @returns true if exists or false if odnt exist.
*/
function validateGridValues(array, row, column, value){
    starRow = 0;
    endRow = 0;
    startColumn = 0;
    endColumn = 0;
    //If's para delimitar la búsqueda solo a la cuadrícula en donde está la casilla
    if (row >= 0 && row <=2) {
        starRow = 0;
        endRow = 2;
    }
    if (row >= 3 && row <=5) {
        starRow = 3;
        endRow = 5;
    }
    if (row >= 6 && row <=8) {
        starRow = 6;
        endRow = 8;
    }
    if (column >= 0 && column <=2) {
        startColumn = 0;
        endColumn = 2;
    }
    if (column >= 3 && column <=5) {
        startColumn = 3;
        endColumn = 5;
    }
    if (column >= 6 && column <=8) {
        startColumn = 6;
        endColumn = 8;
    }

    for (let i = starRow; i <= endRow; i++) {          

        for (let j = startColumn; j <= endColumn; j++) {      
            if (array[i][j] === value)
                return true;
        }//end ciclo de las columnas
    }//end ciclo de las filas
    return false;
}

/**
 * It update the values of the list of posibble values.
 * @param {Array} array is the array when we goint to search.
 * @param {Number} row is the row where we going validate the apparitions.
 * @param {Number} column is the column where we going validate the apparitions.
 * @param {Boolean} sharedBox is true if we goint to search on the shared boxes of both arrays,
 * and false if we are searching on boxes that are just in one array.
 * @param {String} forStates is "yes" is we goint to update possible values for states or "no" if it is'nt for states.
*/
function updateLPossVal(array, row, column, sharedBox, forStates){
    //Se validan los valores que no se repiten en filas, columnas y cuadricula
    for (let count = 1; count < 10; count++) {
        if (sharedBox === false) {
            if (forStates === "no") {
                //Si no se actualizan los valores para hacer estados en casillas no compartidas, se agregan en la lista listPossibleValues
                if ((validateRowValues(array, row, count) === false) && (validateColumnValues(array, column, count) === false) &&
                    (validateGridValues(array, row, column, count) === false)) {
                    listPossibleValues.push(count);                  //Si no se repite en ninguno de los 3 lados, se agrega
                }
            }else if(forStates === "yes"){
                if ((validateRowValues(array, row, count) === false) && (validateColumnValues(array, column, count) === false) &&
                    (validateGridValues(array, row, column, count) === false)) {
                    possibValStates.push(count);                     //Si no se repite en ninguno de los 3 lados, se agrega
                }
            }
        }
        if (sharedBox === true) {
            if (forStates === "no") {
                //Si no se actualizan los valores para hacer estados en casillas compartidas, se agregan en la lista auxListPossibleValues
                if ((validateRowValues(array, row, count) === false) && (validateColumnValues(array, column, count) === false) &&
                    (validateGridValues(array, row, column, count) === false)) {
                    auxListPossibleValues.push(count);
                }
            }else if(forStates === "yes"){
                //Si se actualizan los valores para hacer estados en casillas compartidas, se agregan en la lista auxPossibValStates
                if ((validateRowValues(array, row, count) === false) && (validateColumnValues(array, column, count) === false) &&
                    (validateGridValues(array, row, column, count) === false)) {
                    auxPossibValStates.push(count);
                }
            }
        }
    }
}

/**
 * This function counts the number of zeros that there are in a array.
 * @param {Array} array is the array we going to count the zeros.
 * @returns the number of zeros.
 */
function countZeros(array){
    count = 0;
    for (let i = 0; i < 9; i++) {          //9 por las filas
        for (let j = 0; j < 9; j++) {      //9 por las columnas de una fila
            if (array[i][j] === 0) {       //Revisa cuales son ceros
                count++;
            }
        }
    }
    return count;
}

/**
 * Select the better state of the array and clear the auxiliar open list.
*/
function updateOpenL(array, whichOneSudoku){
    zeros = 81;
    sudokuWithLessZeros = [];
    auxOpenList.forEach(sudoku => {
        if (countZeros(sudoku) < zeros) {
            zeros = countZeros(sudoku);
            sudokuWithLessZeros = sudoku;
        }
    });
    array = sudokuWithLessZeros;
    openList.push(...auxOpenList);
    auxOpenList = [];   //se limpia para revisar todos los estados nuevos que entren
    closeList.push(array);
}

/**
 * Set the possible values for each box.
 * @param {Array} array is the array we will try to complete.
 * @param {Number} row index of the box in the array.
 * @param {Number} column index of the column in the array.
 * @param {Boolean} sharedBox is true if we goint to search on the shared boxes of both arrays,
 * and false if we are searching on boxes that are just in one array.
 * @param {String} addToOpenList "yes" if we have to make states of the original array to add them to the openList or "no" if we dont have to do it.
 * @param {Number} whichOneSudoku for recognize which sudoku we are solving.
*   -1: matSupIzq.
*   -2: matSupDer.
*   -3: matCentral.
*   -4: matInfIzq.
*   -5: matInfDer.
*/
function chooseValues(array, row, column, sharedBox, addToOpenList, whichOneSudoku,nombreSudoku){
    if (sharedBox === false) {
        //Para hacer los distintos estados
        if (addToOpenList === "yes") {
            for (let index = 0; index < listPossibleValues.length; index++) {
                //Escoge valor para una casilla que no es compartida
                if (listPossibleValues.length > 0){
                    array[row][column] = listPossibleValues[0];  //se asigna el primer valor de la lista de posibles valores
                }
                copyForStates = structuredClone(array);
                nodeEvaluation(copyForStates, whichOneSudoku, "yes",nombreSudoku);
                listPossibleValues.shift(); //Elimina el primer elemento porque ya se asignó
                auxOpenList.push(copyForStates);
            }

            updateOpenL(array);  ///Arreglar a la hora de guardar el estado en el arreglo correcto
        } else if (addToOpenList === "no") {
                if (possibValStates.length > 0){
                array[row][column] = possibValStates[0];  //se asigna el primer valor de la lista de posibles valores
            }
        }
    }//end if
    if (sharedBox === true) {

        if (addToOpenList ==="yes") {

            for (let index = 0; index < array.length; index++) {
                //Escoge valor para una casilla que es compartida
                if ((listPossibleValues.length > 0) && (auxListPossibleValues.length > 0)){
                    listPossibleValues.forEach(value1 => {
                        auxListPossibleValues.forEach(value2 => {
                            if (value1 === value2) {
                                array[row][column] = value1;  // se asigna el primer valor de la lista de posibles valores
                            }
                        });
                    });
                }
                copyForStates = structuredClone(array);
                nodeEvaluation(copyForStates, whichOneSudoku, "yes",nombreSudoku);
                listPossibleValues.shift(); //Elimina el primer elemento porque ya se asignó
                auxOpenList.push(copyForStates);
            }
            updateOpenL(array);
        } else if(addToOpenList ==="no"){
            //Escoge valor para una casilla que es compartida
            if ((possibValStates.length > 0) && (auxPossibValStates.length > 0)){
                possibValStates.forEach(value1 => {
                    auxPossibValStates.forEach(value2 => {
                        if (value1 === value2) {
                            array[row][column] = value1;  //se asigna el primer valor de la lista de posibles valores
                        }
                    });
                });
            }
        }//end if
    }//end if
}

/**
 * It calls the fuctions that evaluates all the posible values of all nodes, at the end add  the "state"(possible solution) of the sudoku to the open list..
 * @param {Array} array is each array/sudoku separately of the five sudokus.
 * @param {Number} whichOneSudoku for recognize which sudoku we are solving.
*   -1: matSupIzq.
*   -2: matSupDer.
*   -3: matCentral.
*   -4: matInfIzq.
*   -5: matInfDer.
@param {String} solveOneTime "no" if we have make the states or "yes" if we just have to solve it.
*/
async function nodeEvaluation(array, whichOneSudoku, solveOneTime, nombreSudoku){
    for (let i = 0; i < 9; i++) {                 //9 filas en una matriz
        for (let j = 0; j < 9; j++) {             //9 columnas por fila
            await sleep(1);
            actualizarPantalla(array,nombreSudoku)
            //Busca los valores para casillas que tengan un cero inicialmente
            if (array[i][j] === null) {
                if (solveOneTime === "no") {
                    updateLPossVal(array, i, j, false, "no");   //Actualiza posibles valores en la lista de posibles valores
                } else if(solveOneTime === "yes"){
                    updateLPossVal(array, i, j, false, "yes");  //Actualiza posibles valores en la lista de posibles valores para estados
                }

                //Evalua casillas compartidas de la matriz superior izquierda y escoge los valores
                if ((whichOneSudoku == 1) && (i >= 6) && (j >= 6)) {
                    if (solveOneTime === "no") {
                        updateLPossVal(copyMatCent, i - 6, j - 6, true, "no");
                        chooseValues(array, i, j, true, "yes", whichOneSudoku,nombreSudoku);
                        
                    }
                    if (solveOneTime === "yes") {
                        updateLPossVal(copyMatCent, i - 6, j - 6, true, "yes");
                        chooseValues(array, i, j, true, "yes", whichOneSudoku,nombreSudoku);

                    }

                //Evalua casillas compartidas de la matriz superior derecha y escoge los valores
                } else if ((whichOneSudoku == 2) && (i >= 6) && (j <= 2)) {
                    if (solveOneTime === "no") {
                        updateLPossVal(copyMatCent, i - 6, j + 6, true, "no");
                        chooseValues(array, i, j, true, "yes", whichOneSudoku,nombreSudoku);

                    }
                    if (solveOneTime === "yes") {
                        updateLPossVal(copyMatCent, i - 6, j + 6, true, "yes");
                        chooseValues(array, i, j, true, "yes", whichOneSudoku,nombreSudoku);

                    }
                
                //Evalua casillas compartidas de la matriz inferior izquierda y escoge los valores
                } else if ((whichOneSudoku == 4) && (i <= 2) && (j >= 6) ) {
                    if (solveOneTime === "no") {
                        updateLPossVal(copyMatCent, i + 6, j - 6, true, "no");
                        chooseValues(array, i, j, true, "yes", whichOneSudoku,nombreSudoku);

                    }
                    if (solveOneTime === "yes") {
                        updateLPossVal(copyMatCent, i + 6, j - 6, true, "yes");
                        chooseValues(array, i, j, true, "no", whichOneSudoku,nombreSudoku);

                    }

                //Evalua casillas compartidas de la matriz inferior derecha y escoge los valores
                }else if ((whichOneSudoku == 5) && (i <= 2) && (j <= 2)) {
                    if (solveOneTime === "no") {
                        updateLPossVal(copyMatCent, i + 6, j + 6, true, "no");
                        chooseValues(array, i, j, true, "yes", whichOneSudoku,nombreSudoku);

                    }
                    if (solveOneTime === "yes") {
                        updateLPossVal(copyMatCent, i + 6, j + 6, true, "yes");
                        chooseValues(array, i, j, true, "no", whichOneSudoku,nombreSudoku);

                    }
                
                } else {
                    //Como no es una casilla compartida, se escoge el valor solo para esa casilla
                    if (solveOneTime === "no") {
                        chooseValues(array, i, j, false, "yes", whichOneSudoku,nombreSudoku);

                    } else if(solveOneTime === "yes"){
                        chooseValues(array, i, j, false, "no", whichOneSudoku,nombreSudoku);

                    }
                }
                //Limpia las listas segun, si es para hacer estados o no
                if (solveOneTime === "no") {
                    listPossibleValues = [];
                    auxListPossibleValues = [];
                
                }else if (solveOneTime === "yes") {
                    possibValStates = [];
                    auxPossibValStates = [];
                }
            }//end if
        }//end for columns
    }//end for rows
    actualizarPantalla(array, nombreSudoku);
}


// --------------------------------------------------------------------
// FINAL DEL CODIGO A**
//---------------------------------------------------------------------


// --------------------------------------------------------------------
// CODIGO PARA COMPROBAR EL ESTADO DEL SUDOKU 
//---------------------------------------------------------------------

/**
 * Las siguientes 3 funciones son para la ventana de error, la cual muestra en patanlla un mensaje y tambien activa y desactiva botones
 */
function cerrarVentanaError() {
    document.getElementById("mensaje-error").style.display = "none";
    activaBotones()
}
function activaBotones(){
    document.getElementById('generar').disabled = false;
    document.getElementById('resolvA').disabled = false;
    document.getElementById('resolvBack').disabled = false;
    document.getElementById('limpiar').disabled = false;
    document.getElementById('verificaNum').disabled = false;
}
function desactivaBotones(){
    document.getElementById('generar').disabled = true;
    document.getElementById('resolvA').disabled = true;
    document.getElementById('resolvBack').disabled = true;
    document.getElementById('limpiar').disabled = true;
    document.getElementById('verificaNum').disabled = true;
}

/**
 * Funcion para eliminar el numero dentro de la submatriz 3x3
 * @param {array*} matriz 
 * @param {number*} i 
 * @param {number*} j 
 * @param {number*} num 
 */
function eliminarNumeroRepetido(matriz, i, j, num) {
    matriz[i][j] = null;
    for (let m = i; m < i + 3; m++) { // Recorre la submatriz 3x3 y elimina el número repetido, pone null
        for (let n = j; n < j + 3; n++) {
            if (matriz[m][n] === num) {
                matriz[m][n] = null;
            }
        }
    }
}
/**
 * Funcion para verificar si un numero se repite dentro de una submatriz
 * @param {array*} matriz 
 * @returns 
 */
function verificarSubmatrices(matriz) {
    for (let i = 0; i < 9; i += 3) { // Recorre cada submatriz 3x3 de la matriz
        for (let j = 0; j < 9; j += 3) {
            const submatriz = []; // para crear una submatriz 3x3 a partir de la matriz principal
            for (let k = i; k < i + 3; k++) {
                submatriz.push(matriz[k].slice(j, j + 3));
            }       
            for (let num = 1; num <= 9; num++) { // Verifica si algún número del 1 al 9 se repite dentro de la submatriz
                let repite = false;
                for (let m = 0; m < 3; m++) {
                    for (let n = 0; n < 3; n++) {
                        if (submatriz[m][n] === num) {
                            if (repite) { // Si se encontró el número repetido, eliminarlo de la matriz y retorna false
                                eliminarNumeroRepetido(matriz, i + m, j + n, num);
                                return false; 
                            } 
                            else {
                                repite = true; // Si es la primera vez que se encuentra el número, establece el flag repite a true
                            }
                        }
                    }
                }
            }
        }
    }
    return true; // Si no se encontraron números repetidos en ninguna submatriz, retorna true
}

/**
 *  Funcion para verificar si los numeros se repiten internamente en el codigo, si se repiten, se elimina y se muestra que habia un error
 * @param {array} matriz 
 * @param {string} nombreCuadrados 
 * @returns 
 */
async function verificarNumeros(matriz, nombreCuadrados) {

    var error = false;
    // Verificar repetición en filas
    for (var fila = 0; fila < 9; fila++) {
        for (var columna = 0; columna < 9; columna++) {
            var numeroActual = matriz[fila][columna];
            if (numeroActual != null) { // Verificar si el valor actual no es nulo
                for (var i = 0; i < 9; i++) {
                    if (i != columna && matriz[fila][i] == numeroActual) { //ENCONTRO QUE EL NUMERO SE REPITE
                        matriz[fila][i] = null;                             //SE HACE QUE EL NUMERO NO SE ESCRIBA
                        error = true

                        cuadrado = nombreCuadrados + fila.toString() + columna.toString();
                        let input = document.getElementById(cuadrado);
                        input.style.backgroundColor = "red";         

                        await sleep(1000)
                        input.style.backgroundColor = "black"; 
                        break

                    }
                }
            }
        }
    }

    // Verificar repetición en columnas
    for (var columna = 0; columna < 9; columna++) {
        for (var fila = 0; fila < 9; fila++) {
            var numeroActual = matriz[fila][columna];
            if (numeroActual != null) { // Verificar si el valor actual no es nulo
                for (var i = 0; i < 9; i++) {
                    if (i != fila && matriz[i][columna] == numeroActual) {//ENCONTRO QUE EL NUMERO SE REPITE
                        matriz[i][columna] = null;         //SE HACE QUE EL NUMERO NO SE ESCRIBA
                        error = true

                        cuadrado = nombreCuadrados + fila.toString() + columna.toString();
                        let input = document.getElementById(cuadrado);
                        input.style.backgroundColor = "red";         

                        await sleep(1000)
                        input.style.backgroundColor = "black"; 

                        break
                    }
                }
            }
        }
    }

    if(verificarSubmatrices(matriz) === false){  //verifica las submatrices y tambien elimina luego el elemento si se repite
        error = true
    }
    
    if(error){
        document.getElementById("mensaje-error").style.display = "block";   //mensaje de error
        desactivaBotones()
        actualizarPantalla(matriz,nombreCuadrados)
        return
    }
    return //return, no existen numeros repetidos
}
// --------------------------------------------------------------------
// FIN DEL CODIGO PARA COMPROBAR EL ESTADO DEL SUDOKU 
//---------------------------------------------------------------------


/*===========================================================================================================================================
Funciones de los botones para la interfaz
=============================================================================================================================================*/
/**
 * Funcion para generar los tableros aletoriamente y tambien se muestre en pantalla
 */
function generarTableros(){
    limpiarSudoku();
    //Se generan los sudokus
    sudokuTopLeft = generarSudoku();
    sudokuTopRight = generarSudoku();
    sudokuCenter = generarSudoku();
    sudokuBottLeft = generarSudoku();
    sudokuBottRight = generarSudoku();

    actualizarEsquinas();

    //se agregan a la interfaz
    for (var x = 0; x < 5; x++) {                           
        if(x === 0){                //SUDOKU TopLeft
            for (var filas = 0; filas < 9; filas++) {                           
                for (var columnas = 0; columnas < 9; columnas++) {     
                    nombre = "TL" + filas.toString() + columnas.toString();
                    let input = document.getElementById(nombre);      
                    input.value = sudokuTopLeft[filas][columnas];
                }
            }
        }
        if(x === 1){                //SUDOKU TopRight
            for (var filas = 0; filas < 9; filas++) {                           
                for (var columnas = 0; columnas < 9; columnas++) {     
                    nombre = "TR" + filas.toString() + columnas.toString();
                    let input = document.getElementById(nombre);      
                    input.value = sudokuTopRight[filas][columnas];
                }
            }
        }
        if(x === 2){                //SUDOKU Center
            for (var filas = 0; filas < 9; filas++) {                           
                for (var columnas = 0; columnas < 9; columnas++) {     
                    nombre = "C" + filas.toString() + columnas.toString();
                    let input = document.getElementById(nombre);      
                    input.value = sudokuCenter[filas][columnas];
                }
            }
        }
        if(x === 3){                //SUDOKU BottLEFT
            for (var filas = 0; filas < 9; filas++) {                           
                for (var columnas = 0; columnas < 9; columnas++) {     
                    nombre = "BL" + filas.toString() + columnas.toString();
                    let input = document.getElementById(nombre);      
                    input.value = sudokuBottLeft[filas][columnas];
                }
            }
        }
        if(x === 4){                //SUDOKU BottRight
            for (var filas = 0; filas < 9; filas++) {                           
                for (var columnas = 0; columnas < 9; columnas++) {     
                    nombre = "BR" + filas.toString() + columnas.toString();
                    let input = document.getElementById(nombre);      
                    input.value = sudokuBottRight[filas][columnas];
                }
            }
        }
    }
}

/**
 * Funcion para limpiar el sudoku internamente y exteriormente
 */
function limpiarSudoku(){
    //limpia exteriormente
    for (var x = 0; x < 5; x++) {                           
        if(x === 0){                //SUDOKU TopLeft
            for (var filas = 0; filas < 9; filas++) {                           
                for (var columnas = 0; columnas < 9; columnas++) {     
                    nombre = "TL" + filas.toString() + columnas.toString();
                    let input = document.getElementById(nombre);      
                    input.style.backgroundColor = "black";
                    input.value = null;
                    sudokuTopLeft[filas][columnas] = null;//limpia internamente
                }
            }
        }
        if(x === 1){                //SUDOKU TopRight
            for (var filas = 0; filas < 9; filas++) {                           
                for (var columnas = 0; columnas < 9; columnas++) {     
                    nombre = "TR" + filas.toString() + columnas.toString();
                    let input = document.getElementById(nombre);      
                    input.style.backgroundColor = "black";
                    input.value = null;
                    sudokuTopRight[filas][columnas] = null;//limpia internamente
                }
            }
        }
        if(x === 2){                //SUDOKU Center
            for (var filas = 0; filas < 9; filas++) {                           
                for (var columnas = 0; columnas < 9; columnas++) {     
                    nombre = "C" + filas.toString() + columnas.toString();
                    let input = document.getElementById(nombre);      
                    input.style.backgroundColor = "black";
                    input.value = null;
                    sudokuCenter[filas][columnas] = null;//limpia internamente
                }
            }
        }
        if(x === 3){                //SUDOKU BottLEFT
            for (var filas = 0; filas < 9; filas++) {                           
                for (var columnas = 0; columnas < 9; columnas++) {     
                    nombre = "BL" + filas.toString() + columnas.toString();
                    let input = document.getElementById(nombre);     
                    input.style.backgroundColor = "black"; 
                    input.value = null;
                    sudokuBottLeft[filas][columnas] = null;//limpia internamente
                }
            }
        }
        if(x === 4){                //SUDOKU BottRight
            for (var filas = 0; filas < 9; filas++) {                           
                for (var columnas = 0; columnas < 9; columnas++) {     
                    nombre = "BR" + filas.toString() + columnas.toString();
                    let input = document.getElementById(nombre);      
                    input.style.backgroundColor = "black";
                    input.value = null;
                    sudokuBottRight[filas][columnas] = null;//limpia internamente
                }
            }
        }
    }
}


function  resolverAStar(){
    console.log("Entra a A**")

    compruebaSudoku()
    console.log("Sudoku del centro sin resolver:")
    imprimirSudoku(sudokuCenter);
    nodeEvaluation(sudokuCenter, 3, "no","C");
    console.log("Sudoku del centro resuelto:")
    imprimirSudoku(sudokuCenter);


    actualizarEsquinas();

    console.log("Sudoku Superior Izquierdo sin resolver:")
    imprimirSudoku(sudokuTopLeft);
    nodeEvaluation(sudokuTopLeft, 1, "no","TL");
    console.log("Sudoku Superior Izquierdo resuelto:")
    imprimirSudoku(sudokuTopLeft);


    console.log("Sudoku Superior Derecho sin resolver:")
    imprimirSudoku(sudokuTopRight);
    nodeEvaluation(sudokuTopRight, 2, "no","TR");
    console.log("Sudoku Superior Derecho resuelto:")
    imprimirSudoku(sudokuTopRight);


    console.log("Sudoku Inferior Izquierdo sin resolver:")
    imprimirSudoku(sudokuBottLeft);
    nodeEvaluation(sudokuBottLeft, 4, "no","BL");
    console.log("Sudoku Inferior Izquierdo resuelto:")
    imprimirSudoku(sudokuBottLeft);


    console.log("Sudoku Inferior Derecho sin resolver:")
    imprimirSudoku(sudokuBottRight);
    nodeEvaluation(sudokuBottRight, 5, "no","BL");
    console.log("Sudoku Inferior Derecho resuelto:")
    imprimirSudoku(sudokuBottRight);

    verificarNumeros(sudokuTopLeft,"TL");
    verificarNumeros(sudokuTopRight,"TR");
    verificarNumeros(sudokuCenter,"C");
    verificarNumeros(sudokuBottLeft,"BL");
    verificarNumeros(sudokuBottRight,"BR");

}


/**
 * Funcion para resolver los sudokus por backtraking
 */
function  resolverBacktracking(){
    console.log("Entra a BackTracking")

    compruebaSudoku()
    
    console.log("\nSudoku del centro sin resolver:")
    imprimirSudoku(sudokuCenter);
    resolverSudokuBack(sudokuCenter,"C");
    console.log("Sudoku del centro resuelto:")
    imprimirSudoku(sudokuCenter);

    actualizarEsquinas();

    console.log("\nSudoku Superior Izquierdo sin resolver:")
    imprimirSudoku(sudokuTopLeft);
    resolverSudokuBack(sudokuTopLeft, "TL");
    console.log("Sudoku Superior Izquierdo resuelto:")
    imprimirSudoku(sudokuTopLeft);


    console.log("\nSudoku Superior Derecho sin resolver:")
    imprimirSudoku(sudokuTopRight);
    resolverSudokuBack(sudokuTopRight, "TR");
    console.log("Sudoku Superior Derecho resuelto:")
    imprimirSudoku(sudokuTopRight);


    console.log("\nSudoku Inferior Izquierdo sin resolver:")
    imprimirSudoku(sudokuBottLeft);
    resolverSudokuBack(sudokuBottLeft, "BL");
    console.log("Sudoku Inferior Izquierdo resuelto:")
    imprimirSudoku(sudokuBottLeft);


    console.log("\nSudoku Inferior Derecho sin resolver:")
    imprimirSudoku(sudokuBottRight);
    resolverSudokuBack(sudokuBottRight, "BR");
    console.log("Sudoku Inferior Derecho resuelto:")
    imprimirSudoku(sudokuBottRight);
}




/**
 * Funcion que escribe los numeros del sudoku externo dentro del interior y luego verifica que no se repitan
 * si es necesario, se puede llamar varias veces
 */
function compruebaSudoku(){

    for (var x = 0; x < 5; x++) {                           
        if(x === 0){                //SUDOKU TopLeft
            for (var filas = 0; filas < 9; filas++) {                           
                for (var columnas = 0; columnas < 9; columnas++) {     
                    nombre = "TL" + filas.toString() + columnas.toString();
                    
                    let cuadrado = document.getElementById(nombre);             //obtengo el cuadro
                    num = parseInt(cuadrado.value);                             //obtiene el valor del input 

                    if(!isNaN(num)){                                            //para no dar error
                        sudokuTopLeft[filas][columnas] = num;                    //se ingresa el numero
                    }
                    else{                                                       //en el caso de que el usuario borre los numeros
                        sudokuTopLeft[filas][columnas] = null;
                    }
                }
            }
        }
        if(x === 1){                //SUDOKU TopRight
            for (var filas = 0; filas < 9; filas++) {                           
                for (var columnas = 0; columnas < 9; columnas++) {     
                    nombre = "TR" + filas.toString() + columnas.toString();
                    
                    let cuadrado = document.getElementById(nombre);             //obtengo el cuadro
                    num = parseInt(cuadrado.value);                             //obtiene el valor del input 

                    if(!isNaN(num)){                                            //para no dar error
                        sudokuTopRight[filas][columnas] = num;                    //se ingresa el numero
                    }
                    else{                                                       //en el caso de que el usuario borre los numeros
                        sudokuTopRight[filas][columnas] = null;
                    }
                }
            }
        }
        if(x === 2){                //SUDOKU Center
            for (var filas = 0; filas < 9; filas++) {                           
                for (var columnas = 0; columnas < 9; columnas++) {     

                    nombre = "C" + filas.toString() + columnas.toString();      //obtengo el nombre del cuadro

                    let cuadrado = document.getElementById(nombre);             //obtengo el cuadro
                    num = parseInt(cuadrado.value);                             //obtiene el valor del input 

                    if(!isNaN(num)){                                            //para no dar error
                        sudokuCenter[filas][columnas] = num;                    //se ingresa el numero
                    }
                    else{                                                       //en el caso de que el usuario borre los numeros
                        sudokuCenter[filas][columnas] = null;
                    }
                }
            }
        }
        if(x === 3){                //SUDOKU BottLEFT
            for (var filas = 0; filas < 9; filas++) {                           
                for (var columnas = 0; columnas < 9; columnas++) {     
                    nombre = "BL" + filas.toString() + columnas.toString();

                    let cuadrado = document.getElementById(nombre);             //obtengo el cuadro
                    num = parseInt(cuadrado.value);                             //obtiene el valor del input 

                    if(!isNaN(num)){                                            //para no dar error
                        sudokuBottLeft[filas][columnas] = num;                    //se ingresa el numero
                    }
                    else{                                                       //en el caso de que el usuario borre los numeros
                        sudokuBottLeft[filas][columnas] = null;
                    }
                }
            }
        }
        if(x === 4){                //SUDOKU BottRight
            for (var filas = 0; filas < 9; filas++) {                           
                for (var columnas = 0; columnas < 9; columnas++) {     
                    nombre = "BR" + filas.toString() + columnas.toString();

                    let cuadrado = document.getElementById(nombre);             //obtengo el cuadro
                    num = parseInt(cuadrado.value);                             //obtiene el valor del input 

                    if(!isNaN(num)){                                            //para no dar error
                        sudokuBottRight[filas][columnas] = num;                    //se ingresa el numero
                    }
                    else{                                                       //en el caso de que el usuario borre los numeros
                        sudokuBottRight[filas][columnas] = null;
                    }
                }
            }
        }
    }

    //se llama esta funcion para verificar los numeros escritos, si es necesario se usa varias veces
    actualizarEsquinas()
    verificarNumeros(sudokuTopLeft,"TL");
    verificarNumeros(sudokuTopRight,"TR");
    verificarNumeros(sudokuCenter,"C");
    verificarNumeros(sudokuBottLeft,"BL");
    verificarNumeros(sudokuBottRight,"BR");
}

/*===========================================================================================================================================
FINAL DE Funciones de los botones para la interfaz
=============================================================================================================================================*/


