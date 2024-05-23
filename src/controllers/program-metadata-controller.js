const axios = require("axios")
// eslint-disable-next-line no-unused-vars
const Types = require("../types/types")
// eslint-disable-next-line no-unused-vars
const Controllers = require("./controllers")

const BUSINESS_PROCESS_SERVICE_URL =
    process.env.BUSINESS_PROCESS_SERVICE_URL || "http://localhost:3020"

const PROGRAM_METADATA_GET_MOVIE_DETAILS = `${BUSINESS_PROCESS_SERVICE_URL}/api/program-metadata/movie/{name}`

/**
 * Controller that handles the fetch of the program metadata
 * @memberof Controllers
 */
class ProgramMetadataController {
    /**
     * Get the details of a movie by its name or a compatible query.
     * The function will call the api to get a list of possible movies and
     * then get the details of the first one.
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse<Types.Movie>>} The details of the movie
     * @throws Will throw an error if the request fails
     */
    async getMovieDetails(req, res) {
        const url = PROGRAM_METADATA_GET_MOVIE_DETAILS.replace("{name}", req.params.name)
        req.log.info(`Calling business process service: ${url}`)

        const response = await axios.get(url)

        req.log.info("Business service response is OK")
        res.send({ data: response.data.data })
    }

    /**
     * Get the details of a tv-show by its name or a compatible query.
     * The function will call the api to get a list of possible shows and
     * then get the details of the first one.
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse<Types.TVShow>>} The details of the tv-show
     * @throws Will throw an error if the request fails
     */
    async getTvShowDetails(req, res) {
        const url = `${BUSINESS_PROCESS_SERVICE_URL}/api/program-metadata/tv-show/${req.params.name}`
        req.log.info(`Calling business process service: ${url}`)

        const response = await axios.get(url)

        req.log.info("Business service response is OK")
        res.send({ data: response.data.data })
    }
}

module.exports = ProgramMetadataController
