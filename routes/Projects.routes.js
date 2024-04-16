const router = require("express").Router();
const Project = require("../models/Projects.model.js");

// route to get all projects
router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    next(error);
  }
});
/////// route to create new project
router.post("/", async (req, res, next) => {
  // const projects = new Project({
  //   title: req.body.title,
  //   image: req.body.image,
  //   description: req.body.description,
  //   // publishDate: req.body.publishDate,
  //   company: req.body.company,
  //   price: req.body.price,
  //   duration: req.body.duration,
  // });
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

//should add new routes to update or delete projects

module.exports = router;
