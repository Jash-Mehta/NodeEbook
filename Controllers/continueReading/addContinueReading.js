// controllers/continuereadingController.js
const continuereading = require('./../../models/continueReadingModel');

async function addContinueReading(req, res, userId) {
    try {
        const { book_id, pageno } = req.body;

        // Create the continue reading entry
        await continuereading.create({
            user_id: userId,
            book_id: book_id,
            pageno: pageno
        });

        res.status(201).json({ success: true, message: "Book added successfully" });
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).json({ error: 'Internal Server error' });
    }
}

module.exports = addContinueReading;