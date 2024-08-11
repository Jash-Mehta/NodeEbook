const express = require('express');
const router = express.Router();
const { jwtMiddleWare } = require('./../MiddleWare/jwt');
const sendGeminiPrompt = require('./../Controllers/geminiGPT/sendGemini');

router.post('/',jwtMiddleWare,(req,res)=>{
    const promisePool = req.promisePool;
    sendGeminiPrompt(promisePool,req,res);

});


module.exports = router;