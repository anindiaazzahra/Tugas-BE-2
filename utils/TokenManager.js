const jwt = require('jsonwebtoken');

const accessTokenSecretKey = 'itc-secret-key';

function generateAccessToken(userPayload) {
    return jwt.sign(userPayload, accessTokenSecretKey, {
        subject: userPayload.fullName,
        expiresIn: '15m' 
    });
};

module.exports = {
    generateAccessToken,
};