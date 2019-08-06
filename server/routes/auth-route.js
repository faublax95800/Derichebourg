const app = require("express")();
const connection = require("../config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//pour supp 1 utilisateur
app.delete("/user/:id", (req, res) => {
  connection.query(
    `DELETE FROM si_sng.users WHERE id = ${req.params.id}`,
    function(err, results) {
      if (err) {
        return res.status(500).send("probleme query");
      } else {
        return res.status(200).send("utilisateur supprimé");
      }
    }
  );
});

//recup la liste utilisateurs
app.get("/users", (req, res) => {
  connection.query("SELECT * FROM si_sng.users", function(err, results) {
    if (err) {
      return res.status(500).send("probleme query");
    } else {
      return res.status(200).send(results);
    }
  });
});

//pour modifier 1 utilisateur
app.put("/user/:id", (req, res) => {
  const { nom, prenom, matricule, email } = req.body;
  connection.query(
    `SELECT * FROM si_sng.users WHERE id = ${req.params.id}`,
    function(err, result) {
      if (err) throw err;
      if (result.length > 0) {
        const params = [nom, prenom, matricule, email, req.params.id];
        connection.query(
          "UPDATE si_sng.users SET nom = ?, prenom = ?, matricule = ?, email = ? WHERE id = ?",
          params,
          function(err, result) {
            if (err) throw err;
            else {
              return res.status(200).send({
                message: "Utilisateur a bien été modifié",
                data: result
              });
            }
          }
        );
      } else {
        return res.status(400).send({
          message: "L'user n'existe pas ou plus"
        });
      }
    }
  );
});

//pour recuper 1 utilisateur
app.get("/user/:id", (req, res) => {
  connection.query(
    `SELECT * FROM si_sng.users WHERE id = ${req.params.id}`,
    function(err, results) {
      if (err) {
        return res.status(500).send("probleme query");
      } else {
        return res.status(200).send(results);
      }
    }
  );
});
//creation de l'inscription
// create = post
// read = get
// update = put
// delete = delete

app.post("/register", async (req, res) => {
  //pour hash le password
  const password = req.body.password;
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  const user = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    matricule: req.body.matricule,
    email: req.body.email,
    password: hash
  };

  if (
    user.nom &&
    user.prenom &&
    user.matricule &&
    user.email &&
    user.password
  ) {
    connection.query(
      `SELECT matricule FROM si_sng.users WHERE matricule = ${user.matricule}`,
      function(err, results) {
        if (err) {
          console.log(err);
        }
        if (results.length > 0) {
          res.status(403).send("ce matricule existe deja");
        } else {
          //on insert ds la table user notre objet
          console.log("en dehors");
          //set ? pour les injections
          connection.query("INSERT INTO si_sng.users SET ?", user, function(
            err,
            result
          ) {
            console.log("dans notre requete");
            if (err) {
              console.log(err);
              res.status(500).send("erreur" + err);
            } else {
              console.log(result);
              res.status(200).send({
                message: "user inscrit",
                user: result
              });
            }
          });
        }
      }
    );
  } else {
    res.status(500).send({
      message: "tout les champs sont obligatoire"
    });
  }
});

app.post("/login", (req, res) => {
  //sert a recuperer les value de input
  const userMatricule = req.body.matricule;
  const userPassword = req.body.password;

  if (userMatricule && userPassword) {
    //cette syntax est une fonction de mysql (pour executer une req)
    connection.query(
      `SELECT * FROM si_sng.users WHERE matricule = ${userMatricule}`,
      function(err, result) {
        if (err) {
          console.log(err);
          res.status(500).send("erreur" + err);
        } else if (result.length == 1) {
          bcrypt.compare(userPassword, result[0].password, function(
            err,
            response
          ) {
            if (err) {
              console.log(err);
              res.status(500).send("erreur" + err);
            }

            if (response) {
              const token = jwt.sign(
                { userMatricule },
                process.env.SECRET_JWT,
                {
                  expiresIn: "2m"
                }
              );
              res.status(200).send({
                token: token,
                message: "utilisateur connecté",
                //(aff nom home)recupere ds result mes iden
                user: result
              });
            } else {
              res.status(500).send({
                message: "password incorrect"
              });
            }
          });
        } else {
          res.status(404).send("matricule ou password incorrect");
        }
      }
    );
  } else {
    res.status(400).send({
      message: "tout les champs sont obligatoire"
    });
  }
});

module.exports = app;
