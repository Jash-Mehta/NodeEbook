async function getTopSelling(req, res, promisePool) {
    try {
        const query = `
            SELECT books.*, IFNULL(top_selling.count, 0) AS count 
            FROM books 
            LEFT JOIN top_selling ON books.id = top_selling.book_id 
            ORDER BY count DESC 
            LIMIT 3
        `;
        const [results, _] = await promisePool.execute(query);
        

        res.status(200).json(results);
    } catch (error) {
        console.error('Error getting top selling books:', error);
        res.status(500).json({ error: 'Internal Server error' });
    }
}

module.exports = getTopSelling;
