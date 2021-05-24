const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MapLocationSchema = new Schema({
    name: { type: String, default: 'Unknown Location Name' },
    xPos: { type: Number, default: 0 },
    yPos: { type: Number, default: 0 },
    sessions: {type:[Schema.Types.ObjectId], ref: 'Session', default: []},
    journey: { type: Schema.Types.ObjectId, ref: 'Journey' }
});

module.exports = mongoose.model('MapLocation', MapLocationSchema);