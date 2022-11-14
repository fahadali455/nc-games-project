const categoryRouter = require("express").Router();
const categories = require("../db/data/test-data/categories");
const { getCategories } = require("../models/categories");

categoryRouter
  .route("/")
  .get((req, res) => {
    getCategories().then(categories => {
        res.status(200).send({ categories })
    })
    

  })


module.exports = categoryRouter;