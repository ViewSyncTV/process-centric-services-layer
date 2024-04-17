const express = require("express")
const { checkJwt, checkPermission, writeMessagesScope, } = require("../middleware/api-protection")
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
    checkPermission(writeMessagesScope),
    asyncHandler(async (req, res) => {
        res.send(req.session)
    }),
)

module.exports = router
