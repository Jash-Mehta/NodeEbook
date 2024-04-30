async function getAllUser(req,res,promisePool){
    try {
        const query = `SELECT * FROM users`
       const [results, fields] =  await promisePool.execute(query)
        res.status(200).json(results);

    } catch (error) {
        console.error('Error Getting All user:', error);
        res.status(500).json({ error: ' Internal Server error' });
    }
}

module.exports = getAllUser;