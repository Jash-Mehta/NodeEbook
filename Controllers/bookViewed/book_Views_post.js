// Middleware to track user views

// Function to check if the user has viewed the book
async function hasUserViewedBook(userId, bookId, promisePool,res) {
    try {
        // Assuming you're using a MySQL database
        const query = 'SELECT COUNT(*) AS count FROM bookviews WHERE user_id = ? AND book_id = ? LIMIT 1';
        const [rows, fields] = await promisePool.query(query, [userId, bookId]);

        if (rows.length > 0) {
            if (rows[0].count > 0) {
                return res.status(200).json({ "Success": false });; // Custom message if the user has already viewed the book
            } else {
                return false; // Return false if no record found
            }
        } else {
            return false; // Return false if no record found
        }
    } catch (error) {
        console.error('Error checking user-book view:', error);
        throw error; // Propagate the error to the caller
    }
}


// Function to increment the view count for a book
async function incrementViewCount(bookId, promisePool, userId, res) {
    try {
        // Assuming you're using a MySQL database
        const query = 'INSERT INTO bookViews (user_id,book_id, views) VALUES (?,?, 1) ON DUPLICATE KEY UPDATE views = views + 1, updated_at = CURRENT_TIMESTAMP';
        const [result, fields] = await promisePool.execute(query, [userId, bookId]);
        return res.status(200).json({ message: "Views Count Incremented" });
    } catch (error) {
        console.error('Error incrementing view count:', error);
        throw error;
    }
}


// Function to record a user-book view
async function recordUserBookView(userId, bookId, promisePool) {
    try {
        // Assuming you're using a MySQL database
        const query = 'INSERT INTO bookviews (user_id, book_id) VALUES (?, ?)';
        const [result, fields] = await promisePool.query(query, [userId, bookId]);
        return result // Return the result of the insert operation
    } catch (error) {
        console.error('Error recording user-book view:', error);
        throw error; // Propagate the error to the caller
    }
}

module.exports = { hasUserViewedBook, incrementViewCount, recordUserBookView };


