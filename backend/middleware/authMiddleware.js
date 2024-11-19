const jwt = require('jsonwebtoken')

const authToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]

    if (!token) {
        return res.status(401).json({
            error: 'Access denied. No token found'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.userId
        next()
    } catch (e) {
        return res.status(403).json({ 
            error: 'Invalid token.',
            details: e.message
        })
    }
}

module.exports = authToken