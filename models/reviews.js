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