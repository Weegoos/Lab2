const express = require('express')
const router = express.Router()
const path = require('path')
const bodyParser = require('body-parser')

const app = express()


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}))

router.get('/registration/user', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'req.html'))
});

router.get('/registration/topics', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'topics', 'topics.html'))
 });

module.exports = router