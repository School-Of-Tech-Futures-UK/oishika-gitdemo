/* eslint-disable no-trailing-spaces */
const cors = require('cors')
const express = require('express')
const app = express()
var bodyParser = require('body-parser')
app.use( bodyParser.json() ) // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}))
app.use(express.json()) // to support JSON-encoded bodies
const fs = require('fs')

const data = fs.readFileSync('scores.json', 'utf8')
const results = JSON.parse(data)

app.use(express.static(__dirname + '/'))

app.get('/connect', function (req,res) {
  res.sendFile(__dirname + '/index2.html')
})

// fetch the scores
app.get('/connect/scores', function (req, res) {
  res.json(results)
})
// Fetch the names and scores of the winning player from the game and store them in a file after sorting the scores 
app.post('/connect/scores', function (req, res) {
  const scores = req.body
  res.send(req.body)
  const file1 = fs.readFileSync('scores.json') 
  const json = JSON.parse(file1)
  json.push(scores)
  json.sort(function (a, b) {
    return b.score - a.score
  })
  fs.writeFileSync('scores.json', JSON.stringify(json))
})
app.listen(3000)
