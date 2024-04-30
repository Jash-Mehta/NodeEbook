const express = require("express");
const router = express.Router();
const login = require('./../Controllers/authentication/login')

router.post('/',(req,res,promisepool)=>{
    const promisePool = req.promisePool;
    login(req,res,promisePool);
})



module.exports = router;