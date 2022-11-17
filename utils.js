const db = require("./db/connection");

exports.getReviewsQuery = (category, sort_by = "created_at", order = "DESC") => {
    const validCategories = ["euro-game", "dexterity", "social-deduction", "children's_games", undefined];

    const validSortColumn = ["review_id", "title", "designer", "owner", "review_img_url", "review_body", "category", "created_at", "votes"];

    const validOrder = ["ASC", "DESC", "asc", "desc"]

    if(!validCategories.includes(category) || !validSortColumn.includes(sort_by) || !validOrder.includes(order)){
        return false;
    }

    const categoryQuery = category !== undefined ? `WHERE category = '${category.replaceAll("-" , " ").replaceAll("'", "''")}' ` : ``;


    return query = `SELECT reviews.review_id, reviews. owner, reviews.title, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer, COUNT(*)::int AS comment_count
    FROM reviews
    LEFT JOIN comments
    ON reviews.review_id = comments.review_id
    ${categoryQuery}
    GROUP BY reviews.review_id
    ORDER BY reviews.${sort_by} ${order};`;

}