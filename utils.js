const db = require("./db/connection");

exports.getReviewsQuery = (category, sort_by = "created_at", order = "DESC") => {
    const validCategories = ["euro game", "dexterity", "social-deduction"]

    const validSortColumn = ["title", "designer", "owner", "review_img_url", "review_body", "category", "created_at", "votes"]

}