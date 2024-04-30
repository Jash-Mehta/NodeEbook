async function getUserById(req, res, promisePool) {
    const id = req.params.id;
    try {
        const query = `SELECT * FROM users WHERE id = ?`;
        const [rows] = await promisePool.execute(query, [id]); // Destructure results to get rows

        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(rows); // Send only rows in response
    } catch (error) {
        console.error('Error getting user by ID:', error);
        res.status(500).json({ error: 'Internal Server error' });
    }
}

module.exports = getUserById;
