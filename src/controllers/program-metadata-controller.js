const axios = require("axios")

const BUSINESS_PROCESS_SERVICE_URL =
    process.env.BUSINESS_PROCESS_SERVICE_URL || "http://localhost:3020"

const PROGRAM_METADATA_GET_MOVIE_DETAILS = `${BUSINESS_PROCESS_SERVICE_URL}/api/program-metadata/movie/{name}`

class ProgramMetadataController {
    async getMovieDetails(req, res) {
        const url = PROGRAM_METADATA_GET_MOVIE_DETAILS.replace("{name}", req.params.name)
        req.log.info(`Calling business process service: ${url}`)

        const response = await axios.get(url)

        req.log.info("Business service response is OK")
        res.send({ data: response.data.data })
    }

    async getTvShowDetails(req, res) {
        const url = `${BUSINESS_PROCESS_SERVICE_URL}/api/program-metadata/tv-show/${req.params.name}`
        req.log.info(`Calling business process service: ${url}`)

        const response = await axios.get(url)

        req.log.info("Business service response is OK")
        res.send({ data: response.data.data })
    }
}

module.exports = ProgramMetadataController
