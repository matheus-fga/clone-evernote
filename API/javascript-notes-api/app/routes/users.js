var express = require("express");
var router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_TOKEN;
const withAuth = require("../middlewares/auth");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error registering new user" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) res.status(401).json({ error: "Incorrect email or password" });
    else {
      user.isCorrectPassword(password, function (error, same) {
        if (!same)
          res.status(401).json({ error: "Incorrect email or password" });
        else {
          const token = jwt.sign({ email }, secret, { expiresIn: "1d" });
          res.json({ user: user, token: token });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Error, please try again" });
  }
});

router.put("/password", withAuth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user._id);

    user.isCorrectPassword(currentPassword, async function (error, same) {
      if (!same) res.status(200).json({ error: "Incorrect current password" });
      else {
        user.password = newPassword;
        await user.save();
        res.status(200).json({ user: user });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating user password" });
  }
});

router.put("/", withAuth, async (req, res) => {
  const { name, email } = req.body;

  try {
    let user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          name: name,
          email: email,
          updated_at: Date.now(),
        },
      },
      { upsert: true, new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
});

router.delete("/", withAuth, async (req, res) => {
  try {
    let userToDelete = await User.findById(req.user._id);
    userToDelete.delete();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: "Error to remove user" });
  }
});

module.exports = router;
