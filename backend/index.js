const express = require('express')
const cors = require('cors')
const pool = require('./db')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3004

const dashboardRoutes = require('./routes/dashboard')

app.use(cors())
app.use(express.json())

app.use('/api/dashboard', dashboardRoutes)

app.listen(PORT, () => {
  console.log(`ETL Dashboard API running on port ${PORT}`)
})