// IMPURE FUNCTIONS
// const tag = document.getElementById('header')
// tag.innerText = 'connect 4'
let state = {
  grid : [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
  ],
  turn : 0,
  score : 0,
  player: 'red',
  playerRed : '',
  playerYellow : '',
  winner: false,
  highscoreBoard : [],
  winnerDeclared : false

}

function getUserName(e){
  state.playerRed = document.getElementById('player-red').value
  state.playerYellow = document.getElementById('player-yellow').value
  //console.log(name1)
}



function takeTurn (e) {
  // while(winner !== 'yellow' || winner !== 'red'){
  const id = e.target.id // 'row1-col1'   ________x
  // 'rowY-colX'
  //displayLeaderBoard();
  if(state.playerRed === '' || state.playerYellow === '')
  {
    window.alert('PLEASE ENTER USERNAMEEE!');
  }
  else if (state.winnerDeclared === false) {
  
  const colNum = id[8]
  const rowNum = id[3]

  const lowestAvailableRow = getLowestAvailableRowInColumn(state, colNum)
  //console.log(`Lowest available row: ${lowestAvailableRow}`)
  // if (winner === 'not found' && turn === 42)
  // {
  //     console.log('draw')
  // }

  if (lowestAvailableRow !== null && state.winner === false) {
    state.turn++
    //console.log(turn)
    if (state.player === 'red') {
      state.grid[lowestAvailableRow][colNum - 1] = 'red'
      document.getElementById(`row${lowestAvailableRow + 1}-col${colNum}`).style.backgroundColor = 'red'
      state.player = swapPlayer(state.player);
    } else {
      state.grid[lowestAvailableRow][colNum - 1] = 'yellow'
      document.getElementById(`row${lowestAvailableRow + 1}-col${colNum}`).style.backgroundColor = 'yellow'
      state.player = swapPlayer(state.player)
    }
  }
  const answer = checkWinner(state)
  //if checkWinner returns true, then we can call display winner 
  // winner = checkWinner();
  if (answer === false) {
    if (state.turn === 42) {
      state.winnerDeclared = true
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

function reset (e) {
  state.grid = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
  ]
  state.player = 'red'
  for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
    for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
      document.getElementById(`row${rowIndex + 1}-col${columnIndex + 1}`).style.backgroundColor = 'white'
    }
  }
  document.getElementById('winner-message').style.backgroundColor = 'white'
  document.getElementById('winner-message').textContent = ''
  state.winnerDeclared = false
  state.winner = false
  state.turn = 0
  state.playerRed = ''
  state.playerYellow = ''
  state.scores = { 'red': 0, 'yellow': 0}
  document.getElementById('myData').style.display='none';
  // let el = document.getElementById('div');
  // el.remove();
}

function displayWinner () {
  if (state.winner === 'red') {
    const winnerdisplay = document.getElementById('winner-message')
    winnerdisplay.style.display = 'block'
    winnerdisplay.style.backgroundColor = 'red'
    winnerdisplay.textContent = `${state.playerRed} WON! with ${state.scores} points!`
    
  } else if (state.winner === 'yellow') {
    const winnerdisplay = document.getElementById('winner-message')
    winnerdisplay.style.display = 'block'
    winnerdisplay.style.backgroundColor = 'yellow'
    winnerdisplay.textContent = `${state.playerYellow} WON! with score ${state.scores} points!`
  }
  showScores()
  displayLeaderBoard();
}

function showScores(){
  console.log('I am here')
  if (state.winner === 'red'){
    const gameWinner = {'player': state.playerRed, 'score': state.scores, 'colour': 'red'}
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
  else if (state.winner === 'yellow'){
    const gameWinner = {'player': state.playerYellow, 'score': state.scores, 'color': 'yellow'}
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
  const highscore = document.getElementById('myData')
  highscore.innerHTML = ''
  highscore.style.display = 'block';
  // var mainContainer = document.getElementById("myData");
  // for (var i = 0; i < 10; i++) {
  //     var div = document.createElement("div");
  //     div.innerHTML = 'Name: ' + data[i].player + ' ' + data[i].score;
  //     mainContainer.appendChild(div);
  // }
  for (let i = 0; i<10 ; i++){
    highscore.innerHTML += '<p>' + data[i].player + ':' + data[i].score + '</p>'
  }

}

// PURE FUNCTIONS

function getLowestAvailableRowInColumn (state, colNum) {
  for (let i = 5; i >= 0; i--) {
    if (state.grid[i][colNum - 1] === null) {
      return i;
    }
  }

  return null
}

function checkWinner (state) {
  // console.log('I am here')
  const row_result = checkRows(state)
  const col_result = checkColumns(state)
  const dia_result = checkDiagonal(state)
  const counterdia_result = checkCounterDiagonal(state)

  if (row_result === false && col_result === false && dia_result === false && counterdia_result === false) 
  { return false }
  else
  {
    state.winnerDeclared = true
    displayWinner();
    return true;
  }
}

function checkDiagonal (state) {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      if (state.grid[row][col] === state.grid[row + 1][col + 1] && state.grid[row][col] === state.grid[row + 2][col + 2] && state.grid[row][col] === state.grid[row + 3][col + 3] && state.grid[row][col] !== null) {
        state.winner = state.grid[row][col]
        state.scores = (42 - state.turn)
        //console.log(scores)
        //displayWinner()
        return true
      }
    }
  }
  return false
}

function checkCounterDiagonal (state) {
  // console.log('Checking counterD')
  for (let row = 3; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      if (state.grid[row][col] === state.grid[row - 1][col + 1] && state.grid[row][col] === state.grid[row - 2][col + 2] && state.grid[row][col] === state.grid[row - 3][col + 3] && state.grid[row][col] !== null) {
        state.winner = state.grid[row][col]
        state.scores = (42 - state.turn)
        //console.log(scores)
        //displayWinner()
        return true
      }
    }
  }
  return false
}

function checkColumns (state) {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 7; col++) {
      if (state.grid[row][col] === state.grid[row + 1][col] && state.grid[row][col] === state.grid[row + 2][col] && state.grid[row][col] === state.grid[row + 3][col] && state.grid[row][col] !== null) {
        state.winner = state.grid[row][col]
        state.scores = (42 - state.turn)
        //console.log(scores)
        //displayWinner()
        return true
      }
    }
  }
  return false
}

function checkRows (state) {
  // console.log('I am checking rows')
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      if (state.grid[row][col] === state.grid[row][col + 1] && state.grid[row][col] === state.grid[row][col + 2] && state.grid[row][col] === state.grid[row][col + 3] && state.grid[row][col] !== null) {
        state.winner = state.grid[row][col]
        state.scores = (42 - state.turn)
        //console.log(scores)
        //displayWinner()
        return true
      }
    }
  }
  return false
}

function swapPlayer(player) {
  if(player === 'red')
    return 'yellow'
  else
  return 'red'
}

// if (typeof exports === 'object') {
//     console.log("Running in Node")
//     // Node. Does not work with strict CommonJS, but only CommonJS-like 
//     // environments that support module.exports, like Node.
//     module.exports = {
//         checkRows,
//         checkDiagonal,
//         checkColumns,
//         checkCounterDiagonal,
//         checkWinner,
//         reset,
        
//     }
// } else {
//     console.log("Running in Browser")
// }

//module.exports = {swapPlayer}
