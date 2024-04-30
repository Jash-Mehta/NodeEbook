async function getBookByUserID(req,res,userID,promisePool){
  
    try {
        const query = `SELECT * FROM books WHERE user_id = ?`;
        const [results,fields] = await promisePool.execute(query,[userID]);
        const response = results.map(data => {
            return {
                id: `${data.id}`,
                user_id: `${data.user_id}`,
                name: `${data.name}`,
                price: `${data.price}`,
                author: `${data.author}`,
                description: `${data.description}`,
                image_url: `http://localhost:3000/public/${data.image}`,
                pdf_url: `http://localhost:3000/public/${data.pdf}`
            };
            
        });
        res.json(response);
      } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Internal Server error' });
      }
    }
    
    module.exports = getBookByUserID;