const express = require('express');
const router = express.Router();
const { jwtMiddleWare } = require('../MiddleWare/jwt');
const createReadCollection = require('../Controllers/collection/createReadCollection');
const getCollection = require('../Controllers/collection/getCollection');
router.post("/", jwtMiddleWare, (req,res)=>{
    const promisePool = req.promisePool;
    const userId = req.user.userId;
    createReadCollection(req,res,userId,promisePool);
});

router.get("/", jwtMiddleWare, (req,res)=>{
    const promisePool = req.promisePool;
    const userId = req.user.userId;
    getCollection(req,res,userId,promisePool);
    
})

module.exports = router;
