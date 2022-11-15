const reviewsRouter = require("express").Router();
const { getReviews } = require("../models/reviews");

reviewsRouter
    .route("/")
    .get((req, res) => {
        getReviews()
        .then((reviews) => {
            res.send({ reviews })

        })
        .catch(err => { console.log(err)})
    })


module.exports = reviewsRouter;