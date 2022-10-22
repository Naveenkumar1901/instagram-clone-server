const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const login = require("./routes/route.login.js");


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", login);

mongoose.connect(process.env.MONGOURI).then(() => {
     console.log("conncted to database successfully")
}).catch(err => console.log(err.message));
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`listening at ${port}`);
});
