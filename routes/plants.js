const express = require("express");

const {
  plantCreate,
  plantList,
  plantUpdate,
  plantDelete,
} = require("../controllers/plantsController");

const router = express.Router();

//Plant List
router.get("/", plantList);

//Plant Create
router.post("/", plantCreate);

//Plant Delete
router.delete("/:plantId", plantDelete);

//Plant Update
router.put("/:plantId", plantUpdate);

module.exports = router;
