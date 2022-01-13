const tag = document.getElementById("header")
tag.innerText = "connect 4"
let turn = 0
let player1 = "red"

let grid = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
]

function takeTurn(e) {
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

    checkWinner();



    console.log(`You clicked column ${colNum}`)
    console.log(`Turn number ${turn}`)
    console.log(grid)
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
   for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
        for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
            document.getElementById(`row${rowIndex+1}-col${columnIndex+1}`).style.backgroundColor = "white";
        }
    }
}

function checkWinner() {
    
}