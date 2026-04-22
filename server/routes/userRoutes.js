// server/routes/userRoutes.js

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.json({
      message: "User Already Exists"
    });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
    courses: [
      {
        title: "Full Stack Development",
        progress: 0
      },
      {
        title: "Python Programming",
        progress: 0
      }
    ]
  });

  res.json({
    message: "User Registered Successfully"
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({
      message: "Invalid Email"
    });
  }

  const match = await bcrypt.compare(
    password,
    user.password
  );

  if (!match) {
    return res.json({
      message: "Wrong Password"
    });
  }

  const token = jwt.sign(
    { id: user._id },
    "learnxsecret"
  );

  res.json({
    token,
    user
  });
});

router.post("/profile", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  res.json(user);
});

router.post("/progress", async (req, res) => {
  const { email, title } = req.body;

  const user = await User.findOne({ email });

  const course = user.courses.find(
    (c) => c.title === title
  );

  if (course) {
    course.progress = 100;
  }

  await user.save();

  res.json({
    progress: 100
  });
});

module.exports = router;