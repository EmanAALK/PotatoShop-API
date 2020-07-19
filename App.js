const express = require("express");
const cors = require("cors");

//Data
const plants = require("./data");

//Create Express App Instance
const app = express();

app.use(cors());

app.get("/plants", (req, res) => {
  res.json(plants);
});

app.listen(8000);
