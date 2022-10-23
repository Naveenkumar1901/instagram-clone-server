const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email.length || !password?.length) {
    res.status(400).send("missing Credentials");
    return;
  }
  try {
    const user = await userModel.findOne({ email });
    const isUserValid = await bcrypt.compare(password, user.password);
    if (isUserValid)
      res.status(200).json({
        msg: "logged in successfully",
        user: {
          name: user.name,
          email: user.email,
          id: user._id,
        },
      });
    else res.status(400).send("invalid credentials");
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal Server Error",
      err: err.message,
    });
  }
};
