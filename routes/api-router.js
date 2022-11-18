const apiRouter = require("express").Router();
const categoryRouter = require("./categories-router");
const commentsRouter = require("./comments-router");
const reviewRouter = require("./reviews-router");
const usersRouter = require("./users-router");

apiRouter.get("/", (req, res) => {
  message = "ALL OK from GET /api";
  res.status(200).send({ message });
});

apiRouter.use("/categories", categoryRouter);
apiRouter.use("/reviews", reviewRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/comments", commentsRouter);


module.exports = apiRouter;