const axios = require("axios")
const { UnauthorizedError } = require("../errors/auth_errors")
// eslint-disable-next-line no-unused-vars
const Types = require("../types/types")
// eslint-disable-next-line no-unused-vars
const Controllers = require("./controllers")

const BUSINESS_PROCESS_SERVICE_URL =
    process.env.BUSINESS_PROCESS_SERVICE_URL || "http://localhost:3020"

/**
 * Controller that handles the fetch of the TV programs
 * @memberof Controllers
 */
class TvProgramController {
    /**
     * Get the list of Tv programs for today for both Mediaset and Rai.
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse<Types.TvProgram[]>>} The list of Tv programs for today
     * @throws Will throw an error if the request fails
     */
    async getTodayPrograms(req, res) {
        const url = `${BUSINESS_PROCESS_SERVICE_URL}/api/tv-program/today`
        req.log.info(`Calling business process service: ${url}`)

        const response = await axios.get(url)

        req.log.info("Business service response is OK")
        res.send({ data: response.data.data })
    }

    /**
     * Get the list of Tv programs for this week for both Mediaset and Rai.
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse<Types.TvProgram[]>>} The list of Tv programs for the week
     * @throws Will throw an error if the request fails
     */
    async getWeekPrograms(req, res) {
        const url = `${BUSINESS_PROCESS_SERVICE_URL}/api/tv-program/week`
        req.log.info(`Calling business process service: ${url}`)

        const response = await axios.get(url)

        req.log.info("Business service response is OK")
        res.send({ data: response.data.data })
    }

    /**
     * Get the list of favorite Tv programs for the user.
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse<Types.Favorite[]>>} The list of favorite Tv programs
     * @throws Will throw an error if the request fails
     */
    async getFavorites(req, res) {
        if (!req.session.user) {
            throw new UnauthorizedError("User email is missing.")
        }

        const url = encodeURI(
            `${BUSINESS_PROCESS_SERVICE_URL}/api/tv-program/favorites/${req.session.user.email}`,
        )
        req.log.info(`Calling business process service: ${url}`)

        const response = await axios.get(url)

        req.log.info("Business service response is OK")
        res.send({ data: response.data.data })
    }

    /**
     * Add a Tv program to the user's favorites.
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse>} The response
     * @throws Will throw an error if the request fails
     */
    async addFavorite(req, res) {
        if (!req.session.user) {
            throw new UnauthorizedError("User email is missing.")
        }

        const url = `${BUSINESS_PROCESS_SERVICE_URL}/api/tv-program/favorite`
        req.log.info(`Calling business process service: ${url}`)

        const body = req.body
        body.user_email = req.session.user.email

        const response = await axios.post(url, body)

        req.log.info("Business service response is OK")
        res.send({ data: response.data.data })
    }

    /**
     * Remove a Tv program from the user's favorites.
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse>} The response
     * @throws Will throw an error if the request fails
     */
    async removeFavorite(req, res) {
        if (!req.session.user) {
            throw new UnauthorizedError("User email is missing.")
        }

        const url = `${BUSINESS_PROCESS_SERVICE_URL}/api/tv-program/favorite`
        req.log.info(`Calling business process service: ${url}`)

        const body = req.body
        body.user_email = req.session.user.email
        const response = await axios.delete(url, {data: body})

        req.log.info("Business service response is OK")
        res.send({ data: response.data.data })
    }
}

module.exports = TvProgramController
