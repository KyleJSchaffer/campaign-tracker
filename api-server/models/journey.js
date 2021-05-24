const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JourneySchema = new Schema(
    {
        name: { type: String },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        lastLoc: { type: Schema.Types.ObjectId, ref: 'MapLocation' }
    }
);

module.exports = mongoose.model("Journey", JourneySchema);