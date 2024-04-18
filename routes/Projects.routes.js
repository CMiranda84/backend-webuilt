const router = require("express").Router();
const Project = require("../models/Projects.model.js");
const Comment = require("../models/Comment.model.js");

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

router.delete("/:projectId", async (req, res, next) => {
  try {
    const projectToDelete = await Project.findByIdAndDelete(
     eq.params.projectId  
    );
    res.status(204).json(projectToDelete);
  } catch (error) {
    next(error);
  }
});
router.put("/:projectId", async (req, res, next) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.projectId,
      req.body
    );
    res.status(200).json(updatedProject);
  } catch (error) {
    next(error);
  }
});

///route to get the comments on the project

router.get("/:projectId", async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const oneProject = await Project.findById(projectId);
    const comments = await Comment.find({ projects: projectId })
      .sort({ createdAt: -1 })
      .populate("user").populate("project");
    res.json({ oneProject, comments });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
