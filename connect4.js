/* eslint-disable space-before-blocks */
// IMPURE FUNCTIONS

// state variable storing the state of the game
const state = {
  grid: [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
  ],
  turn: 0,
  score: 0,
  player: 'red',
  playerRed: '',
  playerYellow: '',
  winner: false,
  highscoreBoard: [],
  winnerDeclared: false

}
// captures usernames of the users playing
// eslint-disable-next-line no-unused-vars
function getUserName (e){
  state.playerRed = document.getElementById('player-red').value
  state.playerYellow = document.getElementById('player-yellow').value
}

// Populate appropriate column with discs
// eslint-disable-next-line no-unused-vars
function takeTurn (e) {
  const id = e.target.id // 'row1-col1'   ________x
  // 'rowY-colX'
  if (state.playerRed === '' || state.playerYellow === '') {
    window.alert('PLEASE ENTER USERNAMEEE!')
  } else if (state.winnerDeclared === false) {
    const colNum = id[8]
    // const rowNum = id[3]

    const lowestAvailableRow = getLowestAvailableRowInColumn(state.grid, colNum)

    if (lowestAvailableRow !== null && state.winner === false) {
      state.turn++
      const audio = new Audio('mixkit-retro-game-notification-212.mp3')
      audio.play()
      if (state.player === 'red') {
        state.grid[lowestAvailableRow][colNum - 1] = 'red'
        document.getElementById(`row${lowestAvailableRow + 1}-col${colNum}`).style.backgroundColor = 'red'
        state.player = swapPlayer(state.player)
      } else {
        state.grid[lowestAvailableRow][colNum - 1] = 'yellow'
        document.getElementById(`row${lowestAvailableRow + 1}-col${colNum}`).style.backgroundColor = 'yellow'
        state.player = swapPlayer(state.player)
      }
    }

    // check if we have a winner here if there is a draw, then show an appropriate message
    const answer = checkWinner(state)
    // if checkWinner returns true, then we can call display winner
    if (answer === false) {
      if (state.turn === 42) {
        state.winnerDeclared = true
        const winnerdisplay = document.getElementById('winner-message')
        winnerdisplay.style.display = 'block'
        winnerdisplay.style.backgroundColor = 'lightblue'
        winnerdisplay.textContent = 'DRAW!'
      }
    }
  }
}
// when the game is reset, the whole game state is reset to the initial state and winner displays are cleared
// eslint-disable-next-line no-unused-vars
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
  state.score = 0
  document.getElementById('myData').style.display = 'none'
}

function displayWinner () {
  const audio = new Audio('mixkit-animated-small-group-applause-523.mp3')
  if (state.winner === 'red') {
    const winnerdisplay = document.getElementById('winner-message')
    winnerdisplay.style.display = 'block'
    winnerdisplay.style.backgroundColor = 'red'
    winnerdisplay.textContent = `${state.playerRed} WON! with ${state.score} points!`
    audio.play()
  } else if (state.winner === 'yellow') {
    const winnerdisplay = document.getElementById('winner-message')
    winnerdisplay.style.display = 'block'
    winnerdisplay.style.backgroundColor = 'yellow'
    winnerdisplay.textContent = `${state.playerYellow} WON! with score ${state.score} points!`
    audio.play()
  }
  showScores()
  displayLeaderBoard()
}

// Send the scores, names and player colours of the winners to the API
function showScores () {
  if (state.winner === 'red'){
    const gameWinner = { player: state.playerRed, score: state.score, colour: 'red' }
    fetch('http://localhost:3000/connect/scores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gameWinner)
    }).then(function (response) {
      if (response.ok) {
        return
      } throw new Error('ERROR!')
    }).catch(function (error) {
      console.log(error)
    })
  } else if (state.winner === 'yellow'){
    const gameWinner = { player: state.playerYellow, score: state.score, color: 'yellow' }
    fetch('http://localhost:3000/connect/scores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gameWinner)
    }).then(function (response){
      if (response.ok){
        return
      } throw new Error('ERROR FROM YELLOW!')
    }).catch(function (error){
      console.log(error)
    })
  }
}

// Fetch the data from the existing json of scores (scoreboard)
function displayLeaderBoard (data) {
  fetch('scores.json')
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      appendData(data)
    })
    .catch(function (err) {
      console.log('error: ' + err)
    })
}
// Display the highscores
function appendData (data){
  const highscore = document.getElementById('myData')
  highscore.innerHTML = ''
  highscore.style.display = 'block'
  for (let i = 0; i < 10; i++){
    highscore.innerHTML += '<p>' + data[i].player + ':' + data[i].score + '</p>'
  }
}

// PURE FUNCTIONS
// Check which the lowest column is available (either the column is full or you have a row that's unoccupied)
function getLowestAvailableRowInColumn (grid, colNum) {
  for (let i = 5; i >= 0; i--) {
    if (grid[i][colNum - 1] === null) {
      return i
    }
  }

  return null
}

// Check all possible combinations, like rows, columns, diagonals and counterdiagonals
// If any one of these returns a true, there is a winner!
function checkWinner (state) {
  // wherever checkwinner is being called, that calls display winner
  const rowResult = checkRows(state)
  const colResult = checkColumns(state)
  const diaResult = checkDiagonal(state)
  const counterdiaResult = checkCounterDiagonal(state)

  if (rowResult === false && colResult === false && diaResult === false && counterdiaResult === false) { return false } else {
    state.winnerDeclared = true
    displayWinner()
    return true
  }
}
// Check along all possible diagonals if there is a winner
function checkDiagonal (state) {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      if (state.grid[row][col] === state.grid[row + 1][col + 1] && state.grid[row][col] === state.grid[row + 2][col + 2] && state.grid[row][col] === state.grid[row + 3][col + 3] && state.grid[row][col] !== null) {
        state.winner = state.grid[row][col]
        state.score = (42 - state.turn)
        return state.grid[row][col]
      }
    }
  }
  return false
}
// Check along all possible counter-diagonals if there is a winner
function checkCounterDiagonal (state) {
  for (let row = 3; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      if (state.grid[row][col] === state.grid[row - 1][col + 1] && state.grid[row][col] === state.grid[row - 2][col + 2] && state.grid[row][col] === state.grid[row - 3][col + 3] && state.grid[row][col] !== null) {
        state.winner = state.grid[row][col]
        state.score = (42 - state.turn)
        return state.grid[row][col]
      }
    }
  }
  return false
}
// Check along all possible columns if there is a winner
function checkColumns (state) {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 7; col++) {
      if (state.grid[row][col] === state.grid[row + 1][col] && state.grid[row][col] === state.grid[row + 2][col] && state.grid[row][col] === state.grid[row + 3][col] && state.grid[row][col] !== null) {
        state.winner = state.grid[row][col]
        state.score = (42 - state.turn)
        return state.grid[row][col]
      }
    }
  }
  return false
}
// Check all possible rows if there is a winner
function checkRows (state) {
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      if (state.grid[row][col] === state.grid[row][col + 1] && state.grid[row][col] === state.grid[row][col + 2] && state.grid[row][col] === state.grid[row][col + 3] && state.grid[row][col] !== null) {
        state.winner = state.grid[row][col]
        state.score = (42 - state.turn)
        return state.grid[row][col]
      }
    }
  }
  return false
}

// Swap players at every turn
function swapPlayer (player) {
  if (player === 'red') { return 'yellow' } else { return 'red' }
}

// Uncomment when you want to test
module.exports = {swapPlayer, getLowestAvailableRowInColumn}
