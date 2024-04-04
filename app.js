const express = require("express")
const logger = require("./src/middleware/logger")
const { errorHandler } = require("./src/middleware/error-handler")

const app = express()
const port = process.env.PORT || 3000

app.use(logger)
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true }))

app.use("/api", require("./src/routes/router"))
app.use((req, res) => {
    res.status(404).json({
        error: {
            message: "Invalid Request",
        },
    })
})

app.use(errorHandler)
app.listen(port, () => { })
