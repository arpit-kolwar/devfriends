const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;
const connectionSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: ObjectId,
      required: true,
    },
    toUserId: {
      type: ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignore", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);

const ConnectRequestModel = mongoose.model(
  "ConnectionRequest",
  connectionSchema
);

module.exports = ConnectRequestModel;
