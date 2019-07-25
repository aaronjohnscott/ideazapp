const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            User.findOne({
                where: {
                    email: email
                }
            }).then(user => {
                if (!user) {
                    return done(null, false, { message: 'That email is not registered' });
                }
                bcrypt.compare(password, user.password, function (err, res) {
                    if (res) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Password incorrect' });
                    }
                });

            });
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findOne({ where: { id } }).then(user => {
            done(null, user)
        })
    });
};
