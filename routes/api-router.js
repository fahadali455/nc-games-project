const apiRouter = require("express").Router();
const categoryRouter = require("./categories-router");

apiRouter.get("/", (req, res) => {
  message = "ALL OK from GET /api";
  res.status(200).send({ message });
});

apiRouter.use("/categories", categoryRouter);


module.exports = apiRouter;