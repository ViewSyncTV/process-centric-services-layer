const express = require("express")
const spb = require("@supabase/supabase-js")
const logger = require("./middleware/logger")

const SUPABASE_URL = "https://ippynrgkwygyysedwjyy.supabase.com"
const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcHlucmdrd3lneXlzZWR3anl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkyMDU0NDMsImV4cCI6MjAyNDc4MTQ0M30.5eV0v0pnVxtBPmVw5XDnHU1iB3JKVibMSL9UUkbhAbY"

const app = express()
const port = 3000

const createClient = spb.createClient
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

app.use(logger)
app.use("/api", require("./routes/router"))
app.use((req, res) => {
    res.status(404).json({
        error: {
            message: "Invalid Request",
        },
    })
})

app.listen(port, () => { })
