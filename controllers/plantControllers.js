const slugify = require("slugify");
const { Vendor } = require("../db/models");

//Data
let plants = require("../data");
const Plant = require("../db/models/Plant");

//Media Route
const path = require("path");

//Fetch Plant
exports.fetchPlant = async (plantId, next) => {
  try {
    const plant = await Plant.findByPk(plantId);
    return plant;
  } catch (error) {
    next(error);
  }
};

//Plant List
exports.plantList = async (req, res, next) => {
  try {
    const _plants = await Plant.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "vendorId"] },
      include: {
        model: Vendor,
        as: "vendor",
        attributes: ["name"],
      },
    });
    res.json(_plants);
  } catch (error) {
    next(error);
  }
};

//Plant Delete
exports.plantDelete = async (req, res, next) => {
  try {
    await req.plant.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

//Plant Update
exports.plantUpdate = async (req, res, next) => {
  try {
    await req.plant.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
