const mysql = require("mysql");
//creation de la connexion mysql
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root"
});

// pour dire qu'on ce connect a mysql
connection.connect(err => {
  if (err) throw err;
  console.log("connected");

  const createDB = "CREATE DATABASE IF NOT EXISTS si_sng";
  connection.query(createDB, (err, results) => {
    if (err) throw err;
    console.log("database created");
  });

  // pour creer la table users le =>.user sert a dire que tu cree la table user ds cette database
  const tableUsers = `CREATE TABLE IF NOT EXISTS si_sng.users (
       id int NOT null AUTO_INCREMENT,
       nom varchar(255) NOT NULL,
       prenom varchar(255) NOT NULL,
       matricule int(255) NOT NULL, 
       email varchar(255) NOT NULL,
       password varchar(255) NOT NULL,
       created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
       updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
       PRIMARY KEY (id)
   ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;`;

  connection.query(tableUsers, (err, results) => {
    if (err) throw err;

    console.log("table users created");
  });
});

//export pour le l'utiliser autre part
module.exports = connection;
