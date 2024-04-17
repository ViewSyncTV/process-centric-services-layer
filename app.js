const express = require("express")
const logger = require("./src/middleware/logger")
const { errorHandler } = require("./src/middleware/error-handler")
const cors = require("cors")
const session = require("express-session")
const SupabaseSessionStore = require("./src/helpers/supabase-session-store")
const supabase = require("@supabase/supabase-js")

const SESSION_SECRET = process.env.SESSION_SECRET || ""
const SUPABASE_URL = process.env.SUPABASE_URL || ""
const SUPABASE_KEY = process.env.SUPABASE_KEY || ""

const app = express()
const port = process.env.PORT || 3000
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

const ONE_HOUR_IN_SECONDS = 60 * 60

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
        store: new SupabaseSessionStore(supabaseClient, ONE_HOUR_IN_SECONDS),
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
