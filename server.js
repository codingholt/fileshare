const multer = require('multer')
const mongoose = require('mongoose')
// init express
const express = require('express')
const app = express()

const upload = multer({ dest: 'uploads' })

app.set('view engine', 'ejs')
app.get('/', (req, res) =>{
    res.render('index')
})

app.post('/upload', upload.single('file'), (req, res) =>{ 
    res.send('hi👋')
})
app.post('upload')
app.listen(3000)