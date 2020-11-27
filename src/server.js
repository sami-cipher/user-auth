const redis = require("redis");
const mongoose = require("mongoose");
const express = require('express');
const bodyParser = require("body-parser");
const userRouter = require("./router/user.router")

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const rediscl = redis.createClient({ port: "6379", host: "127.0.0.1" });
rediscl.on("connect", function () {
  console.log("Redis plugged in.");
});
mongoose
  .connect("mongodb://localhost:27017/sample", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(
    (success) => console.log("Successfully Connected with MongoDB"),
    (error) => console.log("Connection failed MongoDB..!!!!!!", error)
  );

app.get("/", (req, res) => {
  res.json({ message: "welcome to user auth application" });
});
app.use("/user", userRouter);


app.listen({ port: 5000 }, () => {
  console.log(`🚀  Server ready at 5000`);
});
