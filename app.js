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



app.post('/connect', function(req,res) {
const user1 = req.body.player1
const user2 = req.body.player2
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
    results['red'] = scores['red']
    results['yellow'] = scores['yellow']
    console.log(JSON.stringify(results))
    fs.writeFile('scores.json', JSON.stringify(results), err => {
      if(err){
        console.log(err)
      
      }
      else
      console.log('Success!!!!')
    }
    )


  })
app.listen(3000);