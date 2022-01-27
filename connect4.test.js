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