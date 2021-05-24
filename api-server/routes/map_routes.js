const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const MapController = require('../controllers/map_controller');

//This route does not check for authentication so that guest data can be sent if the user is not logged in
router.get('/',MapController.getJourneys);
//This route will return a 401 if authentication fails
router.post('/', passport.authenticate('jwt',{session:false}),MapController.saveJourney);

module.exports = router;