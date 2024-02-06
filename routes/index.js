const { Router } = require("express");
const router = Router();

const {
  getAllPlanes,
  getParts,
  addParts,
  updateParts,
  getNumOfParts,
  logUpdate,
  addAircraft,
} = require("../controllers/index");

router.get("/planes", getAllPlanes);
router.get("/planes/parts", getNumOfParts);
router.get("/parts/:aircraft", getParts);
router.post("/parts", addParts);
router.patch("/parts/:id", updateParts);
router.patch("/logupdate/", logUpdate);
router.post("/planes", addAircraft);

module.exports = router;