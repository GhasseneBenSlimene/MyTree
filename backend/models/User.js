const mongoose = require("mongoose");
const { cleanStr } = require("../utils/stringUtils");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "is invalid"],
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["Active", "en attente", "refuse"],
      default: "en attente",
    },
    person: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
    },
  },
  { timestamps: true }
);

// Hook pré-enregistrement pour transformer l'email en minuscules
userSchema.pre("save", function (next) {
  if (this.email) {
    this.email = cleanStr(this.email);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
