const express = require("express")
const logger = require("../utils/logger")

const router = express.Router()

router.get("/", (req, res) => {
    logger.info("Get the programs list")
    res.send("This is the TV Programs API endpoint!")
})

router.get("/all", (req, res) => {
    logger.info("Get the programs list")
    res.send("Get the programs list")
})

module.exports = router
