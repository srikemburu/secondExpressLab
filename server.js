require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT;
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

app.get('/greeting/:name', (req,res) => {
    res.render('template1', { title: 'Greeting', message: 'Wow! Hello there ', content: 'Welcome, ' + req.params.name + ', good to see you'})
})

app.get('/tip/:total/:tipPercentage', (req,res) => {
    res.render('template1', { title: 'Tip', message: 'Your tip is ', content: req.params.total * (req.params.tipPercentage)/100})
})

const magicRes = ["It is certain", "It is decidedly so", "Without a doubt", "Yes definitely","You may rely on it", "As I see it yes", "Most likely", "Outlook good","Yes", "Signs point to yes", "Reply hazy try again", "Ask again later","Better not tell you now", "Cannot predict now", "Concentrate and ask again","Don't count on it", "My reply is no", "My sources say no","Outlook not so good", "Very doubtful"]


app.get('/magic/:question', (req,res) => {
    res.render('template1', {title: 'Magic Ball', message: "Your Question is: " + req.params.question, content: "The answer is : " + magicRes[Math.floor(Math.random() * 20)]
    })
})

app.listen(port,() => {
    console.log('listening on port' , port);
});
