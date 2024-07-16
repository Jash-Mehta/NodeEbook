const { authPlugins } = require("mysql2");

async function getCollection(req,res,userId,promisePool) {
    try {
        const query = `SELECT collection.*, books.name, books.price, books.author, books.pdf, books.image FROM collection LEFT JOIN books ON books.id=collection.book_id WHERE collection.user_id = ?`;
        const [results,_] = await promisePool.query(query,[userId]);
        const response = results.map(data =>{return{
           
            id: data.id,
            name: data.name,
            price: data.price,
            author:data.author
           
        }});
        res.status(200).json(response);

    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).json({ error: 'Internal Server error' });
    }
}
module.exports = getCollection;