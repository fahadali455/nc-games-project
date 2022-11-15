const categoryRouter = require("express").Router();
const { getCategories } = require("../models/categories");

categoryRouter
  .route("/")
  .get((req, res) => {
    getCategories().then(categories => {
        res.status(200).send({ categories })
    })
    

  })


module.exports = categoryRouter;