const { getUsers } = require("../models/users");
const usersRouter = require("express").Router();

usersRouter
    .route("/")
    .get((req, res, next) => {
        getUsers()
        .then(users => {
            res.status(200).send({ users })
        })
        .catch(next)

    })


module.exports = usersRouter;