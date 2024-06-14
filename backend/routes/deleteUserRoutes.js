const express = require("express");
const router = express.Router();
router.delete("/:email", require("../controllers/deleteUserController").deleteUserByEmail);
router.get("/test", require("../controllers/deleteUserController").test);

module.exports = router;
