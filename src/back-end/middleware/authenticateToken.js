const jwt = require('jsonwebtoken')
const config = require('../config/loadEnv')

//Checks if the user has a valid access token
module.exports = function (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    //Check if any token is supplied
    if(token == null) {
        return res.status(401).json({message: 'No token provided, authorization denied'})
    }

    //Check if access token is valid
    jwt.verify(token, config.jwt_access_secret, (err, user) => {
        if (err) return res.status(403).json({message: "Token is not valid"})
        req.user = user
        next()
      })
}