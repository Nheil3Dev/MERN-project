const express = require('express')
const dotenv = require('dotenv')

// Configuration the .env file
dotenv.config()

// Create Express App
const app = express()
const port = process.env.PORT || 8000

// Define the first route
app.get('/', (req, res) => {
    // Send Hello World
    res.send('Welcome to App Express + TS + Swagger + Mongoose')
})

// Execute App and Listen Request to PORT
app.listen(port, () => {
    console.log(`Listening at: http://localhost:${port}`)
})