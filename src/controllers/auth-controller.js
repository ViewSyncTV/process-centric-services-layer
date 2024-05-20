const axios = require("axios")

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN || ""
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID || ""
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET || ""

const AUTH0_GET_TOKEN_URL = "https://{domain}/oauth/token"
const AUTH0_GET_USER_INFO_URL = "https://{domain}/userinfo"

class AuthController {
    constructor() {
        this.getToken = this.getToken.bind(this)
    }


    async getToken(req, res) {
        const code = req.query.code

        if (!code) {
            res.status(401).send({ error: { message: "Missing authorization code" } })
        }

        const url = AUTH0_GET_TOKEN_URL.replace("{domain}", AUTH0_DOMAIN)

        const params = new URLSearchParams()
        params.append("grant_type", "authorization_code")
        params.append("client_id", AUTH0_CLIENT_ID)
        params.append("client_secret", AUTH0_CLIENT_SECRET)
        params.append("code", code)
        params.append("redirect_uri", "http://localhost:3000/")

        req.log.info(`Calling Auth0 service: ${url}`)
        const response = await axios.post(url, params)
        req.log.info("Auth0 service response is OK")

        const access_token = response.data.access_token

        // save the token in the session
        req.session.access_token = access_token

        // get user informations
        const user = await this.#getUserInfo(access_token, req.log)

        res.send({data: {user}})
    }

    /**
     * @param {string} access_token
     * @param {pino.Logger} logger
     * @param {import("pino").Logger} logger
     * @returns {Promise<any>} user informations
     */
    async #getUserInfo(access_token, logger) {
        const url = AUTH0_GET_USER_INFO_URL.replace("{domain}", AUTH0_DOMAIN)
        logger.info(`Calling Auth0 service: ${url}`)

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                contentType: "application/json",
            },
        })

        return response.data
    }
}

module.exports = AuthController
