//pour pouvoir utiliser express et l'apple
// const express = require('express')
// const app = express()
// equivalent à
const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const Route = require("./routes/routes.js");
const port = 8080;


//je dit a express d'utiliser cors et les () pour executer
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", Route);

//ecoute le port
app.listen(port, () => {
  console.log("le port est bien " + port);
});
