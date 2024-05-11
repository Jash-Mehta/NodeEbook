const express = require('express');
const router = express.Router();
const { generateToken, jwtMiddleWare } = require('./../MiddleWare/jwt');
const dailyRandomBook = require('./../Controllers/dailyRandomBooks/dailyRandomBook');


router.get('/',jwtMiddleWare,(req,res)=>{
    const promisePool = req.promisePool;
    const userId = req.user.userId;
    dailyRandomBook(req,res,userId,promisePool);
})



module.exports = router;