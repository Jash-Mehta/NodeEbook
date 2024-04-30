const jwt = require('jsonwebtoken');
require('dotenv').config();


//* We have to create a MiddleWare. Where we can use in every project.
const jwtMiddleWare = (req, res, next) => {
    //* Extract the jwt token from the request header.
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        //* Verify the JWT Token.
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        //* Attach user information to the request object.
        req.user = decoded;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: 'Token expired' });
        }
        console.error(error);
        res.status(401).json({ error: "Invalid JWTToken" });
    }

}


//* Function to generate the Token.
const generateToken = (userData) => {
    //* Generate new JWT token by taking the UserData.
    const secretKey = process.env.JWT_SECRET_KEY;
    return jwt.sign(userData, secretKey);
}


module.exports = { jwtMiddleWare, generateToken };