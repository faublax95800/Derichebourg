const mysql = require("mysql");
require("dotenv").config();
//creation de la connexion mysql
const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB
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
       type varchar (255) NULL,
       created_at DATETIME DEFAULT CURRENT_TIMESTAMP NULL,
       updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NULL,
       PRIMARY KEY (id)
   ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;`;

  connection.query(tableUsers, (err, results) => {
    if (err) throw err;
    console.log("table users created");
  });

  const tableEpi = `CREATE TABLE IF NOT EXISTS si_sng.epi(
    id int NOT null AUTO_INCREMENT,
    Code_epi int NOT null,
    Libellé_epi varchar(255) NOT NULL,
    Nombres_points int NOT NULL,
    PRIMARY KEY (id)
  )ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;`;
  connection.query(tableEpi, (err, results) => {
    if (err) throw err;
    console.log("table epi created");

    // const createEpi = [
    //   {
    //     Code_epi: 1,
    //     Libelle_epi: "Blouson homme DERICHEBOURG",
    //     Nombre_de_points: 4
    //   },
    //   {
    //     Code_epi: 2,
    //     Libelle_epi: "Polaire brodée",
    //     Nombre_de_points: 3
    //   }
    // ];

    // for (let i = 0; i < createEpi.length; i++) {
    //   connection.query(
    //     `INSERT INTO si_sng.epi (Code_epi, Libellé_epi, Nombres_points) VALUES (
    //     ${createEpi[i].Code_epi},
    //     "${createEpi[i].Libelle_epi}",
    //     ${createEpi[i].Nombre_de_points}
    //     )`,
    //     (err, result) => {
    //       if (err) throw err.message;
    //       console.log(result);
    //     }
    //   );
    // }
  });

  const tableMateriel = `CREATE TABLE IF NOT EXISTS si_sng.materiel (
    id int NOT null AUTO_INCREMENT,
    Code_materiel int NOT null,
    Libellé_materiel varchar(255) NOT NULL,
    Marque varchar(255) NOT NULL,
    Model varchar(255) NOT NULL,
    PRIMARY KEY (id)
  )ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;`;
  connection.query(tableMateriel, (err, results) => {
    if (err) throw err;
    console.log("table materiel created");

    //   const createMateriel = [
    //     {
    //       Code_materiel: 1,
    //       Libelle_materiel: "PC portable",
    //       Marque: "Dell",
    //       Model: "1"
    //     },
    //     {
    //       Code_materiel: 2,
    //       Libelle_materiel: "Tablette",
    //       Marque: "Sony",
    //       Model: "1"
    //     }
    //   ];

    //   for (let i = 0; i < createMateriel.length; i++) {
    //     connection.query(
    //       `INSERT INTO si_sng.materiel (Code_materiel, Libellé_materiel, Marque, Model) VALUES (
    //         ${createMateriel[i].Code_materiel},
    //         "${createMateriel[i].Libelle_materiel}",
    //         "${createMateriel[i].Marque}",
    //         "${createMateriel[i].Model}"
    //       )`,
    //       (err, result) => {
    //         if (err) throw err.message;
    //         console.log(result);
    //       }
    //     );
    //   }
  });

  const tableApplication = `CREATE TABLE IF NOT EXISTS si_sng.application (
  id int NOT null AUTO_INCREMENT,
  Code_application int NOT null,
  Libelle_application varchar(255) NOT NULL,
  PRIMARY KEY (id)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;`;
  connection.query(tableApplication, (err, results) => {
    if (err) throw err;
    console.log("table application created");

    // const createApplication = [
    //   {
    //     Code_application: 1,
    //     Libelle_application: "dclic"
    //   },
    //   {
    //     Code_application: 2,
    //     Libelle_application: "quartis"
    //   }
    // ];

    // for (let i = 0; i < createApplication.length; i++) {
    //   connection.query(
    //     `INSERT INTO si_sng.application (Code_application, Libelle_application) VALUES (
    //     ${createApplication[i].Code_application},
    //     "${createApplication[i].Libelle_application}"
    //   )`,
    //     (err, result) => {
    //       if (err) throw err.message;
    //       console.log(result);
    //     }
    //   );
    // }
  });
  const tableTelephonie = `CREATE TABLE IF NOT EXISTS si_sng.telephonie (
  id int NOT null AUTO_INCREMENT,
  Code_telephonie int NOT null,
  Libelle_telephonie varchar(255) NOT NULL,
  PRIMARY KEY (id)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;`;
  connection.query(tableTelephonie, (err, results) => {
    if (err) throw err;
    console.log("table telephonie  created");
    const createTelephonie = [
      {
        Code_telephonie: 1,
        Libelle_telephonie: "dclic"
      },
      {
        Code_telephonie: 2,
        Libelle_telephonie: "quartis"
      }
    ];

    for (let i = 0; i < createTelephonie.length; i++) {
      connection.query(
        `SELECT * FROM si_sng.telephonie WHERE Code_telephonie = ${
          createTelephonie[i].Code_telephonie
        } AND Libelle_telephonie = "${createTelephonie[i].Libelle_telephonie}"`,
        (err, result) => {
          if (err) throw err;
          if (!result.length > 0) {
            connection.query(
              `INSERT INTO si_sng.telephonie (Code_telephonie, Libelle_telephonie) VALUES (
              ${createTelephonie[i].Code_telephonie},
              "${createTelephonie[i].Libelle_telephonie}"
            )`,
              (err, result) => {
                if (err) throw err.message;
                console.log(result);
              }
            );
          }
        }
      );
    }
  });
});

//export pour le l'utiliser autre part
module.exports = connection;
