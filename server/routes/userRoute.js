const express = require("express");
const {
  registerUser,
  login,
  findUser,
  findUsers,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);

router.get("/:id", findUser);
router.get("/", findUsers);

module.exports = router;
