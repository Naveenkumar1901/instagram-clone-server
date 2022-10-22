module.exports.login = (req, res) => {
  const { name, age } = req.body;
  //database logic
  res.send("sucessfully added to database");
};