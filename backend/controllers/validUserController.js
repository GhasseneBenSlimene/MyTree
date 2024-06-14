const User = require("../models/User");
const Person = require("../models/Person");

const mongoose = require("mongoose");

const checkUserInfo = async (req, res) => {
  User.findById(req.params.id)
    .select("-passwordHash")
    .populate("person")
    .then((person) => {
      return res.json(person);
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    });
};

//maj status
const updateStatus = async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(
      req.params.id,
      { status: req.params.status },
      { new: true }
    ).select("-passwordHash");
    return res.json({
      result,
    });
  } catch (error) {
    return res.json({
      "Error updating:": error,
    });
  }
};

module.exports = {
  checkUserInfo,
  updateStatus,
};
