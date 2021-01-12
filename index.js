const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

// const fileUpload = require("express-fileupload");
require("dotenv").config();

const MongoClient = require("mongodb").MongoClient;
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.fwfle.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const uri =
  "mongodb+srv://kabir333:REjnppfsOjhG4vst@cluster0.lkfiy.mongodb.net/appointments?retryWrites=true&w=majority";

const ObjectId = require("mongodb").ObjectId;
const port = 2222;

app.use(bodyParser.json());
app.use(cors());

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  const reviewCollection = client
    .db("appointments")
    .collection("appointmentCollection");

  // add Review
  app.post("/addAppointments", (req, res) => {
    const review = req.body;
    reviewCollection.insertOne(review).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  // get Services
  app.get("/appointmentList", (req, res) => {
    reviewCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || port);

// "start": "node index.js",
// "start:dev": "nodemon index.js",


