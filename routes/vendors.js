const express = require("express");

//Controllers
const {
  vendorCreate,
  vendorList,
  vendorUpdate,
  vendorDelete,
  fetchVendor,
  plantCreate,
} = require("../controllers/vendorControllers");

//Middleware
const upload = require("../middleware/multer");

const router = express.Router();

router.param("vendorId", async (req, res, next, vendorId) => {
  const vendor = await fetchVendor(vendorId, next);
  if (vendor) {
    req.vendor = vendor;
    next();
  } else {
    const err = new Error("Vendor Not Found");
    err.status = 404;
    next(err);
  }
});

//Vendor List
router.get("/", vendorList);

//Vendor Create
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  vendorCreate
);

//Vendor Delete
router.delete("/:vendorId", vendorDelete);

//Vendor Update
router.put("/:vendorId", upload.single("image"), vendorUpdate);

//Plant Create
router.post("/:vendorId/vendors", upload.single("image"), plantCreate);

module.exports = router;
