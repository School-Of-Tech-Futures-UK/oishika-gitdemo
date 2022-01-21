
const tag = document.getElementById('header')
tag.innerText = 'connect 4'
let turn = 0
let player1 = 'red'
let winner = 'not found'
let scores = { 'red': 0, 'yellow': 0}
let playerRed = ''
let playerYellow = ''
let grid = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null]
]

function getUserName(e){
  playerRed = document.getElementById('player-red').value
  playerYellow = document.getElementById('player-yellow').value
  //console.log(name1)
}



function takeTurn (e) {
  // while(winner !== 'yellow' || winner !== 'red'){
  const id = e.target.id // 'row1-col1'   ________x
  // 'rowY-colX'
  //displayLeaderBoard();
  if(playerRed === '' || playerYellow === '')
  {
    window.alert('PLEASE ENTER USERNAMEEE!');
  }
  else {
  
  const colNum = id[8]
  const rowNum = id[3]

  const lowestAvailableRow = getLowestAvailableRowInColumn(colNum, grid)
  //console.log(`Lowest available row: ${lowestAvailableRow}`)
  // if (winner === 'not found' && turn === 42)
  // {
  //     console.log('draw')
  // }

  if (lowestAvailableRow !== null && winner === 'not found') {
    turn++
    //console.log(turn)
    if (player1 === 'red') {
      grid[lowestAvailableRow][colNum - 1] = 'red'
      document.getElementById(`row${lowestAvailableRow + 1}-col${colNum}`).style.backgroundColor = 'red'
      player1 = 'yellow'
    } else {
      grid[lowestAvailableRow][colNum - 1] = 'yellow'
      document.getElementById(`row${lowestAvailableRow + 1}-col${colNum}`).style.backgroundColor = 'yellow'
      player1 = 'red'
    }
  }
  const answer = checkWinner()
  // winner = checkWinner();
  if (answer === 'not found') {
    if (turn === 42) {
      console.log('draw')
      const winnerdisplay = document.getElementById('winner-message')
      winnerdisplay.style.display = 'block'
      winnerdisplay.style.backgroundColor = 'lightblue'
      winnerdisplay.textContent = 'DRAW!'
    }
  }
  }
  // console.log(`You clicked column ${colNum}`)
  // console.log(`Turn number ${turn}`)
  // console.log(grid)
}
function getLowestAvailableRowInColumn (colNum, myGridSoItIs) {
  for (let i = 5; i >= 0; i--) {
    if (myGridSoItIs[i][colNum - 1] === null) {
      return i
    }
  }

  return null
}
function reset (e) {
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
      document.getElementById(`row${rowIndex + 1}-col${columnIndex + 1}`).style.backgroundColor = 'white'
    }
  }
  document.getElementById('winner-message').style.backgroundColor = 'white'
  document.getElementById('winner-message').textContent = ''
  winner = 'not found'
  turn = 0
  playerRed = ''
  playerYellow = ''
  let scores = { 'red': 0, 'yellow': 0}
  document.getElementById('myData').style.display='none';
  // let el = document.getElementById('div');
  // el.remove();
}

function checkWinner () {
  // console.log('I am here')
  const row_result = checkRows()
  const col_result = checkColumns()
  const dia_result = checkDiagonal()
  const counterdia_result = checkCounterDiagonal()

  if (row_result === false && col_result === false && dia_result === false && counterdia_result === false) { return 'not found' }
}

function checkRows () {
  // console.log('I am checking rows')
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      if (grid[row][col] === grid[row][col + 1] && grid[row][col] === grid[row][col + 2] && grid[row][col] === grid[row][col + 3] && grid[row][col] !== null) {
        winner = grid[row][col]
        scores[winner] = (42 - turn)
        //console.log(scores)
        displayWinner()
        return true
      }
    }
  }
  return false
}

function checkColumns () {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 7; col++) {
      if (grid[row][col] === grid[row + 1][col] && grid[row][col] === grid[row + 2][col] && grid[row][col] === grid[row + 3][col] && grid[row][col] !== null) {
        winner = grid[row][col]
        scores[winner] = (42 - turn)
        //console.log(scores)
        displayWinner()
        return true
      }
    }
  }
  return false
}

function checkDiagonal () {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      if (grid[row][col] === grid[row + 1][col + 1] && grid[row][col] === grid[row + 2][col + 2] && grid[row][col] === grid[row + 3][col + 3] && grid[row][col] !== null) {
        winner = grid[row][col]
        scores[winner] = (42 - turn)
        //console.log(scores)
        displayWinner()
        return true
      }
    }
  }
  return false
}

function checkCounterDiagonal () {
  // console.log('Checking counterD')
  for (let row = 3; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      if (grid[row][col] === grid[row - 1][col + 1] && grid[row][col] === grid[row - 2][col + 2] && grid[row][col] === grid[row - 3][col + 3] && grid[row][col] !== null) {
        winner = grid[row][col]
        scores[winner] = (42 - turn)
        //console.log(scores)
        displayWinner()
        return true
      }
    }
  }
  return false
}

function displayWinner () {
  if (winner === 'red') {
    const winnerdisplay = document.getElementById('winner-message')
    winnerdisplay.style.display = 'block'
    winnerdisplay.style.backgroundColor = 'red'
    winnerdisplay.textContent = `${playerRed} WON! with ${scores['red']}`
    
  } else if (winner === 'yellow') {
    const winnerdisplay = document.getElementById('winner-message')
    winnerdisplay.style.display = 'block'
    winnerdisplay.style.backgroundColor = 'yellow'
    winnerdisplay.textContent = `${playerYellow} WON! with score ${scores['yellow']}`
  }
  showScores()
  displayLeaderBoard();
}

function showScores(){
  console.log('I am here')
  if (winner === 'red'){
    const gameWinner = {'player': playerRed, 'score': scores['red'], 'colour': 'red'}
    fetch('http://localhost:3000/connect/scores', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(gameWinner)
    }).then(function(response)
    {
      if(response.ok){
        return 
      } throw new Error('ERROR!')
    }).catch(function(error){
      console.log(error)
    })
  }
  else if (winner === 'yellow'){
    const gameWinner = {'player': playerYellow, 'score': scores['yellow'], 'color': 'yellow'}
    fetch('http://localhost:3000/connect/scores', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify(gameWinner)
    }).then(function(response){
      if(response.ok){
        return
      } throw new Error('ERROR FROM YELLOW!')
    }).catch(function(error){
      console.log(error)
    })
  }}

  function displayLeaderBoard(data) {
    fetch('scores.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendData(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });

}

function appendData(data){
  document.getElementById('myData').style.display = 'block';
  var mainContainer = document.getElementById("myData");
  for (var i = 0; i < 10; i++) {
      var div = document.createElement("div");
      div.innerHTML = 'Name: ' + data[i].player + ' ' + data[i].score;
      mainContainer.appendChild(div);
  }
}