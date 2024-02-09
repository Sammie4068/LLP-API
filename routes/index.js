const { Router } = require("express");
const router = Router();

const {
  getAllPlanes,
  getParts,
  addParts,
  updateParts,
  getLog,
  addLog,
} = require("../controllers/index");

router.get("/planes", getAllPlanes);
router.get("/parts/:aircraft", getParts);
router.post("/parts", addParts);
router.patch("/parts/:id", updateParts);
router.get("/logs/:aircraft", getLog);
router.post("/logs", addLog);

module.exports = router;