const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "123456789",
  database: "covid",
});

app.get("/covidworld", (req, res) => {
  db.query("SELECT * FROM covidworld", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/createcovidworld", (req, res) => {
  const id_country = req.body.id_country;
  const country = req.body.country;
  const province = req.body.province;
  const timeline = req.body.timeline;
  const amount = req.body.amount;

  db.query(
    "INSERT INTO covidworld (id_country ,country, province, timeline, amount) VALUES(?,?,?,?,?)",
    [id_country ,country, province, timeline, amount],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    }
  );
});

app.put("/updatecovidworld/c", (req, res) => {
  const color = req.body.id_country;
  const country = req.body.country;
  db.query(
    "UPDATE covidworld SET id_country = ? WHERE country = ?",[id_country,country],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/updatecovidworld/p", (req, res) => {
  const color = req.body.color;
  const province = req.body.province;
  db.query(
    "UPDATE covidworld SET color = ? WHERE province = ?",[color,province],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen("3001", () => {
  console.log("Server is running on port 3001");
});
