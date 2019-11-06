//les routes pour les users

const app = require("express")();
const connection = require("../config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//prendre en exemple
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

//prendre pour exemple 
//pour modifier 1 utilisateur
app.put("/user/:id", (req, res) => {
  const { nom, prenom, matricule, email } = req.body;
  //je recup dans la table user l'id de l'utilisateur que je souhaite modifier
  connection.query(
    `SELECT * FROM si_sng.users WHERE id = ${req.params.id}`,
    function(err, result) {
      if (err) throw err;
      if (result.length > 0) {
        //je recup les infos des champs 
        const params = [nom, prenom, matricule, email, req.params.id];
        //j'update les infos
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

//pour recupere 1 utilisateur
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

//route d'inscription
app.post("/register", async (req, res) => {
 
  const password = req.body.password;
 //pour hash le password avec bcrypt (pour securiser)
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  //recup les champs
  const user = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    matricule: req.body.matricule,
    email: req.body.email,
    password: hash,
    //type: "admin"
  };
//si tous les champs son remplit
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
          //on insert dans la table user notre objet l95
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

//du front au back
app.post("/login", (req, res) => {
  //sert à recuperer les values de input
  const userMatricule = req.body.matricule;
  const userPassword = req.body.password;
//pour que les champs soient obligatoirement remplit
  if (userMatricule && userPassword) {
    //cette syntaxe est une fonction de mysql (pour executer une req)
    connection.query(
      //check le matricule dans la table user
      `SELECT * FROM si_sng.users WHERE matricule = ${userMatricule}`,
      function(err, result) {
        if (err) {
          console.log(err);
          res.status(500).send("erreur" + err);
        } else if (result.length == 1) {
          //comparer le hash avec le mot de passe entrée l93
          bcrypt.compare(userPassword, result[0].password, function(
            err,
            response
          ) {
            if (err) {
              console.log(err);
              res.status(500).send("erreur" + err);
            }
            //délivrer une clé pour verifier mon authentification
            if (response) {
              const token = jwt.sign(
                { userMatricule },
                process.env.SECRET_JWT,
                {
                  expiresIn: "1h"
                }
              );
              res.status(200).send({
                token: token,
                message: "utilisateur connecté",
                //(aff nom home)recupere dans result mes iden
                user: result
              });
            } else {
              res.status(500).send({
                message: "mot de passe incorrecte"
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
