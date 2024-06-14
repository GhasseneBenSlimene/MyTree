const User = require("../models/User");
const mongoose = require("mongoose");


const test = (req, res) => {
  res.json("user deleted -- test");
};


const deleteUserByEmail = async (req, res, next) => {
  try {
    const email = req.params.email;
        // Delete the user by their email
        const result = await User.deleteOne({ email: email });
        console.log(`${email} est supprime`);

    } catch (error) {
        console.error('Error deleting user:', error);
    }
}
module.exports = {
  test,
  deleteUserByEmail,
};