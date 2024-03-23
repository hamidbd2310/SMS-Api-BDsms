const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

module.exports = async (req, res, next) => {
    const token = req.headers['token']; // Corrected access to token header
    if (!token) {
        return res.status(401).json({ status: 'Unauthorized', message: 'Token missing' });
    }
    
    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decodedData) {
        if (err) {
            return res.status(401).json({ status: 'Unauthorized', message: 'Invalid token' });
        } else {
            req.headers.email = decodedData['data'];
            next();
        }
    });
};
