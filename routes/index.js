const { Router } = require("express");
const router = Router();

const { getAllPlanes, getParts } = require("../controllers/index")

router.get("/planes", getAllPlanes);
router.get("/parts/:aircraft", getParts);

module.exports = router;