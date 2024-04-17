const express = require("express")
const logger = require("./src/middleware/logger")
const { errorHandler } = require("./src/middleware/error-handler")
const cors = require("cors")
const session = require("express-session")

const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24
const SESSION_SECRET = process.env.SESSION_SECRET || ""

const app = express()
const port = process.env.PORT || 3000

var allowlist = ["http://localhost:3000", "http://localhost:3010"]
var corsOptionsDelegate = {
    credentials: true,
    origin: function (origin, callback) {
        if (allowlist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
}

app.use(logger)
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true }))
app.use(cors(corsOptionsDelegate))

app.use(
    session({
        secret: SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: DAY_IN_MILLISECONDS,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        },
    }),
)

app.use("/api", require("./src/routes/router"))
app.use((req, res) => {
    res.status(404).json({
        error: {
            message: "Invalid Request",
        },
    })
})

app.use(errorHandler)
app.listen(port, () => {})
