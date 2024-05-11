const express = require("express");
const router = express.Router();
const { jwtMiddleWare } = require('../MiddleWare/jwt');
const completeOrder = require('./../Controllers/cart/completeOrder');



router.get('/:id',jwtMiddleWare,(req,res)=>{
    const promisePool = req.promisePool;
    const userId = req.user.userId;
    completeOrder(req,res,promisePool,userId);
    

});

module.exports = router;