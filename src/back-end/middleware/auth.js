const jwt = require('jsonwebtoken')
const config = require('../config/loadEnv')

module.exports = function (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null) {
        return res.status(401).json({message: 'No token provided, authorization denied'})
    }

    jwt.verify(token, config.jwt_access_secret, (err, user) => {
        if (err) return res.status(403).json({message: "Token is not valid"})
        req.user = user
        next()
      })
}