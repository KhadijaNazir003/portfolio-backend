const express = require("express")
const { getAwards, getAwardById, createAward, updateAward, deleteAward } = require("../controllers/awardsController")

const router = express.Router()

router.get("/", getAwards)
router.get("/:id", getAwardById)
router.post("/", createAward)
router.put("/:id", updateAward)
router.delete("/:id", deleteAward)

module.exports = router
