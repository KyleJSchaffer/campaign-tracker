const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MapPathSchema = new Schema({
    name: { type: String, default: 'Unknown Path Name' },
    sessions: { type: [Schema.Types.ObjectId], ref: 'Session' },
    journey: { type: Schema.Types.ObjectId, ref: 'Journey' },
    startLoc: { type: Schema.Types.ObjectId, ref: 'MapLocation' },
    endLoc: { type: Schema.Types.ObjectId, ref: 'MapLocation' }
})

module.exports = mongoose.model('MapPath', MapPathSchema);