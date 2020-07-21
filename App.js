const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const slugify = require("slugify");

//Data
let plants = require("./data");

//Create Express App Instance
const app = express();
app.use(bodyParser.json());

app.use(cors());

app.get("/plants", (req, res) => {
  res.json(plants);
});

//Create Plant
app.post("/plants", (req, res) => {
  const id = plants[plants.length - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newPlant = { id, slug, ...req.body };
  plants.push(newPlant);
  res.status(201).json(newPlant);
});

//Delete Plant
app.delete("/plants/:plantId", (req, res) => {
  const { plantId } = req.params;
  const foundPlant = plants.find((plant) => plant.id === +plantId);
  if (foundPlant) {
    plants = plants.filter((plant) => plant.id !== +plantId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Plant not Found" });
  }
});

app.listen(8000);
