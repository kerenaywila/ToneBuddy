const express = require("express");
const { validateToken } = require("../middleware/validateAuth");
const { validateProgress } = require("../middleware/validations");
const { createProgress, getProgress, updateProgress, deleteProgress } = require("../controllers/progressCtrl");

const router = express.Router();

router.post("/create-progress", validateToken, validateProgress, createProgress);

router.get("/find-progress", validateToken, getProgress);

router.put("/update-progress/:id", validateToken, validateProgress, updateProgress);

router.delete("/delete-progress/:id", validateToken, deleteProgress);

module.exports = router;
