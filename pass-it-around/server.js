require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT;
//var ejsLayouts = require("express-ejs-layouts");

const fs = require('fs')

app.engine('hypatia', (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err)
    const rendered = content.toString()
      .replace('#title#', '<title>' + options.title + '</title>')
      .replace('#message#', '<h1>' + options.message + '</h1>')
      .replace('#content#','<h1>'+ options.content + '</h1>' )
      .replace('#image#', '<img src =' + options.image + '>')
    return callback(null, rendered)
  })
})

app.set('views', './views')
app.set('view engine', 'hypatia')
//app.set('view engine','ejs');
//app.use(ejsLayouts);

  

// app.get('/:num', (req,res) => {
//     const number = req.params.num - 1
//     res.send('template', { title: 'Take one Down and Pass it Around', message: ' + number + Bottles of beer on the wall', content: 'Check out <a href="localhost:3000" + number target="_blank">Take one down pass it around</a>'})
// })

app.get('/', (req,res) => {    
    res.send('99 Bottles of beer on the wall<br><br>' + `<a href=/98>Take one down pass it around</a>`)
})

app.get('/:num', (req,res) => {
    const number = req.params.num - 1
    res.send(req.params.num + ' Bottles of beer on the wall<br><br>' + `<a href=/${number}>Take one down pass it around</a>`)
})


app.listen(port,() => {
    console.log('listening on port' , port);
})