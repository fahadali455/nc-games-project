const reviewsRouter = require("express").Router();
const { getReviews } = require("../models/reviews");

reviewsRouter
    .route("/")
    .get((req, res) => {
        getReviews().then((reviews) => {res.status(200).send({ reviews })})
    })


module.exports = reviewsRouter;