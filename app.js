const cors = require('cors');
const express = require('express');
const app = express();
var bodyParser = require('body-parser')
app.use( bodyParser.json() ); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
extended: true
}));
app.use(express.json()); // to support JSON-encoded bodies
const fs = require("fs");
//const { response } = require('express');

const data = fs.readFileSync('scores.json', 'utf8')
const results = JSON.parse(data)


app.use(express.static(__dirname + '/'))



app.get('/connect', function(req,res) {
res.sendFile(__dirname + '/index.html');
});

app.get('/enterusername', function(req,res){
  res.sendFile(__dirname + '/form.html')
});

app.get('/connect/scores', function(req, res){
    res.json(results)
})

app.post('/connect/scores', function (req, res) {
    const scores = req.body
    console.log('HI')
    console.log(req.body.player)
    res.send(req.body)
    let file1 = fs.readFileSync("scores.json") 
      let json = JSON.parse(file1)
      //console.log(json)
      json.push(scores)
      json.sort(function(a, b) {
        return b.score - a.score;
      });
      //console.log(json)
      fs.writeFileSync("scores.json", JSON.stringify(json))
  })
app.listen(3000);