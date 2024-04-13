const express = require("express")

const router = express.Router()

router.all("/", (req, res) => {
    res.send("API endpoint")
})
router.use("/tv-program", require("./tv-program-router"))
router.use("/program-metadata", require("./program-metadata-router"))
router.use("/auth", require("./auth-router"))

module.exports = router
