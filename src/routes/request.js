const express = require("express");
const { userAuth } = require("../middlewares/authMiddleware");
const ConnectRequestModel = require("../models/connectionRequest");

const router = express.Router();

router.post("/request/send/:status/:id", userAuth, async (req, res) => {
  try {
    const fromUser = req.user._id;
    const toUser = req.params.id;
    const status = req.params.status;
    // console.log(req.user._id);
    const connectRequest = await new ConnectRequestModel({
      fromUserId: fromUser,
      toUserId: toUser,
      status,
    });

    const data = await connectRequest.save();
    res.json({
      message: "Connection request sent.",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "ERROR:" + error.message,
    });
  }
});

module.exports = router;
