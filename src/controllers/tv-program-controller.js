const axios = require("axios")

const BUSINESS_PROCESS_SERVICE_URL =
    process.env.BUSINESS_PROCESS_SERVICE_URL || "http://localhost:3020"

class TvProgramController {
    async getTodayPrograms(req, res) {
        try {
            const url = `${BUSINESS_PROCESS_SERVICE_URL}/api/tv-programs/today`
            req.log.info(`Calling business process service: ${url}`)

            const response = await axios.get(
                `${BUSINESS_PROCESS_SERVICE_URL}/api/tv-program/today`,
            )

            if (response.status === 200) {
                req.log.info("Business service response is OK")
                res.send({ data: response.data.data })
            } else {
                throw new Error("Bad response from the business process service")
            }

        } catch (error) {
            req.log.error("Error fetching programs from external service:", error)
            res.status(500).json({ error: "Internal server error" })
        }
    }
}

module.exports = TvProgramController
