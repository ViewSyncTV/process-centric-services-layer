class MissingAccessTokenError extends Error {
    constructor() {
        super("Access Token must be provided")
        this.status = 401
        this.code = "MISSING_TOKEN"
    }
}

class UnauthorizedError extends Error {
    constructor(message) {
        super(message)
        this.status = 401
        this.code = "UNAUTHORIZED"
    }
}

module.exports = {
    MissingAccessTokenError,
    UnauthorizedError
}
