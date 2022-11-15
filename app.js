const express = require("express");
const apiRouter = require("./routes/api-router");

const app = express();
app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

app.use((err, req, res, next) => {
    //check if error has status and msg as this means it is an error i have created 
    if(err.status && err.msg){
        res.status(err.status).send({msg: err.msg});
    }
    else{
        next(err);
    }
})

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({msg: "server error!"});
});

module.exports = app;