const apiRouter = require("express").Router();
const categoryRouter = require("./categories-router");
const reviewRouter = require("./reviews-router")

apiRouter.get("/", (req, res) => {
  message = "ALL OK from GET /api";
  res.status(200).send({ message });
});

apiRouter.use("/categories", categoryRouter);
apiRouter.use("/reviews", reviewRouter);


module.exports = apiRouter;