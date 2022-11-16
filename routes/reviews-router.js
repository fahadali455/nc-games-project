const reviewsRouter = require("express").Router();
const { getReviews, getReviewById } = require("../models/reviews");

reviewsRouter
    .route("/")
    .get((req, res) => {
        getReviews().then((reviews) => {res.status(200).send({ reviews })})
    })

reviewsRouter
    .route("/:review_id")
    .get((req, res, next) => {
        const { review_id } = req.params;
    
        getReviewById(review_id)
        .then(review => res.send({review}))
        .catch(next)

    })
    


module.exports = reviewsRouter;