const slugify = require("slugify");

//Data
let plants = require("../data");

//Plant List
exports.plantList = (req, res) => res.json(plants);

//Plant Create
exports.plantCreate = (req, res) => {
  const id = plants[plants.length - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newPlant = { id, slug, ...req.body };
  plants.push(newPlant);
  res.status(201).json(newPlant);
};

//Plant Delete
exports.plantDelete = (req, res) => {
  const { plantId } = req.params;
  const foundPlant = plants.find((plant) => plant.id === +plantId);
  if (foundPlant) {
    plants = plants.filter((plant) => plant.id !== +plantId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Plant not Found" });
  }
};

//Plant Update
exports.plantUpdate = (req, res) => {
  const { plantId } = req.params;
  const foundPlant = plants.find((plant) => plant.id === +plantId);
  //Check if plant exists
  if (foundPlant) {
    for (const key in req.body) foundPlant[key] = req.body[key];
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Plant not found" });
  }
};
