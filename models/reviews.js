const db = require("../db/connection");
const { getCommentCount } = require("../utils");

exports.getReviews = () => {
    let commentCount;
    return getCommentCount()
        .then(count => {
            
            commentCount = count;
            
            return db
                .query(
                    `SELECT * FROM reviews
                    ORDER BY created_at DESC;`
                );
            
        })
        .then(reviews => {
            reviews.rows.forEach(review => {
                if(commentCount[review.review_id]){
                    review["comment_count"] = Number(commentCount[review.review_id]);
                }
                else{
                    review["comment_count"] = 0;
                }
                delete review["review_body"];
            })

            return reviews.rows;
        })
}