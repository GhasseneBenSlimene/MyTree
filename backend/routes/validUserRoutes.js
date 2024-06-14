const express = require("express");
const router = express.Router();
router.get("/info/:id", require("../controllers/validUserController").checkUserInfo);
router.put("/:id/:status", require("../controllers/validUserController").updateStatus);

module.exports = router;
