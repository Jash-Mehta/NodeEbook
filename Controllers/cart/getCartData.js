async function getCartOrders(req,res,userId,promisePool) {
   try {
    const query = `SELECT carts.*, books.name, books.price, books.author, books.pdf, books.image 
    FROM carts 
    LEFT JOIN books ON books.id = carts.book_id 
    WHERE carts.user_id = ?
    `;

    const [results,fields] = await promisePool.query(query,[userId]);
    res.status(200).json(results);

   } catch (error) {
    console.error('Error adding item:', error);
        res.status(500).json({ error: 'Internal Server error' });
   }
    
}

module.exports = getCartOrders;