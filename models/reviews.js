const db = require("../db/connection");

exports.getReviews = () => {
    return db
    .query(
        `SELECT reviews.review_id, reviews. owner, reviews.title, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer, COUNT(*)::int AS comment_count
        FROM reviews
        LEFT JOIN comments
        ON reviews.review_id = comments.review_id
        GROUP BY reviews.review_id
        ORDER BY reviews.created_at DESC;
        `
    )
    .then(reviews => {return reviews.rows})
}

exports.getReviewById = (reviewId) => {
    if(Number.isInteger(Number(reviewId))){
        return db
            .query(
                `SELECT * FROM reviews
                WHERE review_id = $1;
                `, [reviewId]
            )
            .then(review => {
                if(review.rows.length === 0){
                    return Promise.reject({status: 404, msg: "Resource not found."})
                }
                return review.rows[0]
            })
    }
    else{
        return Promise.reject({ status: 400, msg: "Bad Request!" });
    }
}

exports.getCommentsByReviewId = (reviewId) => {
    if(Number.isInteger(Number(reviewId))){
        return db
            .query(
                `SELECT comments.* FROM reviews
                LEFT JOIN comments
                ON comments.review_id = reviews.review_id
                WHERE reviews.review_id = $1
                ORDER BY comments.created_at DESC;
                `, [reviewId]
            )
            .then(comments => {
                if(comments.rows.length === 0){
                    return Promise.reject({status: 404, msg: "Resource not found."})
                }
                else if(comments.rows[0].comment_id === null){
                    return []
                }
                return comments.rows
            })
    }
    else{
        return Promise.reject({ status: 400, msg: "Bad Request!" });
    }   
}

exports.postComment = (reviewId, username, body) => {
    if(Number.isInteger(Number(reviewId)) && username && body){
        return db
            .query(
                `INSERT INTO comments
                    (votes, created_at, author, body, review_id)
                SELECT
                    0, $1, users.username, $2, reviews.review_id
                FROM 
                    reviews, users
                WHERE  
                    reviews.review_id = $3
                AND
                    users.username = $4
                RETURNING *;`
                ,[new Date(), body, reviewId, username]
            )
            .then(newComment => {
                if(newComment.rows.length === 0){
                    return Promise.reject({status: 404, msg: "Resource not found."})
                }
                else{ return newComment.rows[0] }
            })
    }
    else{
        return Promise.reject({ status: 400, msg: "Bad Request!" });
    }
}