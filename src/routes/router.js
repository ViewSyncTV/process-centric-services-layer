const express = require("express")

const router = express.Router()

router.all("/", (req, res) => {
    res.send("API endpoint")
})
router.use("/tv-programs", require("./tv-programs"))

module.exports = router
