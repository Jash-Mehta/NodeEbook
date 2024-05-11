async function topSelling(promisePool) {
    try {
        const query = `
            SELECT book_id, SUM(count) AS total_count 
            FROM carts 
            WHERE isComplete = 1 
            GROUP BY book_id
        `;
        const [result, _] = await promisePool.execute(query);
        
        // Loop through the result to update or insert the topselling count for each book
        for (const row of result) {
            const { book_id, total_count } = row;
            
            // Update or insert the topselling count for the book
            await promisePool.execute(
                `
                INSERT INTO top_selling (book_id, count) 
                VALUES (?, ?) 
                ON DUPLICATE KEY UPDATE count = count + ?
                `,
                [book_id, total_count, total_count]
            );
        }
    } catch (error) {
        // console.error('Error updating top selling books:', error);
        // res.status(500).json({ error: 'Internal Server error' });
    }
}

module.exports = topSelling;