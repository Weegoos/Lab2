const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const app = express();
const bodyParser = require('body-parser')
const moment = require('moment'); 

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
    console.log('Подключение к базе данных backend прошло успешно!');
});

router.use(express.urlencoded({ extended: true }));
const promiseConnection = connection.promise();

router.get('/get-data',  (req, res) => {
    try {
        const sql = "SELECT * FROM blogs ORDER BY date_of_publication DESC, time_of_publication DESC";
        connection.query(sql, '',  (err, rows) => {
            if (err) {
                console.error('Error executing SELECT query:', err);
                res.status(500).json({ error: 'Внутренняя ошибка сервера' });
                return;
            }

            const blogs = rows.map(blog => {
                const formattedDate = moment(blog.date_of_publication).local().format('YYYY-MM-DD');
                return {
                    id: blog.id,
                    content: blog.blogs,
                    headline: blog.headline,
                    length: blog.length,
                    data_publication: formattedDate,
                    author: blog.user_name,
                    length: blog.length,
                    status: blog.status
                };
            });

            res.json(blogs);
            console.log(blogs);
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
});
router.delete('/delete-blog/:id',  (req, res) => {
    try {
        const blogId = req.params.id;
        const sql = "DELETE FROM `blogs` WHERE blogs.id = ?";
        
        connection.query(sql, [blogId],  (err, result) => {
            if (err) {
                console.error('Error executing DELETE query:', err);
                res.status(500).json({ success: false, message: 'Внутренняя ошибка сервера' });
                return;
            }

            res.json({ success: true, message: 'Блог успешно удален' });
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ success: false, message: 'Внутренняя ошибка сервера' });
    }
});
router.post('/update-blog', (req, res) => {
    console.log('Получен POST-запрос /update-blog');
    
    try {
        const blogId = req.body.updateDataId;
        const updatedData = req.body.updateDataContent;
        const len = updatedData.length
        const status = "Изменено"
        // UPDATE `blogs` SET `blogs` = 'fdfdf', `headline` = 'Cha', `length` = '1264' WHERE `blogs`.`id` = 52
        const sql = "UPDATE `blogs` SET `blogs` = ?, length = ?, status = ? WHERE id = ?";

        connection.query(sql, [updatedData, len,status ,blogId], (err, result) => {
            if (err) {
                console.error('Error executing UPDATE query:', err);
                res.status(500).json({ success: false, message: 'Внутренняя ошибка сервера', error: err.message });
                return;
            }
            res.redirect('/read')
            // res.json({ success: true, message: 'Блог успешно обновлен' });
        });
    } catch (err) {
        
        res.json({ success: true, message: 'Ошибка сервера' });
    }
});

const currentDate = new Date();
app.get('/error', (req, res) => {
    res.send('Произошла ошибка при подключении к базе данных. Попробуйте позже.');
});

module.exports = router;

// app.get('/error', (req, res) =>{
//     const sql = "SELECT * from blogs";
// connection.query(sql, '', (err, rows) => {
//     try {
//         const date_of_publication = moment(rows[0].date_of_publication).local().format('YYYY-MM-DD');
//          // console.log(date_of_publication);
//     }catch (err){
//         if (err instanceof TypeError){
//            res.send("Error")
//         }
//     }

    
// });
// })