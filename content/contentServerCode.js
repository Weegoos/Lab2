const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'backend',
});


connection.connect((err) => {
    if (err) {
        // res.redirect('/error'); 
        console.error('Ошибка при подключении к базе данных:', err);
        return;
    }
    console.log('Подключение к базе данных content прошло успешно!');
});

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))

router.get('/get-img', (req, res) => {
    try{
        const sql = "SELECT * FROM content";
        connection.query(sql, '',  (err, rows) => {
            if (err) {
                console.error('Error executing SELECT query:', err);
                res.status(500).json({ error: 'Внутренняя ошибка сервера' });
                return;
            }

            const blogs = rows.map(blog => {
              
                return {
                    id: blog.content_id,
                    img1: blog.img1,
                    img2: blog.img2,
                    img3: blog.img3,
                    headline1: blog.headline1,
                    description1: blog.description1
                };
            });

            res.json(blogs);
            console.log(blogs);

        })
    }

    catch(err){
        console.error('Error:', err);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
})

const sql = "SELECT * FROM content";
connection.query(sql, '',  (err, rows) => {
    if (err) {
        console.error('Error executing SELECT query:', err);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        return;
    }

    // console.log(rows[0]);
})

module.exports = router

