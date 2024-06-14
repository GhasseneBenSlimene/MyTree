const User = require("../models/User");

const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return null;
    }
    return user;
  } catch (err) {
    throw new Error(err);
  }
};

const getUserByEmail = async (userEmail) => {
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return null;
    }
    return user;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getUserById,
  getUserByEmail,
};
