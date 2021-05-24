const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SessionSchema = new Schema(
  {
    sessionNumber: { type: Number, default: 0 },
    sessionTitle: { type: String, default: 'Default Title' },
    description: { type: String, default: 'Default Description' },
    itemList: { type: [] },
    currency: {
      platinum: { type: Number, default: 0 },
      gold: { type: Number, default: 0 },
      electrum: { type: Number, default: 0 },
      silver: { type: Number, default: 0 },
      copper: { type: Number, default: 0 }
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
  }
);


module.exports = mongoose.model("Session", SessionSchema);