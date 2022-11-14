const db = require("../db/connection");

exports.getCategories = () => {
    return db
        .query(
            ` SELECT * FROM categories; `
        )
        .then( data => {
            return data.rows;
        });
}