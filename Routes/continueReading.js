const express = require("express");
const router = express.Router();
const { generateToken, jwtMiddleWare } = require('./../MiddleWare/jwt');
const addContinueReading = require('./../Controllers/continueReading/addContinueReading');
const getContinueReading = require('./../Controllers/continueReading/getContinueReading');

router.post('/',jwtMiddleWare,(req,res)=>{
    const promisePool = req.promisePool;
    const userId = req.user.userId;
    addContinueReading(req,res,userId,promisePool);

});

router.get('/',jwtMiddleWare,(req,res)=>{
    const promisePool = req.promisePool;
    const userId = req.user.userId;
    getContinueReading(req,res,userId,promisePool);

});



module.exports = router;