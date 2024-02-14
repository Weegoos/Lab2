
router.put('/update-blog', (req, res) => {
    console.log('Получен POST-запрос /update-blog');
    
    try {
        const blogId = req.body.updateDataId;
        const updatedData = req.body.updateDataContent;
        const len = updatedData.length
        // UPDATE `blogs` SET `blogs` = 'fdfdf', `headline` = 'Cha', `length` = '1264' WHERE `blogs`.`id` = 52
        const sql = "UPDATE `blogs` SET `blogs` = ?, length = ? WHERE id = ?";

        connection.query(sql, [updatedData,len, blogId], (err, result) => {
            if (err) {
                console.error('Error executing UPDATE query:', err);
                res.status(500).json({ success: false, message: 'Внутренняя ошибка сервера', error: err.message });
                return;
            }

            res.json({ success: true, message: 'Блог успешно обновлен' });
        });
    } catch (err) {
        
        res.json({ success: true, message: 'Блог успешно обновлен' });
    }
});
