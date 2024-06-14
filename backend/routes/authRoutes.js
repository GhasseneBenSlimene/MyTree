const express = require("express");
const router = express.Router();
const { upload } = require("../utils/imageUtils");

router.get("/test", require("../controllers/authController").test);
router.post(
  "/register",
  upload.single("photo"),
  require("../controllers/authController").registerUser
);
router.post("/login", require("../controllers/authController").loginUser);
router.get("/logout", require("../controllers/authController").logoutUser);

module.exports = router;
