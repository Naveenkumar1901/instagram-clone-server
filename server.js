const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const loginRoute = require("./routes/route.login.js");
const registerRoute = require("./routes/route.register.js");
const postRoutes = require("./routes/route.post.js");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/post", postRoutes);

mongoose
  .connect(process.env.MONGOURI)
  .then(() => {
    console.log("conncted to database successfully");
  })
  .catch((err) => console.log(err.message));
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(` Server listening at ${port}`);
});
