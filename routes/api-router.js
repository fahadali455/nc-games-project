const apiRouter = require("express").Router();
const categoryRouter = require("./categories-router");
const commentsRouter = require("./comments-router");
const reviewRouter = require("./reviews-router");
const usersRouter = require("./users-router");
const endpoints = require("../endpoints.json");

apiRouter.get("/", (req, res) => {
  res.status(200).send(endpoints);
});

apiRouter.use("/categories", categoryRouter);
apiRouter.use("/reviews", reviewRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/comments", commentsRouter);


module.exports = apiRouter;