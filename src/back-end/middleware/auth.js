const jwt = require('jsonwebtoken')
const config = require('../config/loadEnv')

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token')

    if(!token) {
        return res.status(401).json({message: 'No token provided, authorization denied'})
    }

    try {
        const decoded = jwt.verify(token, config.jwt_access_secret)
        req.user = decoded.user
        next()
    } catch (err) {
        res.status(403).json({message: 'Token is not valid'})
    }
}