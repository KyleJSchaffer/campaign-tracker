const express = require("express");
const router = express.Router();
const passport = require('../config/passport');

const mapRouter = require('./map_routes');
const sessionRouter = require('./session_routes');
const authRouter = require('./auth_routes');

//Routes for data related to the journey, location, and paths
router.use('/map',mapRouter);
router.use('/user/:userid/map',passport.authenticate('jwt',{session:false}),mapRouter);

//Routes for data related to sessions
router.use('/session', sessionRouter);
router.use('/user/:userid/session',passport.authenticate('jwt',{session:false}),sessionRouter);

//Routes for login and registration
router.use('/auth',authRouter);

module.exports = router;

