var SUPABASE_URL = 'https://ippynrgkwygyysedwjyy.supabase.co'
var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcHlucmdrd3lneXlzZWR3anl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkyMDU0NDMsImV4cCI6MjAyNDc4MTQ0M30.5eV0v0pnVxtBPmVw5XDnHU1iB3JKVibMSL9UUkbhAbY'

const express = require('express')
const spb = require('@supabase/supabase-js')
const createClient = spb.createClient;

const app = express()
const port = 3000

// Create a single supabase client for interacting with your database
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
