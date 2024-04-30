async function getallBooks(req, res, promisePool)  {
try {
    const query = `SELECT * FROM books`;
const [results,fields] = await promisePool.execute(query);
const booksWithUrls = results.map(book => {
    return {
        id: `${book.id}`,
        user_id: `${book.user_id}`,
        name: `${book.name}`,
        price: `${book.price}`,
        author: `${book.author}`,
        description: `${book.description}`,
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

module.exports = getallBooks;