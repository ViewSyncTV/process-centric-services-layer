class CORSRequestError extends Error {
    constructor(message) {
        super(message)
        this.status = 403
        this.code = "CORS_ERROR"
    }
}

module.exports = {
    CORSRequestError,
}
