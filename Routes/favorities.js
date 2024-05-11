const express = require("express");
const router = express.Router();

const { generateToken, jwtMiddleWare } = require('./../MiddleWare/jwt');
const addtoFavorite = require('./../Controllers/favorite/addtoFavorite');
const getFavorite = require('./../Controllers/favorite/getfavorite');
const deleteFavorite = require('./../Controllers/favorite/deleteFavorite');


router.post('/',jwtMiddleWare,(req,res)=>{
    const promisePool = req.promisePool;
    const userId = req.user.userId;
    addtoFavorite(req,res,userId,promisePool);

});

router.get('/',jwtMiddleWare,(req,res)=>{
    const promisePool = req.promisePool;
    const userId = req.user.userId;
    getFavorite(req,res,userId,promisePool);

});
router.delete('/:id',jwtMiddleWare,(req,res)=>{
    const promisePool = req.promisePool;
    const userId = req.user.userId;
    deleteFavorite(req,res,userId,promisePool);
});


module.exports = router;