
const { jwtMiddleWare, generateToken } = require('./../../MiddleWare/jwt');
const bcrypt = require('bcrypt');




async function adduser(req, res,promisePool) {
    const { name, email, password, age, type } = req.body;
    try {
        // Check if the email is already registered
        const [existingUser] = await promisePool.execute('SELECT * FROM users WHERE email = ?', [email]);

        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the user into the database
        await promisePool.execute('INSERT INTO users (name, email, password, age, type) VALUES (?, ?, ?, ?, ?)', [name, email, hashedPassword, age, type]);

        // Generate JWT token for the user
        const token = generateToken(email);

        // Return success response with token
        res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: ' Internal Server error' });
    }
}


module.exports = adduser;