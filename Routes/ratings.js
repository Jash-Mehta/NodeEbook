const express = require('express');
const router = express.Router();
const { generateToken,jwtMiddleWare } = require('./../MiddleWare/jwt');
const postratings = require('./../Controllers/ratings/postRatings');


router.post('/',jwtMiddleWare,(req,res)=>{
    const promisePool = req.promisePool;
    const userId = req.user.userId;
    postratings(req,res,userId,promisePool);

})


module.exports = router;