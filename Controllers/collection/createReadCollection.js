async function createReadCollection(req, res, userId, promisePool) {
    try {
        const { bookId, readby } = req.body;
        const query = `INSERT INTO collection (user_id,book_id,buy,readby) VALUES (?, ?, ?, ?)`;
        const [result, _] = await promisePool.query(query, [userId, bookId, 0, readby]);
        res.status(201).json({ status: "true", message: "Book is added to Collection" });

    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal Server error' });
    }
}


module.exports = createReadCollection;