const express = require('express');
const router = express.Router();

const { jwtMiddleWare } = require('../MiddleWare/jwt');

const {hasUserViewedBook,incrementViewCount,recordUserBookView} = require('./../Controllers/bookViewed/book_Views_post');

router.post('/', jwtMiddleWare, async (req, res) => {
    try {
        const promisePool = req.promisePool;
        const userId = req.user.userId;
        const { bookId } = req.body; // Assuming you get the book ID from the request body

        // Check if 'bookId' is provided and not null
        if (!bookId) {
            return res.status(400).json({ error: 'Book ID is required.' });
        }

        // Check if there is a record indicating that the user has viewed the book
        const hasViewed = await hasUserViewedBook(userId, bookId, promisePool,res);

        if (!hasViewed) {
            // If the user hasn't viewed the book, increment the view count and record the view
            await incrementViewCount(bookId, promisePool, userId,res);
            //await recordUserBookView(userId, bookId, promisePool,res);
        }

        // Proceed with your route logic (e.g., calling the bookviews controller function)

    } catch (error) {
        console.error('Error in POST request handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




module.exports = router;