const { Router } = require("express");
const router = Router();

const { getAllPlanes } = require("../controllers/index")

router.get("/planes", getAllPlanes);

module.exports = router;