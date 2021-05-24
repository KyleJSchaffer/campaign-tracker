const passport = require('../config/passport');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Journey = require('../models/journey');
const Bcrypt = require('bcryptjs');

exports.authenticateLogin = function (req, res) {
    //Use passport local strategy to authenticate a username and password, then creats and sends a jwt token if successful
    passport.authenticate('local', { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                success: false,
                user: user,
                error: 'Error 400'
            })
        }
        req.login(user, { session: false }, function (err) {
            if (err) {
                res.send(err);
            }
            const token = jwt.sign({ id: user._id, username: user.username }, 'jwt_secret');
            return res.json({ success: true, token, username: user.username });
        });
    })(req, res);
}

exports.registerUser = async (req, res, next) => {
    let error;

    //check if username already exists
    let duplicateUser = await User.findOne({ username: req.body.username }, (err => error = err))
    if (duplicateUser) {
        return res.status(409).send({ message: 'Username already exists.' })
    }

    //Create a new account. All new users are temporary by default
    try {
        let user = new User();
        user.username = req.body.username;
        user.password = password = Bcrypt.hashSync(req.body.password, 10); //Password are hashed and not stored as plain text
        user.temporary = true;
        await user.save((err, newUser) => {
            if (err) {
                error = err
            } else {
                //Currently the app only supports one Joureny per user, the journey is created at the time the user is created
                let journey = new Journey();
                journey.name = newUser.username + "'s Journey";
                journey.user = newUser._id;
                journey.save(err => error = err);
            }
        })
        return res.json({ success: true });
    } catch (err) {
        next(err)
    }
};