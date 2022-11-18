const { removeComment } = require("../models/comments");


exports.deleteCommentsById = (req, res, next) => {
    const { comment_id } = req.params; 
    removeComment(comment_id)
    .then((comment) => {
        res.status(204).send()
    })
    .catch(next);

}