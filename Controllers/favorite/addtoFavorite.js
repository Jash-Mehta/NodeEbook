//{
//   "book_id":4 
//}

async function addToFavorite(req, res, userId, promisePool) {
    try {
        const { book_id } = req.body;
        const query = `INSERT INTO favorites(user_id,book_id) VALUES (?,?)`;
        await promisePool.query(query, [userId, book_id]);
        res.status(201).json({ message: 'Favorite book added successfully' });
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).json({ error: 'Internal Server error' });
    }

}


module.exports = addToFavorite;