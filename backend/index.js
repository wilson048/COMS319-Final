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
  await client.connect();
  console.log("Node connected successfully to GET MongoDB");
  const query = {};
  const results = await db
    .collection("anti_gambling_accounts")
    .find(query)
    .limit(100)
    .toArray();
  console.log(results);
  res.status(200);
  res.send(results);
});

app.get("/:id", async (req, res) => {
  const Productid = Number(req.params.id);
  console.log("Product to find :", Productid);
  await client.connect();
  console.log("Node connected successfully to GET-id MongoDB");
  const query = { id: Productid };
  const results = await db.collection("anti_gambling_accounts").findOne(query);
  console.log("Results :", results);
  if (!results) res.send("Not Found").status(404);
  else res.send(results).status(200);
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
    const id = Number(req.params.id);
    await client.connect();
    console.log("Product to delete :", id);
    const query = { id: id };
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
  const id = Number(req.params.id);
  const query = { id: id };
  await client.connect();
  console.log("Product to Update :", id);
  // Data for updating the document, typically comes from the request body
  console.log(req.body);
  const updateData = {
    $set: {
      id: req.body.name, // also "id": req.body.id,
      title: req.body.title, // also "name": req.body.name,
      price: req.body.price, // also "price": req.body.price,
      description: req.body.description, // also "description": req.body.description,
      category: req.body.category,
      image: req.body.image,
      rating: req.body.rating,
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
