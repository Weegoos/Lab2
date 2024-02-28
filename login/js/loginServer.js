const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const bcrypt = require('bcrypt');

const router = express.Router()

const pool = mysql.createPool({
    host: 'localhost',
    database: 'backend',
    user: 'root',
    password: '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))

router.get('/verify', (req, res) => {
    try {
        const username = req.query.username;
        const password = req.query.password;

        const sql = 'SELECT * FROM `users` WHERE userName = ?';

        pool.query(sql, [username], async (err, rows) => {
            if (err) {
                console.error('Error executing SELECT query:', err);
                res.status(500).send('Внутренняя ошибка сервера');
                return;
            }

            if (rows.length === 0) {
                res.status(404).send('Пользователь не найден');
                return;
            }

            const userPasswordHash = rows[0].password;

            bcrypt.compare(password, userPasswordHash, (compareErr, isMatch) => {
                if (compareErr) {
                    console.error('Error comparing passwords:', compareErr);
                    res.status(500).send('Внутренняя ошибка сервера');
                    return;
                }

                if (isMatch) {
                    console.log('Пароли совпадают');
                    if (rows[0].role !== 'admin'){
                        res.redirect('/registration/topics')
                    }else {
                        res.redirect('/creation')
                    }
                } else {
                    console.log('Пароли не совпадают');
                    res.send('Пароли не совпадают');
                }
            });
        });
    } catch (err) {
        console.error('Error: ', err);
        res.status(500).send('Внутренняя ошибка сервера');
    }
});

const sql = 'SELECT * FROM `users` '

    pool.query(sql, async (err,rows) => {
        console.log(rows[0].role);

      
    })

module.exports = router
