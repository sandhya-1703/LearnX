// server/routes/courseRoutes.js

const express = require("express");
const Course = require("../models/Course");

const router = express.Router();

router.get("/all", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

router.get("/one/:title", async (req, res) => {
  const course = await Course.findOne({
    title: decodeURIComponent(req.params.title)
  });

  res.json(course);
});

router.post("/add", async (req, res) => {
  const { title, description, video } = req.body;

  await Course.create({
    title,
    description,
    video
  });

  res.json({
    message: "Course Added"
  });
});

router.delete("/:id", async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);

  res.json({
    message: "Deleted"
  });
});

module.exports = router;