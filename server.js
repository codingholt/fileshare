require('dotenv').config()
const multer = require('multer')
const mongoose = require('mongoose')
const File =  require('./models/File.js')
const bcrypt = require('bcrypt')
// init express
const express = require('express')
const app = express()

const upload = multer({ dest: 'uploads' })
mongoose.connect(process.env.DATABASE_URL)


app.set('view engine', 'ejs')
app.get('/', (req, res) =>{
    res.render('index')
})

app.post('/upload', upload.single('file'), async (req, res) =>{
    const fileData = {
        path: req.file.path,
        originalName: req.file.originalname,

    } 
    if(req.body.password != null && req.body.password !== ""){
        fileData.password = await bcrypt.hash(req.body.password, 10)
    }

    const file = await File.create(fileData)


    res.render('index', { filelink: `${req.headers.origin}/file/${file.id}`})
})

app.get('/file/:id', async (req, res) => {
    const file = await File.findById(req.params.id)

    file.viewCount++
    await file.save()
    console.log(file)
    res.download(file.path, file.originalName)
})


app.post('upload')
app.listen(process.env.PORT)