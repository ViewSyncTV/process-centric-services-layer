/**
 * This nampespace defines the routes to manage the authentication of the user
 * @namespace API.Authentication
 * @category API
 * @subcategory External Resources
 * @requires express
 */

const express = require("express")
const AuthController = require("../controllers/auth-controller")
const { asyncHandler } = require("../middleware/error-handler")

const router = express.Router()
const authController = new AuthController()

/**
 * Base route of the TV Programs API
 * Given an authorization token it exchanges it for an access token that stores in the session,
 * then it returns the informations of the logged user.
 * @name Root
 * @route {GET} /api/auth
 * @memberof API.Authentication
 * @example
 * // Example of request
 * GET /api/auth?code=123456
 *
 * // Example of response
 * {
 *  "data": {
 *     "given_name": "John",
 *     "family_name": "Doe",
 *     "nickname": "johndoe",
 *     "name": "John Doe",
 *     "picture": "https://something.com/picture.jpg",
 *     "locale": "it",
 *     "updated_at": "2021-05-28T09:00:00.000Z",
 *     "email": "johndoe@email.com",
 *     "email_verified": true,
 *     "sub": "google-oauth2|1111111111"
 *   }
 * }
 */
router.get("/", asyncHandler(authController.exchangeToken))

module.exports = router
