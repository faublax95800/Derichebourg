//on a defini une route en utilisant express qui vas nous permettre de faire du CRUD
const app = require("express")();
app.get("/", (req, res) => {
  return res.send("ca marche");
});

module.exports = app;
