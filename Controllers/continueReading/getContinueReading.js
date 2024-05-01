async function getContinueReading(req,res,userId,promisePool) {
    try {
        const query = `SELECT 
        books.*,continuereading.pageno 
        FROM books 
        LEFT JOIN continuereading 
        ON books.id = continuereading.book_id 
        WHERE continuereading.user_id=?`;
        var [results,fields] = await promisePool.execute(query,[userId]);
        res.json(results);
    } catch (error) {
        console.error('Error getting item:', error);
        res.status(500).json({ error: 'Internal Server error' });
    }

    
}

module.exports = getContinueReading;