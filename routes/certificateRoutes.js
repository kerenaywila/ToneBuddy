const express = require("express");
const { sendCertificate } = require("../controllers/certificateCtrl");
const { validateToken } = require("../middleware/validateAuth");
const { validateCertificate } = require("../middleware/validations");

const router = express.Router();

router.post(
  "/certificate",
  validateToken,
  validateCertificate,
  sendCertificate
);

module.exports = router;
