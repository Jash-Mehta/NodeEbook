const express = require("express");
const router = express.Router();
const { jwtMiddleWare } = require('./../MiddleWare/jwt');
const getTopSelling = require('./../Controllers/top_selling/getItemTopSelling');

router.get('/',jwtMiddleWare,(req,res)=>{
    const promisePool = req.promisePool;
    const userId = req.user.userId;
    getTopSelling(req,res,promisePool);
});



module.exports = router;