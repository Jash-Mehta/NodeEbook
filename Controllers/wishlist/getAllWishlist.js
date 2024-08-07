async function getAllWishList(req,res,userId,promisePool) {
    try {
        const query = `SELECT books.*, wishlist.book_id 
    FROM books 
    LEFT JOIN wishlist ON books.id = wishlist.book_id 
    WHERE wishlist.user_id = ?`;
    const [results,fields] = await promisePool.execute(query,[userId]);
    const response = results.map(data => {
        return {
            id: `${data.id}`,
            book_id: `${data.book_id}`,
            name: `${data.name}`,
            price: `${data.price}`,
            author: `${data.author}`,
            description: `${data.description}`,
            image_url: `http://localhost:3000/public/${data.image}`,
            pdf_url: `http://localhost:3000/public/${data.pdf}`,
        }
    });
    res.json({success:true, data:response});
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).json({ error: 'Internal Server error' });
    }
    
}

module.exports = getAllWishList;