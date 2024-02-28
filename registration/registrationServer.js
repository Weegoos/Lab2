const express = require('express')
const router = express.Router()
const path = require('path')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const bcrypt = require('bcrypt')
const app = express()
require('dotenv').config()
const nodemailer = require('nodemailer');

let pool = mysql.createPool({
   host: 'localhost',
   database: 'backend',
   password: '',
   user: 'root',
   waitForConnections: true,
   connectionLimit: 10,
   queueLimit: 0
})

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}))

router.get('/registration/user', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'req.html'))
});

router.get('/registration/topics', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'topics', 'topics.html'))
 });

 function formatDate(isoDateString) {
   const date = new Date(isoDateString);
   const year = date.getFullYear();
   const month = date.getMonth() + 1;
   const day = date.getDate();

   const formattedMonth = month < 10 ? `0${month}` : month;
   const formattedDay = day < 10 ? `0${day}` : day;

   return `${year}-${formattedMonth}-${formattedDay}`;
}
let role;
function defineRole(password, userName){
    const info = {
        adminInfo: {
            username: 'admin',
            password: 'admin2024'
        },

    }

    if (password === info.adminInfo.username && userName === info.adminInfo.password){
        role = 'admin'
    }else {
        role = 'regular user'
    }
}

console.log(role);



router.post('/registration/success', (req, res) => {
   try {
       const isoDateString = new Date().toISOString();
       const formattedDate = formatDate(isoDateString);

       const firstName = req.body.firstName;
       const lastName = req.body.lastName;
       const username = req.body.username;
       const plainPassword = req.body.password; 
       const age = req.body.age;
       const gender = req.body.gender;
       const country = req.body.country;

       defineRole(username, plainPassword)

       bcrypt.genSalt(10, (err, salt) => {
           if (err) {
               console.error('Error generating salt:', err);
               res.status(500).send('Internal Server Error');
               return;
           }

           bcrypt.hash(plainPassword, salt, (err, hashedPassword) => {
               if (err) {
                   console.error('Error hashing password:', err);
                   res.status(500).send('Internal Server Error');
                   return;
               }

               const sql = `INSERT INTO users (id_user, full_name, password, age, userName, gender, country, req_date, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

               pool.query(sql, [null, `${firstName} ${lastName}`, hashedPassword, age, username, gender, country, formattedDate, role], async (err, rows) => {
                   if (err) {
                       console.error('Error executing INSERT query:', err);
                       res.status(500).send('Внутренняя ошибка сервера, убедитесь в том что пользовательно не существует');
                       return;
                   }
                   
                   res.json({ success: true, message: 'Данные успешно сохранены' });
               });
           });
       });
   } catch (err) {
       console.log('Error: ', err);
       res.status(500).send('Internal Server Error');
       return;
   }
});

module.exports = router