const {
  sendMessages,
  allMessages,
} = require("../Controllers/message.controller");
const express = require("express");
const Router = express.Router();
const verifyJwt  = require("../middleware/user.middleware");

Router.post("/:chatId",verifyJwt, allMessages);
Router.post("/", verifyJwt, sendMessages);

module.exports = Router;
