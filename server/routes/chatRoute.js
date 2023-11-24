const express = require("express");
const {
  createChat,
  findUserChats,
  findChat,
} = require("../controllers/chatController");

const router = express.Router();

router.post("/createChat", createChat);

router.get("/:userId", findUserChats);
router.get("/find/:firstId/:secondId", findChat);

module.exports = router;
