const router = require("express").Router();
const { login } = require("../controllers/controller.login.js");

router.post("/", login);


module.exports = router;
