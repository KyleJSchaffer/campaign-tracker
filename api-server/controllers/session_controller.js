const Session = require('../models/session');
const MapLocation = require('../models/map_location');
const MapPath = require('../models/map_path');

//If user did not authenticate this id will be used for get requests
const GUEST_ID = '5d251830f96e2d2258537baa';


//Fetches and returns all of a user's sessions
exports.getAllSessions = function (req, res, next) {
    let userID;
    //Use the guest ID if the client did not authenticate
    if (req.user) {
        userID = req.user.id;
    } else {
        userID = GUEST_ID
    }

    Session.find({ user: userID }, (err, data) => {
        if (err) {
            next(err)
        } else {
            return res.json({ success: true, sessions: data });
        }
    });
}

//Returns one session mathching the session id provided by the request url
exports.getSessionByID = function (req, res, next) {
    let userID;
    //Use the guest ID if the client did not authenticate
    if (req.user) {
        userID = req.user.id;
    } else {
        userID = GUEST_ID
    }

    Session.findOne({ _id: req.params.sessionID, user: userID }, (err, data) => {
        if (err) {
            next(err)
        } else {
            return res.json({ success: true, session: data });
        }
    });
}

//Edits a session mathching the session id provided by the request url
exports.editSession = function (req, res, next) {
    Session.findByIdAndUpdate(req.params.sessionID, { $set: req.body }, (err) => {
        if (err) {
            next(err)
        } else {
            return res.json({ success: true });
        }
    });
}

//Deletes the session mathching the session id provided by the request url
exports.deleteSession = (req, res, next) => {
    Session.findByIdAndDelete(req.params.sessionID, async (err) => {
        if (err) {
            next(err)
        } else {
            //Remove the session from the session list of all locations and paths
            try {
                let LocationPromise = MapLocation.updateMany({ sessions: req.params.sessionID }, { $pullAll: { sessions: [req.params.sessionID] } }, (err) => { });
                let PathPromise = MapPath.updateMany({ sessions: req.params.sessionID }, { $pullAll: { sessions: [req.params.sessionID] } }, (err) => { });
                await Promise.all([LocationPromise, PathPromise])
            } catch (err) { next(err) }
            
            return res.json({ success: true });
        }
    });
}

//Creates a new session with the information provided in the 
exports.createSession = function (req, res, next) {
    let session = new Session();
    session.sessionNumber = req.body.sessionNumber;
    session.sessionTitle = req.body.sessionTitle;
    session.description = req.body.description;
    session.currency = req.body.currency;
    session.itemList = req.body.itemList;
    session.user = req.user.id

    session.save(err => {
        if (err) {
            next(err)
        } else {
            return res.json({ success: true });
        }
    });
}