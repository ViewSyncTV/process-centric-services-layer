const axios = require("axios")

const BUSINESS_PROCESS_SERVICE_URL =
    process.env.BUSINESS_PROCESS_SERVICE_URL || "http://localhost:3020"

class TvProgramController {
    async getTodayPrograms(req, res) {
        const url = `${BUSINESS_PROCESS_SERVICE_URL}/api/tv-programs/today`
        req.log.info(`Calling business process service: ${url}`)

        const response = await axios.get(`${BUSINESS_PROCESS_SERVICE_URL}/api/tv-program/today`)

        req.log.info("Business service response is OK")
        res.send({ data: response.data.data })
    }
}

module.exports = TvProgramController
