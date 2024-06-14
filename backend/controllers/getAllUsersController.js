const User = require("../models/User");
const mongoose = require("mongoose");

const findListUsersByEmail = async (req, res) => {
  User.find()
    .select("-passwordHash")
    .then((users) => {
      console.log("All users:", users);
      return res.json(users);
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    });
};

const findListUsersByStatus = async (req, res) => {
  User.find({ status: req.params.status })
    .select("-passwordHash")
    .then((users) => {
      console.log("All users :", users);
      return res.json(users);
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    });
};

module.exports = {
  findListUsersByEmail,
  findListUsersByStatus,
};
