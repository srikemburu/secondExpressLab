require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT;
const fs = require('fs')

app.get('/', (req,res) => {    
    res.send('<h1>99 Bottles of beer on the wall<br></h1>' + `<h2><a href=/98>Take one down pass it around</a></h2>`)
})

app.get('/:num', (req,res) => {
    const number = req.params.num - 1
    if (number >= 0) {
        res.send(`<h1>${req.params.num}  Bottles of beer on the wall<br></h1>` + `<h2><a href=/${number}>Take one down pass it around</a></h2>`)
 }
    else{
        res.send('<h1>ZERO Bottles of beer on the wall<br></h1>' + `<h2><a href="/">Start Over</a></h2>`)
    }
})

app.listen(port,() => {
    console.log('listening on port' , port);
})