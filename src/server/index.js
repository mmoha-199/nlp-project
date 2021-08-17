// create object to hold data
let nlptData = {};

const dotenv = require('dotenv');
dotenv.config();
var path = require('path');
const express = require('express');
const fetch = require('node-fetch');
const mockAPIResponse = require('./mockAPI.js')
//express
const app = express()

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('dist/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
/* Dependencies */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());


// variables
let baseURL = 'https://api.meaningcloud.com/sentiment-2.1?key=';
const json = '&of=json&txt=';
const nlpKey = process.env.API_KEY;
const end = '&model=General&lang=en';

//API_KEY
console.log(`Your API key is ${process.env.API_KEY}`);

// GET route
app.get('/addSentim', addSentim);

function addSentim (request, response) {
  response.send(nlpData);
};

// POST route
app.post('/postSentim', postSentim);
 
function postSentim (req, res) {
    console.log('',req.body)
    const text = req.body?.formText;
    const response = await fetch(`${baseURL}${nlpKey}${json}${text}${end}`);
    const jsonRes = await response.json();
    res.send(jsonRes);
};