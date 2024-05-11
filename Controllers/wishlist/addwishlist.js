async function addwishlist(req,res,userId,promisePool) {
    try {
        const { book_id } = req.body; // Corrected parameter name
        const query = `INSERT INTO wishlist (user_id, book_id) VALUES (?, ?)`;
        await promisePool.execute(query, [userId, book_id]);
        res.status(201).json({ "Success": true, "message": "Added to wishlist Successfully" });
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).json({ error: 'Internal Server error' });
    }
    
}


module.exports = addwishlist;