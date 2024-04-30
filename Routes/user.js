const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const addUser = require('./../Controllers/users/adduser');
const getAllUser = require('./../Controllers/users/getAllUsers');
const getUserById = require('./../Controllers/users/getUserById')
const { generateToken,jwtMiddleWare } = require('./../MiddleWare/jwt');

router.post('/',async (req, res) => {
    const promisePool = req.promisePool;
   addUser(req,res,promisePool);
});

router.get('/',jwtMiddleWare,async(req,res)=>{
    const promisePool = req.promisePool;
    getAllUser(req,res,promisePool);
});

router.get('/:id',jwtMiddleWare,async(req,res)=>{
    
    const promisePool = req.promisePool;
    getUserById(req,res,promisePool);

});

module.exports = router;

