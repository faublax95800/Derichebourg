const app = require("express")();
const connection = require("../config");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//on a defini une route en utilisant express qui vas nous permettre de faire du CRUD
app.get("/", (req, res) => {
  const stockToken = req.headers.login;
  jwt.verify(stockToken, process.env.SECRET_JWT, function(err, decoded) {
    if (err) {
      return res.status(403).send("veuillez vous reconnecter");
    } else {
      return res.send("ca marche");
    }
  });
});

app.get("/telephonie", (req, res) => {
  connection.query("SELECT * FROM si_sng.telephonie", function(err, results) {
    if (err) {
      return res.status(500).send("probleme query");
    } else {
      return res.status(200).send(results);
    }
  });
});

//recup info materiel
app.get("/materiel", (req, res) => {
  connection.query("SELECT * FROM si_sng.materiel", function(err, results) {
    if (err) {
      return res.status(500).send("probleme query");
    } else {
      return res.status(200).send(results);
    }
  });
});

//recup info app
app.get("/application", (req, res) => {
  connection.query("SELECT * FROM si_sng.application", function(err, results) {
    if (err) {
      return res.status(500).send("probleme query");
    } else {
      return res.status(200).send(results);
    }
  });
});

module.exports = app;
