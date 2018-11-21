const express = require("express");
const app = express();
const { Pool, Client } = require('pg');
// const pool = new Pool();
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: true,
// });


app.use(express.static("public"));

app.set("views", "views");
app.set('view engine', 'ejs');

app.get("/", (req, res)=> {
  res.render("pages/home");
});

app.get("/getUsers/:id", async (req, res)=> {
  let id = req.params.id;
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
  const response = await pool.query(`SELECT * FROM account WHERE accountId = ${id};`);
  await pool.end();
  res.send(JSON.stringify(response));
});

app.post("/createAccount", async (req, res) => {
  console.log(req.query);
  // const pool = new Pool({
  //   connectionString: process.env.DATABASE_URL,
  //   ssl: true,
  // });

  // const response = await pool.query(`INSERT INTO account ( accountName, accountPassword ) VALUES (${accountName}, ${accountPassword}`);
  // await pool.end();
  // res.send(response);
});

app.get("/postal", (req, res)=> {
  res.render("pages/week9/index");
});

app.get("/price", (req, res)=> {
  let payload = [req.body.accountName, req.body.accountPassword];
  console.log(payload);
  // let payload = {type: "envelope", weight: 45};
  // res.render("pages/week9/price", payload);
});

app.all("*", (req, res) => {
  res.send("<h1>404</h1> <p>Y'all made it somewhere you shouldn'ev blunderyly.</p>")
});

app.listen( process.env.PORT || 5000, ()=> {
  console.log("running class server");
});