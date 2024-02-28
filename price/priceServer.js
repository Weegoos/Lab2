let express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
require('dotenv').config()
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}));
router.post('/send-email', (req, res) => {
    try{
        let email = req.body.email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "batyr.ashim2022@gmail.com",
            pass: "cfvg poam cpmn aeon"
        },
        tls: {
            rejectUnauthorized: false
        }
    })
    
    const mailOptions = {
        from: '',
        to: 'batyrashim058@gmail.com',
        subject: `Blog.kz user: ${email}`,
        text: `Здравствуйте, это сообщение сгенерировано автоматически с сайта Blog.kz.

        Запросил демо доступ

        Отвечать на сообщение не надо
        `
    }
    transporter.sendMail(mailOptions, (err) => {
        if (err){
            console.log(err);
            res.status(500).send('Error sending email');
        }else {
            res.send('Success')
        }
    })
    }catch (err){
        console.log("Internal Server Error", err);
        res.status(500).send('Internal Server Error');
    }
})
module.exports = router