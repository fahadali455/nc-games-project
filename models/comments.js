const db = require("../db/connection");

exports.removeComment = (commentId) => {
    if(!Number.isInteger(Number(commentId))){
        return Promise.reject({ status: 400, msg: "Bad Request!" });
    }

    return db
        .query(
            `DELETE FROM comments
            WHERE comment_id = $1
            RETURNING *;`,
            [commentId]
        )
        .then( comment => {
            if(comment.rows.length === 0){
                return Promise.reject({status: 404, msg: "Resource not found."})
            }
            console.log(comment.rows)
            return comment.rows;
        });
}