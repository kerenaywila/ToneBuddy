const express = require("express");
const {
  validateRegistration,
  validateLogin,
} = require("../middleware/validateAuth");
const { registerFunction, loginFunction } = require("../controllers/authCtrl");

const router = express.Router();

router.post("/register", validateRegistration, registerFunction);

router.post("/login", validateLogin, loginFunction);

module.exports = router;