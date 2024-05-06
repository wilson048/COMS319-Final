const { MongoClient } = require("mongodb");
// MongoDB
var express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
const port = "8081";
const host = "localhost";
app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});
const url = "mongodb://127.0.0.1:27017";
const dbName = "reactdata";
const client = new MongoClient(url);
const db = client.db(dbName);

app.get("/verifyAccount", async (req, res) => {
  const accountID = req.params._id;
  await client.connect();
  console.log("Node connected successfully to GET MongoDB");
  const query = { id: accountID };
  const results = await db.collection("anti_gambling_accounts").findOne(query);
  if (!results) res.send("Not Found").status(404);
  if (req.body.password != results.body.password) {
    res.status(404);
    res.send("Password Incorrect");
    return;
  }
  res.status(200);
  console.log(results);
  res.send(results);
});

app.post("/findAccount/:username", async (req, res) => {
  const accountID = req.params.username;
  const accountPassword = req.body.password;
  console.log("Account to find :", accountID);
  await client.connect();
  console.log("Node connected successfully to POST-id MongoDB");
  console.log(accountID);
  const query = { _id: accountID };
  const results = await db.collection("anti_gambling_accounts").findOne(query);
  console.log("Results :", results);
  if (!results) res.send("Not Found").status(404);
  if (accountPassword != results.password) {
    res.send("Wrong Password").status(400);
  } else res.send(results).status(200);
});

app.post("/addAccount", async (req, res) => {
  try {
    await client.connect();
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);
    const newDocument = {
      _id: values[0], // also "id": req.body.id,
      password: values[1], // also "name": req.body.name,
      dob: values[2], // also "price": req.body.price,
      coins: 500, // all fresh accounts start with 500 coins
      credit_card_num: "", // credit card information is not initally saved
      credit_card_name: "",
      credit_card_zip: "",
      credit_card_cvv: "",
    };
    console.log(newDocument);
    const results = await db
      .collection("anti_gambling_accounts")
      .insertOne(newDocument);
    res.status(200);
    res.send(results);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ error: "An internal server error occurred" });
  }
});

app.delete("/deleteAccount/:username", async (req, res) => {
  try {
    const id = req.params.username;
    await client.connect();
    console.log("User to delete :", id);
    const query = { _id: id };
    // delete
    const results = await db
      .collection("anti_gambling_accounts")
      .deleteOne(query);
    res.status(200);
    res.send(results);
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.put("/updateAccount/:username", async (req, res) => {
  const id = req.params._id;
  const query = { _id: id };
  await client.connect();
  console.log("Product to Update :", id);
  // Data for updating the document, typically comes from the request body
  console.log(req.body);
  const updateData = {
    $set: {
      _id: req.body._id, // also "id": req.body.id,
      password: req.body.password, // also "name": req.body.name,
      dob: req.body.dob, // also "price": req.body.price,
      coins: req.body.coins, // all fresh accounts start with 500 coins
      credit_card_num: req.body.credit_card_num, // credit card information is not initally saved
      credit_card_name: req.body.credit_card_name,
      credit_card_zip: req.body.credit_card_zip,
      credit_card_cvv: req.body.credit_card_cvv,
    },
  };
  // Add options if needed, for example { upsert: true } to create a document if it doesn't exist
  const options = {};
  const results = await db
    .collection("anti_gambling_accounts")
    .updateOne(query, updateData, options);
  res.status(200);
  res.send(results);
});
