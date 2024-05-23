const axios = require("axios")
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
}

module.exports = TvProgramController
