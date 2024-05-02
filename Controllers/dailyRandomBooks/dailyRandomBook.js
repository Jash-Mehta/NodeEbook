async function dailyRandomBook(req, res, userId, promisePool) {
    try {
        var query = `SELECT * FROM daily_random_book`;
        var [results, fields] = await promisePool.execute(query);
        var response = results.map((data) => {
            return {
                name: `${data.name}`,
                type: `${data.type}`,
                price: `${data.price}`,
                author: `${data.author}`,
                description: `${data.description}`,
                image_url: `http://localhost:3000/public/${data.image}`,
                pdf_url: `http://localhost:3000/public/${data.pdf}`
            }

        });
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).json({ error: 'Internal Server error' });
    }
}

module.exports = dailyRandomBook;