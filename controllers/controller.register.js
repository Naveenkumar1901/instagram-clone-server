const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
module.exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const regExp =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (
    name?.length === 0 ||
    email?.length === 0 ||
    password?.length < 6 ||
    !regExp.test(email)
  ) {
    res.status(400).send("bad request");
    return;
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      name,
      email,
      password: hashedPassword,
    };

    const User = new userModel(newUser);
    let registerdUser = await User.save();
    res.status(200).json({
      msg: "sucessfully registered",
      user: {
        name: registerdUser.name,
        email: registerdUser.email,
        id: registerdUser._id,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal server error",
      err: err.message,
    });
  }
};
