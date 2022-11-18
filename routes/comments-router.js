const { deleteCommentsById } = require("../controllers/controller");
const commentsRouter = require("express").Router();


commentsRouter.route("/:comment_id").delete(deleteCommentsById);

module.exports = commentsRouter;