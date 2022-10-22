const router = require("express").Router();
const { register } = require("../controllers/controller.register.js");

router.post("/", register);

module.exports = router;
