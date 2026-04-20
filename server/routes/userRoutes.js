const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hash
  });

  await user.save();

  res.json({ message: "User Registered Successfully" });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ message: "User Not Found" });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.json({ message: "Wrong Password" });
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    message: "Login Success",
    token,
    user
  });
});
router.post("/enroll", async (req, res) => {
  const { email, title } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ message: "User not found" });
  }

  const alreadyJoined = user.courses.find(
    (course) => course.title === title
  );

  if (alreadyJoined) {
    return res.json({ message: "Course Already Joined" });
  }

  user.courses.push({
    title,
    progress: 0
  });

  await user.save();

  res.json({ message: "Course Joined Successfully" });
});
router.post("/profile", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  res.json(user);
});
router.post("/progress", async (req, res) => {
  const { email, title } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ message: "User not found" });
  }

  const course = user.courses.find(
    (c) => c.title === title
  );

  if (!course) {
    return res.json({ message: "Course not found" });
  }

  if (course.progress < 100) {
    course.progress += 25;
  }

  await user.save();

  res.json({
    message: "Progress Updated",
    progress: course.progress
  });
});
module.exports = router;