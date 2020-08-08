const express = require("express");

const {
  plantList,
  plantUpdate,
  plantDelete,
  fetchPlant,
} = require("../controllers/plantControllers");

//Middleware
const upload = require("../middleware/multer");

const router = express.Router();

router.param("plantId", async (req, res, next, plantId) => {
  const plant = await fetchPlant(plantId, next);
  if (plant) {
    req.plant = plant;
    next();
  } else {
    const err = new Error("Plant Not Found");
    err.status = 404;
    next(err);
  }
});

//Plant List
router.get("/", plantList);

//Plant Delete
router.delete("/:plantId", plantDelete);

//Plant Update
router.put("/:plantId", upload.single("image"), plantUpdate);

module.exports = router;
