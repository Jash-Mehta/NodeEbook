async function createCartOrders(req,res,userId,promisePool) {
try {
    const {book_id,count} = req.body;
    const query = `SELECT price FROM books WHERE id= ?`;
    const [results,fields] = await promisePool.query(query,[book_id]);
    if (results.length === 0) {
        return res.status(404).json({ error: 'Book not found' });
    }
    const price = results[0].price;
    const totalprice = price * count;
    const [result, _] = await promisePool.execute(
        'INSERT INTO carts (book_id, user_id, count, totalprice,isComplete) VALUES (?, ?, ?, ?, ?)',
        [book_id, userId, count, totalprice,0]
    );
    const orderId = result.insertId;

    res.status(201).json({ orderId, totalprice });

} catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal Server error' });
}
}

module.exports = createCartOrders;