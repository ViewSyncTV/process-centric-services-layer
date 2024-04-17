const { default: axios } = require("axios")
const jwt = require("jsonwebtoken")
const jwkToPem = require("jwk-to-pem")
const { asyncHandler } = require("./error-handler")
const { MissingAccessTokenError, UnauthorizedError } = require("../errors/auth_errors")

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN || ""
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE || ""
const AUTH0_ISSUER_BASE_URL = process.env.AUTH0_ISSUER_BASE_URL || ""
const AUTH0_TOKEN_SIGNING_ALG = process.env.AUTH0_TOKEN_SIGNING_ALG || ""

const jwtOptions = {
    audience: AUTH0_AUDIENCE,
    algorithms: [AUTH0_TOKEN_SIGNING_ALG],
    issuer: AUTH0_ISSUER_BASE_URL,
}

const checkJwt = asyncHandler(async (req, res, next) => {
    const access_token = req.session.access_token

    if (!access_token) {
        throw new MissingAccessTokenError()
    }

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

module.exports = [checkJwt]
