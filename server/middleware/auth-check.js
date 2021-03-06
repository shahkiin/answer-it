const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../../config');


/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    const token = req.headers.authorization.split(' ')[1];

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {

        // the 401 code is for unauthorized status
        if (err) { return res.status(401).json({

            confirmation: 'fail',
            message: 'Unauthorized.'
        }); }

        const userId = decoded.sub;

        // check if a user exists
        return User.findById(userId, (userErr, user) => {

            if (userErr || !user) {
                return res.status(401).end();
            }

            return next();
        });
    });
};