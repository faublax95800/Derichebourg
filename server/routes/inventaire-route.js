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
      console.log(results);
      
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

app.get("/epi", (req, res) => {
  connection.query("SELECT * FROM si_sng.epi", function(err, results) {
    if (err) {
      return res.status(500).send("probleme query");
    } else {
      return res.status(200).send(results);
    }
  });
});

app.get("/loaning", (req, res) =>{
  connection.query("SELECT * FROM si_sng.loaning", function(err, results){
    if (err) {
      return res.status(500).send("probleme query");
    } else {
      return res.status(200).send(results);
    }
  });
});

//const tab = ['si_sng.materiel', 'si_sng']
app.get("/loaning/:id", (req, res) => {
  connection.query(`SELECT * FROM si_sng.materiel WHERE code_materiel = ${req.params.id}`, function(err, results){
    if (err) {
      return res.status(500).send("probleme query");
    } else {
      return res.status(200).send(results);
    }
  });
})
app.get("/loaning/:id", (req, res) => {
  connection.query(`SELECT * FROM si_sng.epi WHERE code_epi = ${req.params.id}`, function(err, results){
    if (err) {
      return res.status(500).send("probleme query");
    } else {
      return res.status(200).send(results);
    }
  });
})

app.get("/loaning/:id", (req, res) => {
  connection.query(`SELECT * FROM si_sng.application WHERE code_telephonie = ${req.params.id}`, function(err, results){
    if (err) {
      return res.status(500).send("probleme query");
    } else {
      return res.status(200).send(results);
    }
  });
})

app.get("/loaning/application/:id", (req, res) => {
  connection.query(`SELECT * FROM si_sng.application WHERE id = ${req.params.id}`, function(err, results){
    if (err) {
      return res.status(500).send("probleme query");
    } else {
      return res.status(200).send(results);
    }
  });
})

// resolve 

function query(queryName) {
  return new Promise((resolve, reject) => {
    connection.query(queryName, function(err, result){
      if (err) {
        console.log('erreur query: ', err)
        reject(err)
      } else {
        resolve(JSON.stringify(result))
      }
    })
  });
}

app.get("/history/:id", (req, res) => {
  connection.query(
    `SELECT * FROM si_sng.loaning WHERE matricule = ${req.params.id}`,
    async function(err, result) {
      if (err) {
        return res.status(500).send("probleme query");
      } else {
        const filteredByIdMateriel = result.map(id => id.id_materiel);
        const uniqueId = [...new Set(filteredByIdMateriel)];

        const getApplicationById = [];
        for (let i = 0; i < uniqueId.length; i++) {
          const resultat = await query(
            `SELECT * from si_sng.application WHERE id = ${uniqueId[i]}`
          );
          getApplicationById.push(resultat);
        }

        // // flat() marche sur nodejs a partir de la version 11 du coup je fais un concat
        const resultatParse = getApplicationById.map(lol => JSON.parse(lol));
        const resultat = resultatParse[0].concat(...resultatParse);

        const finalData = [];
        for (let i = 0; i < resultat.length; i++) {
          if (filteredByIdMateriel.includes(resultat[i].id)) {
            const date_emprunt = result
              .map(date => {
                if (resultat[i].id === date.id_materiel) {
                  return `${date.date_emprunt}`;
                }
              })
              .filter(onlyDate => onlyDate !== undefined)
              .join("");

            finalData.push({
              ...resultat[i],
              date_emprunt: date_emprunt,
              matricule: req.params.id

            });
          }
        }
        const removeDuplicateDate = finalData.filter((item, pos) => {
          return finalData.map(obj => obj.date_emprunt).indexOf(item.date_emprunt) === pos;
      })
        return res.status(200).send(removeDuplicateDate);
      }
    }
  );
});

app.delete('/deleteLoaning/:matricule/:id_materiel', (req, res) => {
  //delete from si_sng.loaning where matricule = {} and id_materiel = {};
  connection.query(`DELETE from si_sng.loaning WHERE matricule = ${req.params.matricule} AND id_materiel = ${req.params.id_materiel}`, function(err, result){
    if (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    } else {
      console.log("res", result);
      return res.status(200).send('emprunt supprimer');
    }
  })
})

app.post("/loaning",(req, res)=> {
  console.log('req ici', req.body)
  connection.query(`INSERT INTO si_sng.loaning (matricule, id_materiel, code_materiel) VALUES (
    ${req.body.matricule},
    ${req.body.id_materiel},
    ${req.body.code_materiel}
  )`,function(err, results){
    if (err) {console.log(err.message);
      return res.status(500).send(err.message);
    } else {
      console.log(req.body)
      console.log('res', results)
      return res.status(200).send(results);
    }
  })
})
module.exports = app;
