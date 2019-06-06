const app = require("express")();
const connection = "../config"

//on a defini une route en utilisant express qui vas nous permettre de faire du CRUD
app.get("/", (req, res) => {
  return res.send("ca marche");
});

//creation de l'inscription
// create = post
// read = get
// update = put
// delete = delete

app.post("/register", (req, res) =>{

  if(user.nom && user.prenom && user.matricule && user.email,user.password){
  //on insert ds la table user notre objet
  console.log('en dehors')
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


module.exports = app;
