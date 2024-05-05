const express = require("express");
const router = express.Router();
const { jwtMiddleWare } = require('./../MiddleWare/jwt');

router.get('/',jwtMiddleWare,(req,res)=>{
    const promisePool = req.promisePool;
    const userId = req.user.userId;
    
});