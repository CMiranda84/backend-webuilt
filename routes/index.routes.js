const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

route.use("/projects", require("./Projects.routes.js"))

module.exports = router;
