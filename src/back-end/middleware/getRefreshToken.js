module.exports = function (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null) {
        return res.status(401).json({message: 'No token provided, authorization denied'})
    }

    req.token = token
    next()
}