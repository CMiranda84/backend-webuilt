const router = require("express").Router();
const Project = require("../models/Projects.model.js");
const Comment = require("../models/Comment.model.js");
const isAuthenticated = require("../middlewares/isAuthenticated.js");
const isWorker = require("../middlewares/isWorker.js");
const fileUploader = require("../config/cloudinary.config.js")


// router.use(isAuthenticated)
// route to get all projects
router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    next(error);
  }
});
/////// route to create new project                        ////// array("images", 5)
router.post("/", isAuthenticated, isWorker, fileUploader.single("image"), async (req, res, next) => {
  const { title, description, company, price, duration } = req.body;
  console.log(req.body)
  console.log(req.file)

  // docTOCreate podia ser usado quando fazemos o await project.create(docToCreate) ou fazer como fiz
  const docToCreate = {
    title,
    description,
    company,
    price,
    duration,
    user: req.currentUserId,
  };
  try {
    // const images = req.files.map(file => file.path); // getting the paths of the files in case i want more then one image

    const newProject = await Project.create({
      title,
      description,
      company,
      price,
      duration,
      user: req.currentUserId,
      image: req.file.path
      // images: images, // Armazenando os caminhos das imagens no banco de dados
    });
    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/:projectId",
  isAuthenticated,
  isWorker,
  async (req, res, next) => {
    try {
      const projectToDelete = await Project.findOneAndDelete({
        _id: req.params.projectId,
        user: req.currentUserId,
      });
      res.status(204).json(projectToDelete);
    } catch (error) {
      next(error);
    }
  }
);
router.put("/:projectId", isAuthenticated, isWorker, async (req, res, next) => {
  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
      user: req.currentUserId, // Verifying if the project belongs to the actual User
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    // update only if this project belongs to the user
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.projectId,
      req.body,
      { new: true }
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
    const comments = await Comment.find({ project: projectId })
      .sort({ createdAt: -1 })
      .populate("user");
    // .populate("comment");
    res.json({ oneProject, comments });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
