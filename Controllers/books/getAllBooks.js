async function getAllBooks(req, res, promisePool) {
    try {
        const query = `
            SELECT books.*, COALESCE(AVG(ratings.rating), 0) AS avg_rating 
            FROM books 
            LEFT JOIN ratings ON ratings.book_id = books.id 
            GROUP BY books.id
        `;
        const [results, fields] = await promisePool.execute(query);
        const booksWithUrls = results.map(book => {
            return {
                id: `${book.id}`,
                user_id: `${book.user_id}`,
                name: `${book.name}`,
                price: `${book.price}`,
                author: `${book.author}`,
                description: `${book.description}`,
                rating: book.avg_rating !== undefined ? parseFloat(book.avg_rating) : 0, // Convert to number and handle undefined
                image_url: `http://localhost:3000/public/${book.image}`,
                pdf_url: `http://localhost:3000/public/${book.pdf}`
            };
        });

        res.json(booksWithUrls);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Internal Server error' });
    }
}

module.exports = getAllBooks;
