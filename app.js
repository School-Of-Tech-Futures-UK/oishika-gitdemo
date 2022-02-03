/* eslint-disable no-trailing-spaces */
const cors = require('cors')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json()) // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}))
app.use(express.json()) // to support JSON-encoded bodies
const fs = require('fs')

const data = fs.readFileSync('scores.json', 'utf8')
const results = JSON.parse(data)

app.use(express.static(__dirname + '/'))

app.get('/connect', function (req, res) {
  try {
    res.sendFile(__dirname + '/index2.html')
  } catch (err) {
    console.log(err.message)
  }
})

// fetch the scores
app.get('/connect/scores', function (req, res) {
  res.json(results)
})
// Fetch the names and scores of the winning player from the game and store them in a file after sorting the scores 
app.post('/connect/scores', function (req, res) {
  const scores = req.body
  res.send(req.body)
  try {
    const highscorefile = fs.readFileSync('scores.json')
    const json = JSON.parse(highscorefile)
    json.push(scores)
    json.sort(function (a, b) {
      return b.score - a.score
    })
    fs.writeFileSync('scores.json', JSON.stringify(json))
  } catch (err) {
    console.log(err.message)
    // window.alert('Sorry there is a problem with the highscore board!')
  } 
})
app.listen(3000)
