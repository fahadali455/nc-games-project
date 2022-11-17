const reviewsRouter = require("express").Router();
const { getReviews, getReviewById, getCommentsByReviewId, postComment, patchVotes } = require("../models/reviews");

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
        .then(review => {
            res.status(200).send({review})
        })
        .catch(next)

    })
    
reviewsRouter
    .route("/:review_id/comments")
    .get((req, res, next) => {
        const { review_id } = req.params;

        getCommentsByReviewId(review_id)
        .then(comments => {
            res.send({ comments })
        })
        .catch(next);
    });

reviewsRouter
    .route("/:review_id/comments")
    .post((req, res, next) => {
        const { review_id } = req.params;
        const { username, body } = req.body;

        postComment(review_id, username, body)
        .then(comment => {
            res.status(201).send({ comment });
        })
        .catch(next);
    });

reviewsRouter
    .route("/:review_id")
    .patch((req, res, next) => {
        const { review_id } = req.params;
        patchVotes(review_id, req.body)
        .then(review => {
            res.status(200).send({ review })
        })
        .catch(next);

        
    })


module.exports = reviewsRouter;