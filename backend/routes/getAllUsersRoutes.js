const express = require("express");
const router = express.Router();
router.get("/list", require("../controllers/getAllUsersController").findListUsersByEmail);
router.get("/list/:status", require("../controllers/getAllUsersController").findListUsersByStatus);

module.exports = router;
