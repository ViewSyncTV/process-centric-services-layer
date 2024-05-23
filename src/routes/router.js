/**
 * @namespace API
 * @category API
 * @requires express
 */

const express = require("express")
const { checkJwt, checkPermission, writeCommentsScope, } = require("../middleware/api-protection")
const { asyncHandler } = require("../middleware/error-handler")

const router = express.Router()

router.all("/", (req, res) => {
    res.send("API endpoint")
})
router.use("/tv-program", require("./tv-program-router"))
router.use("/program-metadata", require("./program-metadata-router"))
router.use("/auth", require("./auth-router"))

// TODO: remove this part
// NOTE: this api is only for testing purposes
router.use(
    "/test",
    checkJwt,
    checkPermission(writeCommentsScope),
    asyncHandler(async (req, res) => {
        res.send({data: {message: "You are authenticated and authorized"}})
    }),
)

module.exports = router
