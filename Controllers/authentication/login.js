const { jwtMiddleWare, generateToken } = require('./../../MiddleWare/jwt');
const bcrypt = require('bcrypt');

async function login(req, res, promisePool) {
    const { email, password } = req.body;
    try {



        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Email and password are required' });
        }
        const [userData] = await promisePool.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (!userData.length) {
            return res.status(401).json({ success: false, error: 'Invalid Email' });
        }
        const token = generateToken({
            userId: userData[0].id,
            email: email
        });
        return res.status(200).json({
            success: true, data: {
                'token': token,
                'name': userData[0].name,
                'email': userData[0].email,
                'age': userData[0].age,
                'type': userData[0].type
            }
        });

    } catch (error) {

    }
}

module.exports = login;