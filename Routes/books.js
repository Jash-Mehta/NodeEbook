const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer');
const { generateToken, jwtMiddleWare } = require('./../MiddleWare/jwt');
const addbooks = require('./../Controllers/books/addbooks');
const getallBooks = require('./../Controllers/books/getAllBooks');
const getBookById = require('./../Controllers/books/getbookById');
const getBookByUserID = require('./../Controllers/books/getBookByUserID');


// Configure multer for file uploads
const upload = multer({ dest: 'public/' });

// POST API for adding item
router.post('/', jwtMiddleWare,upload.fields([{ name: 'pdf', maxCount: 1 }, { name: 'image', maxCount: 1 }]), (req, res) => {
    // Pass the files along with other data to addbooks function
    const promisePool = req.promisePool;
    const userId = req.user.userId;
    addbooks(req, res, promisePool, userId);
});

router.get('/',jwtMiddleWare, (req,res)=>{
    const promisePool = req.promisePool;
    const userId = req.user.userId;
    getallBooks(req,res,promisePool);

});

router.get('/:id',jwtMiddleWare,(req,res)=>{
    const promisePool = req.promisePool;
    const id = req.params.id;
    getBookById(req,res,id,promisePool);
});


router.get('user/:userId',jwtMiddleWare, (req,res)=>{
    const promisePool = req.promisePool;
    const userId = req.user.userId;
    getBookByUserID(req,res,userId,promisePool);
});





module.exports = router;