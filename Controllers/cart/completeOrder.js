const addtopSelling = require('./../top_selling/topSelling');
async function completeOrder(req, res, promisePool, userId) {
    try {
        const orderId = req.params.id;

        // Update the order to mark it as complete
        const [result, _] = await promisePool.execute(
            'UPDATE carts SET isComplete = 1 WHERE id = ? AND user_id = ?',
            [orderId, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({ message: 'Order completed successfully' });
        await addtopSelling(promisePool);

    } catch (error) {
        console.error('Error completing order:', error);
        res.status(500).json({ error: 'Internal Server error' });
    }
}

module.exports = completeOrder;
