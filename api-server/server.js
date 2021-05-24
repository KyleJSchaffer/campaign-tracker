require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = require('./routes/router');

const API_PORT = process.env.PORT || 3001;
const dbRoute = process.env.DB;

//Set up mongoose connection to database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);
let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//Middleware
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
//Router
app.use('/', router);
//Error Handler
app.use((error, req, res, next) => {
  console.log(error)
  res.status(500).json({ message: error.message })
})

app.listen(API_PORT, () => {
  console.log(`Listening on port ${API_PORT}`);
});

