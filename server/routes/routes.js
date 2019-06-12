const app = require("express")();
const connection = require("../config");
const bcrypt = require("bcrypt");

//on a defini une route en utilisant express qui vas nous permettre de faire du CRUD
app.get("/", (req, res) => {
  return res.send("ca marche");
});

//creation de l'inscription
// create = post
// read = get
// update = put
// delete = delete

app.post("/register",async (req, res) =>{
  //pour hash le password
  const password = req.body.password;
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  const user = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    matricule: req.body.matricule,
    email: req.body.email,
    password: hash,
  }
  if(user.nom && user.prenom && user.matricule && user.email && user.password){
    
  //on insert ds la table user notre objet
  console.log('en dehors')
  //set ? pour les injections
  connection.query("INSERT INTO si_sng.users SET ?", user, function(err, result) {
    console.log('dans notre requete')
    if(err){
      console.log(err)
      res.status(500).send("erreur"+ err)
    } else{
      console.log(result)
      res.status(200).send({
        message:"user inscrit",
        user:result,
      })
    }
  })
 }else{
   res.status(500).send({
     message:"tout les champs sont obligatoire",
   })
 }
});

app.post("/login", (req,res)=> {
  //sert a recuperer les value de input
  const userMatricule = req.body.matricule;
  const userPassword = req.body.password;

  if(userMatricule && userPassword){
    //cette syntax est une fonction de mysql (pour executer une req)
    connection.query(`SELECT * FROM si_sng.users WHERE matricule = ${userMatricule}`, function(err, result){
      if(err){
        console.log(err)
        res.status(500).send("erreur"+ err)
      }else if(result.length == 1){
        bcrypt.compare(userPassword, result[0].password, function(err, response) {
          if(err){
            console.log(err)
            res.status(500).send("erreur"+ err)
          }
          if(response){
            res.status(200).send({
            message:"utilisateur connecté"
          })

          }else{
            res.status(500).send({
              message:"password incorrect",
          })
        };
      })
      }else{
        res.status(500).send({
          message:"matricule ou password incorrect",
      })
    }})
  }else{
      res.status(500).send({
        message:"tout les champs sont obligatoire"
  })
}})


module.exports = app;
