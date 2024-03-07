const axios = require("axios")

const BUSINESS_PROCESS_SERVICE_URL =
    process.env.BUSINESS_PROCESS_SERVICE_URL || "http://localhost:3020"

class TvProgramController {
    async getAllPrograms(req, res) {
        try {
            const response = await axios.get(`${BUSINESS_PROCESS_SERVICE_URL}/api/tv-programs/all`)
            return response
        } catch (error) {
            req.log.error("Error fetching programs from external service:", error)
            res.status(500).json({ error: "Internal server error" })
        }
    }
}

module.exports = TvProgramController
