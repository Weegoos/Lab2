const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'backend',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
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

function formattedTime(isoDateString){
    const date = new Date(isoDateString);
    const hours = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMin = min < 10 ? `0${min}` : min;
    const formattedSec = sec < 10 ? `0${sec}` : sec;

    console.log(`${formattedHours}:${formattedMin}:${formattedSec}`);
    return `${formattedHours}:${formattedMin}:${formattedSec}`;
}

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/send-message', async (req, res) => {
    console.log('Получен POST-запрос /blogs/send-message');
    try {
        const isoDateString = new Date().toISOString();
        const formattedDate = formatDate(isoDateString)

        const formattedTimeValue = formattedTime(isoDateString);
        const blogTextArea = req.body.blogTextArea;
        const headline = req.body.headline;

        if (!blogTextArea || !headline || blogTextArea.length === 0 || headline.length === 0) {
            res.status(400).json({ success: false, message: 'Не заполнены все обязательные поля' });
            console.log("Here");
        } else {
            const user_name = req.body.user_name;
            const sql = 'INSERT INTO blogs (id, blogs, headline, length, date_of_publication, user_name, time_of_publication ) VALUES (?, ?, ?, ?, ?, ?, ?)';
            pool.query(sql, [null, blogTextArea, headline, blogTextArea.length, formattedDate, user_name, formattedTimeValue], async (err, rows) => {
                if (err) {
                    console.error('Error executing INSERT query:', err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.json({ success: true, message: 'Блог успешно сохранен' });
                    // res.status(200).json({ success: true, message: 'Блог успешно сохранен' });

                }
            });
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});




module.exports = router;
