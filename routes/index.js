const { Router } = require("express");
const router = Router();
const multer = require("multer");

const {
  getAllPlanes,
  getParts,
  addParts,
  updateParts,
  getLog,
  addLog,
  getNumOfParts,
  logUpdate,
  addAircraft,
  removePart,
  getLogByID,
  getDoc,
  addDoc,
} = require("../controllers/index");

const upload = multer({ dest: "./uploads" });

router.get("/planes", getAllPlanes);
router.get("/planes/parts", getNumOfParts);
router.get("/parts/:aircraft", getParts);
router.post("/parts", addParts);
router.patch("/parts/:id", updateParts);
router.get("/logs/id/:id", getLogByID);
router.get("/logs/:aircraft", getLog);
router.get("/docs/:aircraft", getDoc);
router.post("/logs", addLog);
router.patch("/logupdate/", logUpdate);
router.post("/planes", addAircraft);
router.delete("/parts/:id", removePart);
router.post("/docs", upload.single("image"), addDoc);

module.exports = router;