const router = require("express").Router()

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/projects", require("./Projects.routes.js"));
router.use("/comments", require("./Comment.routes.js"));
router.use("/auth", require("./Authentication.routes.js"))
router.use("/users", require("./User.routes.js"))

module.exports = router;
