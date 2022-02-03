const connect = require('./connect4.js')

describe('calling swapPlayer', () => {
  it('if current player is red, next player is yellow', () => {
    const player = 'red'
    const output = connect.swapPlayer(player)
    expect(output).toBe('yellow')
  })

  it('if current player is yellow, next player is red', () => {
    const player = 'yellow'
    const output = connect.swapPlayer(player)
    expect(output).toBe('red')
  })
})

describe('calling getLowestAvailableRowInColumn', () => {
  it('if column is empty, coin reaches bottom ', () => {
    const grid = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null]
    ]
    const colNum = 1
    const expectedOutput = 5
    const output = connect.getLowestAvailableRowInColumn(grid,colNum)
    expect(output).toBe(expectedOutput)
  })
  it('if lowest slot is filled, coin occupies next lowest slot', () => {
    const grid = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, 'yellow', null, null]
    ]
    const colNum = 4
    const expectedOutput = 5
    const output = connect.getLowestAvailableRowInColumn(grid, colNum)
    expect(output).toBe(expectedOutput)

  })
  it('by clicking an already full column, you cant add anything else to the board', () => {
    const grid = [
      ['red', null, null, null, null, null, 'red'],
      ['red', null, null, null, null, null, 'yellow'],
      ['red', null, null, null, null, null, 'red'],
      ['yellow', null, null, null, null, null, 'yellow'],
      ['red', null, null, null, null, null, 'red'],
      ['red', null, null, null, null, null, 'red']
    ]
    const colNum = 0
    const expectedOutput = null
    const output = connect.getLowestAvailableRowInColumn(grid, colNum)
    expect(output).toBe(expectedOutput)
  })
})

describe('calling checkColumns function', () => {
  for(let i = 0; i<3;i++){
    for(let j = 0; j<7;j++){
      it(`if there are four coins of the same colour then we have a win! row ${i} column ${j}`, () => {
        let grid = [
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null]
        ]
        grid[i][j] = 'red'
        grid[i+1][j] = 'red'
        grid[i+2][j] = 'red'
        grid[i + 3][j] = 'red'
        const expectedOutput = 'red'
        const output = connect.checkColumns(grid)
        expect(output).toBe(expectedOutput)
      })
    }
  }
  for(let i = 0; i< 3; i++)
})