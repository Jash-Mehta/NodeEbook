const express = require('express');
const { jwtMiddleWare } = require('../MiddleWare/jwt');
const router = express.Router();
const createCartOrders = require('./../Controllers/cart/createOrders');
const getallCartOrders = require('./../Controllers/cart/getCartData');

router.post('/',jwtMiddleWare,(req,res)=>{
    const promisePool = req.promisePool;
    const userId = req.user.userId;
    createCartOrders(req,res,userId,promisePool);
});
router.get('/',jwtMiddleWare,(req,res)=>{
    const promisePool = req.promisePool;
    const userId = req.user.userId;
    getallCartOrders(req,res,userId,promisePool);

});



module.exports = router;