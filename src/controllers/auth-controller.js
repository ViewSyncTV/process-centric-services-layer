const axios = require("axios")

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN || ""
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID || ""
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET || ""

const AUTH0_GET_TOKEN_URL = "https://{domain}/oauth/token"

class AuthController {
    async getToken(req, res) {
        const code = req.query.code

        if (!code) {
            res.status(401).send({ error: { message: "Missing authorization code." } })
        }

        const url = AUTH0_GET_TOKEN_URL.replace("{domain}", AUTH0_DOMAIN)

        const params = new URLSearchParams()
        params.append("grant_type", "authorization_code")
        params.append("client_id", AUTH0_CLIENT_ID)
        params.append("client_secret", AUTH0_CLIENT_SECRET)
        params.append("code", code)
        params.append("redirect_uri", "http://localhost:3000/")

        req.log.info(params)

        req.log.info(`Calling Auth0 service: ${url}`)
        const response = await axios.post(url, params)
        req.log.info("Auth0 service response is OK")

        // save the token in the session
        req.session.token = response.data.access_token

        req.log.info("Token saved in session")

        // TODO: redirect to the client app
    }
}

module.exports = AuthController
