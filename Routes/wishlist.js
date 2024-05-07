const express = require("express");
const router = express.Router();
const { jwtMiddleWare } = require('./../MiddleWare/jwt');
const addedtoWishList = require('./../Controllers/wishlist/addwishlist');
const getAllWishlist = require('./../Controllers/wishlist/getAllWishlist');

router.post('/',jwtMiddleWare,(req,res)=>{
    const promisePool = req.promisePool;
    const userId = req.user.userId;
    addedtoWishList(req,res,userId,promisePool);
});

router.get('/',jwtMiddleWare,(req,res)=>{
    const promisePool = req.promisePool;
    const userId = req.user.userId;
    getAllWishlist(req,res,userId,promisePool);
});


module.exports = router;