async function addContinueReading(req,res,userId,promisePool){
   try {
    const {book_id,pageno} = req.body;
    const query = `INSERT INTO continuereading (user_id,book_id,pageno) VALUES (?,?,?)`
    await promisePool.execute(query,[userId,book_id,pageno]);
    res.status(201).json({Sucess:true, message:"Book Added Sucessfully"});
   } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ error: 'Internal Server error' });
   }

}


module.exports = addContinueReading;