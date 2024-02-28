const express = require('express')
const path = require('path')
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const router = express.Router();

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
router.use(bodyParser.urlencoded({extended: true}));

router.post('/content', (req, res) => {
  try {
    const first_img = req.body.first_img
    const second_img = req.body.second_img
    const third_img = req.body.third_img
    const headline = req.body.headline
    const description = req.body.description

    
    if (first_img.includes('https://') && second_img.includes('https://') && third_img.includes('https://')){
        const sql = `INSERT INTO content (content_id, img1, img2, img3, headline1, description1) VALUES (?, ?, ?, ?, ?, ?)`;
        pool.query(sql, [null, first_img, second_img, third_img, headline,description], async (err, rows)=> {
            if (err) {
                console.error('Error executing INSERT query:', err);
                res.status(500).send('Внутренняя ошибка сервера');
                return;
            }
    
            res.json({ success: true, message: 'Данные успешно сохранены' });
        })
    
    }else {
        res.json({ success: false, message: 'Неправильная ссылка изображении' });

    }

  }

  catch (err){
    console.log('Error: ', err);
       res.status(500).send('Internal Server Error');
       return;
  }
});

module.exports = router;