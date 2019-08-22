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
    code_epi int NOT null,
    libelle_epi varchar(255) NOT NULL,
    nombres_points int NOT NULL,
    PRIMARY KEY (id)
  )ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;`;
  connection.query(tableEpi, (err, results) => {
    if (err) throw err;
    console.log("table epi created");

    const createEpi = [
      {
        code_epi: 1,
        libelle_epi: "Blouson homme DERICHEBOURG",
        nombre_de_points: 4
      },
      {
        code_epi: 2,
        libelle_epi: "Polaire brodée",
        nombre_de_points: 3
      }
    ];

    for (let i = 0; i < createEpi.length; i++) {
      connection.query(
        `SELECT * FROM si_sng.epi WHERE code_epi = ${createEpi[i].code_epi} 
          AND libelle_epi = "${createEpi[i].libelle_epi}"
          AND nombres_points = ${createEpi[i].nombre_de_points}`,
          (err, result) => {
            if (err) throw err;
            if (!result.length > 0){
              connection.query(
                `INSERT INTO si_sng.epi (code_epi, libelle_epi, nombres_points) VALUES (
                  ${createEpi[i].code_epi},
                  "${createEpi[i].libelle_epi}",
                  ${createEpi[i].nombre_de_points}
                  )`,
                  (err, result) => {
                    if (err) throw err.message;
                  }
              )
            }
          } 
      );
    }
  });

  const tableMateriel = `CREATE TABLE IF NOT EXISTS si_sng.materiel (
    id int NOT null AUTO_INCREMENT,
    code_materiel int NOT NULL,
    libelle_materiel varchar(255) NOT NULL,
    marque varchar(255) NOT NULL,
    model varchar(255) NOT NULL,
    create_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  )ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;`;
  connection.query(tableMateriel, (err, results) => {
    if (err) throw err;
    console.log("table materiel created");

      const createMateriel = [
        {
          code_materiel: 1,
          libelle_materiel: "PC portable",
          marque: "Dell",
          model: "1"
        },
        {
          code_materiel: 2,
          libelle_materiel: "Tablette",
          marque: "Sony",
          model: "1"
        }
      ];

      for (let i = 0; i < createMateriel.length; i++) {
        console.log('dans la fonction')
        connection.query(
          `SELECT * FROM si_sng.materiel WHERE code_materiel = ${
            createMateriel[i].code_materiel
          } AND libelle_materiel = "${createMateriel[i].libelle_materiel}"
            AND marque = "${createMateriel[i].marque}"
            AND model = "${createMateriel[i].model}"`,
            (err, result) => {
              if (err) throw err;
              if (!result.length > 0){
                connection.query(
                  `INSERT INTO si_sng.materiel (code_materiel, libelle_materiel, marque, model) VALUES (
                    ${createMateriel[i].code_materiel},
                    "${createMateriel[i].libelle_materiel}",
                    "${createMateriel[i].marque}",
                    "${createMateriel[i].model}"
                  )`,
                  (err, result) => {
                    if (err) throw err.message;
                    console.log(result);
                  }
                )
              }
            }
        );
     }
  });

  const tableApplication = `CREATE TABLE IF NOT EXISTS si_sng.application (
  id int NOT null AUTO_INCREMENT,
  code_application int NOT null,
  libelle_application varchar(255) NOT NULL,
  PRIMARY KEY (id)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;`;
  connection.query(tableApplication, (err, results) => {
    if (err) throw err;
    console.log("table application created");

    const createApplication = [
      {
        code_application: 1,
        libelle_application: "dclic"
      },
      {
        code_application: 2,
        libelle_application: "quartis"
      }
    ];

    for (let i = 0; i < createApplication.length; i++) {
      connection.query(
        `SELECT * FROM si_sng.application WHERE code_application = ${
          createApplication[i].code_application
        } AND libelle_application = "${createApplication[i].libelle_application}"`,
        (err, result) =>{
          if(err) throw err;
          if(!result.length > 0){
            connection.query(
              `INSERT INTO si_sng.application (code_application, libelle_application) VALUES (
              ${createApplication[i].code_application},
              "${createApplication[i].libelle_application}"
            )`,
              (err, result) => {
                if (err) throw err.message;
                
              }
            );
          }
        }
      );
    }
  });

  const tableTelephonie = `CREATE TABLE IF NOT EXISTS si_sng.telephonie (
  id int NOT null AUTO_INCREMENT,
  code_telephonie int NOT null,
  libelle_telephonie varchar(255) NOT NULL,
  PRIMARY KEY (id)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;`;
  connection.query(tableTelephonie, (err, results) => {
    if (err) throw err;
    console.log("table telephonie  created");
    const createTelephonie = [
      {
        code_telephonie: 1,
        libelle_telephonie: "samsung"
      },
      {
        code_telephonie: 2,
        libelle_telephonie: "iphone"
      }
    ];

    for (let i = 0; i < createTelephonie.length; i++) {
      connection.query(
        `SELECT * FROM si_sng.telephonie WHERE code_telephonie = ${
          createTelephonie[i].code_telephonie
        } AND libelle_telephonie = "${createTelephonie[i].libelle_telephonie}"`,
        (err, result) => {
          if (err) throw err;
          if (!result.length > 0) {
            connection.query(
              `INSERT INTO si_sng.telephonie (code_telephonie, libelle_telephonie) VALUES (
              ${createTelephonie[i].code_telephonie},
              "${createTelephonie[i].libelle_telephonie}"
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

  const tableLoaning = `CREATE TABLE IF NOT EXISTS si_sng.loaning (
    id int NOT null AUTO_INCREMENT,
    matricule int NOT NULL,
    id_materiel int NOT NULL,
    date_emprunt DATETIME DEFAULT CURRENT_TIMESTAMP,
    code_materiel INT NOT NULL,
    FOREIGN KEY (code_materiel) REFERENCES si_sng.materiel (id),
    FOREIGN KEY (code_materiel) REFERENCES si_sng.telephonie (id),
    FOREIGN KEY (code_materiel) REFERENCES si_sng.epi (id),
    FOREIGN KEY (code_materiel) REFERENCES si_sng.application (id),
    PRIMARY KEY (id)
  )ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;`
  connection.query(tableLoaning, (err, results) => {
    if (err) throw err;
    console.log("table loaning is created");
  })
});

//export pour le l'utiliser autre part
module.exports = connection;
