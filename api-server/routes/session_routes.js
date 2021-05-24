const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const SessionController = require('../controllers/session_controller');

//This route does not check for authentication so that guest data can be sent if the user is not logged in
router.get('/',SessionController.getAllSessions);

//These routes will return a 401 error if the login attemps fail
router.post('/', passport.authenticate('jwt',{session:false}), SessionController.createSession);
router.get('/:sessionID',  SessionController.getSessionByID);
router.post('/:sessionID', passport.authenticate('jwt',{session:false}), SessionController.editSession);
router.delete('/:sessionID', passport.authenticate('jwt',{session:false}), SessionController.deleteSession);

module.exports = router;