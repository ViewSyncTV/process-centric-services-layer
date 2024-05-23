/** @namespace authentication */

const axios = require("axios")
const jwt = require("jsonwebtoken")
const jwkToPem = require("jwk-to-pem")
const {
    MissingAccessTokenError,
    UnauthorizedError,
    MissingPermissionError,
} = require("../errors/auth_errors")
const { asyncHandler } = require("./error-handler")
// eslint-disable-next-line no-unused-vars
const Types = require("../types/types")

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN || ""
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE || ""
const AUTH0_ISSUER_BASE_URL = process.env.AUTH0_ISSUER_BASE_URL || ""
const AUTH0_TOKEN_SIGNING_ALG = process.env.AUTH0_TOKEN_SIGNING_ALG || ""

const jwtOptions = {
    audience: AUTH0_AUDIENCE,
    algorithms: [AUTH0_TOKEN_SIGNING_ALG],
    issuer: AUTH0_ISSUER_BASE_URL,
}

/**
 * Function that gets the access token from the session
 * @function
 * @param {Types.Request} req - The request object
 * @returns {string} The access token
 * @throws {MissingAccessTokenError} - If the access token is not found in the session
 * @memberof authentication
 */
function getAccessToken(req) {
    const access_token = req.session.access_token

    if (!access_token) {
        throw new MissingAccessTokenError()
    }

    return access_token
}

/**
 * The middleware that checks the JWT token (access token) in the request
 * @function
 * @param {Types.Request} req - The request object
 * @param {Types.Response} res - The response object
 * @param {Function} next - The next middleware
 * @throws {UnauthorizedError} - If the JWT token is invalid
 * @memberof authentication
 */
const checkJwt = asyncHandler(async (req, res, next) => {
    const access_token = getAccessToken(req)

    var jwks = await axios.get(`http://${AUTH0_DOMAIN}/.well-known/jwks.json`)
    const pem = jwkToPem(jwks.data.keys[0])

    jwt.verify(access_token, pem, jwtOptions, (err) => {
        if (err) {
            throw new UnauthorizedError(err.message)
        } else {
            next()
        }
    })
})

/**
 * The middleware that checks the permission in the JWT token
 * @function
 * @param {string} permission - The permission to check
 * @returns {Function} The middleware function
 * @throws {MissingPermissionError} - If the permission is not found in the JWT token
 * @memberof authentication
 */
const checkPermission = (permission) =>
    asyncHandler(async (req, res, next) => {
        const access_token = getAccessToken(req)
        const decoded = jwt.decode(access_token)

        if (decoded?.permissions?.includes(permission)) {
            next()
        } else {
            throw new MissingPermissionError(permission)
        }
    })

const writeCommentsScope = "write:comments"

module.exports = { checkJwt, checkPermission, writeCommentsScope }
