const express = require("express");
const router = express.Router();
router.put("/:id/:role", require("../controllers/shareUserResController").shareUserRest);

module.exports = router;
