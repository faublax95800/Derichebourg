//pour pouvoir utiliser express et l'apple
// const express = require('express')
// const app = express()

const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");

// j'importe mes routes
const inventaireRoute = require("./routes/inventaire-route");
const authRoute = require("./routes/auth-route");
const port = 8080;

//je dis à express d'utiliser cors et les () pour executer
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//je defini les routes
app.use("/auth", authRoute);
app.use("/inventaire", inventaireRoute);

//ecoute le port
app.listen(port, () => {
  console.log("le port est bien " + port);
});
