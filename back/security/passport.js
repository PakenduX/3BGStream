const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const jwtConfig = require('./Config')
const bcrypt = require('bcrypt')
const UserDB = require('../models/userDBConnect')

/**
 * Passport authentication strategies
 * login for login strategy and jwt for protected
 * routes
 * @author Mama
 * @date 26th oct 2019
 */
passport.use(
    'login',
    new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            session: false,
        },
        async (email, password, done) => {
            const connection = await new UserDB().getConnection()
            const collection = connection.collection('users')
            try {
                collection.findOne({
                    email: email
                }).then(user => {
                    if (user === null) {
                        return done(null, false, { message: 'adresse email érronée' });
                    } else {
                        bcrypt.compare(password, user.password).then(response => {
                            if (response !== true) {
                                return done(null, false, { message: 'Mot de passe incorrect' });
                            }
                            // note the return needed with passport local - remove this return for passport JWT
                            return done(null, user);
                        });
                    }
                });
            } catch (err) {
                done(err);
            }
        },
    ),
);

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtConfig.secret,
};

passport.use(
    'jwt',
    new JWTStrategy(opts, async (jwt_payload, done) => {
        try {
            const connection = await new UserDB().getConnection()
            const collection = connection.collection('users')
            collection.findOne({
                email: jwt_payload.id,
            }).then(user => {
                if (user) {
                    // note the return removed with passport JWT - add this return for passport local
                    done(null, user);
                } else {
                    done(null, false);
                }
            });
        } catch (err) {
            done(err);
        }
    }),
);