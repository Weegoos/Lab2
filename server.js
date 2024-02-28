const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
require('dotenv').config()
const nodemailer = require('nodemailer');

const app = express()

app.get('/api/data', (req, res) => {
    res.json({message: "Hello my bro, what is your name?"})
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const blogsRouter = require('./blogs/blogServerCode')
app.use('/blogs', blogsRouter);

const readRouter = require('./reader/readServerCode')
app.use('/read', readRouter)

const registrationRouter = require('./registration/registrationServer')
app.use('/', registrationRouter)

app.get('/blogs', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'blogs', 'blogs.html'))
})
app.use('/blogs', express.static(path.resolve(__dirname, 'blogs')));

app.get('/read', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'reader', 'read.html'))
})
app.use('/reader', express.static(path.resolve(__dirname, 'reader')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'main', 'mainPage.html'))
})

app.use('/main', express.static(path.resolve(__dirname, 'main')))

app.get('/registration/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'registration', 'req.html'))
})

app.use('/registration', express.static(path.resolve(__dirname, 'registration')))

const price = require('./price/priceServer')

app.get('/pricing', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'price', 'price.html'))
})

app.use('/pricing', price)

app.use('/price', express.static(path.resolve(__dirname, 'price')))

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'login', 'login.html'))
})

app.use('/login', express.static(path.resolve(__dirname, 'login')))
const loginRouter = require('./login/js/loginServer')
app.use('/login', loginRouter)
app.use('/settings', express.static(path.resolve(__dirname, 'settings')))

app.get('/content', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'content', 'content.html'))
})

app.use('/content',express.static(path.resolve(__dirname, 'content')))
const contentRouter = require('./content/contentServerCode')
app.use('/content', contentRouter)

app.get('/creation', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'creation', 'creation.html'))
})

app.use('/creation',express.static(path.resolve(__dirname, 'creation')))
const creationRouter = require('./creation/createServerCode')
app.use('/creation', creationRouter)

app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'about', 'about.html'))
})

app.get('/images', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'about', 'images.html'))
})
app.use('/about', express.static(path.resolve(__dirname, 'about')))


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

