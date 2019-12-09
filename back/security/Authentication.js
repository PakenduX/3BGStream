const passport = require("passport");

/**
 * The authentication check function
 * @author Mama
 * @date nov 3rd 2019
 * @param req
 * @param res
 * @param next
 * @constructor
 */
const Authentication = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return res.json({
                status: 'error',
                message: err
            });
        }
        if (info !== undefined) {
            return res.json({
                status: 'error',
                message: info.message
            });
        }
        next()

    })(req, res, next);
}
module.exports = Authentication