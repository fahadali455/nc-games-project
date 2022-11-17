const { getUsers } = require("../models/users");
const usersRouter = require("express").Router();

usersRouter
    .route("/")
    .get((req, res) => {
        getUsers().then(users => {
            res.status(200).send({ users })
        });

    })


module.exports = usersRouter;