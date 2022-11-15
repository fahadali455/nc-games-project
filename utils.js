const db = require("./db/connection");

exports.getCommentCount = () => {
    return db
    .query(
        `SELECT review_id, count(*) 
        FROM comments
        GROUP BY review_id;`
    )
    .then(comments => {
        let commentCount = {};
        comments.rows.forEach(comment => {
            commentCount[comment.review_id] = comment.count;
        })

        return commentCount;
    })
}