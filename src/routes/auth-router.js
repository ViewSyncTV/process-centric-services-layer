const express = require("express")
const AuthController = require("../controllers/auth-controller")
const { asyncHandler } = require("../middleware/error-handler")

const router = express.Router()
const authController = new AuthController()

router.get("/", asyncHandler(authController.getToken))

module.exports = router
