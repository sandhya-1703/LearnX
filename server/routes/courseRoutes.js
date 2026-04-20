const express = require("express");
const Course = require("../models/Course");

const router = express.Router();

/* Add Course */
router.post("/add", async (req, res) => {
  const { title, description, video } = req.body;

  const course = new Course({
    title,
    description,
    video
  });

  await course.save();

  res.json({ message: "Course Added Successfully" });
});

/* Get All Courses */
router.get("/all", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

/* Delete Course */
router.delete("/:id", async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: "Course Deleted" });
});
router.get("/one/:title", async (req, res) => {
  const title = decodeURIComponent(req.params.title);

  const course = await Course.findOne({ title });

  res.json(course);
});
module.exports = router;