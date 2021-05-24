const MapLocation = require('../models/map_location');
const MapPath = require('../models/map_path');
const Journey = require('../models/journey');

//If user did not authenticate this id will be used for get requests
const GUEST_ID = '5d251830f96e2d2258537baa';

//Finds the user's journey and returns all locations, paths, and the last locatinon for that journey
exports.getJourneys = async function (req, res, next) {
    let userID;
    //Use the guest ID if the client did not authenticate
    if (req.user) {
        userID = req.user.id;
    } else {
        userID = GUEST_ID
    }

    let locations, paths, lastLoc;    

    try {
        //Find the user's journey
        let journey = await Journey.findOne({ user: userID }, '_id', err => { if (err) return next(err) })
        let journeyID = journey._id;
        //Find locations, paths, and last location for the journey
        let locationPromise = MapLocation.find({ journey: journeyID });
        let pathPromise = MapPath.find({ journey: journeyID });
        let lastLocPromise = Journey.findById({ _id: journeyID }, 'lastLoc');
        [locations, paths, lastLoc] = await Promise.all([locationPromise, pathPromise, lastLocPromise]);

        return res.json({ success: true, locations: locations, paths: paths, lastLoc: lastLoc.lastLoc });
    } catch (err) {
        next(err)
    }


}

//Set all the locations and paths for the user to be equal to the data sent in the request
exports.saveJourney = async function (req, res, next) {
    //Convert the object containing the location data and paths to arrays for easier use with Mongoose
    const locations = Object.values(req.body.locations);
    const locationIDs = locations.map(l => l._id);
    const paths = Object.values(req.body.paths);
    const pathIDs = paths.map(p => p._id);

    try {
        //Get the user's Journey ID
        let journey = await Journey.findOne({ user: req.user.id }, '_id', err => { if (err) return next(err) })
        let journeyID = journey._id;

        //Delete any locations and paths not in the clients request
        await MapLocation.deleteMany({ _id: { $nin: locationIDs }, journey: journeyID }, err => { if (err) return next(err) });
        await MapPath.deleteMany({ _id: { $nin: pathIDs }, journey: journeyID }, err => err => { if (err) return next(err) });

        //Update/add new locations
        for (const location of locations) {
            //Create and add the location to the database if it is flagged as new
            if (location.isNew) {
                newLocation = new MapLocation();
                newLocation._id = location._id;
                newLocation.name = location.name;
                newLocation.xPos = location.xPos;
                newLocation.yPos = location.yPos;
                newLocation.sessions = location.sessions;
                newLocation.journey = journeyID;
                await newLocation.save(err => { if (err) return next(err) })
            } else {
                //Update the location if it is not new
                await MapLocation.updateOne({ _id: location._id, journey: journeyID }, {
                    $set: {
                        name: location.name,
                        xPos: location.xPos,
                        yPos: location.yPos,
                        sessions: location.sessions
                    }
                }, err => { if (err) return next(err) });
            }

        }

        //Update/add new paths
        for (const path of paths) {
            //Create and add the location to the database if it is flagged as new
            if (path.isNew) {
                newPath = new MapPath();
                newPath._id = path._id;
                newPath.name = path.name;
                newPath.startLoc = path.startLoc;
                newPath.endLoc = path.endLoc;
                newPath.sessions = path.sessions;
                newPath.journey = journeyID;
                await newPath.save(err => { if (err) return next(err) })
            } else {
                //Update the location if it is not new
                await MapPath.updateOne({ _id: path._id, journey: journeyID }, {
                    $set: {
                        name: path.name,
                        startLoc: path.startLoc,
                        endLoc: path.endLoc,
                        sessions: path.sessions
                    }
                }, err => { if (err) return next(err) });
            }
        }

        //Update the last location of the journey
        await Journey.updateOne({ _id: journeyID }, { lastLoc: req.body.lastLoc }, err => { if (err) return next(err) });

        return res.json({ success: true })
    }
    catch (err) {
        next(err)
    }
}

