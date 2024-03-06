const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
    res.send("This is the TV Programs API endpoint!")
})

router.get("/all", (req, res) => {
    res.send("Get the programs list")
})

module.exports = router
