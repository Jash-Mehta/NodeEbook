async function deleteFavorite(req,res,userId,promisePool) {
    try {
        const id = req.params.id;
    const query = `DELETE FROM favorites WHERE user_id=? AND id = ?`;
    var [results,fields] = await promisePool.query(query,[userId,id]);
    res.status(200).json({message:"Item deleted successfully"});
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).json({ error: 'Internal Server error' });
    }
}

module.exports = deleteFavorite;