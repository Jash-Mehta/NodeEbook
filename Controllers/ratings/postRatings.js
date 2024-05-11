async function postRatings(req,res,userId,promisePool) {
    try {
        const {book_id,rating} = req.body;
    const query = `INSERT INTO ratings (book_id,user_id,rating) VALUES (?,?,?)`;
    const [results,fields] = await promisePool.query(query,[book_id,userId,rating])
    res.status(200).json({"success":true, "message":"Rating Added Sucessfully"});
    } catch (error) {
        console.error('Error rating item:', error);
        res.status(500).json({ error: 'Internal Server error' });
    }
    
}

module.exports = postRatings;