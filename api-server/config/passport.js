const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const Bcrypt = require('bcryptjs');
const User = require('../models/user');

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({ username: username }, (err, user) => {
            //Checks for database error
            if (err) {
                return done(err);
            }
            //Checks if user exists
            else if (!user) {
                return done(null, false);
            }
            //Compared password against hashed password
            else if (!Bcrypt.compareSync(password, user.password)) { 
                return done(null, false);
            }
            //Returns user object if username and password match
            else {
                return done(null, user)
            }
        })
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: 'jwt_secret'
},
    (jwtPayLoad, cb) => {
        return cb(null, jwtPayLoad)
    }
))

module.exports = passport;