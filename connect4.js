const tag = document.getElementById("header")
tag.innerText = "connect 4"
let turn = 0
let player1 = "red"
let winner = 'not found'
let grid = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
]

function takeTurn(e) {
   // while(winner === 'not found'){
    const id = e.target.id   // 'row1-col1'   ________x
    // 'rowY-colX' 

    const colNum = id[8]
    const rowNum = id[3]

    const lowestAvailableRow = getLowestAvailableRowInColumn(colNum, grid)
    console.log(`Lowest available row: ${lowestAvailableRow}`)

    if (lowestAvailableRow !== null) {
        turn++

        if (player1 === "red") {
            grid[lowestAvailableRow][colNum - 1] = "red"
            document.getElementById(`row${lowestAvailableRow + 1}-col${colNum}`).style.backgroundColor = 'red';
            player1 = "yellow"
        } else {
            grid[lowestAvailableRow][colNum - 1] = "yellow"
            document.getElementById(`row${lowestAvailableRow + 1}-col${colNum}`).style.backgroundColor = 'yellow';
            player1 = "red"
        }
    }
    let answer = checkWinner();
    //winner = checkWinner();
    if(answer == false)
    {
        if(turn >= 42)
            console.log('draw');

    }
    if(winner === 'red')
    console.log('red');
    if(winner === 'yellow')
    console.log('red');




    //console.log(`You clicked column ${colNum}`)
    //console.log(`Turn number ${turn}`)
    //console.log(grid)

}

function getLowestAvailableRowInColumn(colNum, myGridSoItIs) {
    for (let i = 5; i >= 0; i--) {
        if (myGridSoItIs[i][colNum - 1] === null) {
            return i
        }
    }


    return null;
}
function reset(e) {
    grid = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
    ]
    player1 = 'red'
   for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
        for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
            document.getElementById(`row${rowIndex+1}-col${columnIndex+1}`).style.backgroundColor = "white";
        }
    }
}

function checkWinner() {
    //console.log('I am here')
    const row_result = checkRows();
    const col_result = checkColumns();
    const dia_result = checkDiagonal();
    const counterdia_result = checkCounterDiagonal();
    if (row_result !== 'not found')
        return row_result;
    if (col_result !== 'not found')
        return col_result;
    if (dia_result !== 'not found')
    return dia_result;
    if (counterdia_result !== 'not found')
    return counterdia_result;
    if (row_result === 'not found' && col_result === 'not found' && dia_result === 'not found' && counterdia_result === 'not found')
        return 'not found';

}

function checkRows() {
    console.log('I am checking rows')
    for(let row = 0; row < 6; row++){
        for(let col = 0;col <4; col++) {
            if (grid[row][col] === grid[row][col+1] && grid[row][col] === grid[row][col+2] && grid[row][col] === grid[row][col+3]&&grid[row][col] !== null)
               { winner = grid[row][col];
                return true;
                
            }
        }

    }
    return false;
}

function checkColumns() {
    for(let row = 0; row < 3; row++){
        for(let col = 0; col<7;col++){
            if(grid[row][col] === grid[row+1][col]&& grid[row][col] === grid[row+2][col] && grid[row][col] === grid[row+3][col] && grid[row][col] !== null)
            {
                winner = grid[row][col];
                return true;
            }
        }
    }
    return false;
}

function checkDiagonal() {
    for(let row = 0; row < 3; row++){
        for(let col = 0; col < 4; col++){
            if(grid[row][col] === grid[row+1][col+1] && grid[row][col] === grid[row+2][col+2] && grid[row][col] === grid[row+3][col+3] && grid[row][col] !== null)
            {
                winner = grid[row][col];
                return true;
            }
        }

    }
    return false;

}

function checkCounterDiagonal(){
    console.log('Checking counterD')
    for(let row=3; row<6; row++){
        for(let col=0; col<4;col++){
            if(grid[row][col]===grid[row-1][col+1]&& grid[row][col]===grid[row-2][col+2]&&grid[row][col]===grid[row-3][col+3]&& grid[row][col] !== null)
            {
                winner = grid[row][col];
                return true; }
        }

    }
    return false;
}